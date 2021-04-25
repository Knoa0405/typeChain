"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person = {
    name: "noah",
    age: 22,
    gender: "male"
};
const name = "Noah", age = 24, gender = "male";
const sayHi = (person) => {
    return `Hello ${person.name}, you ar ${person.age}, you are a ${person.gender}.`;
};
console.log(sayHi(person));
//# sourceMappingURL=index.js.map