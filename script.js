// Простые интерактивные элементы интерфейса

// Переключение мобильного меню
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
}

// Обработка формы обратной связи
const form = document.querySelector('.form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();

    if (!name) {
      alert('Пожалуйста, введите ваше имя.');
      return;
    }

    alert(`Спасибо, ${name}! Ваше сообщение отправлено.`);
    form.reset();
  });
}

// Плавная прокрутка к разделам
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
