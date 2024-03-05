package net.javaguides.ems.models;

import java.util.HashMap;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private int price;
    private String imagepathe;

    @ManyToOne
    private Category category;

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    

    public void setDescription(String description) {
        this.description = description;
    }
    

    public void setImagepathe(String imagepathe) {
        this.imagepathe = imagepathe;
    }

    public HashMap<String, Object> toHashMap() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("id", this.id);
        map.put("name", this.name);
        map.put("description", this.description);
        map.put("price", this.price);
        map.put("imagepathe", this.imagepathe);
        map.put("category", this.category.toHashMap());
        return map;
    }
}
