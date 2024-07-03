package org.example.aims;

import org.example.aims.entities.Books;
import org.example.aims.entities.CDLPs;
import org.example.aims.entities.DVDs;
import org.example.aims.entities.Product;
import org.example.aims.repository.BookRepository;
import org.example.aims.repository.CdlpRepository;
import org.example.aims.repository.DvdRepository;
import org.example.aims.repository.ProductRepository;
import org.example.aims.service.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Mock
    private DvdRepository dvdrepository;

    @Mock
    private BookRepository bookrepository;

    @Mock
    private CdlpRepository cdlprepository;

    @Test
    public void testAddProduct() {
        Product product = new Product();
        product.setId(1);
        product.setTitle("Test Product");
        product.setPrice(100);
        product.setCategory("Test Category");
        product.setImageUrl("example.com/test.jpg");
        product.setQuantity(10);
        product.setEntryDate(LocalDate.now());
        product.setDimension(5.0);
        product.setWeight(0.5);
        product.setSellerId(1);

        productService.addProduct(product);

        verify(productRepository, times(1)).CustomInsert(
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

    @Test
    public void testGetAllProducts() {
        List<Product> productList = new ArrayList<>();
        productList.add(new Product(1, "Product 1", 100, "Category 1", "example.com/1.jpg", 10, LocalDate.now(), 5.0, 0.5, 1));
        productList.add(new DVDs(2, "DVD 1", 50, "Movie", "example.com/dvd.jpg", 5, LocalDate.now(), 6.0, 0.7, 1,"DVD", 120, "Studio", "English", "Subtitle", LocalDate.now()));
        productList.add(new Books(3, "Book 1", 80, "Literature", "example.com/book.jpg", 3, LocalDate.now(), 4.0, 0.4,1, "Author", "Hardcover", "Publisher", LocalDate.now(), 200, "English"));

        when(productRepository.findAll()).thenReturn(productList);

        List<Product> result = productService.getAllProducts();

        assertEquals(3, result.size());
        assertEquals("Product 1", result.get(0).getTitle());
        assertEquals("DVD 1", ((DVDs) result.get(1)).getTitle());
        assertEquals("Book 1", ((Books) result.get(2)).getTitle());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testGetProductById() {
        Product product = new Product(1, "Test Product", 100, "Test Category", "example.com/test.jpg", 10, LocalDate.now(), 5.0, 0.5, 1);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        Product result = productService.getProductById(1);

        assertEquals("Test Product", result.getTitle());
        assertEquals(100, result.getPrice());
        verify(productRepository, times(1)).findById(1);
    }

    @Test
    public void testUpdateProduct() {
        Product existingProduct = new Product(1, "Existing Product", 50, "Category", "example.com/product.jpg", 5, LocalDate.now(), 3.0, 0.3, 1);
        Product updatedProduct = new Product(1, "Updated Product", 60, "New Category", "example.com/updated.jpg", 10, LocalDate.now(), 4.0, 0.4, 1);

        when(productRepository.findById(1)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(updatedProduct)).thenReturn(updatedProduct);

        Product result = productService.updateProduct(1, updatedProduct);

        assertEquals("Updated Product", result.getTitle());
        assertEquals(60, result.getPrice());
        assertEquals("New Category", result.getCategory());
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(updatedProduct);
    }

    @Test
    public void testDeleteExistingCDLPProduct() {
        Product product = new Product(3, "CDLP 1", 60, "cdlps", "example.com/cdlp.jpg", 7, LocalDate.now(), 4.5, 0.6, 1);
        CDLPs cdlp = new CDLPs(3, "Artist", "Label", "Tracklist");

        when(productRepository.findById(3)).thenReturn(Optional.of(product));
        when(cdlprepository.findById(3)).thenReturn(Optional.of(cdlp));

        productService.deleteProduct(3);

        verify(cdlprepository, times(1)).deleteById(3);
        verify(productRepository, times(1)).deleteById(3);
    }
}
