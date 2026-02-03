const cartDiv = document.getElementById('cart-container');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- ТВОЇ НАЛАШТУВАННЯ TELEGRAM ---
const TG_BOT_TOKEN = '8398839507:AAGkmKA2UTL8Irp3Jf1dwJuRGxrhAUv2OK4';
const TG_CHAT_ID = '1981335319';
// ----------------------------------

function renderCart() {
    if (!cartDiv) return;
    cartDiv.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<h2 style='text-align:center; padding:20px;'>Кошик порожній</h2>";
        // Ховаємо форму, якщо кошик пустий
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
        // Додав стилі прямо сюди, щоб було гарно, навіть якщо css глючить
        div.style.border = "1px solid #ddd";
        div.style.padding = "10px";
        div.style.marginBottom = "10px";
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";

        div.innerHTML = `
            <div style="display:flex; align-items:center;">
                <img src="${item.image}" style="width:50px; height:50px; object-fit:cover; margin-right:10px;">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price} грн</p>
                </div>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span style="margin:0 10px;">${item.quantity || 1}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer;">✕</button>
        `;
        cartDiv.appendChild(div);
    });

    // Блок суми
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Разом до сплати: ${total} грн</h3>`;
    totalDiv.style.textAlign = "right";
    totalDiv.style.marginTop = "20px";
    cartDiv.appendChild(totalDiv);

    // Кнопка очищення
    const clearBtn = document.createElement('button');
    clearBtn.innerText = "Очистити весь кошик";
    clearBtn.onclick = clearCart;
    clearBtn.style.background = "#666";
    clearBtn.style.color = "#fff";
    clearBtn.style.border = "none";
    clearBtn.style.padding = "5px 15px";
    clearBtn.style.marginTop = "10px";
    clearBtn.style.cursor = "pointer";
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

// --- ФУНКЦІЯ ВІДПРАВКИ ---
window.sendOrder = function() {
    const nameInput = document.getElementById('client-name');
    const phoneInput = document.getElementById('client-phone');
    const deliveryInput = document.getElementById('delivery-method');
    const paymentInput = document.getElementById('payment-method');

    const name = nameInput ? nameInput.value : "Не вказано";
    const phone = phoneInput ? phoneInput.value : "Не вказано";
    const delivery = deliveryInput ? deliveryInput.value : "Самовивіз (стандарт)";
    const payment = paymentInput ? paymentInput.value : "Готівка (стандарт)";

    if(!name || name === "Не вказано" || !phone || phone === "Не вказано") {
        return alert("Введіть ім'я та телефон!");
    }

    // ... далі твій код формування message і fetch ...

    // Формуємо чек з новими даними
    let message = `<b>📦 Нове замовлення!</b>\n`;
    message += `<b>👤 Клієнт:</b> ${name}\n`;
    message += `<b>📞 Телефон:</b> ${phone}\n`;
    message += `<b>🚚 Доставка:</b> ${delivery}\n`;  // Додали в повідомлення
    message += `<b>💳 Оплата:</b> ${payment}\n\n`;    // Додали в повідомлення
    message += `<b>🛒 Товари:</b>\n`;

    // Далі код залишається таким самим (цикл cart.forEach і fetch)...

    let total = 0;
    cart.forEach((item, index) => {
        const itemSum = item.price * (item.quantity || 1);
        total += itemSum;
        message += `${index + 1}. ${item.name} (${item.quantity || 1} шт) - ${itemSum} грн\n`;
    });

    message += `\n<b>💰 Всього:</b> ${total} грн`;

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
            alert("✅ Замовлення успішно відправлено!");
            localStorage.removeItem('cart');
            location.reload();
        } else {
            alert("❌ Помилка Telegram. Перевір налаштування.");
            console.log(response);
        }
    })
    .catch(error => {
        alert("❌ Помилка з'єднання.");
        console.error(error);
    });
}

// Запускаємо рендер при завантаженні
renderCart();