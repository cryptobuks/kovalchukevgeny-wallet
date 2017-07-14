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
