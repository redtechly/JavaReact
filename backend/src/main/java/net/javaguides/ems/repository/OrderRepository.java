package net.javaguides.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.ems.models.Order;
import net.javaguides.ems.models.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    List<Order> findByUser(User user);
    
}
