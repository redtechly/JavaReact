package net.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.ems.models.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // List<OrderItem> findByOrderIdWithProduct(@Param("orderId") Long orderId);
}
