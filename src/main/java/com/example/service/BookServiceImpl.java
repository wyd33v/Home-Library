package com.example.service;

import com.example.entity.Author;
import com.example.entity.Book;
import com.example.exceptions.NoSuchEntityElementException;
import com.example.repository.AuthorRepository;
import com.example.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    private AuthorRepository authorRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public Book findBookById(Integer id) {
        // bookRepository.findById(id).get().getAuthor().getBooks().stream().findFirst().get().getAuthor().getBooks()
        return bookRepository.findById(id).
                orElseThrow(()->new NoSuchEntityElementException(Book.class, id));
    }


    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }


    @Override
    public Book create(String Name, int authorId) {
        Author author = authorRepository.findById(authorId).
                orElseThrow(()->new NoSuchEntityElementException(Author.class, authorId));
        Book book = new Book();
        book.setName(Name);
        book.setAuthor(author);
        return bookRepository.save(book);
    }


    @Override
    public void delete(int id) {
        if(!bookRepository.existsById(id)) {
            throw new NoSuchEntityElementException(Book.class, id);
        }
        bookRepository.deleteById(id);
    }

    @Override
    public Book update(int id, String name,  int authorId) {
        Author author = authorRepository.findById(authorId).
                orElseThrow(()->new NoSuchEntityElementException(Author.class, authorId));
        Book book = bookRepository.findById(id).
                orElseThrow(()->new NoSuchEntityElementException(Book.class, id));
        book.setName(name);
        book.setAuthor(author);
        return bookRepository.save(book);
    }



}




