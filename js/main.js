/* =========================================
   1. НАЛАШТУВАННЯ ТА ДАНІ
   ========================================= */
const BOT_TOKEN = '8398839507:AAGkmKA2UTL8Irp3Jf1dwJuRGxrhAUv2OK4';
const CHAT_ID = '1981335319';

// Список товарів (твої дані)
// === БАЗА ТОВАРІВ З НАДІЙНИМИ ФОТО ===
const products = [
    {
        id: 1,
        name: "Цемент М-500 (25кг)",
        price: 165,
        category: "cement",
        // Твоє фото цементу
        image: "https://standartbud.net/image/cache/catalog/Tsement/standart_m500-1000x1000.jpg"
    },
    {
        id: 2,
        name: "Цегла Червона (шт)",
        price: 12,
        category: "brick",
        // Твоє фото цегли
        image: "https://brickcity.com.ua/ru/wp-content/uploads/sites/3/2020/05/396_original_photos_v2_x2.png"
    },
    {
        id: 3,
        name: "Пісок будівельний (мішок)",
        price: 80,
        category: "sand",
        // Твоє фото піску
        image: "https://cdn.27.ua/sc--media--prod/default/42/e8/04/42e80480-4810-4457-963a-ecf7e83f37e3.jpg"
    },
    {
        id: 4,
        name: "Гіпсокартон стіновий",
        price: 240,
        category: "drywall",
        // Твоє фото гіпсокартону
        image: "https://m2bud.com.ua/files/products/78919118_w640_h640_gklv.800x600w.jpg"
    },
    {
        id: 5,
        name: "Фарба інтер'єрна (10л)",
        price: 1200,
        category: "paint",
        // Твоє фото фарби
        image: "https://media.leroymerlin.ua/family-productmedia/images_for_sku_11064774/FRA9999PRO11064774_1024_1-1d3dd8f09dcc48928917e609d549e826.jpg"
    },
    {
        id: 6,
        name: "Дриль ударний PRO",
        price: 2800,
        category: "tools",
        // Фото дрилі залишили старе
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Ламінат Дуб Світлий (м²)",
        price: 450,
        category: "floor",
        // Твоє фото ламінату
        image: "https://myfloor.com.ua/image/cache/catalog/laminat/Kronotex/HERRINGBONE/3678e-550x550.jpg"
    },
    {
        id: 8,
        name: "Керамічна плитка (м²)",
        price: 650,
        category: "tile",
        // Тут залишив універсальне фото, бо посилання не було. Можеш замінити.
        image: "https://www.opoczno.com.ua/gfx/opoczno/_thumbs/ua/produktyaranzacje/248/marble_skin_home_office_da_small,qnuMpq2lq3GXrsaOZ6Q.jpg"
    }
];

// === ФУНКЦІЯ ВІДОБРАЖЕННЯ ТОВАРІВ ===
function renderProducts(items) {
    const container = document.getElementById('catalog-container');
    if (!container) return; // Захист від помилок, якщо елемента немає

    container.innerHTML = ''; // Очищаємо контейнер

    items.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Ми додаємо onerror, щоб якщо картинка раптом зникне, показалась заглушка
        card.innerHTML = `
            <img src="${product.image}" 
                 alt="${product.name}" 
                 onerror="this.src='https://placehold.co/600x400/eee/333?text=Немає+фото'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">${product.price} грн</span>
                <button class="btn-buy" onclick="addToCart(${product.id})">
                    🛒 В кошик
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Запускаємо рендер при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartCount(); // Оновлюємо лічильник кошика
});

// === КОШИК (ЗАЛИШАЄМО ЯК БУЛО, ТІЛЬКИ ОСНОВНЕ) ===
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Товар "${product.name}" додано в кошик!`);
}

function updateCartCount() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;
}

// ... тут можуть бути твої функції openCart/closeCart ...

/* =========================================
   3. ЛОГІКА КАТАЛОГУ
   ========================================= */
function renderCatalog(items) {
    const container = document.getElementById('catalog-container'); // ВИПРАВЛЕНО: тепер малюємо в правильний блок
    if (!container) return;

    container.innerHTML = '';
    // Стилі для сітки (додаю JS-ом, щоб напевно було гарно)
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px, 1fr))";
    container.style.gap = "20px";
    container.style.padding = "20px 10%";

    if (items.length === 0) {
        container.innerHTML = '<h3 style="text-align:center; width:100%;">Нічого не знайдено 😢</h3>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cssText = "background:white; padding:15px; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.05); text-align:center; border:1px solid #eee;";

        card.innerHTML = `
            <div style="height:180px; display:flex; align-items:center; justify-content:center; overflow:hidden; margin-bottom:10px;">
                <img src="${product.image}" alt="${product.name}" style="max-height:100%; max-width:100%;">
            </div>
            <h3 style="font-size:16px; margin:10px 0; height:40px; overflow:hidden;">${product.name}</h3>
            <div style="font-size:18px; font-weight:bold; color:#27ae60; margin-bottom:10px;">${product.price} грн</div>
            <button onclick="addToCart(${product.id})" style="background:#27ae60; color:white; border:none; padding:10px 20px; border-radius:50px; cursor:pointer; width:100%; font-weight:bold; transition:0.3s;">
                🛒 В кошик
            </button>
        `;
        container.appendChild(card);
    });
}

