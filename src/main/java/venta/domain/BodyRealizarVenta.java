package venta.domain;

public class BodyRealizarVenta {

    private Long idCliente;
    private Long idTarjeta;
    private Double montoVenta;

    public BodyRealizarVenta(Long idCliente, Long idTarjeta, Double montoVenta) {
        this.idCliente = idCliente;
        this.idTarjeta = idTarjeta;
        this.montoVenta = montoVenta;
    }

public BodyRealizarVenta() {

    }


    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Long getIdTarjeta() {
        return idTarjeta;
    }

    public void setIdTarjeta(Long idTarjeta) {
        this.idTarjeta = idTarjeta;
    }

    public Double getMontoVenta() {
        return montoVenta;
    }

    public void setMontoVenta(Double montoVenta) {
        this.montoVenta = montoVenta;
    }
}
