let cart = JSON.parse(localStorage.getItem("cart")) || [];

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  if (slides.length === 0) return;

  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function moveSlide(step) {
  if (slides.length === 0) return;

  currentSlide += step;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

if (slides.length > 0) {
  setInterval(() => {
    moveSlide(1);
  }, 3000);
}

function addToCart(itemName, itemPrice) {
  const existingItem = cart.find(item => item.name === itemName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: itemName,
      price: itemPrice,
      quantity: 1
    });
  }

  updateCart();
}

function removeFromCart(itemName) {
  cart = cart.filter(item => item.name !== itemName);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
  <p>
    <strong>${item.name}</strong> - $${item.price.toFixed(2)}

    <button onclick="decreaseQty('${item.name}')">-</button>
    ${item.quantity}
    <button onclick="increaseQty('${item.name}')">+</button>

    <button onclick="removeFromCart('${item.name}')">Remove</button>
  </p>
  `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  saveCart(); // ✅ changed here
}

function increaseQty(itemName) {
  const item = cart.find(item => item.name === itemName);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

function decreaseQty(itemName) {
  const item = cart.find(item => item.name === itemName);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter(i => i.name !== itemName);
    }
    updateCart();
  }
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
  });

  countElement.textContent = totalItems;
}


updateCart();
updateCartCount();

