//Переменные
let rounds = 3;
let score = 0;
let isGameActive = false;
let timeoutId;

//Элементы
const startButton = document.getElementById('start-button');
const cells = document.querySelectorAll('.cell');
const scoreDisplay = document.getElementById('score');
const roundsDisplay = document.getElementById('rounds');
const messageDisplay = document.getElementById('message');

const getRandomInt = (min, max) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); //The maximum is exclusive and the minimum is inclusive
}

//Появление крота
const showMole = () => {
	hideMole();
	const cellIndex = getRandomInt(0, cells.length);
	cells[cellIndex].textContent = '🐹';
	startTimer();
}

//Исчезновение крота
const hideMole = () => {
	cells.forEach((cell) => {
		cell.textContent = '';
	})
}

//Счетчик и количество раундов
const updateDisplays = () => {
	scoreDisplay.textContent = `Счёт: ${score}`;
	roundsDisplay.textContent = `Осталось раундов: ${rounds}`;
}

//Клик по ячейке
const handleCellClick = (cell) => {
	if(isGameActive) {
		clearTimeout(timeoutId);
		if (cell.textContent === '🐹') {
			score++;
			rounds--;

			if (rounds > 0) {
				updateDisplays();
				showMole();
			} else {
				endGame(true);
			}
		} else {
			endGame(false);
		}
	}
}

// Таймер
const startTimer = () => {
	timeoutId = setTimeout(() => {
		if (isGameActive) {
			endGame(false);
		}
	}, 5000);
}

//Старт игры
const startGame = () => {
	isGameActive = true;
	startButton.disabled = true;
	cells.forEach((cell) => {
		cell.style.pointerEvents = 'auto';
	});
	showMole();
	messageDisplay.textContent = '';
}

// Конец игры
const endGame = (win) => {
	isGameActive = false;
	startButton.disabled = false;
	hideMole();
	rounds = 3;
	score = 0;
	cells.forEach((cell) => {
		cell.style.pointerEvents = 'none';
	});

	if (win) {
		alert('Игра окончена, вы выиграли!');
		messageDisplay.textContent = 'Вы выиграли! Нажмите кнопку "Старт", чтобы начать игру заново';
	} else {
		alert('Игра окончена, вы проиграли!');
		messageDisplay.textContent = 'Вы проиграли! Нажмите кнопку "Старт", чтобы начать игру заново';
	}
}

// Клик по ячейке на кнопку старт
startButton.addEventListener('click', startGame);

cells.forEach((cell) => {
	cell.addEventListener('click', () => handleCellClick(cell));
			cell.style.pointerEvents = 'none';
	});