package venta.domain;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

abstract public class VerificarTarjeta {
    static long idtarjeta;
    static HttpURLConnection conn;

    static String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4MjkzOTM0NH0.PZYEKLhyxr1hnT_bg23YTssWXBAf4Wuw63QORteTwe07aTMRFuUjMY6iWN-vrtyoYaKr8cobEZhWsrkscUMGTA";

    static public String verificar(long id) throws IOException {
        idtarjeta = id;

        URL url = null;
        try {
            url = new URL("http://localhost:8100/api/tarjeta");
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            conn = (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            System.out.println(token);
            conn.setRequestProperty("Authorization","Bearer " + token);
            conn.setRequestProperty("Content-Type", "application/json");
            final OutputStream os = conn.getOutputStream();
            final OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
            osw.write("{\"id\": "+idtarjeta+"}");
            osw.flush();
            osw.close();
            os.close();  //don't forget to close the OutputStream
            conn.connect();

            //read the inputstream and print it
            String result;
            final BufferedInputStream bis = new BufferedInputStream(conn.getInputStream());
            final ByteArrayOutputStream buf = new ByteArrayOutputStream();
            int result2 = bis.read();
            while(result2 != -1) {
                buf.write((byte) result2);
                result2 = bis.read();
            }
            result = buf.toString();
            System.out.println("---------------------------------------------");
            System.out.println(result);
            System.out.println("---------------------------------------------");
            conn.disconnect();
            return result;

    }

	public static String verificarMonto(Venta vta) throws IOException {

        URL url = null;
        try {
            url = new URL("http://localhost:8100/api/monto");
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            conn = (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            System.out.println(token);
            conn.setRequestProperty("Authorization","Bearer " + token);
            conn.setRequestProperty("Content-Type", "application/json");
            final OutputStream os = conn.getOutputStream();
            final OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
            osw.write("{\"id\": "+vta.getTarjeta().getId()+", \"monto\": "+vta.getMonto()+"}");
            osw.flush();
            osw.close();
            os.close();  //don't forget to close the OutputStream
            conn.connect();

            //read the inputstream and print it
            String result;
            final BufferedInputStream bis = new BufferedInputStream(conn.getInputStream());
            final ByteArrayOutputStream buf = new ByteArrayOutputStream();
            int result2 = bis.read();
            while(result2 != -1) {
                buf.write((byte) result2);
                result2 = bis.read();
            }
            result = buf.toString();
            System.out.println("---------------------------------------------");
            System.out.println(result);
            System.out.println("---------------------------------------------");
            conn.disconnect();
            return result;

	}


}
