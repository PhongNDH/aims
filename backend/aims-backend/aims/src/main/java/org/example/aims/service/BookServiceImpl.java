package org.example.aims.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.example.aims.entities.Books;
import org.example.aims.exception.ResourceNotFoundException;
import org.example.aims.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class BookServiceImpl {
    @Autowired
    private final BookRepository bookRepository;

    public void addBook(Books book) {
        bookRepository.customInsert(
                book.getId(),
                book.getAuthor(),
                book.getPublisher(),
                book.getCoverType(),
                book.getPublicationDate(),
                book.getPages(),
                book.getLanguage()
        );
    }

    public List<Books> getBooksByTitleContaining(String title) {
        return bookRepository.findByTitleContaining(title);
    }

    public Books getBookById(int id) {
        return bookRepository.findById(id).orElse(null);
    }

    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    public Books updateBook(int id, Books book) {
        Books book1 = bookRepository.findById(id).orElse(null);
        if (book1 != null) {
            book1.setAuthor(book.getAuthor());
            book1.setCoverType(book.getCoverType());
            book1.setPublisher(book.getPublisher());
            book1.setPublicationDate(book.getPublicationDate());
            book1.setPages(book.getPages());
            book1.setLanguage(book.getLanguage());
            return bookRepository.save(book1);
        }
        else {
            throw new ResourceNotFoundException("Book not found with id " + id);
        }
    }

    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }

    public void deleteAllBooks() {
        bookRepository.deleteAll();
    }

}
