package com.example.controller;


import com.example.entity.Author;
import com.example.entity.Book;
import com.example.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthorController {
    private AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }


    @GetMapping("api/author")
    public List<Author> findAll() {
        return authorService.findAll();
    }


    @GetMapping("api/author/{id}")
    public ResponseEntity<Author> findAuthorById(@PathVariable(value = "id") int id) {
        Author author = authorService.findById(id);
        return ResponseEntity.ok().body(author);
    }


    @PostMapping("api/author")
    public Author create(@RequestParam(value = "fullName") String fullName) {
        return authorService.create(fullName);
    }


    @DeleteMapping ("api/author")
    public void delete(@RequestParam(value = "id") int id){
        authorService.delete(id);
    }


    @PutMapping ("api/author")
    public Author update(@RequestParam(value = "id") int id,
                       @RequestParam(value = "fullName") String fullName) {
        return authorService.update(id, fullName);
    }
}
