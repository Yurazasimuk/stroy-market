let products = JSON.parse(localStorage.getItem('products')) || [];
const form = document.getElementById('add-product-form');

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <img src="${product.image}" width="50">
            <span>${product.name} - ${product.price} грн</span>
            <button onclick="removeProduct(${index})">Видалити</button>
        `;
        productList.appendChild(div);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        name: document.getElementById('product-name').value,
        price: Number(document.getElementById('product-price').value),
        image: document.getElementById('product-image').value
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    form.reset();
});

function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

displayProducts();