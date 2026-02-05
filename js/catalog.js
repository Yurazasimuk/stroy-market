const catalogDiv = document.getElementById('catalog');
const searchInput = document.getElementById('search-input');

// Базовий список товарів з категоріями
const initialProducts = [
    {
        name: "Цемент М500 (мішок 25кг)",
        price: 150,
        category: "сипучі",
        image: "https://images.prom.ua/5063737332_w640_h640_tsement-m-500.jpg"
    },
    {
        name: "Пісок будівельний (насипом)",
        price: 80,
        category: "сипучі",
        image: "https://t4.ftcdn.net/jpg/02/63/06/61/360_F_263066133_nZ4G0sb1s7y5t9d9f5E5z5z5z5z5z5z5.jpg"
    },
    {
        name: "Цегла червона рядова",
        price: 12,
        category: "цегла",
        image: "https://st4.depositphotos.com/1000605/20560/i/450/depositphotos_205607562-stock-photo-red-bricks-isolated-on-white.jpg"
    }
];

// Завантажуємо товари з LocalStorage або використовуємо початкові
let products = JSON.parse(localStorage.getItem('products')) || initialProducts;

// Очищення старих даних (якщо потрібно оновити структуру категорій)
if (!products[0].category) {
    products = initialProducts;
    localStorage.setItem('products', JSON.stringify(products));
}

function renderCatalog() {
    if (!catalogDiv) return;
    catalogDiv.innerHTML = '';

    catalogDiv.style.display = "flex";
    catalogDiv.style.gap = "20px";
    catalogDiv.style.flexWrap = "wrap";
    catalogDiv.style.justifyContent = "center";

    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'product-card';
        // Додаємо атрибут для фільтрації
        div.setAttribute('data-category', product.category || 'інше');

        div.style.border = "1px solid #e0e0e0";
        div.style.padding = "15px";
        div.style.borderRadius = "10px";
        div.style.width = "220px";
        div.style.textAlign = "center";
        div.style.background = "#fff";
        div.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";

        div.innerHTML = `
            <div style="height: 160px; overflow: hidden; border-radius: 8px; margin-bottom: 12px; display:flex; align-items:center; justify-content:center; background:#f9f9f9;">
                <img src="${product.image}" 
                     onerror="this.src='https://placehold.co/200x150?text=No+Image'"
                     style="width:100%; height:100%; object-fit:contain;">
            </div>
            <h3 style="margin: 10px 0; font-size: 18px; color: #333; height: 40px; overflow: hidden;">${product.name}</h3>
            <p style="margin-bottom: 15px; color: #666;">Ціна: <b style="color: #2c3e50; font-size: 20px;">${product.price} грн</b></p>
            <button onclick="addToCart(${index})" style="background:#28a745; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; width:100%; font-weight:bold; font-size:16px;">
                В кошик
            </button>
        `;
        catalogDiv.appendChild(div);
    });
}

// Фільтр за категоріями
window.filterCategory = function(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'всі' || cardCat === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Пошук
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            card.style.display = title.includes(text) ? '' : 'none';
        });
    });
}

window.addToCart = function(index) {
    const product = products[index];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ ${product.name} додано!`);
};

renderCatalog();
window.toggleCallForm = function() {
    const form = document.getElementById('call-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

window.sendQuickCall = function() {
    const phone = document.getElementById('call-phone').value;
    if(!phone) return alert("Введіть номер!");

    const message = `<b>☎️ ЗАПИТ НА ДЗВІНОК!</b>\nКлієнт просить передзвонити: ${phone}`;

    // Використовуємо твій токен і ID (вони вже є в пам'яті або пропиши їх тут)
    const token = '8398839507:AAGkmKA2UTL8Irp3Jf1dwJuRGxrhAUv2OK4';
    const chatId = '1981335319';

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=HTML`)
    .then(() => {
        alert("Дякуємо! Менеджер скоро зателефонує.");
        toggleCallForm();
    });
}
// Функція для додавання класу анімації при завантаженні
function animateProducts() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // Кожна наступна картка з'являється трохи пізніше
    });
}