class TableUI {
  constructor(menu, linechart) {
    this.tableContainer = document.querySelector('.tableContainer');
    this.footer = document.querySelector('.footer');

    this.chooseFoodIntakeMenu = document.querySelector('.chooseFoodIntakeMenu');
    this.addFoodIntakeMenuItem = document.querySelector('.addFoodIntake');
    this.removeFoodIntakeMenuItem = document.querySelector('.removeFoodIntake');

    this.chooseDishMenu = document.querySelector('.chooseDishMenu');
    this.chooseDishMenuItem = document.querySelector('.chooseDish');
    this.addDishMenuItem = document.querySelector('.addDish');
    this.removeDishMenuItem = document.querySelector('.removeDish');

    this.dishList = document.querySelector('.chooseTable');
    this.dishListContainer = document.querySelector('.choosing');

    this.rangeInput = document.querySelector('.rng');
    this.tableContainer.addEventListener(
      'click',
      this.clickEventHandler.bind(this)
    );
    this.addFoodIntakeMenuItem.addEventListener(
      'click',
      this.addFoodIntake.bind(this)
    );
    this.removeFoodIntakeMenuItem.addEventListener(
      'click',
      this.removeFoodIntake.bind(this)
    );
    this.chooseDishMenuItem.addEventListener(
      'click',
      this.chooseDishTableRender.bind(this)
    );
    this.addDishMenuItem.addEventListener('click', () => {
      this.addDish();
      this.chooseDishTableRender();
    });
    this.removeDishMenuItem.addEventListener(
      'click',
      this.removeDish.bind(this)
    );
    this.rangeInput.addEventListener(
      'input',
      _.throttle(this.rangeTune.bind(this), 100)
    );
    this.rangeInput.addEventListener(
      'mouseleave',
      () => (this.rangeInput.style.display = 'none')
    );

    this.DBTAble = document.querySelector('.DBTable');
    this.DBTAble.addEventListener('click', this.dish_select_handler.bind(this));

    this.menu = menu;
    this.linechart = linechart;
    this.tableHTML = '';

    this.editingNow = {
      targetElement: '',
      currentDish: ''
      //currentDishId: ''
    };
  }

  renderTable() {
    this.tableHTML = '';
    this.tableContainer.innerHTML = '';
    this.menu.foodIntakes.forEach(el => {
      this.createFoodIntakeRow(this.menu.getFoodIntakeTotals(el));
      el.dishes.forEach((elem, index) => {
        this.createDishRow(this.menu.getDishTotals(elem));
        if (index === el.dishes.length - 1)
          this.tableHTML += '</tbody></table>';
      });
    });
    this.tableContainer.insertAdjacentHTML('beforeEnd', this.tableHTML);
    this.refreshFooter();
  }

  createFoodIntakeRow(foodIntakeTotals) {
    this.tableHTML += `<table class="table ${foodIntakeTotals.name}">
    <tbody>
    <tr class="foodintake">
    <td class="widecell">${foodIntakeTotals.name}</td>
    <td></td>
    <td>${foodIntakeTotals.proteins}</td>
    <td>${foodIntakeTotals.fats}</td>
    <td>${foodIntakeTotals.carbohydrates}</td>
    <td>${foodIntakeTotals.caloricity}</td>
    </tr>`;
  }

  createDishRow(dishTotals) {
    this.tableHTML += `<tr class="dish">
    <td class="dishwidecell">${dishTotals.name}</td>
    <td class="editable" data-id="${dishTotals.id}">${dishTotals.qty}</td>
    <td>${dishTotals.proteins}</td>
    <td>${dishTotals.fats}</td>
    <td>${dishTotals.carbohydrates}</td>
    <td>${dishTotals.caloricity}</td>
    </tr>`;
  }

  clickEventHandler(e) {
    if (event.target.className === 'editable') {
      this.rangeAppear(event);
    }
    if (event.target.className === 'widecell') {
      this.chooseFoodIntakeAppear(event);
    }
    if (event.target.className === 'dishwidecell') {
      this.editingNow.targetElement = e.target;
      this.editingNow.currentDish = e.target.textContent;
      //this.editingNow.currentDishId = e.target.nextElementSibling.dataset.id;
      this.dishMenu(event);
    }
  }

  chooseFoodIntakeAppear(event) {
    this.editingNow.targetElement = event.target;
    this.chooseFoodIntakeMenu.style.top =
      event.clientY - event.offsetY + 22 + 'px';
    this.chooseFoodIntakeMenu.style.left =
      event.clientX - event.offsetX - 1 + 'px';
    this.chooseFoodIntakeMenu.style.display = 'block';
  }

