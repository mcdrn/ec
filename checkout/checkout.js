function renderCheckout() {
  const cart = getCart();
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return;

    const itemTotal = product.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "checkout-item";

    div.innerHTML = `
      <p>${product.name} × ${item.qty}</p>
      <p>¥${itemTotal.toLocaleString()}</p>
    `;

    container.appendChild(div);
  });

  totalEl.textContent = "TOTAL: ¥" + total.toLocaleString();
}

// 購入処理
document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();

  localStorage.removeItem("cart");

  // 👇 ここが重要
  window.location.href = "./success.html";
});

// 初期化
renderCheckout();
updateCartCount();

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
