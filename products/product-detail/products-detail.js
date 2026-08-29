// ===== 商品データ =====
const products = [
  {
    id: 1,
    name: "HOODIE_01",
    price: 12000,
    img: "https://placehold.jp/150x200.png",
    description: "近未来をテーマにしたオーバーサイズフーディー。シンプルながら存在感のあるデザイン。",
    size: ["S", "M", "L", "XL"],
    color: "BLACK",
    stock: "In Stock"
  },

  {
    id: 2,
    name: "JACKET_02",
    price: 18000,
    img: "https://placehold.jp/150x200.png",
    description: "防風性と機能性を兼ね備えたテックジャケット。タウンユースにも最適。",
    size: ["M", "L", "XL"],
    color: "GRAY",
    stock: "Only 3 Left"
  },

  {
    id: 3,
    name: "PANTS_03",
    price: 10000,
    img: "https://placehold.jp/150x200.png",
    description: "ゆとりのあるシルエットで快適な履き心地を実現したテックパンツ。",
    size: ["S", "M", "L"],
    color: "BLACK",
    stock: "In Stock"
  },

  {
    id: 4,
    name: "BAG_04",
    price: 8000,
    img: "https://placehold.jp/150x200.png",
    description: "日常使いから旅行まで対応するミニマルデザインのショルダーバッグ。",
    size: ["FREE"],
    color: "BLACK",
    stock: "In Stock"
  }
];

// ===== カート =====
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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

// ===== カート数 =====
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  const el = document.getElementById("cart-count");
  if (el) el.textContent = total;
}

// ===== 商品一覧 =====
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  const isProductsPage = window.location.pathname.includes("/products/");

  products.forEach(product => {
    const div = document.createElement("div");

    // トップページとSHOPページでリンクを切り替え
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

// ===== 商品詳細 =====
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<p>商品が見つかりません</p>";
    return;
  }

  container.innerHTML = `
  <div class="detail-wrap">
    <div class="detail-img">
      <img src="${product.img}" alt="${product.name}">
    </div>

<div class="detail-info">
  <h1>${product.name}</h1>

  <p class="price">¥${product.price.toLocaleString()}</p>

  <div class="detail-meta">
    <p><strong>STOCK</strong> ${product.stock}</p>
    <p><strong>SIZE</strong> ${product.size}</p>
    <p><strong>COLOR</strong> ${product.color}</p>
  </div>



<div class="size-select">
  <h3>SIZE</h3>

  <div class="size-options">
<div class="size-options">
  ${product.size.map((size, index) => `
    <button
      class="size-btn ${index === 0 ? "active" : ""}"
      data-size="${size}">
      ${size}
    </button>
  `).join("")}
</div>
</div>
  <div class="description-box">
    <h3>DESCRIPTION</h3>
    <p>${product.description}</p>
  </div>

  <button class="add-to-cart" data-id="${product.id}">
    ADD TO CART
  </button>

  <a href="../index.html" class="back-link">
    ← BACK TO SHOP
  </a>
</div>
  </div>
`;
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
      <div class="cart-left">
        <p class="name">${product.name}</p>
        <p class="price">¥${product.price.toLocaleString()}</p>
      </div>

      <div class="cart-right">
        <button class="decrease" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">削除</button>
      </div>
    `;

    container.appendChild(div);
  });

  if (totalEl) {
    totalEl.textContent = "TOTAL: ¥" + totalPrice.toLocaleString();
  }
}

// ===== イベント =====
document.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);
  let cart = getCart();

  if (e.target.classList.contains("add-to-cart")) {
    addToCart(id);
    return;
  }

  if (e.target.classList.contains("increase")) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty += 1;
  }

  if (e.target.classList.contains("decrease")) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
  }

  if (e.target.classList.contains("remove")) {
    cart = cart.filter(i => i.id !== id);
  }

  // サイズ選択
if (e.target.classList.contains("size-btn")) {

  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
  return;
}

  saveCart(cart);
  updateCartCount();
  renderCart();
});

// ===== Header =====
function loadHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  fetch("/components/header.html")
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;
      updateCartCount();
    });
}

loadHeader();

// ===== 初期化 =====
updateCartCount();
renderProducts();
renderCart();
renderProductDetail();