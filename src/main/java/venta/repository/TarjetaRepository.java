package venta.repository;
import venta.domain.Tarjeta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Tarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    @Query("SELECT id FROM Tarjeta WHERE numero = ?1")
    Optional<Long> findByNumero(String numero);
}
