class Helpers {
  // To formate date to 01/01/2017
  formatDate(date) {
    let newDate = new Date(date)
    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = newDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    return `${dd}/${mm}/${newDate.getFullYear()}`;
  }
}

export default Helpers;
