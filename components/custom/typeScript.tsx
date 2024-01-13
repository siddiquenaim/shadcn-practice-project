/** TypeScript Overview */

// What is TypeScript?
// TypeScript is a superset of JavaScript that adds static typing to the language.
// It provides tools for type checking, interfaces, and other features,
// making it easier to write and maintain large-scale JavaScript applications.

/** Types and Interfaces */

// Type
// Used for defining custom types.
// Can represent primitive types, objects, arrays, and more.
// Supports unions, intersections, and mapped types.
type Age = number;

const age: Age = 25;

// Interface
// Used for defining the structure of an object.
// Can include properties, methods, and index signatures.
// Supports extension and implementation.
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "John",
  age: 30,
};

/** Difference between Type and Interface */

// Type:
// Supports unions, intersections, and mapped types.
// Can represent various types, including primitives.

// Interface:
// Can be extended and implemented.
// Works better with object shapes.
// Supports declaration merging.

/** Primitive Type Declaration */

let numberVar: number = 42;
let stringVar: string = "Hello, TypeScript";
let booleanVar: boolean = true;

/** Object Type Declaration */

let personObj: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};

/** Array of Object Type Declaration */

let peopleArray: { name: string; age: number }[] = [
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 },
];

/** Optional Type */

interface Config {
  setting1: string;
  setting2?: number; // Optional property
}

const config: Config = {
  setting1: "value1",
};

/** Function Type Declaration */

type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;

/** Generic Type */

interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "Hello, TypeScript" };

// In the `Box` example, `T` is a generic type parameter that can be replaced with any type
// when creating an instance of `Box`.
// Generics provide flexibility to create reusable and type-safe components.

// to avoid any type, the generic type was introduced.

// example-1:

function convertToArray<T>(input: T): T[] {
  return [input];
}

//------2
const arr = [11, 88, 44];

function getIndexOfArrayItem<T>(arr: T[], item: T) {
  return arr.findIndex((i) => i === item);
}

getIndexOfArrayItem(arr, 88);

//------3
function pairArray<T, K>(a: T, b: K): [T, K] {
  return [a, b];
}

pairArray("hello", 10);
