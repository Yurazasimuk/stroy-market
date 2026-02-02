const cartDiv = document.getElementById('cart-container');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- НАЛАШТУВАННЯ TELEGRAM (ЗАПОВНИ ЦЕ) ---
const TG_BOT_TOKEN = '8398839507:AAGkmKA2UTL8Irp3Jf1dwJuRGxrhAUv2OK4'; // Наприклад: '7023423:AAFw...'
const TG_CHAT_ID = '1981335319';     // Наприклад: '394857203'
// -----------------------------------------

function renderCart() {
    if (!cartDiv) return;
    cartDiv.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<h2 style='text-align:center; padding:20px;'>Кошик порожній</h2>";
        // Ховаємо форму замовлення якщо кошик пустий
        if(document.getElementById('order-form')) document.getElementById('order-form').style.display = 'none';
        return;
    }

    // Показуємо форму замовлення
    if(document.getElementById('order-form')) document.getElementById('order-form').style.display = 'block';

    cart.forEach((item, index) => {
        const itemTotal = Number(item.price) * (item.quantity || 1);
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="info">
                <h3>${item.name}</h3>
                <p>${item.price} грн</p>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${item.quantity || 1}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-btn">✕</button>
        `;
        cartDiv.appendChild(div);
    });

    // Блок суми
    const totalDiv = document.createElement('div');
    totalDiv.id = 'total-container';
    totalDiv.innerHTML = `Разом до сплати: ${total} грн`;
    cartDiv.appendChild(totalDiv);

    // Кнопка очищення
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clear-cart-btn';
    clearBtn.innerText = "Очистити весь кошик";
    clearBtn.onclick = clearCart;
    cartDiv.appendChild(clearBtn);
}

function changeQty(index, delta) {
    cart[index].quantity = (cart[index].quantity || 1) + delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    if(confirm("Точно видалити все?")) {
        localStorage.removeItem('cart');
        cart = [];
        renderCart();
    }
}

// --- ФУНКЦІЯ ВІДПРАВКИ В TELEGRAM ---
window.sendOrder = function() {
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;

    if(!name || !phone) return alert("Введіть ім'я та телефон!");

    // Перевірка, чи вставив ти токен
    if (TG_BOT_TOKEN === 'СЮДИ_ТВІЙ_ТОКЕН' || TG_CHAT_ID === 'СЮДИ_ТВІЙ_ID') {
        alert("❌ ПОМИЛКА: Ти забув вставити Токен або ID у файлі js/cart.js!");
        return;
    }

    // Формуємо чек
    let message = `<b>📦 Нове замовлення!</b>\n`;
    message += `<b>👤 Клієнт:</b> ${name}\n`;
    message += `<b>📞 Телефон:</b> ${phone}\n\n`;
    message += `<b>🛒 Товари:</b>\n`;

    let total = 0;
    cart.forEach((item, index) => {
        const itemSum = item.price * (item.quantity || 1);
        total += itemSum;
        message += `${index + 1}. ${item.name} (${item.quantity || 1} шт) - ${itemSum} грн\n`;
    });

    message += `\n<b>💰 Всього:</b> ${total} грн`;

    // Відправка
    const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;
    const params = {
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
    };

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (response.ok) {
            alert("✅ Замовлення надіслано менеджеру!");
            localStorage.removeItem('cart');
            location.reload();
        } else {
            alert("❌ Помилка Telegram. Перевір токен.");
            console.log(response);
        }
    })
    .catch(error => {
        alert("❌ Немає інтернету або помилка коду.");
        console.error(error);
    });
}

renderCart();