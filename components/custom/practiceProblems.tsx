// ### Problem 1: Primitive Type Declarations

// Declare variables of the following types and assign values to them:
// 1. `numberVar` with a value of `42`.
// 2. `stringVar` with a value of `"Hello, TypeScript"`.
// 3. `booleanVar` with a value of `true`.

// const numberVar : number = 42;
// const stringVar : string = "Hello, TypeScript";
// const booleanVar: boolean = true;

// ### Problem 2: Object Type Declarations

// Create an object named `personObj` with the following properties:
// - `name` of type string, set to `"Alice"`.
// - `age` of type number, set to `25`.

// const personObj : {name: string, age: number} = {
//     name: "Alice",
//     age: 25
// }

// ### Problem 3: Array of Object Type Declarations

// Create an array named `peopleArray` with at least two objects. Each object should have the properties:
// - `name` of type string.
// - `age` of type number.

// const peopleArray : {name: string, age: number}[] = [
//     {
//         name: "Shakib",
//         age: 36
//     },
//     {
//         name: "Taskin",
//         age: 28
//     }
// ]

// ### Problem 4: Optional Type

// Create an interface named `Config` with the following properties:
// - `setting1` of type string.
// - `setting2` of type number (optional).

// interface Config {
//     setting1 : string;
//     setting2? : number
// }

// ### Problem 5: Function Type Declaration

// Declare a function named `add` that takes two parameters (`a` and `b`), both of type number, and returns their sum.

// const add = (a: number, b:number) : number => {
// return a + b;
// }

// ### Problem 6: Generic Type

// Create a generic function named `getValue` that takes an argument of type `Box<T>` and returns the `value` property from the argument.

// ```tsx
// interface Box<T> {
//   value: T;
// }

// const numberBox: Box<number> = { value: 42 };
// const stringValue = getValue<string>(stringBox); // stringValue should be "Hello, TypeScript"
// ```