  dishMenu(event) {
    this.chooseDishMenu.style.top = event.clientY - event.offsetY + 22 + 'px';
    this.chooseDishMenu.style.left = event.clientX - event.offsetX - 1 + 'px';
    this.chooseDishMenu.style.display = 'block';
  }

  addFoodIntake() {
    const foodintake = this.menu.foodIntakes.find(
      el => el.name === this.editingNow.targetElement.textContent
    );
    this.menu.addFoodIntake(this.setFoodIntakeName(), foodintake.order);
    this.chooseFoodIntakeMenu.style.display = 'none';
    this.repaintAll();
  }

  setFoodIntakeName() {
    let name = prompt('Введите имя приема пищи : ');
    return name;
  }

  removeFoodIntake() {
    if (this.menu.foodIntakes.length === 3) {
      this.chooseFoodIntakeMenu.style.display = 'none';
      alert('Не надо питаться меньше трех раз в день!');
      return;
    }
    this.menu.removeFoodIntake(
      this.menu.getClickedFoodIntake(this.editingNow.targetElement)
    );
    this.chooseFoodIntakeMenu.style.display = 'none';
    this.repaintAll();
  }

  dish_select_handler(e) {
    if (e.target.className !== 'chooseDish_cell') return;
    let selectedDish;
    selectedDish = e.target.parentNode.dataset.id;
    this.dishListContainer.style.display = 'none';
    this.dishEdit(selectedDish);
  }

  dishEdit(selectedDish) {
    let dish = this.menu.getNewDish('Выберите блюдо');
    if (dish) {
      dish.name = selectedDish;
      dish.qty = 30;
    } else {
      this.menu.getClickedDish(
        this.editingNow.targetElement
      ).name = selectedDish;
      this.menu.getClickedDish(this.editingNow.targetElement).qty = 30;
    }
    this.repaintAll();
  }

  addDish() {
    this.menu.addDish(
      this.menu.getClickedFoodIntake(this.editingNow.targetElement)
    );
  }

  dish_add_selected(selectedDish) {
    this.chooseDishMenu.style.display = 'none';
    this.chooseDishTableRender();
    selectedDish = e.target.parentNode.dataset.id;
    this.dishListContainer.style.display = 'none';

    this.menu.addDish(
      this.menu.getClickedFoodIntake(this.editingNow.targetElement),
      selectedDish,
      30
    );

    this.repaintAll();
  }

  addDishWindow() {
    this.chooseDishMenu.style.display = 'none';
    this.chooseDishTableRender();
  }

  chooseDishTableRender() {
    const DBmarkup = foodDB.reduce(
      (acc, el) =>
        acc +
        `
      <tr class='dish_select' data-id="${el.dish}">
      <td class="chooseDish_cell">${el.dish}</td>
      <td class="chooseDish_cell">${el.proteins}</td>
      <td class="chooseDish_cell">${el.fats}</td>
      <td class="chooseDish_cell">${el.carbohydrates}</td>
      <td class="chooseDish_cell">${el.caloricity}</td>
      </tr>
      `,
      ''
    );

    this.dishList.innerHTML = `<tr>
    <td class='dish_header'>Блюдо</td>
    <td class='qty_header'>Белки</td>
    <td class='qty_header'>Жиры</td>
    <td class='qty_header'>Углеводы</td>
    <td class='qty_header'>ККал</td>
    </tr>`;

    this.dishList.insertAdjacentHTML('beforeEnd', DBmarkup);

    this.chooseDishMenu.style.display = 'none';
    this.dishListContainer.style.display = 'block';
  }

  removeDish() {
    if (
      this.menu.getClickedFoodIntake(this.editingNow.targetElement).dishes
        .length === 1
    ) {
      this.removeFoodIntake();
    }
    this.menu.removeDish(
      this.menu.getClickedDish(this.editingNow.targetElement)
    );
    this.chooseDishMenu.style.display = 'none';
    this.repaintAll();
  }

  rangeAppear(event) {
    this.editingNow.targetElement = event.target;
    this.menu.foodIntakes.find(
      el =>
        (this.editingNow.currentDish = el.dishes.find(
          elem => elem.id === event.target.dataset.id
        ))
    );
    this.rangeInput.value = this.editingNow.currentDish.qty; // начальное value ползунка
    this.rangeInput.style.top = event.clientY - event.offsetY + 21 + 'px';
    this.rangeInput.style.left = event.clientX - event.offsetX - 2 + 'px';
    this.rangeInput.style.display = 'block';
  }

  rangeTune(event) {
    this.editingNow.currentDish.qty = this.rangeInput.value;
    this.refreshDishRow(
      this.editingNow.currentDish,
      this.editingNow.targetElement
    );
    this.refreshFoodIntakeRow(
      this.editingNow.currentDish,
      this.editingNow.targetElement
    );
    this.refreshFooter();
    this.linechart.updateDatasets();
    this.linechart.refresh();
  }

