const catalogDiv = document.getElementById('catalog');
const products = JSON.parse(localStorage.getItem('products')) || [];

products.forEach((product, index) => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    ${product.image ? `<img src="${product.image}" width="100">` : ''}
    <h3>${product.name}</h3>
    <p>Ціна: ${product.price} грн</p>
    <button>Додати в кошик</button>
  `;
  catalogDiv.appendChild(div);
});

document.querySelectorAll('#catalog button').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const product = products[index];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(product.name + " додано в кошик!");
  });
});
