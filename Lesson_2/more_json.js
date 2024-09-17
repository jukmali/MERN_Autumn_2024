var data = require('./persons.json');

// original data
console.log(data);

// add a new person
data.push({
    index: 7,
    name: "John Doe",
    address: "123 Elm St"
});

console.log("After adding a new person");
console.log(data);

// remove the last person
data.pop();

console.log("After removing the last person");
console.log(data);  