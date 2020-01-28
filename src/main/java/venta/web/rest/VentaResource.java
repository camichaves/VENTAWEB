package venta.web.rest;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import venta.domain.BodyRealizarVenta;
import venta.domain.CargaLog;
import venta.domain.Cliente;
import venta.domain.Respuesta;
import venta.domain.RespuestaErr;
import venta.domain.Tarjeta;
import venta.domain.Venta;
import venta.domain.VerificarTarjeta;
import venta.repository.ClienteRepository;
import venta.repository.VentaRepository;
import venta.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link venta.domain.Venta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VentaResource {

    private final Logger log = LoggerFactory.getLogger(VentaResource.class);

    private static final String ENTITY_NAME = "venta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VentaRepository ventaRepository;
    private ClienteResource clientes;
    private TarjetaResource tarjetas;

    ClienteRepository clienteRepository;

    public VentaResource(VentaRepository ventaRepository,  ClienteResource client, 
                        TarjetaResource tarj) {
        this.ventaRepository = ventaRepository;
        this.clientes = client;
        this.tarjetas = tarj;
    }

    /**
     * {@code POST  /ventas} : Create a new venta.
     *
     * @param venta the venta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new venta, or with status {@code 400 (Bad Request)} if the venta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ventas")
    public ResponseEntity<Venta> createVenta(@RequestBody Venta venta) throws URISyntaxException {
        log.debug("REST request to save Venta : {}", venta);
        if (venta.getId() != null) {
            throw new BadRequestAlertException("A new venta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Venta result = ventaRepository.save(venta);
        return ResponseEntity.created(new URI("/api/ventas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/venta")
    public ResponseEntity<Object> realizarVenta(@RequestBody BodyRealizarVenta body) throws URISyntaxException, IOException {

        // Pongo en LOG request de venta

        Venta venta = new Venta(body.getMontoVenta());
        Venta result = ventaRepository.save(venta);
        System.out.println("idVenta:"+result.getId());

        //CargaLog.enviar(result.getId(),"Peticion de venta","INFO","Proceso de Venta iniciado");



        
        


        Optional<Cliente> client = this.clientes.verificarCliente(body.getIdCliente());

         if(!client.isPresent()) {
             System.out.println("El cliente no existe");
             //CargaLog.enviar(result.getId(),"Verificacion de cliente",
             //"ERROR","El cliente no existe");

             RespuestaErr re = new RespuestaErr(5, "El cliente no existe");
             return ResponseEntity.status(403).body(re);
         }

         System.out.println("El cliente existe");
         //CargaLog.enviar(result.getId(),"Verificacion de cliente",
         //"INFO","El id de cliente es valido");

         
         


         result.setCliente(client.get());
         ventaRepository.save(result);
         //this.updateVenta(result);



        //verificar que la tarjeta exista y no este vencida

         String rta = VerificarTarjeta.verificar(body.getIdTarjeta());
         
         
         //String tarjetavalida = "{\n\"cod\" : 21,\n\"info\" : \"Tarjeta valida\"\n}\n";
         
         if ( ! (rta.contains("21,") && rta.contains("Tarjeta valida")) ){
             //CargaLog.enviar(result.getId(),"Verificacion de tarjeta",
             //"ERROR","La tarjeta no es valida");
            RespuestaErr re = new RespuestaErr(6, "Tarjeta invalida");
            return ResponseEntity.status(403).body(re);

         }
         //CargaLog.enviar(result.getId(),"Verificacion de tarjeta",
             //"INFO","Tarjeta valida");
        Tarjeta tarjeta = this.tarjetas.traer(body.getIdTarjeta());

        result.setTarjeta(tarjeta);
        ventaRepository.save(result);
        //this.updateVenta(result);


        //verificar el monto de la venta

        rta = VerificarTarjeta.verificarMonto(result);
        if ( ! (rta.contains("22,") && rta.contains("Monto valido")) ){
            RespuestaErr re = new RespuestaErr(6, "Monto invalido");
            return ResponseEntity.status(403).body(re);
        }

        //CargaLog.enviar(result.getId(),"Verificacion del monto de venta",
         //"INFO","El monto es valido");
         

       



        Respuesta rtafinal = new Respuesta(10, "Venta realizada exitosamente");
        //CargaLog.enviar(result.getId(),"Estado de venta",
         //"INFO","El monto es valido");
        return ResponseEntity.status(201).body(rtafinal);
    }


    /**
     * {@code PUT  /ventas} : Updates an existing venta.
     *
     * @param venta the venta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated venta,
     * or with status {@code 400 (Bad Request)} if the venta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the venta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ventas")
    public ResponseEntity<Venta> updateVenta(@RequestBody Venta venta) throws URISyntaxException {
        log.debug("REST request to update Venta : {}", venta);
        if (venta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Venta result = ventaRepository.save(venta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, venta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ventas} : get all the ventas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ventas in body.
     */
    @GetMapping("/ventas")
    public List<Venta> getAllVentas() {
        log.debug("REST request to get all Ventas");
        return ventaRepository.findAll();
    }

    /**
     * {@code GET  /ventas/:id} : get the "id" venta.
     *
     * @param id the id of the venta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the venta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ventas/{id}")
    public ResponseEntity<Venta> getVenta(@PathVariable Long id) {
        log.debug("REST request to get Venta : {}", id);
        Optional<Venta> venta = ventaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(venta);
    }

    /**
     * {@code DELETE  /ventas/:id} : delete the "id" venta.
     *
     * @param id the id of the venta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ventas/{id}")
    public ResponseEntity<Void> deleteVenta(@PathVariable Long id) {
        log.debug("REST request to delete Venta : {}", id);
        ventaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
