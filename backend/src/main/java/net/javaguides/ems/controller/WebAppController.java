package net.javaguides.ems.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebAppController {

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }

    @GetMapping("/edit-product/:id")
    public String redirect2(@RequestParam String param) {
        return "forward:/";
    }

    @GetMapping("/edit-category/:id")
    public String redirect3(@RequestParam String param) {
        return "forward:/";
    }

    @GetMapping("/edit-user/:id")
    public String redirect4(@RequestParam String param) {
        return "forward:/";
    }

}
