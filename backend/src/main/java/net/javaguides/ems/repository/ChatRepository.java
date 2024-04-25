package net.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.models.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
}
