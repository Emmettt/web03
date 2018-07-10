'use strict';

class DayMenu {
  constructor(strMenu) {
    let objMenu = JSON.parse(strMenu);
    this.foodIntakes = objMenu.foodIntakes || [];
    this.options = objMenu.options || {};
  }

  getFoodIntakeTotals(foodintake) {
    let srcElement;
    let qtyCoef;
    const foodIntakeTotals = {
      name: foodintake.name,
      qty: '',
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      caloricity: 0
    };

    foodintake.dishes.forEach(el => {
      srcElement = foodDB.filter(elem => elem.dish === el.name)[0];
      qtyCoef = Number(el.qty) / 100;
      foodIntakeTotals.proteins += Math.round(
        Number(srcElement.proteins) * qtyCoef
      );
      foodIntakeTotals.fats += Math.round(Number(srcElement.fats) * qtyCoef);
      foodIntakeTotals.carbohydrates += Math.round(
        Number(srcElement.carbohydrates) * qtyCoef
      );
      foodIntakeTotals.caloricity += Math.round(
        Number(srcElement.caloricity) * qtyCoef
      );
    });

    return foodIntakeTotals;
  }

  getDishTotals(dish) {
    let srcElement;
    let qtyCoef;
    const dishTotals = {
      name: dish.name,
      qty: dish.qty,
      id: '',
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      caloricity: 0
    };
    srcElement = foodDB.filter(elem => elem.dish === dish.name)[0];
    qtyCoef = Number(dish.qty) / 100;
    dishTotals.proteins += Math.round(Number(srcElement.proteins) * qtyCoef);
    dishTotals.fats += Math.round(Number(srcElement.fats) * qtyCoef);
    dishTotals.carbohydrates += Math.round(
      Number(srcElement.carbohydrates) * qtyCoef
    );
    dishTotals.caloricity += Math.round(
      Number(srcElement.caloricity) * qtyCoef
    );
    dishTotals.id = dish.id;

    return dishTotals;
  }

  getClickedFoodIntake(clickedElem) {
    if (clickedElem.classList.contains('widecell')) {
      return this.foodIntakes.find(el => clickedElem.textContent === el.name);
    }
    if (clickedElem.classList.contains('dishwidecell')) {
      return this.foodIntakes.find(el =>
        el.dishes.some(
          elem => elem.id === clickedElem.nextElementSibling.dataset.id
        )
      );
    }
  }

  getClickedDish(clickedElem) {
    let dish;
    this.foodIntakes.find(
      el =>
        (dish = el.dishes.find(
          elem => elem.id === clickedElem.nextElementSibling.dataset.id
        ))
    );
    return dish;
  }

  getNewDish(name) {
    let dish;
    this.foodIntakes.find(
      el => (dish = el.dishes.find(elem => elem.name === name))
    );
    return dish;
  }

  addFoodIntake(name, order) {
    this.foodIntakes.forEach(
      el => (el.order >= order ? (el.order += 1) : el.order)
    );
    const fi = new FoodIntake();
    fi.name = name;
    fi.order = order;
    this.foodIntakes.push(fi);

    this.foodIntakes.sort((a, b) => a.order >= b.order);
  }

  addDish(foodintake, name, qty) {
    foodintake.dishes.push(new Dish(name, qty));
  }

  removeFoodIntake(foodintake) {
    this.foodIntakes = this.foodIntakes.filter(el => el !== foodintake);
  }

  removeDish(dish) {
    this.foodIntakes.forEach(el => {
      el.dishes = el.dishes.filter(elem => elem !== dish);
    });
  }

  dishChange(id, name) {
    this.foddintakes.find;
  }

  makeJSON() {
    return JSON.stringify(this);
  }
}

class FoodIntake {
  constructor(name, order) {
    this.name = name;
    this.order = order;
    this.dishes = [];
    this.dishes.push(new Dish());
  }
}

class Dish {
  constructor(name, qty) {
    this.name = name || 'Выберите блюдо';
    this.qty = qty || 30;
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
  }
}
