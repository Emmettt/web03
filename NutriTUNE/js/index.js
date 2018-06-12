/* Это программа расчета рациона для чуваков которые ходят в качалку.
Им надо жрать от 6 раз в сутки. Для разных телосложений и нагрузок есть свои
нормы белков и углеводов на 1 кг веса. На графике удобно увидеть в какое время дня у тебя
провал и по каким элементам. Кликай на колонку "Кол-во" и регулируй количество.
Позже добавлю вставку и удаление хавки и расширю базу. Потом надо решить где хранить базу данных.
может учетки прикрутить. Хочу в итоге выложить на билдерских сайтах и форумах - пусть юзают.
Тут цифры пока примерные.
P.S: Учу Javascript полтора месяца. */

'use strict';

renderTable(menu); //menu в файле DB.js | menu - это набор блюд на день

function recalcDish(element) {
  //расчет параметров (белки, жиры...) блюда от его количества
  const srcElement = foodDB.filter(elem => elem.dish === element.dish)[0];
  const qtyCoef = Number(element.qty) / 100;
  element.proteins = Math.round(Number(srcElement.proteins) * qtyCoef);
  element.fats = Math.round(Number(srcElement.fats) * qtyCoef);
  element.carbohydrates = Math.round(
    Number(srcElement.carbohydrates) * qtyCoef
  );
  element.caloricity = Math.round(Number(srcElement.caloricity) * qtyCoef);
  if (!element.id) {
    //если в первый раз, то создаем id
    element.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
  }
  return [
    // без RORO
    element.qty,
    element.proteins,
    element.fats,
    element.carbohydrates,
    element.caloricity
  ];
}

// расчет калорийности всего приема пищиб, .order - номер приема пищи
function recalcFoodIntake(element) {
  let arr = [0, 0, 0, 0];
  menu.forEach(elem => {
    if (elem.order === element.order) {
      arr[0] += elem.proteins;
      arr[1] += elem.fats;
      arr[2] += elem.carbohydrates;
      arr[3] += elem.caloricity;
    }
  });
  return arr;
}

function refreshFooter() {
  const weight = 60; // вес "тела" )
  const arrTotalsDAY = [0, 0, 0, 0]; // Итого за день
  const arrDayNorm = []; // Суточная норма
  const arrToWeight = []; // На 1 кг веса
  const arrNorm = [3, 1, 5, 42]; // суточные нормы на 1 кг
  const tableFooter = document.getElementById('footer');
  let i;

  //Рассчитываем нужные массивы...
  menu.forEach(el => {
    arrTotalsDAY[0] += Number(el.proteins);
    arrTotalsDAY[1] += Number(el.fats);
    arrTotalsDAY[2] += Number(el.carbohydrates);
    arrTotalsDAY[3] += Number(el.caloricity);
  });

  arrTotalsDAY.forEach((el, index) => {
    arrDayNorm.push(Math.round(el / (weight * arrNorm[index]) * 100) + ' %');
    arrToWeight.push((el / weight).toFixed(1));
  });

  // ... и заливаем их в таблицу. всего 4 строки
  [
    tableFooter.rows[0].cells[2].textContent,
    tableFooter.rows[0].cells[3].textContent,
    tableFooter.rows[0].cells[4].textContent,
    tableFooter.rows[0].cells[5].textContent
  ] = arrTotalsDAY;
  [
    tableFooter.rows[1].cells[2].textContent,
    tableFooter.rows[1].cells[3].textContent,
    tableFooter.rows[1].cells[4].textContent,
    tableFooter.rows[1].cells[5].textContent
  ] = arrDayNorm;
  [
    tableFooter.rows[2].cells[2].textContent,
    tableFooter.rows[2].cells[3].textContent,
    tableFooter.rows[2].cells[4].textContent,
    tableFooter.rows[2].cells[5].textContent
  ] = arrToWeight;

  i = arrTotalsDAY[0] + arrTotalsDAY[1] + arrTotalsDAY[2];
  tableFooter.rows[3].cells[2].textContent =
    Math.round(arrTotalsDAY[0] / i * 100) + ' %';
  tableFooter.rows[3].cells[3].textContent =
    Math.round(arrTotalsDAY[1] / i * 100) + ' %';
  tableFooter.rows[3].cells[4].textContent =
    Math.round(arrTotalsDAY[2] / i * 100) + ' %';
} // конец refreshFooter()

function refreshRelatedCells(element) {
  let parent = targetElement.parentNode.parentNode.parentNode;
  // parent = ячейка.строка.TBody.Table
  // каждый прием пищи в отдельной Table

  [
    parent.rows[0].cells[2].textContent,
    parent.rows[0].cells[3].textContent,
    parent.rows[0].cells[4].textContent,
    parent.rows[0].cells[5].textContent
  ] = recalcFoodIntake(element);

  parent = targetElement.parentNode; // parent = строка
  [
    parent.cells[1].textContent = element.qty,
    parent.cells[2].textContent = element.proteins,
    parent.cells[3].textContent = element.fats,
    parent.cells[4].textContent = element.carbohydrates,
    parent.cells[5].textContent = element.caloricity
  ] = recalcDish(element);

  refreshFooter();
} //конец refreshRelatesCells()