// Пошук товарів
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(val));
        renderCatalog(filtered);
    });
}

/* =========================================
   4. ЛОГІКА КОШИКА (ДОДАВАННЯ, ПЛЮС, МІНУС)
   ========================================= */

// Додати товар (викликається з каталогу)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartIcon();
    alert(`✅ ${product.name} додано в кошик!`);
}

// Зберегти в пам'ять
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Оновити червоний кружечок
function updateCartIcon() {
    const el = document.getElementById('cart-count');
    if (el) {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        el.innerText = totalQty;
    }
}

// ВІДКРИТИ КОШИК
function openCart() {
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('cart-modal').style.display = 'block';
    renderCartItems(); // Малюємо список товарів саме в момент відкриття
}

// ЗАКРИТИ КОШИК
function closeCart() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('cart-modal').style.display = 'none';
}

// МАЛЮВАННЯ ТОВАРІВ ВСЕРЕДИНІ КОШИКА
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const orderForm = document.getElementById('order-form'); // Блок з формою
    const totalEl = document.getElementById('total-price');
    const footer = document.querySelector('.cart-footer'); // Футер кошика

    if (!container) return;
    container.innerHTML = '';

    // Якщо кошик порожній
    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        if(footer) footer.style.display = 'none'; // Ховаємо форму
        return;
    }

    emptyMsg.style.display = 'none';
    if(footer) footer.style.display = 'block'; // Показуємо форму

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        container.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:10px 0;">
                <div style="flex:1;">
                    <div style="font-weight:bold; font-size:14px;">${item.name}</div>
                    <div style="font-size:12px; color:#777;">${item.price} грн</div>
                </div>
                
                <div style="display:flex; align-items:center; gap:8px;">
                    <button onclick="changeQty(${item.id}, -1)" style="width:25px; height:25px; background:#f0f0f0; border:none; border-radius:50%; cursor:pointer;">-</button>
                    <span style="font-weight:bold; min-width:20px; text-align:center;">${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)" style="width:25px; height:25px; background:#f0f0f0; border:none; border-radius:50%; cursor:pointer;">+</button>
                    <button onclick="removeItem(${item.id})" style="color:red; background:none; border:none; font-size:18px; cursor:pointer; margin-left:5px;">&times;</button>
                </div>
            </div>
        `;
    });

    if (totalEl) totalEl.innerText = totalPrice;
}

// ЗМІНА КІЛЬКОСТІ (+/-)
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        if (confirm("Видалити товар з кошика?")) {
            removeItem(id);
            return;
        } else {
            item.quantity = 1;
        }
    }

    saveCart();
    updateCartIcon();
    renderCartItems(); // Перемальовуємо кошик відразу
}

// ВИДАЛЕННЯ ТОВАРУ
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartIcon();
    renderCartItems();
}

/* =========================================
   5. TELEGRAM ВІДПРАВКА
   ========================================= */
function sendToTelegram() {
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;
    const delivery = document.getElementById('delivery-method').value;
    const payment = document.getElementById('payment-method').value;

    if (!name || !phone) {
        alert("❌ Введіть Ім'я та Телефон!");
        return;
    }

    let msg = `<b>🔥 НОВЕ ЗАМОВЛЕННЯ!</b>\n\n`;
    msg += `👤 <b>Клієнт:</b> ${name}\n`;
    msg += `📞 <b>Телефон:</b> ${phone}\n`;
    msg += `🏠 <b>Адреса:</b> ${address}\n`;
    msg += `🚚 <b>Доставка:</b> ${delivery}\n`;
    msg += `💳 <b>Оплата:</b> ${payment}\n\n`;
    msg += `🛒 <b>ТОВАРИ:</b>\n`;

    let total = 0;
    cart.forEach(item => {
        let sum = item.price * item.quantity;
        total += sum;
        msg += `▫️ ${item.name} (${item.quantity} шт) - ${sum} грн\n`;
    });

    msg += `\n💰 <b>ВСЬОГО: ${total} грн</b>`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' })
    })
    .then(res => {
        if (res.ok) {
            alert("✅ Замовлення успішно відправлено!");
            cart = []; // Очищаємо кошик
            saveCart();
            updateCartIcon();
            closeCart();
        } else {
            alert("❌ Помилка відправки.");
        }
    })
    .catch(() => alert("❌ Немає з'єднання."));
}

// Глобальний доступ до функцій (щоб працювали onclick в HTML)
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.openCart = openCart;
window.closeCart = closeCart;
window.sendToTelegram = sendToTelegram;