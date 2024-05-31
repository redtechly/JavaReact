package net.javaguides.ems.controller;

import net.javaguides.ems.repository.CategoryRepository;
import net.javaguides.ems.repository.ProductRepository;
import net.javaguides.ems.models.Category;
import net.javaguides.ems.models.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.nio.file.Path;

@CrossOrigin(origins = "http://localhost:3030")

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

    @GetMapping("/product/category/{id}")
    public List<HashMap<String, Object>> getProductByCategory(@PathVariable int id) {
        List<Product> products = this.productRepository.findByCategoryId(id);
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        for (Product product : products) {
            list.add(product.toHashMap());
        }
        return list;
    }

    @PostMapping("/addproduct")
    public ResponseEntity<HashMap<String, Object>> addProduct(@RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestParam("categoryName") String categoryName,
            @RequestParam("image") MultipartFile imageFile) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        if (!imageFile.isEmpty()) {
            String imagePath = saveImage(imageFile);
            product.setImagepathe(imagePath);
        }
        List<Category> categories = categoryRepository.findAll();
        Category existingCategory = categories.stream()
                .filter(c -> c.getName().equalsIgnoreCase(categoryName))
                .findFirst()
                .orElse(null);
        if (existingCategory == null) {
            existingCategory = new Category();
            existingCategory.setName(categoryName);
            categoryRepository.save(existingCategory);
        }
        product.setCategory(existingCategory);
        productRepository.save(product);
        HashMap<String, Object> response = product.toHashMap();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<HashMap<String, Object>> deleteProduct(@PathVariable int id) {
        Product product = this.productRepository.findById(id).orElse(null);
        if (product != null) {
            this.productRepository.delete(product);
            HashMap<String, Object> response = product.toHashMap();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return null;
    }

    @PutMapping("/product/{id}")
    public HashMap<String, Object> updateProduct(@PathVariable int id, @RequestBody Map<String, Object> payload) {
        Product product = this.productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setName((String) payload.get("name"));
            product.setDescription((String) payload.get("description"));
            product.setPrice((int) payload.get("price"));
            product.setImagepathe((String) payload.get("imagepathe"));
            int category = (int) payload.get("category");
            product.setCategory(this.categoryRepository.getReferenceById(category));
            this.productRepository.save(product);
            return product.toHashMap();
        }
        return null;
    }
    @GetMapping("/search")
    public List<HashMap<String, Object>> searchProducts(@RequestParam("keyword") String keyword) {
        List<Product> products = this.productRepository.searchProductsByKeyword(keyword);
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        for (Product product : products) {
            list.add(product.toHashMap());
        }
        return list;
    }

    private String saveImage(MultipartFile imageFile) {
        if (imageFile.isEmpty()) {
            throw new RuntimeException("Failed to store empty file.");
        }
        try {
            // Convert the file's content into a byte array
            byte[] bytes = imageFile.getBytes();

            // First target directory
            String directoryPath1 = "./frontend/images";
            Path uploadPath1 = Paths.get(directoryPath1);
            if (!Files.exists(uploadPath1)) {
                Files.createDirectories(uploadPath1);
            }

            // Second target directory
            String directoryPath2 = "/app/static/images";
            Path uploadPath2 = Paths.get(directoryPath2);
            if (!Files.exists(uploadPath2)) {
                Files.createDirectories(uploadPath2);
            }

            // Generate a unique file name
            String fileExtension = getFileExtension(imageFile.getOriginalFilename());
            String filename = UUID.randomUUID().toString() + "." + fileExtension;

            // Resolve paths for the new file in both directories
            Path filePath1 = uploadPath1.resolve(filename);
            Path filePath2 = uploadPath2.resolve(filename);

            // Create InputStream from byte array to use in Files.copy
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

            // Copy the file to the first directory
            Files.copy(byteArrayInputStream, filePath1, StandardCopyOption.REPLACE_EXISTING);

            // Must reset the stream before reusing it
            byteArrayInputStream.reset();

            // Copy the file to the second directory
            Files.copy(byteArrayInputStream, filePath2, StandardCopyOption.REPLACE_EXISTING);

            return filename;

        } catch (Exception e) {
            throw new RuntimeException("Failed to store file.", e);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            return null;
        }
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0) {
            return null;
        }
        return filename.substring(dotIndex + 1);
    }
}
