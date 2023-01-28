package com.example.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.NoSuchElementException;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoSuchEntityElementException extends NoSuchElementException {
    public NoSuchEntityElementException(Class entityClass, Integer id) {
        super(entityClass.getName() + " with id=" + id + " was not found.");
    }
}
