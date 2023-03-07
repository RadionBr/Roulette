/*
1. При нажатии на кнопку "Начать"
	1.1. Сделать кнопку не активной - done
	1.2. Вставить патрон в барабан - done
	1.3. Начать крутить барабан
	1.4. Скрыть пулю
	1.5. Записать случайно число от 1 до 6, это число отвечает за место пули в барабане
	1.6. Отобразить револьвер - done
	1.7. Изменить текст кнопки на "Сделать выстрел" - done
	1.8. Сделать кнопку активной - done
2. При нажатии на кнопку "Сделать выстрел"
	2.1. Проверяеться число выстрела - done
	2.2. Если пуля совпадает чилсу пули в барабане, то персонаж убит - done
	2.3. Иначе револьвер переворачиваеться и далее повторяеться п. 2 - done
	2.4. При успешном выстреле залить соответствующую иконку красной жидкостью
	2.5. Прокрутить барабан
3. При завершении игры
	3.1. Изменить текст кнопки на "Рестарт"
	3.2. При нажатии на эту кнопку перезагрузить страницу
*/

var countShot = 0; //наш выстрел
var bulletPosition = random(1, 6); //позиция пули
var BtnShot = document.querySelector("#shot"); //редактирование пули
var currentPlayer = 1; // наш игрок
var baraban = document.querySelector("#baraban"); //включаем переменную барабана

BtnShot.onclick = start; //что будет делать функция старт при нажатии кнопки
// Первый клик по кнопке "начать"
// класнейм (свойство кнопки делаем не активным)
// скрываем револьвер и скрываем пулю
function start() {
	BtnShot.className = "off"; //скрыли пулю
	var bullet = document.querySelector("#bullet");
		bullet.style.display = "block";
	var revolver = document.querySelector("#revolver")
		revolver.style.display = "block"; //скрыли револьвер

	BtnShot.onclick = "";
	var rotate = 0;
	var timer = setInterval(function() {
		rotate = rotate + 10; //создаём условие 
		baraban.style.transform = "rotate(" + rotate + "deg)";
		if(rotate > 300) {
			bullet.style.display = "none";
		}
		if(rotate == 720) {
			clearInterval(timer);
			BtnShot.innerText = "Сделать выстрел";
			BtnShot.onclick = shot;

			BtnShot.className = "";
		}
	}, 50)	
}

function random(min, max) { //фунция рандомайзера (произвольное количесво в заданом диапазоне)
	return Math.floor( Math.random() * (max - min) + min );
}
//Задаём в функции условие по игрокам, куда поворачивать револьверу
// при позиции пуль при выстрелах
var rotateBaraban = 0;
function shot() {
	countShot = countShot + 1; //к выстрелу добавляем +1 выстрел
//задаем условия выстрелов
	if(bulletPosition == countShot) {
	var blood = document.createElement("div");
		blood.id = "blood";
		endGame();
	var player = document.querySelector("#player" + currentPlayer);
		player.appendChild(blood);
	} else { 
		if(currentPlayer ==1) {
			rotationRight();
			currentPlayer = 2;
		} else {
			rotationLeft();
			currentPlayer = 1;
		}

		var rotate = rotateBaraban;

		var timer = setInterval(function() {
			baraban.style.transform = "rotate(" + rotate + "deg)";
			rotate = rotate + 10;

			if(rotate == rotateBaraban + 60) {
				clearInterval(timer);
			}

		}, 10)

	}

}
//задаём функцию поворота револьвера влево

function rotationRight () {
	var revolver = document.querySelector("#revolver");
	revolver.style.background = 'url("images/revolver-right.png") no-repeat'
}
// задаём функцию поворота револьвера вправо
rotationRight();

function rotationLeft () {
	var revolver = document.querySelector("#revolver");
	revolver.style.background = 'url("images/revolver-left.png") no-repeat'
}
rotationLeft();

// В функции конец игры меняем кнопку на Рестарт и перезагрузка страницы
function endGame() {
	alert("Game Over !!!")
	BtnShot.innerText = "Рестарт"
	BtnShot.onclick = restart;
}
//делаем функцию рестарт чтобы отдельно вынести в функцию ендгейм
function restart(){
	location.reload();
}

