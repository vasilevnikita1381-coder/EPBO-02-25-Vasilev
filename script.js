document.addEventListener("DOMContentLoaded", () => {
  const catalogContainer = document.getElementById('catalog-container');
  let allCards = []; 

  fetch('dataset/catalog.csv')
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split('\n');
      catalogContainer.innerHTML = ''; 

      for (let i = 0; i < lines.length; i++) {
        const values = lines[i].split(';').map(v => v.trim());
        if (values.length < 5) continue;

        const title = values[1];
        const category = values[2];
        const price = values[3];
        const rating = values[4];

        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('data-category', category);
        
        card.innerHTML = `
          <span class="card__category">${category}</span>
          <h3 class="card__title">${title}</h3>
          <p class="card__desc">Рейтинг: ⭐ ${rating}</p>
          <div class="card__price">${price} ₽</div>
        `;
        catalogContainer.appendChild(card);
        allCards.push(card); 
      }
    });

  // Логика фильтрации
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const selectedCategory = e.target.getAttribute('data-category');

      allCards.forEach(card => {
        if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
          card.style.display = 'block'; 
        } else {
          card.style.display = 'none'; 
        }
      });
    });
  });
});