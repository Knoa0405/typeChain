interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = {
    name: "noah",
    age: 22,
    gender: "male"
}

const name = "Noah",
    age = 24,
    gender = "male";

const sayHi = (person: Human) => {
    return `Hello ${person.name}, you ar ${person.age}, you are a ${person.gender}.`;
}

console.log(sayHi(person));

export { };