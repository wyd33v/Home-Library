package com.example.service;
import com.example.entity.Book;

import java.util.List;

public interface BookService {
    Book findBookById(Integer id);
    List<Book> findAll();

    Book create(String bookName, int authorId);

    void delete(int id);

    Book update(int id, String name,  int authorId);
}



