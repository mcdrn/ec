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


// =================================
// HAMBURGER MENU
// =================================

document.addEventListener("click", function(e) {

  const menuButton = e.target.closest(".menu-toggle");

  // メニューボタンをクリック
  if (menuButton) {

    const header = menuButton.closest(".site-header");
    const isOpen = header.classList.toggle("menu-open");

    document.body.classList.toggle("menu-open", isOpen);

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く"
    );

    return;
  }

  // メニュー内のリンクをクリック
  if (e.target.closest(".main-nav a")) {
    closeMenu();
  }

});

// メニューを閉じる
function closeMenu() {

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");

  if (!header || !menuButton) return;

  header.classList.remove("menu-open");
  document.body.classList.remove("menu-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "メニューを開く");

}

// ESCキーで閉じる
document.addEventListener("keydown", function(e) {

  if (e.key === "Escape") {
    closeMenu();
  }

});
