package net.javaguides.ems.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByName(String name);
}
