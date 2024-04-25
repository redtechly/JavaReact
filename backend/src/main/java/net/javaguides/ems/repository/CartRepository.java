package net.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.models.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
