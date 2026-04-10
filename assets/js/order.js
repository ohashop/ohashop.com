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

  let delivery = parseInt(document.getElementById("location").value);

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
    delivery: delivery,
    total: total,
    source: "Cart Order",
    date: new Date().toLocaleString()
  };

  // 📧 EMAIL SEND
  fetch("https://formsubmit.co/ajax/ohashop247@gmail.com", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // 📊 GOOGLE SHEET SAVE
  
  fetch("https://script.google.com/macros/s/AKfycbxMzIweDQMnfCUVj1dlYZ46XdztVZoU7jP3sp8MJjwhBKe9Dj4p6HLyRvwbUASxWBeN/exec", {
    method: "POST",
    body: JSON.stringify(data)
  });

  // ✅ SUCCESS MESSAGE
  alert("🎉 অর্ডার সফল হয়েছে!\nআমরা দ্রুত যোগাযোগ করবো।");

  // CLEAR CART
  localStorage.removeItem("cart");

  // REDIRECT
  window.location.href = "index.html";
}
