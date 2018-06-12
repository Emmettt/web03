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

  addFoodIntake(foodintake) {
    this.foodIntakes.push(foodintake);
    this.foodIntakes.sort((a, b) => a.order >= b.order);
  }

  addDish(dish) {
    this.foodIntakes[0].dishes.push(dish);
  }

  removeFoodIntake(foodintake) {
    menu.foodIntakes = menu.foodIntakes.filter(el => el !== foodintake);
  }

  removeDish(dish) {
    menu.foodIntakes.forEach(el => {
      el.dishes = el.dishes.filter(elem => elem !== dish);
    });
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
  constructor(food, qty) {
    this.name = food || 'Выберите блюдо';
    this.qty = qty || 0;
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
  }
}
