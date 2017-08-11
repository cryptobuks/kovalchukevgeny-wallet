class Helpers {
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
}

export default Helpers;
