'use strict';

const menu = new DayMenu(
  '{"foodIntakes":[{"name":"Завтрак","order":1,"dishes":[{"name":"Куриная грудка","qty":200,"id":"_d4zwzent6"},{"name":"Рис","qty":60,"id":"_tcbpuz94b"},{"name":"Сыр","qty":50,"id":"_x9oxlt1qx"}]},{"name":"Перекус","order":2,"dishes":[{"name":"Банан","qty":90,"id":"_xm1q6fbd3"},{"name":"Йогурт","qty":200,"id":"_wrie5hyar"}]},{"name":"Обед","order":3,"dishes":[{"name":"Говядина","qty":250,"id":"_p9esjzwve"},{"name":"Гречка","qty":60,"id":"_8rkajlw7n"},{"name":"Банан","qty":90,"id":"_5bug3q36l"}]},{"name":"Полдник","order":4,"dishes":[{"name":"Омлет","qty":150,"id":"_aj7fz0wgh"},{"name":"Йогурт","qty":200,"id":"_5djux6qvo"}]},{"name":"Ужин","order":5,"dishes":[{"name":"Индейка","qty":220,"id":"_4oaqnfhx8"},{"name":"Макароны","qty":60,"id":"_mze3cbhrp"},{"name":"Сыр","qty":50,"id":"_2gf3jawti"}]},{"name":"Перед сном","order":6,"dishes":[{"name":"Творог","qty":200,"id":"_qo42qk3f9"},{"name":"Йогурт","qty":180,"id":"_lgc7ykmf6"}]}],"options":{"proteinNorm":3,"fatNorm":1,"carboNorm":5,"caloricityNorm":42,"weight":60}}'
);

const table = new TableUI(menu);
table.renderTable();

const linechart = new LineChart(menu);
linechart.init();
