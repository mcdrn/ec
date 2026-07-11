// 商品一覧
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  const isProductsPage = window.location.pathname.includes("/products/");

  products.forEach(product => {
    const div = document.createElement("div");

    const link = isProductsPage
      ? `./product-detail/index.html?id=${product.id}`
      : `products/product-detail/index.html?id=${product.id}`;

div.innerHTML = `
<div class="product-card">

  <a href="${link}">
    <div class="product-image">
      <img src="${product.img}" alt="${product.name}">
    </div>

    <div class="product-info">
      <h3>${product.name}</h3>
      <p>¥${product.price.toLocaleString()}</p>
    </div>
  </a>

  <button class="add-to-cart" data-id="${product.id}">
    ADD TO CART
  </button>

</div>
`;

    productList.appendChild(div);
  });
}