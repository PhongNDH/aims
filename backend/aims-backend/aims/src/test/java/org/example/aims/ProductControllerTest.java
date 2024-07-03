package org.example.aims;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.aims.entities.Product;
import org.example.aims.service.BookServiceImpl;
import org.example.aims.service.CdlpServiceImpl;
import org.example.aims.service.DvdServiceImpl;
import org.example.aims.service.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.example.aims.controller.ProductController;
public class ProductControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProductServiceImpl productService;

    @Mock
    private DvdServiceImpl dvdService;

    @Mock
    private BookServiceImpl bookService;

    @Mock
    private CdlpServiceImpl cdlpService;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build();
    }

    @Test
    public void testAddProduct() throws Exception {
        Product product = new Product("Test Product", 100, "Books", "test.jpg", 10,
                null, 2.0, 1.5, 1);

        // Mocking the service method to perform any necessary operations without returning a value
        doNothing().when(productService).addProduct(any(Product.class));

        mockMvc.perform(post("/api/product/addProduct")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(product)))
                .andExpect(status().isOk());

        verify(productService, times(1)).addProduct(any(Product.class));
    }

    @Test
    public void testGetProductByTitleContaining() throws Exception {
        List<Product> products = Collections.singletonList(new Product(4, "Test Product", 100, "Books", "test.jpg", 10,
                null, 2.0, 1.5, 1));

        when(productService.getProductByTitleContaining("Test")).thenReturn(products);

        mockMvc.perform(get("/api/product/search/{title}", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Product"))
                .andExpect(jsonPath("$[0].price").value(100));

        verify(productService, times(1)).getProductByTitleContaining("Test");
    }

    @Test
    public void testGetAllProducts() throws Exception {
        List<Product> products = Collections.singletonList(new Product(1, "Test Product", 100, "Books", "test.jpg", 10,
                null, 2.0, 1.5, 1));

        when(productService.getAllProducts()).thenReturn(products);

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Product"))
                .andExpect(jsonPath("$[0].price").value(100));

        verify(productService, times(1)).getAllProducts();
    }

    @Test
    public void testGetProductById() throws Exception {
        Product product = new Product(1, "Test Product", 100, "Test Category", "test.jpg", 10,
                null, 2.0, 1.5, 1);

        when(productService.getProductById(1)).thenReturn(product);

        mockMvc.perform(get("/api/product/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Product"))
                .andExpect(jsonPath("$.price").value(100));

        verify(productService, times(1)).getProductById(1);
    }

    @Test
    public void testUpdateProduct() throws Exception {
        Product product = new Product(4, "Updated Product", 200, "Updated Category", "updated.jpg", 5,
                null, 3.0, 2.5, 1);

        when(productService.updateProduct(eq(1), any(Product.class))).thenReturn(product);

        mockMvc.perform(put("/api/product/modify/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Product"))
                .andExpect(jsonPath("$.price").value(200));

        verify(productService, times(1)).updateProduct(eq(1), any(Product.class));
    }

    @Test
    public void testDeleteProduct() throws Exception {
        mockMvc.perform(delete("/api/product/delete/{id}", 4))
                .andExpect(status().isOk());

        verify(productService, times(1)).deleteProduct(4);
    }
}