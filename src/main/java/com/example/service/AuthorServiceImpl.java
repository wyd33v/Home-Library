package com.example.service;

import com.example.entity.Author;
import com.example.exceptions.EntityElementAlreadyExistsException;
import com.example.exceptions.NoSuchEntityElementException;
import com.example.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {


    private AuthorRepository authorRepository;

    @Autowired
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    public Author findById(int id){
        return authorRepository.findById(id).
                orElseThrow(()->new NoSuchEntityElementException(Author.class, id));
    }


    @Override
    public Author create(String fullName) {

        Author foundAuthor = authorRepository.findOneByFullName(fullName);
        if(foundAuthor!=null){
            throw new EntityElementAlreadyExistsException(Author.class, foundAuthor.getId());
        }
        Author author = new Author();
        author.setFullName(fullName);
        return authorRepository.save(author);
    }

    @Override
    public void delete(int id) {
        if(!authorRepository.existsById(id)) {
            throw new NoSuchEntityElementException(Author.class, id);
        }
        authorRepository.deleteById(id);
    }

    @Override
    public Author update(int id, String fullName) {
        Author author = authorRepository.findById(id).
                orElseThrow(()->new NoSuchEntityElementException(Author.class, id));

        author.setFullName(fullName);
        return authorRepository.save(author);
    }



}




