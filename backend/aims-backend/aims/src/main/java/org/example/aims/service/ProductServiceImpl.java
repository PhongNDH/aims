package org.example.aims.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.example.aims.entities.CDLPs;
import org.example.aims.entities.DVDs;
import org.example.aims.entities.Books;
import org.example.aims.entities.Product;
import org.example.aims.exception.ResourceNotFoundException;
import org.example.aims.repository.BookRepository;
import org.example.aims.repository.CdlpRepository;
import org.example.aims.repository.DvdRepository;
import org.example.aims.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductServiceImpl {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DvdRepository dvdrepository;
    @Autowired
    private  BookRepository bookrepository;
    @Autowired
    private CdlpRepository cdlprepository;

    public void addProduct(Product product) {
        productRepository.CustomInsert(
                product.getTitle(),
                product.getPrice(),
                product.getCategory(),
                product.getImageUrl(),
                product.getQuantity(),
                product.getEntryDate(),
                product.getDimension(),
                product.getWeight(),
                product.getSellerId()
        );
    }

    public Product insertProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getProductByTitleContaining(String title) {
        return productRepository.findByTitleContaining(title);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product updateProduct(int id, Product product) {
        org.example.aims.entities.Product products = productRepository.findById(id).orElse(null);
        if (products != null) {
            products.setTitle(product.getTitle());
            products.setPrice(product.getPrice());
            products.setCategory(product.getCategory());
            products.setImageUrl(product.getImageUrl());
            products.setQuantity(product.getQuantity());
            products.setEntryDate(product.getEntryDate());
            products.setDimension(product.getDimension());
            products.setWeight(product.getWeight());
            products.setSellerId(product.getSellerId());
            return productRepository.save(products);
        }
        else {
            throw new ResourceNotFoundException("product not found" + id);
        }
    }

    public void deleteProduct(int id) {
        DVDs dvds = dvdrepository.findById(id).orElse(null);
        Books book = bookrepository.findById(id).orElse(null);
        CDLPs cdlps = cdlprepository.findById(id).orElse(null);
        String category = productRepository.findById(id).get().getCategory();
        System.out.println(category);
        if (category.equalsIgnoreCase("dvds")) {
            if (dvds == null) {
                productRepository.deleteById(id);
            } else {
                dvdrepository.deleteById(id);
                productRepository.deleteById(id);
            }
        }

        if (category.equalsIgnoreCase("books")) {
            if (book == null) {
                productRepository.deleteById(id);
            }
            else {
                bookrepository.deleteById(id);
                productRepository.deleteById(id);
            }
        }

        if (category.equalsIgnoreCase("cdlps")) {
            if (cdlps == null) {
                productRepository.deleteById(id);
            }
            else {
                cdlprepository.deleteById(id);
                productRepository.deleteById(id);
            }
        }

    }

    public List<Product> getProductsOfManager(int managerId){
        return productRepository.findAll().stream().filter(p -> p.getSellerId() == managerId).toList();
    }
}
