package net.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
