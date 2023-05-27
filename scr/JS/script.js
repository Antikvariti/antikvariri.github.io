window.addEventListener('load', () => {
    createSection('section1', 'furniture');
    createSection('section2', 'light');
    createSection('section3', 'accessories');
});

function createSection(filename, containerName) {
    fetch('/index.html/scr/'+filename+'.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById(containerName);
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-container');
                productCard.innerHTML = `
        <div class="product-card">
          <img src="/index.html/scr/img/${product.image}" alt="Товар" class="img">
          <div class="card-description">
            <div class="name">
              <h3 class="name-card">${product.name}</h3>
              <p class="price-card">${product.price}</p>
              <p class="date">Дата добавления: ${getDayInfo(String(product.date))}</p>
            </div>
            <a href="#" class="button-card"><span class="label">Купить</span></a>
          </div>
        </div>
      `;
                productContainer.appendChild(productCard);
            });

        });
}

function getDayInfo(dateString) {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const monthsOfYear = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    const weekNumber = Math.ceil((date.getDate() + 6 - date.getDay()) / 7);

    return `${dayOfWeek}, ${weekNumber} неделя ${month} ${year} года`;
}



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var scrollButton = document.getElementById("scrollButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function toggleNavbarMenu() {
    console.log("КЛИК toggleNavbarMenu");
    let navbarMenu = document.getElementsByClassName("navbar-menu-mobile");
    navbarMenu[0].classList.toggle("navbar-menu-mobile-active");}


function toggleTheme() {
    const elements = document.querySelectorAll('body, .button-card, .label, .heading, #Form, .quantity-block, .color-radio-buttons, #comment, .comment, .purchase, .product-card-form');
    elements.forEach(element => {
        element.classList.toggle('dark-theme');
    });
}