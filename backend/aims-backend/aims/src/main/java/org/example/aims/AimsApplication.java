package org.example.aims;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AimsApplication {

	public static void main(String[] args) {
		System.out.println("Hello World");
		String jdbcUrl = "jdbc:mysql://localhost:3306/aims";
		String username = "root";
		String password = "Phongsql123";

		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password)) {
			System.out.println("Connected to database successfully!");
		} catch (SQLException e) {
			System.out.println("Failed to connect to database!");
		}
		SpringApplication.run(AimsApplication.class, args);
	}

}
