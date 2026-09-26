window.onerror = function(msg, url, line) {
    alert("ОШИБКА: " + msg + "\nСтрока: " + line);
};
// --- ЛОГИКА ДЛЯ СТАРТОВОГО ЭКРАНА ---
const windowContainer = document.getElementById('window-container');
const loveScreen = document.getElementById('love-screen');
let windowCount = 0;

function createPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    const maxOffset = 100; 
    const randomX = (Math.random() - 0.5) * maxOffset;
    const randomY = (Math.random() - 0.5) * maxOffset;
    
    popup.style.left = `calc(50% + ${randomX}px)`;
    popup.style.top = `calc(50% + ${randomY}px)`;
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = windowCount;

    popup.innerHTML = `
        <div class="popup-header">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div class="popup-text">Do you love me?</div>
        <div class="btn-container">
            <button class="btn btn-yes">Yes</button>
            <button class="btn btn-no">No</button>
        </div>
    `;

    const btnYes = popup.querySelector('.btn-yes');
    const btnNo = popup.querySelector('.btn-no');

    btnYes.addEventListener('click', () => {
        windowContainer.style.display = 'none';
        loveScreen.style.display = 'block';
        generateColumns();
    });

    btnNo.addEventListener('click', () => {
        windowCount++;
        createPopup();
    });

    windowContainer.appendChild(popup);
}

createPopup();

// --- ЛОГИКА ДЛЯ ЭКРАНА LOVE YOU ---
function generateColumns() {
    const container = document.getElementById('columns-container');
    container.innerHTML = '';
    const numCols = 8; 

    // Создаем одну очень длинную строку с текстом
    let longText = '';
    for (let k = 0; k < 30; k++) {
        longText += 'YOULOVEYOU LOVEYOULOVE';
    }

    for (let i = 0; i < numCols; i++) {
        const col = document.createElement('div');
        col.className = 'column';
        
        // Чередуем классы скорости: col-1, col-2, col-3, col-4, col-5, col-1...
        const animClass = 'col-' + ((i % 5) + 1);
        col.classList.add(animClass);

        const textDiv = document.createElement('div');
        textDiv.className = 'column-text';
        
        // Вставляем текст. Важно: дублируем его, чтобы анимация шла бесконечно
        textDiv.innerHTML = longText + longText;

        col.appendChild(textDiv);
        container.appendChild(col);
    }
}
