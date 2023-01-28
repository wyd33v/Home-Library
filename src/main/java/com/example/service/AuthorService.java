package com.example.service;
import com.example.entity.Author;

import java.util.List;

public interface AuthorService {
    List<Author> findAll();
    Author create(String fullName);

    Author findById(int id);

    void delete(int id);
    Author update(int id, String fullName);
}



