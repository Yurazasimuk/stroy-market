window.toggleCallForm = function() {
    const form = document.getElementById('call-form');
    if (form) {
        form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
    }
}

window.sendQuickCall = function() {
    const phoneInput = document.getElementById('call-phone');
    const phone = phoneInput ? phoneInput.value : "";

    if(!phone) return alert("Введіть номер телефону!");

    const token = '8398839507:AAGkmKA2UTL8Irp3Jf1dwJuRGxrhAUv2OK4';
    const chatId = '1981335319';
    const message = `<b>☎️ ЗАПИТ НА ДЗВІНОК!</b>\nКлієнт просить передзвонити: <code>${phone}</code>`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=HTML`)
    .then(response => {
        if(response.ok) {
            alert("Дякуємо! Менеджер скоро зателефонує.");
            phoneInput.value = "";
            toggleCallForm();
        } else {
            alert("Помилка відправки.");
        }
    })
    .catch(() => alert("Перевірте інтернет з'єднання."));
}