package venta.repository;
import venta.domain.Cliente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("select cliente from Cliente cliente where cliente.user.login = ?#{principal.username}")
    List<Cliente> findByUserIsCurrentUser();

    @Query("SELECT id FROM Cliente WHERE nombre = ?1 AND apellido = ?2 ")
    Optional<Long> findByNombreAndApellido(String nombre, String apellido);

}
