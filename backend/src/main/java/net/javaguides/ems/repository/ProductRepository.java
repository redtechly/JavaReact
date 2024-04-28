package net.javaguides.ems.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.models.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    public List<Product> findByCategoryId(int id);

    Optional<Product> findById(Long id);
}
