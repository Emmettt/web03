class LineChart {
  constructor(menu) {
    this.menu = menu;
    this.ctx = document.getElementById('myChart').getContext('2d');
    this.datasetP = [];
    this.datasetF = [];
    this.datasetC = [];
    this.param = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Белки',
            borderColor: 'rgb(150, 0, 0)',
            data: this.datasetP
          },
          {
            label: 'Жиры',
            borderColor: 'rgb(0, 0, 150)',
            data: this.datasetF
          },
          {
            label: 'Углеводы',
            borderColor: 'rgb(0, 150, 0)',
            data: this.datasetC
          }
        ]
      }
    };
    this.chart;
  }

  init() {
    this.setLabels();
    this.updateDatasets();
    Chart.defaults.global.defaultFontColor = '#ccc';
    Chart.defaults.global.defaultFontSize = 13;
    this.chart = new Chart(this.ctx, this.param);
  }

  setLabels() {
    this.param.data.labels = [];
    this.menu.foodIntakes.forEach(el => this.param.data.labels.push(el.name));
  }

  updateDatasets() {
    this.datasetP.splice(0, this.datasetP.length);
    this.datasetF.splice(0, this.datasetF.length);
    this.datasetC.splice(0, this.datasetC.length);

    this.menu.foodIntakes.forEach(el => {
      const dt = menu.getFoodIntakeTotals(el);
      this.datasetP.push(dt.proteins);
      this.datasetF.push(dt.fats);
      this.datasetC.push(dt.carbohydrates);
    });
  }

  refresh() {
    this.chart.update({
      duration: 400,
      easing: 'easeOutQuart'
    });
  }
}
