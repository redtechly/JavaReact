package net.javaguides.ems.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.ems.models.Chat;
import net.javaguides.ems.models.User;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    public Chat sendMessage() {
        // User from, User to, String message
        return null;
    }

    public Chat getMessages(User from) {
        return null;
    }
}
