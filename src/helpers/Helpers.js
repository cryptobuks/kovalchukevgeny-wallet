class Helpers {
  // To formate date to 20/01/2017 or 2017-01-20
  formatDate(date, condition = 'slash') {
    let newDate = new Date(date);
    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = newDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    if(condition === 'slash') {
      return `${dd}/${mm}/${newDate.getFullYear()}`;
    } else if (condition === 'dash') {
      return `${newDate.getFullYear()}-${mm}-${dd}`;
    }
  }

  // To formate date for currencies rate
  formatDateCurr(date, day) {
    let newDate = new Date(date);
    const dd = day === 'yest' ? newDate.getDate() -1 : newDate.getDate();
    const mm = newDate.getMonth() + 1;
    return `${newDate.getFullYear()}-${mm}-${dd}`;
  }

  sumSameDateTransactions(date) {
    let obj = {};
    for(let i = 0; i < date.length; i++) {
      // Create key string for transaction data
      let key = this.formatDate(date[i].date, 'dash');
      /*
       * if object hasn't key add new,
       * if key already exist summarize key value and transaction value
      **/
      obj[key] = !obj[key] ? +date[i].money : +obj[key] + +date[i].money;
    }

    let transaction = {}; let transactions = [];

    /*
     * create array of objects from obj
     * example:
     * [{money: 20, date: Sun Jul 09 2017}, {money: 10, date: Sun Jul 10 2017}]
    **/
    for (let prop in obj) {
      transactions.push({
        money: obj[prop],
        date: new Date(this.formatDate(prop, 'dash'))
      });
    }

    return transactions;
  }

  sumSameCategoryTransactions(date) {
    let obj = {};
    for(let i = 0; i < date.length; i++) {
      // Create key string for transaction data
      let key = date[i].category;
      /*
       * if object hasn't key add new,
       * if key already exist summarize key value and transaction value
      **/
      obj[key] = !obj[key] ? +date[i].money : +obj[key] + +date[i].money;
    }

    let categories = [];

    /*
     * create array of objects from obj
     * example:
     * [{money: 20, category: home}, {money: 10, category: food}]
    **/
    for (let prop in obj) {
      categories.push({
        money: obj[prop],
        category: prop
      });
    }

    return categories;
  }

  // XMLHttpRequest wrapper using callbacks
  request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || "GET", obj.url);
      if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
          xhr.setRequestHeader(key, obj.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(obj.body);
    });
  }
}

export default Helpers;
