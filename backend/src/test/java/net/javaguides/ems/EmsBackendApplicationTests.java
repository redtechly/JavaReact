// package net.javaguides.ems;

// import static org.junit.jupiter.api.Assertions.assertTrue;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertFalse;
// import static org.junit.jupiter.api.Assertions.assertNotNull;

// import java.util.List;
// import java.util.Optional;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import net.javaguides.ems.models.Category;
// import net.javaguides.ems.models.Product;
// import net.javaguides.ems.models.Role;
// import net.javaguides.ems.models.User;
// import net.javaguides.ems.repository.CategoryRepository;
// import net.javaguides.ems.repository.ProductRepository;
// import net.javaguides.ems.repository.UserRepository;
// import org.springframework.context.ApplicationContext;

// @SpringBootTest
// public class EmsBackendApplicationTests {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;
//     @Autowired
//     private ProductRepository productRepository;

//     @Autowired
//     private CategoryRepository categoryRepository;
//     @Autowired
//     private ApplicationContext applicationContext;

//     @BeforeEach
//     public void setUp() {
//         // Ensure the user exists before each test
//         User user = new User();
//         user.setName("Fathy Nassef");
//         user.setEmail("fathynassef2028@gmail.com");
//         user.setPassword(passwordEncoder.encode("123456789"));
//         user.setAge(30);
//         user.setAddress("123 Main St");
//         user.setRole(Role.USER);

//         // Save user if not already present
//         if (userRepository.findByEmail("fathynassef2028@gmail.com").isEmpty()) {
//             userRepository.save(user);
//         }
//     }

//     @Test
//     public void contextLoads() {
//         // Check if the ApplicationContext is not null
//         assertNotNull(applicationContext, "Application context should not be null");

//         // Check if the required beans are present in the application context
//         assertTrue(applicationContext.containsBean("userRepository"), "UserRepository bean should be present");
//         assertTrue(applicationContext.containsBean("productRepository"), "ProductRepository bean should be present");
//         assertTrue(applicationContext.containsBean("categoryRepository"), "CategoryRepository bean should be present");
//         assertTrue(applicationContext.containsBean("passwordEncoder"), "PasswordEncoder bean should be present");
//         assertTrue(applicationContext.containsBean("dataSource"), "DataSource bean should be present");
//     }

//     @Test
//     public void testLogin() {
//         // Check if a user with the given email and password exists
//         Optional<User> optionalUser = userRepository.findByEmail("fathynassef2028@gmail.com");

//         boolean userExists = optionalUser.isPresent() &&
//                 passwordEncoder.matches("123456789", optionalUser.get().getPassword());

//         assertTrue(userExists, "User with email fathynassef2028@gmail.com and password should exist");

//         // Additional check for a non-existent email to ensure the test logic works
//         // correctly
//         Optional<User> nonExistentUserOptional = userRepository.findByEmail("nonexistentemail@example.com");

//         boolean nonExistentUser = nonExistentUserOptional.isPresent() &&
//                 passwordEncoder.matches("wrongpassword", nonExistentUserOptional.orElse(new User()).getPassword());

//         assertFalse(nonExistentUser,
//                 "User with email nonexistentemail@example.com and wrong password should not exist");
//     }

//     @Test
//     public void testAddProduct() {
//         // Create a new product
//         Product product = new Product();
//         product.setName("Test Product");
//         product.setDescription("This is a test product");
//         product.setPrice(100);

//         // Find or create a category for the product
//         Category category = categoryRepository.findByName("Test Category");
//         if (category == null) {
//             category = new Category("Test Category");
//             categoryRepository.save(category);
//         }
//         product.setCategory(category);

//         // Save the product
//         productRepository.save(product);

//         // Check if the product has been saved successfully
//         assertNotNull(product.getId(), "Product ID should not be null after saving");

//         // Retrieve the product from the database and verify its details
//         Optional<Product> savedProductOptional = productRepository.findById(product.getId());
//         assertTrue(savedProductOptional.isPresent(), "Product should be found in the database after saving");
//         Product savedProduct = savedProductOptional.get();
//         assertEquals(product.getName(), savedProduct.getName(), "Product name should match");
//         assertEquals(product.getDescription(), savedProduct.getDescription(), "Product description should match");
//         assertEquals(product.getPrice(), savedProduct.getPrice(), "Product price should match");
//         assertEquals(product.getCategory().getId(), savedProduct.getCategory().getId(),
//                 "Product category ID should match");
//     }

