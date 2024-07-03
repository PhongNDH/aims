package org.example.aims.controller;

import org.example.aims.entities.Product;

import org.example.aims.entities.CDLPs;
import org.example.aims.entities.DVDs;
import org.example.aims.entities.Books;
import org.example.aims.service.BookServiceImpl;
import org.example.aims.service.CdlpServiceImpl;
import org.example.aims.service.DvdServiceImpl;
import org.example.aims.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    // product
    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private DvdServiceImpl dvdService;
    @Autowired
    private BookServiceImpl bookService;
    @Autowired
    private CdlpServiceImpl cdlpService;


    @PostMapping("/add-product")
    public Product createproduct(@RequestBody Product product) {
//        productService.addProduct(product);
//        return product;
        return productService.insertProduct(product);
    }

    @GetMapping("/search/{title}")
    public List<Product> getProductByTitleContaining(@PathVariable String title) {
        return productService.getProductByTitleContaining(title);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable int id) {
        return productService.getProductById(id);
    }

    @PutMapping("/modify/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/user/{id}")
    public List<Product> getProductByManagerId(@PathVariable int id) {
        return productService.getProductsOfManager(id);
    }


    //----------------------------------------------------------------------------------------------
    // DVDs

    @PostMapping("/add-product/dvds")
    public void createProduct(@RequestBody DVDs dvds) {
        dvdService.addDVD(dvds);
    }

    @GetMapping("/dvds/search/{title}")
    public List<DVDs> getDVDsByTitleContaining(@PathVariable String title) {
        return dvdService.getDVDsByTitleContaining(title);
    }

    @GetMapping("/dvds")
    public List<DVDs> getAllDVDs() {
        return dvdService.getAllDVDs();
    }

    @GetMapping("/dvds/{id}")
    public DVDs getDVDs(@PathVariable int id) {
        return dvdService.getDVDById(id);
    }

    @PutMapping("/dvds/modify/{id}")
    public DVDs updateDVDs(@PathVariable int id, @RequestBody DVDs dvds) {
        return dvdService.updateDVD(id, dvds);
    }

    @DeleteMapping("/dvds/delete/{id}")
    public void deleteDVDs(@PathVariable int id) {
        dvdService.deleteDVD(id);
    }

    //-------------------------------------------------------------------------------------------------
    // books
    @PostMapping("/add-product/books")
    public void addBooks(@RequestBody Books book) {
        bookService.addBook(book);
    }

    @GetMapping("/books/search/{title}")
    public List<Books> getBooksByTitleContaining(@PathVariable String title) {
        return bookService.getBooksByTitleContaining(title);
    }

    @GetMapping("/books")
    public List<Books> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public Books getBooks(@PathVariable int id) {
        return bookService.getBookById(id);
    }

    @PutMapping("/books/modify/{id}")
    public Books updateBooks(@PathVariable int id, @RequestBody Books book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/books/delete/{id}")
    public void deleteBooks(@PathVariable int id) {
        bookService.deleteBook(id);
    }

    @DeleteMapping("/books/delete")
    public void deleteAllBooks() {
        bookService.deleteAllBooks();
    }

    //---------------------------------------------------------------------------------------
    // CDLPs

    @PostMapping("/add-product/cdlps")
    public void addCDLPs(@RequestBody CDLPs cdlps) {
        cdlpService.addCDLPs(cdlps);
    }

    @GetMapping("cdlps/search/{title}")
    public List<CDLPs> getCDLPSByTitleContaining(@PathVariable String title) {
        return cdlpService.getCDLPsByTitleContaining(title);
    }

    @GetMapping("/cdlps")
    public List<CDLPs> getAllCDLPs() {
        return cdlpService.getAllCDLPs();
    }

    @GetMapping("/cdlps/{id}")
    public CDLPs getCDLPs(@PathVariable int id) {
        return cdlpService.getCDLPs(id);
    }

    @PutMapping("/cdlps/modify/{id}")
    public CDLPs updateCDLPs(@PathVariable int id, @RequestBody CDLPs cdlps) {
        return cdlpService.updateCDLPs(id, cdlps);
    }

    @DeleteMapping("/cdlps/delete/{id}")
    public void deleteCDLP(@PathVariable int id) {
        cdlpService.deleteCDLP(id);
    }

    @DeleteMapping("/cdlps/delete")
    public void deleteAllCDLPs() {
        cdlpService.deleteAllCDLPs();
    }
}
