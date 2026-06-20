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