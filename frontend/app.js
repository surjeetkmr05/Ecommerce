document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const addProductForm = document.getElementById('add-product-form');
  const apiBaseUrl = 'http://localhost:5000/api';

  // Function to fetch and display products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/products`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const products = await response.json();

      // Clear existing list
      productList.innerHTML = '';

      // Populate list with products
      products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${product.name}</strong>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <img src="${product.image}" alt="${product.name}" width="100">
        `;
        productList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      productList.innerHTML = '<li>Error loading products.</li>';
    }
  };

  // Function to handle form submission for adding a new product
  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addProductForm);
    const productData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${apiBaseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear the form and refresh the product list
      addProductForm.reset();
      fetchProducts();

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please check the console for details.');
    }
  });

  // Initial fetch of products when the page loads
  fetchProducts();
});
