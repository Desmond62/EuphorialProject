"use strict";

// Fetch all products
// fetch("http://localhost:3000/products")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("All Products:", data);

//     // Display products in HTML
//     const productList = document.getElementById("product-list");
//     data.forEach((product) => {
//       console.log(product);
//       const productElement = document.createElement("div");
//       productElement.classList.add("product-card");
//       productElement.innerHTML = `
//         <h3>${product.name}</h3>
//         <p>Price: $${product.price}</p>
//         <p>${product.description}</p>
//         <p>Sizes: ${product.sizes.join(", ")}</p>
//         <p>Colors: ${product.colors.join(", ")}</p>
//             <img src=${product.imageUrl} alt="">

//       `;
//       productList.appendChild(productElement);
//     });
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// // Fetch a specific product
// fetch("http://localhost:3000/products/1")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Product Details:", data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
