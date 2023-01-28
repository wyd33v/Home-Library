package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Author {
    private int id;
    private String fullName;
    private Collection<Book> books;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public int getId() {return id;}

    public void setId(int id) {
        this.id = id;
    }


    @Column(unique = true)
    public String getFullName(){return fullName;}

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    @JsonIgnore
    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    public Collection<Book> getBooks() {
        return books;
    }

    public void setBooks(Collection<Book> books) {
        this.books = books;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Author author = (Author) o;
        return id == author.id && Objects.equals(fullName, author.fullName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fullName);
    }

    @Override
    public String toString() {
        return "Author{" + "id=" + id + ", fullName=" + fullName + '}';
    }
}
