package net.javaguides.ems.controller;

import net.javaguides.ems.repository.CategoryRepository;
import net.javaguides.ems.repository.ProductRepository;
import net.javaguides.ems.models.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/product")
    public List<HashMap<String, Object>> getProduct() {
        List<Product> products = this.productRepository.findAll();
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        for (Product product : products) {
            list.add(product.toHashMap());
        }
        return list;
    }

    @GetMapping("/product/{id}")
    public HashMap<String, Object> getProductById(@PathVariable int id) {
        Product product = this.productRepository.findById(id).orElse(null);
        if (product != null) {
            return product.toHashMap();
        }
        return null;
    }

    @PostMapping("/product")
    public HashMap<String, Object> addProduct(@RequestBody Map<String, Object> payload) {
        Product product = new Product();
        product.setName((String) payload.get("name"));
        product.setPrice((int) payload.get("price"));
        int category = (int) payload.get("category");
        product.setCategory(this.categoryRepository.getReferenceById(category));
        this.productRepository.save(product);
        return product.toHashMap();
    }

    @DeleteMapping("/product/{id}")
    public HashMap<String, Object> deleteProduct(@PathVariable int id) {
        Product product = this.productRepository.findById(id).orElse(null);
        if (product != null) {
            this.productRepository.delete(product);
            return product.toHashMap();
        }
        return null;
    }

    @PutMapping("/product/{id}")
    public HashMap<String, Object> updateProduct(@PathVariable int id, @RequestBody Map<String, Object> payload) {
        Product product = this.productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setName((String) payload.get("name"));
            product.setPrice((int) payload.get("price"));
            int category = (int) payload.get("category");
            product.setCategory(this.categoryRepository.getReferenceById(category));
            this.productRepository.save(product);
            return product.toHashMap();
        }
        return null;
    }
}
