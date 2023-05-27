window.addEventListener('load', () => {
    createSection('section1', 'furniture');
    createSection('section2', 'light');
    createSection('section3', 'accessories');
});

function createSection(filename, containerName) {
    fetch('scr/js/' + filename + '.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById(containerName);
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-container');
                productCard.innerHTML = `
        <div class="product-card">
          <img src="scr/img/${product.image}" alt="Товар" class="img">
          <div class="card-description">
            <div class="name">
              <h3 class="name-card">${product.name}</h3>
              <p class="price-card">${product.price}</p>
              <p class="date">Дата добавления: ${getDayInfo(String(product.date))}</p>
            </div>
            <button class="button-card" onclick="buyStub('${filename}', '${product.id}')"><span class="label">Купить</span></button>
            
          </div>
        </div>
      `;
                productContainer.appendChild(productCard);
            });
        });
}


function buyStub(filename, id) {
    fetch('scr/js/' + filename + '.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(prod => prod.id === id)
            const popup = document.getElementById("popup");
            popup.innerHTML = `
    <form id="Form-active" method="post">
        <div class="form-elements">
            <div class="product-card-form">
                <img src="scr/img/${product.image}" alt="Товар" class="img">
                <div class="card-description-form">
                        <h3 class="name-card-form">${product.name}</h3>
                        <p class="price-card-form">${product.price}</p>
                </div>
            </div>
        <div class="form-group">
            <div class="quantity-block"><label for="quantity">Укажите количество</label>
                <input type="number" id="quantity" min="1" required></div>
            <div class="color-radio-buttons"><p>Выберите цвет</p>
                <label><input type="radio" name="color" value="red">Синий</label>
                <label><input type="radio" name="color" value="green">Серый</label>
                <label><input type="radio" name="color" value="blue">Желтый</label>
            </div>
            <label for="comment" class="comment"> Ваш комментарий </label>
        <textarea id="comment" maxlength="2000"></textarea>
        <button type="submit" class="purchase" onclick="toggleMessage()">Купить</button>
        </div>
        </div>
        <button class="close" onclick="closePopup()">
            <img src="scr/img/close.png" alt="Закрыть">
        </button>
    </form>`
        });
}

function closePopup(){
    const popup = document.getElementById("popup");
    popup.innerHTML = ``;
}


function toggleMessage() {
    const popup = document.getElementById("popup");
    popup.innerHTML = `popup.innerHTML = \`
     <form id="Form-active" method="post" class="Message"><p class="Message">Спасибо за покупку!
      <button class="close" id="message" onclick="closePopup()"> <div class="close-message">Закрыть</div></button></form>
    \`;`;
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


window.onscroll = function () {
    scrollFunction()
};

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
    let navbarMenu = document.getElementsByClassName("navbar-menu-mobile");
    navbarMenu[0].classList.toggle("navbar-menu-mobile-active");
}


function toggleTheme() {
    const elements = document.querySelectorAll('body, .button-card, .label, .heading, #Form, .quantity-block, .color-radio-buttons, #comment, .comment, .purchase, .product-card-form');
    elements.forEach(element => {
        element.classList.toggle('dark-theme');
    });
}



