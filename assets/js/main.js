// ===== 商品データ =====
const products = [
  { id: 1, name: "HOODIE_01", price: 12000, img: "assets/img/placeholder-1.jpg" },
  { id: 2, name: "JACKET_02", price: 18000, img: "assets/img/placeholder-2.jpg" },
  { id: 3, name: "PANTS_03", price: 10000, img: "assets/img/placeholder-3.jpg" },
  { id: 4, name: "BAG_04", price: 8000, img: "assets/img/placeholder-4.jpg" }
];

// ===== カート取得 =====
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ===== カート保存 =====
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== カート追加 =====
function addToCart(id) {
  let cart = getCart();

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

// ===== カート数表示 =====
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  const el = document.getElementById("cart-count");
  if (el) el.textContent = total;
}

// ===== 商品一覧表示（トップページ） =====
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <a href="products/product-detail.html?id=${product.id}">
        <img src="${product.img}" alt="">
        <h3>${product.name}</h3>
        <p>¥${product.price.toLocaleString()}</p>
      </a>

      <button class="add-to-cart" data-id="${product.id}">
        ADD TO CART
      </button>
    `;

    productList.appendChild(div);
  });
}

// ===== カート表示 =====
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";

  let totalPrice = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return;

    totalPrice += product.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <p>${product.name}</p>
      <p>¥${product.price.toLocaleString()}</p>

      <button class="decrease" data-id="${item.id}">-</button>
      <span>${item.qty}</span>
      <button class="increase" data-id="${item.id}">+</button>

      <button class="remove" data-id="${item.id}">削除</button>
    `;

    container.appendChild(div);
  });

  if (totalEl) {
    totalEl.textContent = "TOTAL: ¥" + totalPrice.toLocaleString();
  }
}

// ===== クリックイベント =====
document.addEventListener("click", function(e) {
  const id = Number(e.target.dataset.id);
  let cart = getCart();

  // ✅ カート追加（ここで処理終了が重要）
  if (e.target.classList.contains("add-to-cart")) {
    addToCart(id);
    return; // ←これが超重要
  }

  // ＋
  if (e.target.classList.contains("increase")) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty += 1;
  }

  // −
  if (e.target.classList.contains("decrease")) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
  }

  // 削除
  if (e.target.classList.contains("remove")) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);
  updateCartCount();
  renderCart();
});

// ===== 初期化 =====
updateCartCount();
renderProducts();
renderCart();