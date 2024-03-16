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

    public Product() {
    }


    public Product(String name, String description, int price, String imagepathe, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imagepathe = imagepathe;
        this.category = category;
    }

    public int getId() {
        return this.id;
    }


    public String getName() {
        return this.name;
    }


    public String getDescription() {
        return this.description;
    }


    public int getPrice() {
        return this.price;
    }


    public String getImagepathe() {
        return this.imagepathe;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }
    

    public void setId(int id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price='" + getPrice() + "'" +
            ", imagepathe='" + getImagepathe() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
    

}
