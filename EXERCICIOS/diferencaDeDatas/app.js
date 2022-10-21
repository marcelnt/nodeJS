var data = new Date(); 
console.log(data.getFullYear());
data.setDate(data.getDate() - 14);
console.log(data.getDate() + "/" + parseInt(data.getMonth() + 1) + "/" + data.getFullYear());
console.log(data);


