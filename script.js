// ============================================================
// Интерфейс мира «Повесть о Родмуре» — всё на русском языке.
// Данные рас и культур находятся в файле cultures.js
// ============================================================

const RACES = (window.WORLD_DATA && window.WORLD_DATA.races) || [];

// ---------- Плитки рас (кнопки выбора) ----------
const raceTabs = document.getElementById('raceTabs');
const cultureCard = document.getElementById('cultureCard');

function renderRaceTabs() {
  if (!raceTabs) return;
  raceTabs.innerHTML = '';
  RACES.forEach((race, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'race-tab' + (index === 0 ? ' race-tab--active' : '');
    btn.textContent = `${race.emoji} ${race.name}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.race-tab').forEach((b) => b.classList.remove('race-tab--active'));
      btn.classList.add('race-tab--active');
      renderCulture(race);
    });
    raceTabs.appendChild(btn);
  });
}

// ---------- Карточка культуры ----------
function infoRow(label, value) {
  return `<div class="culture-row"><span class="culture-row__label">${label}</span><span class="culture-row__value">${value}</span></div>`;
}

function tagList(items) {
  if (!items || items.length === 0) return '<em>нет данных</em>';
  return items.map((v) => `<span class="tag">${v}</span>`).join(' ');
}

function renderCulture(race) {
  if (!cultureCard || !race) return;
  cultureCard.style.setProperty('--race-color', race.color);
  cultureCard.innerHTML = `
    <h3 class="culture-card__title">${race.emoji} ${race.name}</h3>
    <p class="culture-card__desc">${race.description}</p>
    <div class="culture-grid">
      ${infoRow('Страны', tagList(race.countries))}
      ${infoRow('Города', tagList(race.cities))}
      ${infoRow('Столица', race.capital)}
      ${infoRow('Управление', race.government)}
      ${infoRow('Религия', race.religion)}
      ${infoRow('Божество', race.deity)}
      ${infoRow('Титул правителя', race.leaderTitle)}
      ${infoRow('Ценности', tagList(race.values))}
      ${infoRow('Особенности', tagList(race.traits))}
      ${infoRow('Экономика', race.economy)}
      ${infoRow('Военное дело', race.military)}
      ${infoRow('Зодчество', race.architecture)}
      ${infoRow('Язык', race.language)}
      ${infoRow('Союзники', tagList(race.allies))}
      ${infoRow('Соперники', tagList(race.rivals))}
    </div>
  `;
}

renderRaceTabs();
if (RACES.length > 0) renderCulture(RACES[0]);

// ---------- Генератор названий стран и городов ----------
const genRaceSelect = document.getElementById('genRace');
const genBtn = document.getElementById('genBtn');
const genResult = document.getElementById('genResult');

if (genRaceSelect) {
  RACES.forEach((race) => {
    const option = document.createElement('option');
    option.value = race.id;
    option.textContent = race.name;
    genRaceSelect.appendChild(option);
  });
}

if (genBtn && genResult && window.NAME_GEN) {
  genBtn.addEventListener('click', () => {
    const raceId = genRaceSelect ? genRaceSelect.value : null;
    const race = RACES.find((r) => r.id === raceId) || RACES[0];
    if (!race) return;

    const country = window.NAME_GEN.genCountry();
    const city = window.NAME_GEN.genCity();
    const capital = window.NAME_GEN.genCity();

    genResult.hidden = false;
    genResult.innerHTML = `
      <h4 class="gen-result__title">${race.emoji} Владения расы «${race.name}»</h4>
      <ul class="gen-result__list">
        <li><strong>Страна:</strong> ${country}</li>
        <li><strong>Главный город:</strong> ${city}</li>
        <li><strong>Столичная крепость:</strong> ${capital}</li>
        <li><strong>Девиз:</strong> «${race.values[0]} и ${race.values[1]} — наш путь»</li>
      </ul>
    `;
  });
}

// ---------- Мобильное меню ----------
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
}

// ---------- Форма обратной связи ----------
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

// ---------- Плавная прокрутка к разделам ----------
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
