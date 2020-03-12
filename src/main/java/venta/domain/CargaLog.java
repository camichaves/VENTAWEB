package venta.domain;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


 abstract public class CargaLog {

     static URL url;



     static {
         try {
             url = new URL("http://localhost:8120/api/registro");
         } catch (final MalformedURLException e) {
             e.printStackTrace();
         }
     }

     public CargaLog() throws IOException {
     }
     static HttpURLConnection conn;

     static String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4NDA1ODA5N30.KSR2S7b7BQd9gToN6Oe2fh1x8Bx9VKQ5TAp9y1lqE0oJ9NlLKPJGxELXGyKw6UHUnzvcCTgyaA7sr6HHk7sD1w";


     public static String enviar (final Long idVenta, final String paso, final String resultado, final String explicacion ) throws IOException {




            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            System.out.println(token);
            conn.setRequestProperty("Authorization","Bearer " + token);
            conn.setRequestProperty("Content-Type", "application/json");
            final OutputStream os = conn.getOutputStream();
            final OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
            osw.write("{\"idVenta\": "+idVenta+", \"paso\": \""+paso+"\",\"resultado\": \""+resultado+"\", \"explicacion\": \""+explicacion+"\"}");
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
            System.out.println(result);
            conn.disconnect();
            return result;

    }
 }
