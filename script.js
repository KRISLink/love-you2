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
        
        // Проверяем, есть ли уже окна на экране
        const isFirstWindow = windowsContainer.children.length === 0;
        
        let offsetX = 0;
        let offsetY = 0;

        // Если это не первое окно, добавляем случайное смещение
        if (!isFirstWindow) {
            offsetX = (Math.random() - 0.5) * 300;
            offsetY = (Math.random() - 0.5) * 200;
        }

        // Позиционируем окно. Используем calc для точного центрирования + смещение
        windowDiv.style.left = `calc(50% + ${offsetX}px - 160px)`; 
        windowDiv.style.top = `calc(50% + ${offsetY}px - 100px)`;  

        const yesBtn = windowDiv.querySelector('.yes-btn');
        const noBtn = windowDiv.querySelector('.no-btn');

        // Обработка "Yes"
        yesBtn.addEventListener('click', () => {
            questionScreen.classList.remove('active');
            loveScreen.classList.add('active');
            startLoveAnimation();
        });

        // Обработка "No"
        noBtn.addEventListener('click', () => {
            createWindow(); 
        });

        windowsContainer.appendChild(windowDiv);
    }

    // Запуск первого окна (строго по центру)
    createWindow();

    // Функция для создания колонок с текстом
    function startLoveAnimation() {
        if (columnsContainer.children.length > 0) return;

        const numColumns = 12; 
        const text = 'LOVE YOU ';

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('column');

            let content = '';
            for (let j = 0; j < 50; j++) {
                content += `<span>${text}</span>`;
            }
            column.innerHTML = content;

            const duration = 10 + Math.random() * 15; 
            
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
