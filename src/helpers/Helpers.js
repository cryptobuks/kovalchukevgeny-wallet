import moment from 'moment';

class Helpers {
  sumSameDateTransactions(data) {
    let obj = {};
    for(let i = 0; i < data.length; i++) {
      // Create key string for transaction data
      let key = moment(data[i].date).format('YYYY-MM-DD');
      /*
       * if object hasn't key add new,
       * if key already exist summarize key value and transaction value
      **/
      obj[key] = !obj[key] ? +data[i].money : +obj[key] + +data[i].money;
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
        date: new Date(moment(prop).format('YYYY-MM-DD'))
      });
    }

    return transactions;
  }

  sumSameCategoryTransactions(data) {
    let obj = {};
    let categories = [];

    for(let i = 0; i < data.length; i++) {
      let key = data[i].category;
      obj[key] = !obj[key] ? +data[i].money : +obj[key] + +data[i].money;
    }

    for (let prop in obj) {
      categories.push({
        money: obj[prop],
        category: prop
      });
    }

    return categories;
  }

  sumSameMonthTransactions(data) {
    let obj = {};
    let categories = [];

    for(let i = 0; i < data.length; i++) {
      let key = data[i].category;
      obj[key] = !obj[key] ? +data[i].money : +obj[key] + +data[i].money;
    }

    for (let prop in obj) {
      categories.push({
        [prop]: obj[prop]
      });
    }

    return categories;
  }

  getUnicDescription(data) {
    let obj = {};
    let descriptions = [];

    for(let i = 0; i < data.length; i++) {
      let key = data[i].description;
      obj[key] = data[i].description;
    }

    for (let prop in obj) {
      descriptions.push({
        label: obj[prop]
      });
    }

    return descriptions;
  }

  getCategoryById(categories, transaction) {
    const category = categories.find(category => transaction.category === category.id);
    return category ? category.title : '';
  }

  groupTransactionsByMonths(transactions) {
    let arrTrans = [];
    for(let i = 0; i < 12; i++) {
      let res = transactions.filter(transaction => {
        return moment(transaction.date).month() === i;
      });
      if(res && res.length > 0) {
        arrTrans[i] = res;
      } else {
        arrTrans[i] = [];
      }
    }
    return arrTrans;
  }

  getCurrentMonthTransactions(transactions) {
    return transactions.filter(transaction => {
      return moment().month() === moment(transaction.date).month();
    });
  }
}

export default Helpers;
