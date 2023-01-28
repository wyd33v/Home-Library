package com.example.controller;


import com.example.entity.Book;
import com.example.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {
    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    @GetMapping("api/book")
    public List<Book> findAll() {
        return bookService.findAll();
    }

//http://localhost:8080/api/book/2
    @GetMapping("api/book/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable(value = "id") int id) {
        Book book = bookService.findBookById(id);
        return ResponseEntity.ok().body(book);
    }


    @PostMapping("api/book")
    public Book create(@RequestParam(value = "name") String name,
                       @RequestParam(value = "authorId") int authorId) {
        return bookService.create(name, authorId);
    }


    @DeleteMapping("api/book")
    public void delete(@RequestParam(value = "id") int id) {
        bookService.delete(id);
    }


    @PutMapping("api/book")
    public Book update(@RequestParam(value = "id") int id,
                       @RequestParam(value = "name") String name,
                       @RequestParam(value = "authorId") int authorId) {
        return bookService.update(id, name, authorId);
    }


}
