// Shared cart system
const PRODUCTS = [
  { id: 1, name: "Classic Red & White", origin: "Traditional Palestinian", price: 45, pattern: "pattern-red" },
  { id: 2, name: "Black & White", origin: "Heritage Weave", price: 45, pattern: "pattern-black" },
  { id: 3, name: "Olive & Cream", origin: "Earth Tone Series", price: 48, pattern: "pattern-olive" },
  { id: 4, name: "Navy & White", origin: "Maritime Edition", price: 48, pattern: "pattern-navy" },
  { id: 5, name: "Desert Sand", origin: "Nomad Collection", price: 52, pattern: "pattern-sand" },
];

function getCart() {
  try { return JSON.parse(localStorage.getItem('keffiyeh_cart') || '[]'); } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('keffiyeh_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty++;
  else {
    const p = PRODUCTS.find(p => p.id === productId);
    cart.push({ ...p, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = `Bag (${total})`;
}

function cartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}
