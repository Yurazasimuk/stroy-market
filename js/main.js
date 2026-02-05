/* =========================================
   1. НАЛАШТУВАННЯ ТА ДАНІ
   ========================================= */
const BOT_TOKEN = '8398839507:AAGkmKA2UTL8Irp3Jf1dwJuRGxrhAUv2OK4';
const CHAT_ID = '1981335319';

// === БАЗА ТОВАРІВ ===
const products = [
    {
        id: 1,
        name: "Цемент М-500 (25кг)",
        price: 165,
        category: "cement",
        image: "https://standartbud.net/image/cache/catalog/Tsement/standart_m500-1000x1000.jpg",
        description: "Високоякісний портландцемент марки М-500. Ідеально підходить для будівельних робіт будь-якої складності."
    },
    {
        id: 2,
        name: "Цегла Червона (шт)",
        price: 12,
        category: "brick",
        image: "https://brickcity.com.ua/ru/wp-content/uploads/sites/3/2020/05/396_original_photos_v2_x2.png",
        description: "Класична керамічна червона цегла (рядова). Використовується для зведення несучих стін та перегородок."
    },
    {
        id: 3,
        name: "Пісок будівельний (мішок)",
        price: 80,
        category: "sand",
        image: "https://cdn.27.ua/sc--media--prod/default/42/e8/04/42e80480-4810-4457-963a-ecf7e83f37e3.jpg",
        description: "Чистий річковий пісок, фасований у мішки. Не містить глини та каміння."
    },
    {
        id: 4,
        name: "Гіпсокартон стіновий",
        price: 240,
        category: "drywall",
        image: "https://m2bud.com.ua/files/products/78919118_w640_h640_gklv.800x600w.jpg",
        description: "Гіпсокартонний лист для вирівнювання стін. Розмір стандартний 1200х2500мм."
    },
    {
        id: 5,
        name: "Фарба інтер'єрна (10л)",
        price: 1200,
        category: "paint",
        image: "https://media.leroymerlin.ua/family-productmedia/images_for_sku_11064774/FRA9999PRO11064774_1024_1-1d3dd8f09dcc48928917e609d549e826.jpg",
        description: "Стійка інтер'єрна фарба білого кольору. Матова, легко миється."
    },
    {
        id: 6,
        name: "Дриль ударний PRO",
        price: 2800,
        category: "tools",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop",
        description: "Потужний професійний дриль з функцією удару. Ергономічна ручка."
    },
    {
        id: 7,
        name: "Ламінат Дуб Світлий (м²)",
        price: 450,
        category: "floor",
        image: "https://myfloor.com.ua/image/cache/catalog/laminat/Kronotex/HERRINGBONE/3678e-550x550.jpg",
        description: "Зносостійкий ламінат 32 класу. Декор під натуральне дерево."
    },
    {
        id: 8,
        name: "Керамічна плитка (м²)",
        price: 650,
        category: "tile",
        image: "https://www.opoczno.com.ua/gfx/opoczno/_thumbs/ua/produktyaranzacje/248/marble_skin_home_office_da_small,qnuMpq2lq3GXrsaOZ6Q.jpg",
        description: "Сучасна керамічна плитка під мармур. Глянцева поверхня."
    }
];

// === ІНІЦІАЛІЗАЦІЯ ===
document.addEventListener('DOMContentLoaded', () => {
    injectCustomStyles();
    checkAuth(); // <--- ДОДАНО ПЕРЕВІРКУ ВХОДУ

    if(document.getElementById('catalog-container')) {
        renderProducts(products);
    }
    if(document.getElementById('product-detail-container')) {
        loadProductPage();
    }
    updateCartIcon();
});

/* =========================================
   2. СТИЛІ (КНОПКА ЗІРОЧКИ)
   ========================================= */
function injectCustomStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* СІТКА КАТАЛОГУ */
        #catalog-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 30px; 
            padding: 20px 0;
            margin-bottom: 50px;
        }

        /* КАРТКА ТОВАРУ */
        .product-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            border: 1px solid #f0f0f0;
            height: 100%;
            position: relative;
        }

        .product-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.1);
        }

        /* БЛОК КАРТИНКИ */
        .card-img-wrapper {
            height: 220px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9f9f9;
            padding: 15px;
            position: relative;
            cursor: pointer;
        }

        .card-img-wrapper img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
        }

        .product-card:hover .card-img-wrapper img {
            transform: scale(1.05);
        }

        /* --- КНОПКА ЗІРОЧКИ (ВІШЛІСТ) --- */
        .wishlist-btn {
            position: absolute;
            top: 10px; 
            right: 10px;
            width: 40px;
            height: 40px;
            background: #ffffff;
            border-radius: 50%;
            border: 1px solid #eee;
            cursor: pointer;
            z-index: 10;
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
        }

        .wishlist-btn i {
            font-size: 20px;
            color: #ccc;
            transition: color 0.2s ease;
        }

        .wishlist-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .wishlist-btn:hover i {
            color: #f1c40f; 
        }

        .wishlist-btn.active i {
            color: #f1c40f; 
            font-weight: 900;
            animation: popStar 0.3s ease;
        }

        @keyframes popStar {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }

        /* РЕШТА СТИЛІВ */
        .card-info {
            padding: 20px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .card-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            line-height: 1.4;
            cursor: pointer;
        }
        .card-title:hover { color: #2ecc71; }

        .card-price {
            font-size: 20px;
            font-weight: 800;
            color: #2ecc71;
            margin-top: auto;
            margin-bottom: 15px;
        }

        .btn-card-buy {
            width: 100%;
            padding: 12px;
            background: #333;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
        }
        .btn-card-buy:hover {
            background: #2ecc71;
        }
    `;
    document.head.appendChild(style);
}

/* =========================================
   3. РЕНДЕР КАТАЛОГУ
   ========================================= */
function renderProducts(items) {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    container.innerHTML = '';

    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const wishlistIds = wishlist.map(item => item.id);

    items.forEach(product => {
        const isWished = wishlistIds.includes(product.id);
        const activeClass = isWished ? 'active' : '';
        const iconClass = isWished ? 'fas fa-star' : 'far fa-star';

        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <div class="card-img-wrapper" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/600x400/eee/333?text=Фото'">
                
                <button class="wishlist-btn ${activeClass}" onclick="event.stopPropagation(); toggleWishlist(${product.id}, this)">
                    <i class="${iconClass}"></i>
                </button>
            </div>
            
            <div class="card-info">
                <div class="card-title" onclick="window.location.href='product.html?id=${product.id}'">
                    ${product.name}
                </div>
                <div class="card-price">${product.price} грн</div>
                
                <button class="btn-card-buy" onclick="addToCart(${product.id})">
                    <span>🛒</span> В кошик
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(val));
        renderProducts(filtered);
    });
}

/* =========================================
   4. ЛОГІКА ВІШЛІСТА
   ========================================= */
function toggleWishlist(id, btn) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const index = wishlist.findIndex(item => item.id === id);
    const icon = btn.querySelector('i');

    if (index > -1) {
        wishlist.splice(index, 1);
        btn.classList.remove('active');
        icon.className = 'far fa-star';
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            title: product.name,
            image: product.image,
            img: product.image,
            price: product.price
        });
        btn.classList.add('active');
        icon.className = 'fas fa-star';
    }

    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
}

/* =========================================
   5. ІНШІ ФУНКЦІЇ
   ========================================= */
function loadProductPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);
    const container = document.getElementById('product-detail-container');

    if (product) {
        document.title = `${product.name} | ARS-STROY`;
        container.innerHTML = `
            <div class="product-image-box">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info-box">
                <h1>${product.name}</h1>
                <p class="sku">Код: 00${product.id}</p>
                <div class="detail-price">${product.price} грн</div>
                <p class="description">${product.description}</p>
                
                <div class="buy-section" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn-green" style="padding: 12px 25px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight:bold;" onclick="addToCart(${product.id})">
                        🛒 Додати в кошик
                    </button>
                    <button style="padding: 12px 25px; background: #fff; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;" onclick="window.location.href='index.html#catalog'">
                        ⬅️ Назад
                    </button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `<h2>Товар не знайдено</h2>`;
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) existingItem.quantity++;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    updateCartIcon();
    alert(`✅ ${product.name} додано!`);
    const modal = document.getElementById('cart-modal');
    if (modal && modal.style.display === 'block') renderCartItems();
}

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function updateCartIcon() {
    const el = document.getElementById('cart-count');
    if (el) el.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
function openCart() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('cart-modal');
    if(overlay && modal) { overlay.style.display = 'block'; modal.classList.add('active'); modal.style.display = 'block'; renderCartItems(); }
}
function closeCart() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('cart-modal');
    if(overlay && modal) { overlay.style.display = 'none'; modal.classList.remove('active'); modal.style.display = 'none'; }
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const totalEl = document.getElementById('total-price');
    const footerBlock = document.getElementById('cart-footer-block');

    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        if(footerBlock) footerBlock.style.display = 'none';
        if(totalEl) totalEl.innerText = '0';
        return;
    }
    emptyMsg.style.display = 'none';
    if(footerBlock) footerBlock.style.display = 'block';

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
                    <span style="font-weight:bold;">${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)" style="width:25px; height:25px; background:#f0f0f0; border:none; border-radius:50%; cursor:pointer;">+</button>
                    <button onclick="removeItem(${item.id})" style="color:red; background:none; border:none; font-size:18px; cursor:pointer;">&times;</button>
                </div>
            </div>
        `;
    });
    if (totalEl) totalEl.innerText = totalPrice;
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        if (confirm("Видалити товар?")) removeItem(id);
        else item.quantity = 1;
    }
    saveCart();
    updateCartIcon();
    renderCartItems();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartIcon();
    renderCartItems();
}

function sendToTelegram() {
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const delivery = document.getElementById('delivery-method') ? document.getElementById('delivery-method').value : 'Не вказано';
    const payment = document.getElementById('payment-method') ? document.getElementById('payment-method').value : 'Не вказано';

    if (!name || !phone) { alert("❌ Введіть Ім'я та Телефон!"); return; }
    if (cart.length === 0) { alert("❌ Кошик порожній!"); return; }

    let msg = `<b>🔥 НОВЕ ЗАМОВЛЕННЯ!</b>\n`;
    msg += `👤 Ім'я: ${name}\n`;
    msg += `📞 Телефон: ${phone}\n`;
    msg += `🚚 Доставка: ${delivery}\n`;
    msg += `💳 Оплата: ${payment}\n`;
    msg += `----------\n`;
    msg += `🛒 <b>ТОВАРИ:</b>\n`;
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        msg += `▫️ ${item.name} (${item.quantity} шт) - ${item.price * item.quantity} грн\n`;
    });
    msg += `----------\n`;
    msg += `💰 <b>ВСЬОГО: ${total} грн</b>`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' })
    }).then(res => {
        if (res.ok) {
            alert("✅ Замовлення успішно надіслано!");
            cart = []; saveCart(); updateCartIcon(); closeCart();
            window.location.href = 'index.html';
        } else { alert("Помилка відправки."); }
    }).catch(err => { console.error(err); alert("Помилка мережі."); });
}

/* =========================================
   6. АВТОРИЗАЦІЯ (User Login)
   ========================================= */
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const userNameDisplay = document.getElementById('user-name');

    // Якщо елементів немає (наприклад на інших сторінках), виходимо
    if (!loginBtn || !userProfile) return;

    if (user) {
        // Користувач залогінений
        loginBtn.style.display = 'none';
        userProfile.style.display = 'flex';
        userNameDisplay.innerText = user;
    } else {
        // Гість
        loginBtn.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

function logout() {
    if(confirm("Ви впевнені, що хочете вийти з акаунту?")) {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
}

// Експорт функцій у window
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.openCart = openCart;
window.closeCart = closeCart;
window.sendToTelegram = sendToTelegram;
window.toggleWishlist = toggleWishlist;
window.checkAuth = checkAuth;
window.logout = logout;