'use strict';

let menu = [
  {
    order: 2,
    foodIntake: 'Перекус',
    dish: 'Йогурт',
    qty: 150,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 3,
    foodIntake: 'Обед',
    dish: 'Омлет',
    qty: 140,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 6,
    foodIntake: 'Перед сном',
    dish: 'Творог',
    qty: 150,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 1,
    foodIntake: 'Завтрак',
    dish: 'Говядина',
    qty: 180,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },

  {
    order: 5,
    foodIntake: 'Ужин',
    dish: 'Гречка',
    qty: 60,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 2,
    foodIntake: 'Перекус',
    dish: 'Банан',
    qty: 90,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 3,
    foodIntake: 'Обед',
    dish: 'Макароны',
    qty: 60,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 6,
    foodIntake: 'Перед сном',
    dish: 'Банан',
    qty: 90,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 4,
    foodIntake: 'Полдник',
    dish: 'Омлет',
    qty: 140,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 3,
    foodIntake: 'Обед',
    dish: 'Говядина',
    qty: 220,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },

  {
    order: 4,
    foodIntake: 'Полдник',
    dish: 'Йогурт',
    qty: 150,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 5,
    foodIntake: 'Ужин',
    dish: 'Творог',
    qty: 150,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 1,
    foodIntake: 'Завтрак',
    dish: 'Банан',
    qty: 90,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 3,
    foodIntake: 'Обед',
    dish: 'Йогурт',
    qty: 150,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 1,
    foodIntake: 'Завтрак',
    dish: 'Рис',
    qty: 70,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  },
  {
    order: 5,
    foodIntake: 'Ужин',
    dish: 'Куриная грудка',
    qty: 200,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    caloricity: 0
  }
];

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let foodDB = [
  {
    dish: 'Куриная грудка',
    proteins: 25,
    fats: 1.8,
    carbohydrates: 0.5,
    caloricity: 137
  },
  {
    dish: 'Говядина',
    proteins: 22.2,
    fats: 7.1,
    carbohydrates: 0,
    caloricity: 158
  },
  {
    dish: 'Рис',
    proteins: 7,
    fats: 0.6,
    carbohydrates: 73.7,
    caloricity: 323
  },
  {
    dish: 'Гречка',
    proteins: 12.6,
    fats: 2.6,
    carbohydrates: 68,
    caloricity: 329
  },
  {
    dish: 'Макароны',
    proteins: 10,
    fats: 2,
    carbohydrates: 70,
    caloricity: 300
  },
  {
    dish: 'Омлет',
    proteins: 9.3,
    fats: 12.7,
    carbohydrates: 1.7,
    caloricity: 157
  },
  {
    dish: 'Творог',
    proteins: 16.7,
    fats: 9,
    carbohydrates: 1.3,
    caloricity: 156
  },
  {
    dish: 'Йогурт',
    proteins: 4.3,
    fats: 2,
    carbohydrates: 6.2,
    caloricity: 60
  },
  {
    dish: 'Банан',
    proteins: 1.5,
    fats: 0.4,
    carbohydrates: 22,
    caloricity: 91
  }
];

const htmlHeaderFooter =
  '<table id="heading"><tbody><tr><td class="widecell"></td><td>Кол-во</td><td>Белки</td><td>Жиры</td><td>Угли</td><td>Ккал</td></tr></tbody></table><table id="footer"><tbody><tr id="row1"><td class="widecell">Итого за день</td><td></td><td></td><td></td><td></td><td></td></tr><tr id="row2"><td class="widecell">Суточная норма, %</td><td></td><td></td><td></td><td></td><td></td></tr><tr id="row3"><td class="widecell">На 1кг веса</td><td></td><td></td><td></td><td></td><td></td></tr><tr id="row4"><td class="widecell">Баланс</td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>';

/*  htmlHeaderFooter = 
  <table id="heading">
			<tr>
				<td class="widecell"></td>
				<td>Кол-во</td>
				<td>Белки</td>
				<td>Жиры</td>
				<td>Угли</td>
				<td>Ккал</td>
			</tr>
		</table>
		<table id="footer">
			<tr id="row1">
				<td class="widecell">Итого за день</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr id="row2">
				<td class="widecell">Суточная норма, %</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr id="row3">
				<td class="widecell">На 1кг веса</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr id="row4">
				<td class="widecell">Баланс</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table> */