function calculateMenu() {
  // персчет ТТХ всех блюд в меню
  menu.forEach(element => recalcDish(element));
}

function renderTable(menu) {
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML = '';
  tableContainer.innerHTML = htmlHeaderFooter; //вставляем шапку и шаблон футера - DB.js/htmlHeaderFooter
  const tableFooter = document.getElementById('footer');
  let currentTable = 0;
  let tablesQTY = 0;
  let totals = [];

  menu.sort((a, b) => a.order - b.order); // сортировка по номеру приема пищи (завтрак-1, перекус-2...)
  calculateMenu(); // персчет ТТХ всех блюд в меню

  menu.forEach(element => {
    if (element.order > currentTable) {
      // Если блюдо из нового приема пищи...
      totals = recalcFoodIntake(element); // ... то считаем зеленые цифры
      tableFooter.insertAdjacentHTML(
        // и добавляем итоги всего приема пищи
        'beforeBegin',
        `<table class="temporary"><tbody><tr class="foodintake"><td class="widecell"> ${
          element.foodIntake
        } </td><td></td><td class="qq">${totals[0]} </td><td>${
          totals[1]
        }</td><td>${totals[2]}</td><td>${totals[3]}</td></tr></tbody></table>`
      );
      currentTable = element.order;
      tablesQTY += 1;
    }
    tableContainer.children[tablesQTY].insertAdjacentHTML(
      // добавляем строку блюда
      'beforeEnd',
      `<tbody><tr class="dish"><td class="dishwidecell">${
        element.dish
      }</td><td class="editable" data-id=${element.id}>${element.qty}</td><td>${
        element.proteins
      }</td><td>${element.fats}</td><td>${element.carbohydrates}</td><td>${
        element.caloricity
      }</td></tr></tbody>`
    );
  });

  refreshFooter();
} // конец renderTable()

//XXXXXXXXXXXXXXXXX   EVENT HANDLERS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

const rngSlider = document.getElementById('rng'); //ползунок
let targetElement; // кого кликнули
let editingDish; // какое блюдо регулируем
// мне не нравится что эти переменные общие для нескольких обработчиков.
// сделал с передачей друг другу как аргументы, но там каждый их вычисляет.
// а так один раз.

[...document.getElementsByClassName('editable')].forEach(element =>
  element.addEventListener('click', rangeAppear)
);
function rangeAppear(event) {
  targetElement = event.target;
  setEditingDish(); // определяем какой объект будет редактироваться
  rngSlider.value = editingDish.qty; // начальное value ползунка
  rngSlider.style.top = event.clientY - event.offsetY + 21 + 'px';
  rngSlider.style.left = event.clientX - event.offsetX - 2 + 'px';
  rngSlider.style.display = 'block';
}

function setEditingDish() {
  // определяем какой объект будет редактироваться
  let idDish;
  idDish = targetElement.dataset.id; // id был положен в ячейку "Кол-во"
  editingDish = menu.find(el => el.id === idDish);
}

rngSlider.addEventListener('input', rangeTune);
function rangeTune() {
  // меняем значение в Модели...
  editingDish.qty = rngSlider.value;
  // ...и пересчитываем все что меняется
  refreshRelatedCells(editingDish);
  updateDatasets(); // ... пересчитываем данные для графиков
  chart.update(); // обновляем графики
}

rngSlider.addEventListener(
  'mouseleave',
  () => (rngSlider.style.display = 'none')
);

// ****************************** Chart *******************************

// Данные для графиков
const datasetP = [0, 0, 0, 0, 0, 0];
const datasetF = [0, 0, 0, 0, 0, 0];
const datasetC = [0, 0, 0, 0, 0, 0];

//Заполняем
menu.forEach(el => {
  datasetP[el.order - 1] += el.proteins;
  datasetF[el.order - 1] += el.fats;
  datasetC[el.order - 1] += el.carbohydrates;
});

function updateDatasets() {
  for (let i = 0; i <= 5; i += 1) {
    // решил обнулять так
    datasetP[i] = 0;
    datasetF[i] = 0;
    datasetC[i] = 0;
  }
  menu.forEach(el => {
    // заполняем новыми данными
    datasetP[el.order - 1] += el.proteins;
    datasetF[el.order - 1] += el.fats;
    datasetC[el.order - 1] += el.carbohydrates;
  });
}

// и, собственно, график ( CDN )
var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontColor = '#ccc';
Chart.defaults.global.defaultFontSize = 13;
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Завтрак', 'Перекус', 'Обед', 'Полдник', 'Ужин', 'Перед сном'],
    datasets: [
      {
        label: 'Белки',
        borderColor: 'rgb(150, 0, 0)',
        data: datasetP
      },
      {
        label: 'Жиры',
        borderColor: 'rgb(0, 0, 150)',
        data: datasetF
      },
      {
        label: 'Углеводы',
        borderColor: 'rgb(0, 150, 0)',
        data: datasetC
      }
    ],
    options: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          defaultFontSize: 18,
          fontColor: 'red'
        }
      }
    }
  }
});
