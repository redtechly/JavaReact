package net.javaguides.ems.controller;

import net.javaguides.ems.repository.CategoryRepository;
import net.javaguides.ems.models.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/category")
    public List<HashMap<String, Object>> getCategories() {
        List<Category> categories = this.categoryRepository.findAll();
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        for (Category category : categories) {
            list.add(category.toHashMap());
        }
        return list;
    }

    @GetMapping("/category/{id}")
    public HashMap<String, Object> getCategoryById(@PathVariable int id) {
        Category category = this.categoryRepository.findById(id).orElse(null);
        if (category != null) {
            return category.toHashMap();
        }
        return null;
    }

    @PostMapping("/category")
    public HashMap<String, Object> addCategory(@RequestBody Map<String, String> payload) {
        Category category = new Category();
        category.setName(payload.get("name"));
        this.categoryRepository.save(category);
        return category.toHashMap();
    }

    @DeleteMapping("/category/{id}")
    public HashMap<String, Object> deleteFood(@PathVariable int id) {
        Category category = this.categoryRepository.findById(id).orElse(null);
        if (category != null) {
            this.categoryRepository.delete(category);
            return category.toHashMap();
        }
        return null;
    }

    @PutMapping("/category/{id}")
    public HashMap<String, Object> updateCategory(@PathVariable int id, @RequestBody Map<String, String> payload) {
        Category category = this.categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(payload.get("name"));
            this.categoryRepository.save(category);
            return category.toHashMap();
        }
        return null;
    }

}
