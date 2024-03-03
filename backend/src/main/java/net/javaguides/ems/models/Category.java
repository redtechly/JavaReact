package net.javaguides.ems.models;

import java.util.HashMap;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    public void setName(String name){
        this.name= name;
    }
        public HashMap<String, Object> toHashMap(){
            HashMap<String, Object> map = new HashMap<>();
            map.put("id", this.id);
            map.put("name", this.name);
            return map;
        }
}
