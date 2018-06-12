class TableUI {
  constructor(menu) {
    this.tableContainer = document.querySelector('.tableContainer');
    this.footer = document.querySelector('.footer');
    this.rangeInput = document.querySelector('.rng');
    this.rangeInput.addEventListener('input', this.rangeTune.bind(this));
    this.rangeInput.addEventListener(
      'mouseleave',
      () => (this.rangeInput.style.display = 'none')
    );
    this.menu = menu;
    this.tableHTML = '';
    this.editingNow = {
      targetElement: '',
      currentDish: ''
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
    document
      .querySelectorAll('.editable')
      .forEach(el => el.addEventListener('click', this.rangeAppear.bind(this)));
  }

  createFoodIntakeRow(foodIntakeTotals) {
    this.tableHTML += `<table class="table"><tbody><tr class="foodintake"><td class="widecell">${
      foodIntakeTotals.name
    }</td><td></td><td>${foodIntakeTotals.proteins}</td><td>${
      foodIntakeTotals.fats
    }</td><td>${foodIntakeTotals.carbohydrates}</td><td>${
      foodIntakeTotals.caloricity
    }</td></tr>`;
  }

  createDishRow(dishTotals) {
    this.tableHTML += `<tr class="dish"><td class="dishwidecell">${
      dishTotals.name
    }</td><td class="editable" data-id="${dishTotals.id}">${
      dishTotals.qty
    }</td><td>${dishTotals.proteins}</td><td>${dishTotals.fats}</td><td>${
      dishTotals.carbohydrates
    }</td><td>${dishTotals.caloricity}</td></tr>`;
  }

  rangeAppear(event) {
    this.editingNow.targetElement = event.target;
    menu.foodIntakes.find(
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
    linechart.updateDatasets();
    linechart.refresh();
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
}
