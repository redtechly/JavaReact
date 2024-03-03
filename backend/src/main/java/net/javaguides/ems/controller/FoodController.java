package net.javaguides.ems.controller;

import net.javaguides.ems.repository.CategoryRepository;
import net.javaguides.ems.repository.FoodRepository;
import net.javaguides.ems.models.Food;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/food")
    public List<HashMap<String, Object>> getFood() {
        List<Food> foods = this.foodRepository.findAll();
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        for (Food food : foods) {
            list.add(food.toHashMap());
        }
        return list;
    }

    @GetMapping("/food/{id}")
    public HashMap<String, Object> getFoodById(@PathVariable int id) {
        Food food = this.foodRepository.findById(id).orElse(null);
        if (food != null) {
            return food.toHashMap();
        }
        return null;
    }

    @PostMapping("/food")
    public HashMap<String, Object> addFood(@RequestBody Map<String, Object> payload) {
        Food food = new Food();
        food.setName((String) payload.get("name"));
        food.setPrice((int) payload.get("price"));
        int category = (int) payload.get("category");
        food.setCategory(this.categoryRepository.getReferenceById(category));
        this.foodRepository.save(food);
        return food.toHashMap();
    }

    @DeleteMapping("/food/{id}")
    public HashMap<String, Object> deleteFood(@PathVariable int id) {
        Food food = this.foodRepository.findById(id).orElse(null);
        if (food != null) {
            this.foodRepository.delete(food);
            return food.toHashMap();
        }
        return null;
    }

    @PutMapping("/food/{id}")
    public HashMap<String, Object> updateFood(@PathVariable int id, @RequestBody Map<String, Object> payload) {
        Food food = this.foodRepository.findById(id).orElse(null);
        if (food != null) {
            food.setName((String) payload.get("name"));
            food.setPrice((int) payload.get("price"));
            int category = (int) payload.get("category");
            food.setCategory(this.categoryRepository.getReferenceById(category));
            this.foodRepository.save(food);
            return food.toHashMap();
        }
        return null;
    }
}
