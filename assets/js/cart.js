function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let html = "";
  let subtotal = 0;

  cart.forEach((p, index) => {
    subtotal += p.price;

    html += `
      <div class="border p-2 mb-2">
        ${p.name} - ৳${p.price}
        <button onclick="removeItem(${index})" class="btn btn-sm btn-danger float-end">X</button>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("subtotal").innerText = subtotal;

  calculateTotal();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function calculateTotal() {
  let delivery = parseInt(document.getElementById("location").value);
  let subtotal = parseInt(document.getElementById("subtotal").innerText);

  document.getElementById("delivery").innerText = delivery;
  document.getElementById("total").innerText = subtotal + delivery;
}

document.getElementById("location").addEventListener("change", calculateTotal);

loadCart();
