function placeOrder() {

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("সব তথ্য দিন ❗");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart empty ❗");
    return;
  }

  let location = document.getElementById("location").value;
  let delivery = parseInt(location);

  let orderText = "";
  let total = 0;

  cart.forEach(p => {
    orderText += `${p.name} - ৳${p.price}\n`;
    total += p.price;
  });

  total += delivery;

  let data = {
    name: name,
    phone: phone,
    address: address,
    order: orderText,
    total: total,
    delivery: delivery,
    source: "Cart Order"
  };

  // 📧 EMAIL (FormSubmit AJAX)
  fetch("https://formsubmit.co/ajax/ohashop247@gmail.com", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // 📊 GOOGLE SHEET
  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("✅ Order সফল হয়েছে!");

  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