  refreshDishRow(dish, target) {
    let dishTotals = this.menu.getDishTotals(dish);
    let parent = target.parentNode; // parent = строка
    parent.cells[1].textContent = dishTotals.qty;
    parent.cells[2].textContent = dishTotals.proteins;
    parent.cells[3].textContent = dishTotals.fats;
    parent.cells[4].textContent = dishTotals.carbohydrates;
    parent.cells[5].textContent = dishTotals.caloricity;
  }

  refreshFoodIntakeRow(dish, target) {
    let foodintake = this.menu.foodIntakes.find(el =>
      el.dishes.some(e => e === dish)
    );
    const foodIntakeTotals = this.menu.getFoodIntakeTotals(foodintake);
    let parent = target.parentNode.parentNode;
    parent.rows[0].cells[2].textContent = foodIntakeTotals.proteins;
    parent.rows[0].cells[3].textContent = foodIntakeTotals.fats;
    parent.rows[0].cells[4].textContent = foodIntakeTotals.carbohydrates;
    parent.rows[0].cells[5].textContent = foodIntakeTotals.caloricity;
  }

  refreshFooter() {
    const TotalsAll = {
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      caloricity: 0
    };
    this.menu.foodIntakes.forEach(el => {
      el.dishes.forEach(elem => {
        const sum = this.menu.getDishTotals(elem);
        TotalsAll.proteins += sum.proteins;
        TotalsAll.fats += sum.fats;
        TotalsAll.carbohydrates += sum.carbohydrates;
        TotalsAll.caloricity += sum.caloricity;
      });
    });

    const dayNorm = {
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      caloricity: 0
    };
    dayNorm.proteins =
      Math.round(
        (TotalsAll.proteins /
          (this.menu.options.weight * this.menu.options.proteinNorm)) *
          100
      ) + ' %';
    dayNorm.fats =
      Math.round(
        (TotalsAll.fats /
          (this.menu.options.weight * this.menu.options.fatNorm)) *
          100
      ) + ' %';
    dayNorm.carbohydrates =
      Math.round(
        (TotalsAll.carbohydrates /
          (this.menu.options.weight * this.menu.options.carboNorm)) *
          100
      ) + ' %';
    dayNorm.caloricity =
      Math.round(
        (TotalsAll.caloricity /
          (this.menu.options.weight * this.menu.options.caloricityNorm)) *
          100
      ) + ' %';

    const per1kg = {
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      caloricity: 0
    };
    per1kg.proteins = (TotalsAll.proteins / this.menu.options.weight).toFixed(
      1
    );
    per1kg.fats = (TotalsAll.fats / this.menu.options.weight).toFixed(1);
    per1kg.carbohydrates = (
      TotalsAll.carbohydrates / this.menu.options.weight
    ).toFixed(1);
    per1kg.caloricity = (
      TotalsAll.caloricity / this.menu.options.weight
    ).toFixed(1);

    const balance = {
      proteins: 0,
      fats: 0,
      carbohydrates: 0
    };
    let sum = TotalsAll.proteins + TotalsAll.fats + TotalsAll.carbohydrates;
    balance.proteins = Math.round((TotalsAll.proteins / sum) * 100) + ' %';
    balance.fats = Math.round((TotalsAll.fats / sum) * 100) + ' %';
    balance.carbohydrates =
      Math.round((TotalsAll.carbohydrates / sum) * 100) + ' %';

    this.footer.rows[0].cells[2].textContent = TotalsAll.proteins;
    this.footer.rows[0].cells[3].textContent = TotalsAll.fats;
    this.footer.rows[0].cells[4].textContent = TotalsAll.carbohydrates;
    this.footer.rows[0].cells[5].textContent = TotalsAll.caloricity;

    this.footer.rows[1].cells[2].textContent = dayNorm.proteins;
    this.footer.rows[1].cells[3].textContent = dayNorm.fats;
    this.footer.rows[1].cells[4].textContent = dayNorm.carbohydrates;
    this.footer.rows[1].cells[5].textContent = dayNorm.caloricity;

    this.footer.rows[2].cells[2].textContent = per1kg.proteins;
    this.footer.rows[2].cells[3].textContent = per1kg.fats;
    this.footer.rows[2].cells[4].textContent = per1kg.carbohydrates;
    this.footer.rows[2].cells[5].textContent = per1kg.caloricity;

    this.footer.rows[3].cells[2].textContent = balance.proteins;
    this.footer.rows[3].cells[3].textContent = balance.fats;
    this.footer.rows[3].cells[4].textContent = balance.carbohydrates;
  }

  repaintAll() {
    this.renderTable();
    this.linechart.init();
    this.linechart.refresh();
  }
}
