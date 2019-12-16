package venta.domain;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


 abstract public class CargaLog {

     static URL url;

     static {
         try {
             url = new URL("http://localhost:8120/api/registro");
         } catch (MalformedURLException e) {
             e.printStackTrace();
         }
     }

     public CargaLog() throws IOException {
     }
     static HttpURLConnection conn;

     static {
         try {
             conn = (HttpURLConnection) url.openConnection();
         } catch (IOException e) {
             e.printStackTrace();
         }
     }

     static String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3OTAyNTgwOX0.vp0y7QAk-LHrcHJN5Eb1ic-ly2BAbYTtNxj-oeJCywA01J5CWCh8L3qjuZ8LCU_0wq9TCT5xYAARf0Ynsz6LWw";



     public static String enviar (Long idVenta, String paso, String resultado, String explicacion ) throws IOException {


        conn.setRequestProperty("Authorization","Bearer "+token);
        //e.g. bearer token= eyJhbGciOiXXXzUxMiJ9.eyJzdWIiOiPyc2hhcm1hQHBsdW1zbGljZS5jb206OjE6OjkwIiwiZXhwIjoxNTM3MzQyNTIxLCJpYXQiOjE1MzY3Mzc3MjF9.O33zP2l_0eDNfcqSQz29jUGJC-_THYsXllrmkFnk85dNRbAw66dyEKBP5dVcFUuNTA8zhA83kk3Y41_qZYx43T

        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        String jsonInputString = "{\"idVenta\": "+idVenta+", \"paso\": \""+paso+"\",\"resultado\": \""+resultado+"\", \"explicacion\": \""+explicacion+"\"}";

        try(OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        try(BufferedReader br = new BufferedReader(
            new InputStreamReader(conn.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            System.out.println(response.toString());
            return response.toString();
        }


      }

}
