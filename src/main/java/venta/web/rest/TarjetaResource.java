package venta.web.rest;

import venta.domain.RespuestaErr;
import venta.domain.Tarjeta;
import venta.repository.TarjetaRepository;
import venta.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link venta.domain.Tarjeta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TarjetaResource {

    private final Logger log = LoggerFactory.getLogger(TarjetaResource.class);

    private static final String ENTITY_NAME = "tarjeta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TarjetaRepository tarjetaRepository;

    public TarjetaResource(TarjetaRepository tarjetaRepository) {
        this.tarjetaRepository = tarjetaRepository;
    }

    /**
     * {@code POST  /tarjetas} : Create a new tarjeta.
     *
     * @param tarjeta the tarjeta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tarjeta, or with status {@code 400 (Bad Request)} if the tarjeta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tarjeta/agregar")
    public ResponseEntity createTarjeta(@RequestBody Tarjeta tarjeta) throws URISyntaxException {
        log.debug("REST request to save Tarjeta : {}", tarjeta);
        //System.out.println("tarjeta tipo: "+tarjeta.getTipo());


        //agregar
        System.out.println("Esto devuelve: "+tarjetaRepository.findByNumero(tarjeta.getNumero()));
        if(tarjetaRepository.findByNumero(tarjeta.getNumero()).isPresent()){
            RespuestaErr re = new RespuestaErr(50, "Numero de tarjeta invalida, ya existe");
            return ResponseEntity.status(403).body(re);
        }

        if(!(tarjeta.getTipo().contentEquals("MC") || tarjeta.getTipo().contentEquals("VISA")) ){
            RespuestaErr re = new RespuestaErr(20, "Tipo de tarjeta invalida");
            return ResponseEntity.status(403).body(re);
        }
        if (Integer.toString(tarjeta.getCodSeguridad()).length() != 3){
            RespuestaErr re = new RespuestaErr(20, "Codigo de seg invalido");
            return ResponseEntity.status(403).body(re);
        }
        if(Integer.toString(tarjeta.getFechaVencimiento()).length() != 6 ){
            RespuestaErr re = new RespuestaErr(20, "Fecha de vencimiento invalida");
            return ResponseEntity.status(403).body(re);
        }
        if(tarjeta.getNumero().length() != 16 || tarjeta.getNumero() == null) {
            RespuestaErr re = new RespuestaErr(20, "Numero de tarjeta invalida");
            return ResponseEntity.status(403).body(re);
        }
        if(tarjeta.getMontoMax() == null) {
            RespuestaErr re = new RespuestaErr(20, "Monto max invalido");
            return ResponseEntity.status(403).body(re);
        }
        if (tarjeta.getId() != null) {
            throw new BadRequestAlertException("A new tarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Tarjeta result = tarjetaRepository.save(tarjeta);
        return ResponseEntity.created(new URI("/api/tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/tarjeta/token")
    public ResponseEntity obtenerTarjeta(@RequestBody Tarjeta tarjeta) throws URISyntaxException {


        //token


            log.debug("REST request (por nro) to get Tarjeta : {}", tarjeta.getNumero());
            Optional<Long> idtarjeta = tarjetaRepository.findByNumero(tarjeta.getNumero());

            if (idtarjeta.isPresent()) {
                return ResponseUtil.wrapOrNotFound(idtarjeta);
            }else {
                return ResponseEntity.status(403).body("0");
            }
        }







    /**
     * {@code PUT  /tarjetas} : Updates an existing tarjeta.
     *
     * @param tarjeta the tarjeta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarjeta,
     * or with status {@code 400 (Bad Request)} if the tarjeta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tarjeta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tarjetas")
    public ResponseEntity<Tarjeta> updateTarjeta(@RequestBody Tarjeta tarjeta) throws URISyntaxException {
        log.debug("REST request to update Tarjeta : {}", tarjeta);
        if (tarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tarjeta result = tarjetaRepository.save(tarjeta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarjeta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tarjetas} : get all the tarjetas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tarjetas in body.
     */
    @GetMapping("/tarjetas")
    public List<Tarjeta> getAllTarjetas() {
        log.debug("REST request to get all Tarjetas");
        return tarjetaRepository.findAll();
    }

    /**
     * {@code GET  /tarjetas/:id} : get the "id" tarjeta.
     *
     * @param id the id of the tarjeta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tarjeta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tarjetas/{id}")
    public ResponseEntity<Tarjeta> getTarjeta(@PathVariable Long id) {
        log.debug("REST request to get Tarjeta : {}", id);
        Optional<Tarjeta> tarjeta = tarjetaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarjeta);
    }

    /**
     * {@code DELETE  /tarjetas/:id} : delete the "id" tarjeta.
     *
     * @param id the id of the tarjeta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tarjetas/{id}")
    public ResponseEntity<Void> deleteTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete Tarjeta : {}", id);
        tarjetaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

	public Tarjeta traer(Long idTarjeta) {
        Optional<Tarjeta> tarjeta = tarjetaRepository.findById(idTarjeta);
		return tarjeta.get();
	}
}
