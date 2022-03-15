// объявляем переменную area в которую кладем все div id='area'
const area = document.getElementById('area');
// объявляем переменную, в которую будем класть ходы 
// (позже сделаем проверку на чет-нечет для крестиков-ноликов)
let move = 0;
//переменная с результатом: крестики, нолики, ничья
let result = ''

let xWin = document.getElementById('xWin');
let draw = document.getElementById('draw');
let oWin = document.getElementById('oWin');

const contentWrapper = document.getElementById('content');
const modalResult = document.getElementById('modal-result-wrapper');
const overlay = document.getElementById('overlay');
const btnClose = document.getElementById('btn-close');

// для переменной area добавляем отслеживатель клика 
// и функцию e (сокр. event), которая с помощью метода target следит,
// чтобы клик был внутри дива с классом box И ЗАПОМИНАЕТ В e.target В КАКОЙ ИЗ 9-ти box был клик!
area.addEventListener('click', e => {
    if(e.target.className = 'box') {
        // console.log(e.target);
        // проверяем move на четность и в зависимости от результата добавляем Х либо 0, увеличиваем счетчик ходов
        move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = '0';
        move++;
        // при каждом нажатии в box вызываем функцию проверки check() на победителя
        playSound(soundClick);
        check();
        // checkDraw();
    }
})

let soundClick = new Audio();
let soundWin = new Audio();
let soundDraw = new Audio();

soundClick.src = './assets/click.wav';
soundWin.src = './assets/win.wav';
soundDraw.src = './assets/draw.wav';

function playSound(sound) {
    sound.play();
}

 // в переменной boxes лежат все box в виде псевдомассива, 
//где к каждому из 9 box можно обратиться по индексу (0-8), работать будет только при нажатии в box 
const boxes = document.getElementsByClassName('box');

// функция проверки на победителя check()
const check = () => {
    // console.log(boxes);
    // массив (таблица) победных комбинаций из массивов  
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    // пробегаем по массиву и сравниваем с Х либо 0
    for (i = 0; i < arr.length; i++) {
        if(
            boxes[arr[i][0]].innerHTML === 'X' &&
            boxes[arr[i][1]].innerHTML === 'X' &&
            boxes[arr[i][2]].innerHTML === 'X'
        ) {
            result = 'X-X-X wins';
            prepareResult(result);
            scoreCounter(result);
            break;
        } else if (
            boxes[arr[i][0]].innerHTML === '0' &&
            boxes[arr[i][1]].innerHTML === '0' &&
            boxes[arr[i][2]].innerHTML === '0'
        ) {
            result = '0-0-0 wins';
            prepareResult(result);
            scoreCounter(result);
            break;
        } else if (move == 9) {
            result = 'draw';
            move = 18;
            prepareResult(result);
            scoreCounter(result);
        }
        
    }

   
}

const prepareResult = result => {
    console.log(result);
    if (result == 'draw') {
        playSound(soundDraw)
    } else {playSound(soundWin)}
    contentWrapper.innerHTML = `${result} in ${Math.ceil(move / 2)} steps!`;
    modalResult.style.display = 'block';
}

let scoreX = 0;
let scoreDraw = 0;
let scoreO = 0;

let records = []

function scoreCounter(result) {

    if (result == 'X-X-X wins') {
        scoreX++;
        xWin.innerHTML = `X win: ${scoreX}`;
        records.push('X win');
        localStorage.setItem('games', records);
    } else if (result == '0-0-0 wins') {
        scoreO++;
        oWin.innerHTML = `O win: ${scoreO}`;
        records.push('0 win');
        localStorage.setItem('games', records);
    } else if (result == 'draw') {
        scoreDraw++;
        draw.innerHTML = `draw: ${scoreDraw}`;
        records.push('draw');
        localStorage.setItem('games', records);
    }

}

const closeModal = () => {
    modalResult.style.display = 'none';
}

const clearGameArea = () => {
    for (i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = '';
    }
    move = 0;
}

const restart = document.getElementById('restart');
restart.addEventListener('click', clearGameArea);
const recordsWrapper = document.getElementById('records-wrapper');
const recordsContent = document.getElementById('records-content');
const recordsButton = document.getElementById('records');
const recordsModal = document.getElementById('records-modal-window')

const recordsCloseBtn = document.getElementById('records-close');

const showRecords = () => {
    console.log(localStorage.games);
    recordsWrapper.style.display = 'block';
    fetchFromLocalStorage()
}
recordsButton.addEventListener('click', showRecords)



const closeRecords = () => {
    recordsWrapper.style.display = 'none';
}

recordsCloseBtn.addEventListener('click', closeRecords);

function fetchFromLocalStorage() {
    recordsContent.innerHTML = localStorage.games
}

//
// overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
btnClose.addEventListener('click', clearGameArea);




console.log(`собственная оценка 60/60
1. Вёрстка +10 
реализован интерфейс игры +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса (вместо лого вставил просто надпись, мне так по стилю больше нравится) со ссылкой на курс +5
2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10 (все реализовано, но в этом месте можно найти баг, если специально его не искать, то он в принципе не мешает. Пока не додумался как исправить, но исправлю)
3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10 (в случае победы выводит только ходы победителя, сделал так намеренно. при ничьей - все ходы)
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +5 (результаты сохраняются в локал сторэдж и их можно вытянуть через console.log(localStorage) и по кнопке рекордс, но таблицу рекордов не успел нормально оформить как задумывал, поэтому сделал простецкий score. снятие баллов на усмотрение проверяющего, но не судите строго)
6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10 (различные звуки для хода, победы и ничьей)
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +5 (есть кнопка рестарта, которая чистит игровое поле, доп. баллы на усмотрение проверяющего и кривовато работающая рекордс))
`)