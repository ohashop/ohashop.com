function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let html = "";
  let subtotal = 0;

  cart.forEach(p => {
    subtotal += p.price;

    html += `<div>${p.name} - ৳${p.price}</div>`;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("subtotal").innerText = subtotal;

  calculateTotal();
}

function calculateTotal() {
  let delivery = parseInt(document.getElementById("location").value);
  let subtotal = parseInt(document.getElementById("subtotal").innerText);

  document.getElementById("delivery").innerText = delivery;
  document.getElementById("total").innerText = subtotal + delivery;
}

document.getElementById("location").addEventListener("change", calculateTotal);

function placeOrder() {
  alert("Order Placed ✅");
  localStorage.removeItem("cart");
  location.reload();
}

loadCart();