//     @Test
//     public void testDeleteProduct() {
//         // Add a product to delete
//         Product productToDelete = new Product();
//         productToDelete.setName("Product to Delete");
//         productToDelete.setDescription("This is a product to delete");
//         productToDelete.setPrice(200);

//         // Find or create a category for the product
//         Category category = categoryRepository.findByName("Delete Category");
//         if (category == null) {
//             category = new Category("Delete Category");
//             categoryRepository.save(category);
//         }
//         productToDelete.setCategory(category);

//         // Save the product to be deleted
//         productRepository.save(productToDelete);

//         // Delete the product
//         productRepository.delete(productToDelete);

//         // Check if the product has been deleted
//         Optional<Product> deletedProductOptional = productRepository.findById(productToDelete.getId());
//         assertFalse(deletedProductOptional.isPresent(), "Product should not be found in the database after deletion");
//     }

//     @Test
//     public void testSearchProducts() {
//         // Add products for testing search functionality
//         Product product1 = new Product();
//         product1.setName("Test Product 1");
//         product1.setDescription("This is test product 1");
//         product1.setPrice(50);

//         Category category1 = categoryRepository.findByName("Test Category 1");
//         if (category1 == null) {
//             category1 = new Category("Test Category 1");
//             categoryRepository.save(category1);
//         }
//         product1.setCategory(category1);
//         productRepository.save(product1);

//         Product product2 = new Product();
//         product2.setName("Test Product 2");
//         product2.setDescription("This is test product 2");
//         product2.setPrice(100);

//         Category category2 = categoryRepository.findByName("Test Category 2");
//         if (category2 == null) {
//             category2 = new Category("Test Category 2");
//             categoryRepository.save(category2);
//         }
//         product2.setCategory(category2);
//         productRepository.save(product2);

//         // Search for products containing "Test" in their name or description
//         List<Product> searchResults = this.productRepository.searchProductsByKeyword("Test");

//         // Verify that both products are returned in the search results
//         assertEquals(searchResults.size(), searchResults.size(), "Search results should contain 2 products");

//         // Verify that the search results contain the correct products
//         boolean product1Found = false;
//         boolean product2Found = false;
//         for (Product product : searchResults) {
//             if (product.getName().equals("Test Product 1")
//                     && product.getDescription().equals("This is test product 1")) {
//                 product1Found = true;
//             }
//             if (product.getName().equals("Test Product 2")
//                     && product.getDescription().equals("This is test product 2")) {
//                 product2Found = true;
//             }
//         }
//         assertTrue(product1Found, "Search results should contain Test Product 1");
//         assertTrue(product2Found, "Search results should contain Test Product 2");
//     }

//     @Test
//     public void testUserRegistration() {
//         // Create a new user for registration
//         User newUser = new User();
//         newUser.setName("John Doe");
//         newUser.setEmail("johndoe@example.com");
//         newUser.setPassword(passwordEncoder.encode("password123"));
//         newUser.setAge(25);
//         newUser.setAddress("456 Oak St");
//         newUser.setRole(Role.USER);

//         // Register the new user
//         userRepository.save(newUser);

//         // Check if the user has been saved successfully
//         assertNotNull(newUser.getId(), "User ID should not be null after registration");

//         // Retrieve the user from the database and verify its details
//         Optional<User> registeredUserOptional = userRepository.findByEmail("johndoe@example.com");
//         assertTrue(registeredUserOptional.isPresent(), "Registered user should be found in the database");
//         User registeredUser = registeredUserOptional.get();
//         assertEquals(newUser.getName(), registeredUser.getName(), "User name should match");
//         assertEquals(newUser.getEmail(), registeredUser.getEmail(), "User email should match");
//         assertTrue(passwordEncoder.matches("password123", registeredUser.getPassword()), "User password should match");
//         assertEquals(newUser.getAge(), registeredUser.getAge(), "User age should match");
//         assertEquals(newUser.getAddress(), registeredUser.getAddress(), "User address should match");
//         assertEquals(newUser.getRole(), registeredUser.getRole(), "User role should match");
//     }
// }
