package net.javaguides.ems.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import net.javaguides.ems.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
}
