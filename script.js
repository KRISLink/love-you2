document.addEventListener('DOMContentLoaded', () => {
    const questionScreen = document.getElementById('question-screen');
    const loveScreen = document.getElementById('love-screen');
    const windowsContainer = document.getElementById('windows-container');
    const template = document.getElementById('window-template');
    const columnsContainer = document.getElementById('columns-container');

    // Функция для создания и добавления нового окна
    function createWindow() {
        const clone = template.content.cloneNode(true);
        const windowDiv = clone.querySelector('.window');
        
        // Генерируем случайное смещение от центра (чтобы окна появлялись в разных местах)
        // Например, от -150 до +150 пикселей по X и Y
        const offsetX = (Math.random() - 0.5) * 300;
        const offsetY = (Math.random() - 0.5) * 200;

        // Позиционируем окно. Используем absolute, чтобы они накладывались друг на друга
        windowDiv.style.left = `calc(50% + ${offsetX}px - 160px)`; // 160 - половина ширины окна
        windowDiv.style.top = `calc(50% + ${offsetY}px - 100px)`;  // 100 - примерная половина высоты

        // Добавляем обработчики событий для кнопок
        const yesBtn = windowDiv.querySelector('.yes-btn');
        const noBtn = windowDiv.querySelector('.no-btn');

        // Обработка "Yes" - переход на экран любви
        yesBtn.addEventListener('click', () => {
            questionScreen.classList.remove('active');
            loveScreen.classList.add('active');
            startLoveAnimation();
        });

        // Обработка "No" - создание нового окна
        noBtn.addEventListener('click', () => {
            createWindow(); // Создаем еще одно окно
            // Можно добавить эффект, чтобы старое окно исчезло, или оставить их накапливаться
            // Если хочешь, чтобы старые исчезали, раскомментируй строку ниже:
            // windowDiv.remove(); 
        });

        windowsContainer.appendChild(windowDiv);
    }

    // Запуск первого окна
    createWindow();

    // Функция для создания колонок с текстом и их анимации
    function startLoveAnimation() {
        if (columnsContainer.children.length > 0) return; // Защита от повторного запуска

        const numColumns = 12; // Количество колонок
        const text = 'LOVE YOU ';

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('column');

            // Заполняем колонку текстом (много раз, чтобы хватило на скролл)
            let content = '';
            for (let j = 0; j < 50; j++) {
                content += `<span>${text}</span>`;
            }
            column.innerHTML = content;

            // Определяем направление и скорость для каждой колонки
            // Четные колонки едут вниз, нечетные - вверх
            const duration = 10 + Math.random() * 15; // От 10 до 25 секунд (разная скорость)
            
            if (i % 2 === 0) {
                column.classList.add('animate-down');
                column.style.animationDuration = `${duration}s`;
            } else {
                column.classList.add('animate-up');
                column.style.animationDuration = `${duration}s`;
            }

            columnsContainer.appendChild(column);
        }
    }
});
