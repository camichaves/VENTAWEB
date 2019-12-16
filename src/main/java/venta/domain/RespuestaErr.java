package venta.domain;

public class RespuestaErr {

    private Integer error_codigo;
    private String  error_texto;

    public RespuestaErr(Integer error_codigo, String error_texto) {
        this.error_codigo = error_codigo;
        this.error_texto = error_texto;
    }

    public Integer getError_codigo() {
        return error_codigo;
    }

    public void setError_codigo(Integer error_codigo) {
        this.error_codigo = error_codigo;
    }

    public String getError_texto() {
        return error_texto;
    }

    public void setError_texto(String error_texto) {
        this.error_texto = error_texto;
    }
}
