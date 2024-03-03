package net.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.models.Food;

public interface FoodRepository extends JpaRepository<Food, Integer> {
}
