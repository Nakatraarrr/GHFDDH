document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselText = document.getElementById('carousel-text');
    let currentIndex = 0;

    function updateText() {
        const currentItem = carouselItems[currentIndex];
        const text = currentItem.getAttribute('data-text');
        carouselText.innerHTML = text;
    }

    prevButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[currentIndex].classList.add('active');
        updateText();
    }

    updateText();

    // Smooth scroll functionality
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', clickHandler);
    }

    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const offsetTop = document.querySelector(href).offsetTop;

        scroll({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Yandex Map functionality
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64], // Moscow coordinates
            zoom: 10
        });

        var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Наш офис',
            balloonContent: 'Территория Инвестирования'
        });

        myMap.geoObjects.add(myPlacemark);
    }

    // Testimonial functionality
    document.getElementById('testimonial-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Получаем значения из формы
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        // Создаем новый элемент отзыва
        const testimonial = document.createElement('div');
        testimonial.classList.add('testimonial');

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = `«${message}»`;
        testimonial.appendChild(messageParagraph);

        const nameParagraph = document.createElement('p');
        nameParagraph.innerHTML = `<strong>${name}</strong>`;
        testimonial.appendChild(nameParagraph);

        // Добавляем новый отзыв в начало списка отзывов
        const contentBlock = document.querySelector('.content-block');
        contentBlock.insertBefore(testimonial, contentBlock.firstChild);

        // Очищаем форму
        document.getElementById('testimonial-form').reset();
    });
});
