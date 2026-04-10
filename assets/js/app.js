// load components
function load(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data);
}

load("header", "components/header.html");
load("footer", "components/footer.html");
load("sidebar", "components/sidebar.html");

// display products
function displayProducts(list) {
  let html = "";

  list.forEach(p => {
    html += `
    <div class="col-md-4">
      <div class="card">
        <img src="${p.image}">
        <div class="card-body">
          <h6>${p.name}</h6>
          <p>৳${p.price}</p>
          <button onclick="addToCart(${p.id})" class="btn btn-success">Add</button>
        </div>
      </div>
    </div>`;
  });

  document.getElementById("productContainer").innerHTML = html;
}

// search
document.addEventListener("keyup", function(e) {
  if (e.target.id === "searchInput") {
    let val = e.target.value.toLowerCase();

    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(val)
    );

    displayProducts(filtered);
  }
});

// categories
function loadCategories() {
  let cats = [...new Set(products.map(p => p.category))];
  let html = "";

  cats.forEach(c => {
    html += `<li class="list-group-item" onclick="filterCat('${c}')">${c}</li>`;
  });

  document.getElementById("categoryList").innerHTML = html;
}

function filterCat(cat) {
  displayProducts(products.filter(p => p.category === cat));
}

// cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let p = products.find(x => x.id == id);

  cart.push(p);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
}

displayProducts(products);
loadCategories();
updateCart();
