package com.example.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
//@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EntityElementAlreadyExistsException extends RuntimeException {
    public EntityElementAlreadyExistsException(Class entityClass, Integer id) {
        super(entityClass.getName() + " with id=" + id + " Already Exists.");
    }
}
