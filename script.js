// Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();

// ===== ТОВАРЫ (10 мужских + 10 женских) =====
const products = [
  {id:1,name:"RayBan Classic",price:120,category:"men",images:["images/m1.jpg","images/m1-2.jpg","images/m1-3.jpg"]},
  {id:2,name:"Gucci Square",price:180,category:"men",images:["images/m2.jpg","images/m2-2.jpg","images/m2-3.jpg"]},
  {id:3,name:"Oakley Sport",price:150,category:"men",images:["images/m3.jpg","images/m3-2.jpg","images/m3-3.jpg"]},
  {id:4,name:"Prada Black",price:200,category:"men",images:["images/m4.jpg","images/m4-2.jpg","images/m4-3.jpg"]},
  {id:5,name:"Tom Ford Aviator",price:220,category:"men",images:["images/m5.jpg","images/m5-2.jpg","images/m5-3.jpg"]},
  {id:6,name:"Polaroid Retro",price:110,category:"men",images:["images/m6.jpg","images/m6-2.jpg","images/m6-3.jpg"]},
  {id:7,name:"Versace Gold",price:250,category:"men",images:["images/m7.jpg","images/m7-2.jpg","images/m7-3.jpg"]},
  {id:8,name:"Hugo Boss Classic",price:180,category:"men",images:["images/m8.jpg","images/m8-2.jpg","images/m8-3.jpg"]},
  {id:9,name:"RayBan Wayfarer",price:140,category:"men",images:["images/m9.jpg","images/m9-2.jpg","images/m9-3.jpg"]},
  {id:10,name:"Armani Night",price:230,category:"men",images:["images/m10.jpg","images/m10-2.jpg","images/m10-3.jpg"]},
  {id:11,name:"Gucci Black",price:180,category:"women",images:["images/w1.jpg","images/w1-2.jpg","images/w1-3.jpg"]},
  {id:12,name:"Prada Pink",price:200,category:"women",images:["images/w2.jpg","images/w2-2.jpg","images/w2-3.jpg"]},
  {id:13,name:"Dior Lady",price:220,category:"women",images:["images/w3.jpg","images/w3-2.jpg","images/w3-3.jpg"]},
  {id:14,name:"RayBan Aviator",price:150,category:"women",images:["images/w4.jpg","images/w4-2.jpg","images/w4-3.jpg"]},
  {id:15,name:"Chanel Square",price:250,category:"women",images:["images/w5.jpg","images/w5-2.jpg","images/w5-3.jpg"]},
  {id:16,name:"Tom Ford Rose",price:230,category:"women",images:["images/w6.jpg","images/w6-2.jpg","images/w6-3.jpg"]},
  {id:17,name:"Versace Chic",price:260,category:"women",images:["images/w7.jpg","images/w7-2.jpg","images/w7-3.jpg"]},
  {id:18,name:"Polaroid Modern",price:120,category:"women",images:["images/w8.jpg","images/w8-2.jpg","images/w8-3.jpg"]},
  {id:19,name:"Hugo Boss Elegant",price:180,category:"women",images:["images/w9.jpg","images/w9-2.jpg","images/w9-3.jpg"]},
  {id:20,name:"Armani Sunset",price:240,category:"women",images:["images/w10.jpg","images/w10-2.jpg","images/w10-3.jpg"]}
];

// ===== СОСТОЯНИЕ =====
let currentProduct = null;
let currentImage = 0;
let cart = [];

// ===== РЕНДЕР ПРОДУКТОВ =====
function renderProducts(filter="all") {
  let container = document.getElementById("products");
  container.innerHTML = "";
  products
    .filter(p => filter==="all" || p.category===filter)
    .forEach(p => {
      container.innerHTML += `
        <div class="card" onclick="openModal(${p.id})">
          <img src="${p.images[0]}">
          <h4>${p.name}</h4>
          <p>${p.price}€</p>
        </div>
      `;
    });
}
renderProducts();

// ===== ФИЛЬТР =====
function filterProducts(cat, e) {
  renderProducts(cat);
  document.querySelectorAll('.menu button').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
}

// ===== МОДАЛКА =====
function openModal(id) {
  currentProduct = products.find(p => p.id === id);
  currentImage = 0;
  updateModal();
  document.getElementById("productModal").style.display = "block";
  document.body.style.overflow = "hidden"; // блокируем скролл
}
function closeModal() {
  document.getElementById("productModal").style.display = "none";
  document.body.style.overflow = "auto"; // восстанавливаем
}

// ===== КАРУСЕЛЬ =====
function updateModal() {
  document.getElementById("modalImage").src = currentProduct.images[currentImage];
  document.getElementById("modalTitle").innerText = currentProduct.name;
  document.getElementById("modalPrice").innerText = currentProduct.price + "€";
  document.getElementById("imageCounter").innerText = (currentImage+1) + "/3";
}
function nextImage() { currentImage = (currentImage + 1) % 3; updateModal(); }
function prevImage() { currentImage = (currentImage - 1 + 3) % 3; updateModal(); }

// ===== КОРЗИНА =====
function addToCart() {
  cart.push(currentProduct);
  document.getElementById("cart-count").innerText = cart.length;
}
function openCart() {
  let container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    container.innerHTML += `<p>${item.name} - ${item.price}€ <button onclick="removeItem(${i})">X</button></p>`;
  });
  document.getElementById("totalPrice").innerText = "Итого: " + total + "€";
  document.getElementById("cartModal").style.display = "block";
}
function closeCart() { document.getElementById("cartModal").style.display = "none"; }
function removeItem(i) { cart.splice(i,1); openCart(); }

// ===== ОТПРАВКА ДАННЫХ В TELEGRAM =====
function orderNow() {
  tg.sendData(JSON.stringify({name: currentProduct.name, price: currentProduct.price}));
}
function checkout() {
  tg.sendData(JSON.stringify(cart));
}

// ===== ЗАКРЫТИЕ МОДАЛОК ПО ФОНУ =====
window.onclick = function(e) {
  if(e.target.classList.contains('modal')) {
    e.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
}