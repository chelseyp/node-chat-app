const moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

var date = moment();
//date.add(1, 'year').subtract(9, 'months');
console.log(date.format('MMM do, YYYY h:mm a'));

// 6:14 pm

