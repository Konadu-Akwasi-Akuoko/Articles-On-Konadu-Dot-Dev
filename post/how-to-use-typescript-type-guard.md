# How to Use Type Guards in TypeScript: A Complete Guide with Examples

Published on November 19, 2023

![how to use type guards in typescript](https://cdn.sanity.io/images/ok7qsbpm/production/7bd1175ad8f83feaeb25c3c28cc789f2b2a7cced-1692x1024.png?q=75&fit=clip&auto=format&fm=webp)

TypeScript is a great language that allows us to write code with static types, which can help us catch errors at compile time and improve the readability and maintainability of our code. However, TypeScript is also a superset of JavaScript. It can run any JavaScript code, even if it is not type-safe. This can lead to situations where we have a variable or expression with more than one possible type and we need to know the exact type to perform some operation on it. 

Imagine you are a teacher and you have a class of students who are boys and girls. You want to divide the class into two groups: one group for boys and one group for girls. You also want to assign them different tasks based on their gender. How can you tell which student is a boy and which is a girl?

![](https://cdn.sanity.io/images/ok7qsbpm/production/bd7eb49080090c0b5b9c193c5316d3c9443ec33b-958x787.png)

One way is to use a type guard. A type guard tells TypeScript that within a certain scope, the type of a variable or expression is narrowed down to a specific subtype. A type guard is usually a conditional statement that checks for some property or value that can distinguish between different types. In this case, the types are boy and girl, and the property that can distinguish them is their clothing. You can use a conditional statement that checks if the student is wearing a skirt or a dress, which is more common for girls’ clothes. In this way, you can distinguish between a girl and a boy.

![](https://cdn.sanity.io/images/ok7qsbpm/production/f6e0ef774ef3309db7aeca2ddd8413b08eac557f-958x651.png)

So, a[ type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html) tells TypeScript that within a specific scope, the type of a variable or expression is narrowed down to a specific subtype. A type guard is usually a conditional statement that checks for some property or value that can distinguish between different types. For example, suppose we have a function that takes a parameter of type string | number. We want to call the toUpperCase method if it is a string or the toFixed method if it is a number. How can we tell TypeScript which method to use? By using type guard, check out the below code:

```typescript
function format(param: string | number) {
  if (typeof param === "string") {
    // TypeScript knows that param is a string here
    return param.toUpperCase();
  } else {
    // TypeScript knows that param is a number here
    return param.toFixed(2);
  }
}

```

By using type guards, we can avoid errors and bugs that might occur when we try to access properties or methods that are not available for certain types. We can also make our code more readable and expressive by explicitly stating our assumptions and expectations about the types of variables and expressions. Type guards are one of the most powerful features of TypeScript, and they can help us write more robust and reliable code.

There are 3 main types of type guards in TypeScript. In this article, we’ll look at the three main type-guarding methods in TypeScript.

## The `typeof` Type Guard

Imagine you are a chef and have a kitchen full of ingredients. Some ingredients are salt, sugar, flour, eggs, butter, etc. Sometimes, you have a recipe that requires an ingredient that can be either one of two types, such as cheese or bread. You need to know the exact type of ingredient to use the correct method. For example, suppose you have a recipe that takes an ingredient of type `cheese | bread`, and you want to melt it if it is cheese or toast it if it is bread. How can you tell which type of ingredient you have?

![](https://cdn.sanity.io/images/ok7qsbpm/production/b8c4ac52078b7d3f9e2b848e4d35963dea51fe26-887x634.png)

Remember, every ingredient in your kitchen has a taste, smell, and color. You can taste, smell, or see its color to determine the ingredient you need to melt or toast, right?

![](https://cdn.sanity.io/images/ok7qsbpm/production/5d88f7c10804f9c9abdbb74fc8836408b7a09ebf-881x805.png)

That is precisely how the `type of` operator works. Every value in TypeScript has a type (just like how every ingredient has a taste), which tells us what kind of data it is and what we can do with it. Let’s see how this analogy works in TypeScript.

For example, a string is a type that represents text, and we can use methods like `toUpperCase` or `slice` on it. A number is a type that represents a numerical value, and we can use methods like `toFixed` or `Math.sqrt` on it.

Some types are called primitive types, which means they are the basic building blocks of TypeScript. There are six primitive types in TypeScript:

* `string`
* `number`
* `boolean`
* `symbol`
* `undefined`
* `null`

These types are different from each other and cannot be mixed up. In addition to this the `typeof` operator can also return `function` if the type we are checking is a function.

Sometimes, we have a variable or expression that can have more than one possible type, and we need to know the exact type to perform some operation on it. For example, suppose we have a function that takes a parameter of type `string | number`, and we want to call the `toUpperCase` method on it if it is a `string` or the `toFixed` method if it is a `number.` How can we tell TypeScript which method to use?

This is where the `typeof` operator comes in. The `typeof` operator is a way of checking the primitive type of the value. It returns a string that represents the primitive type, such as “string,” “number,” “boolean,” “undefined,” or “object.” We can use it to check if a variable or expression is of a particular primitive type or null or undefined. For example:

```typescript
function format(value: string | number): string {
  // A function that formats a value based on its type
  if (typeof value === "string") {
    // If the typeof operator returns "string", we know that the value is a string
    return value.toUpperCase();
  } else if (typeof value === "number") {
    // If the typeof operator returns "number", we know that the value is a number
    return value.toFixed(2);
  } else {
    // If the typeof operator returns anything else, we know that the value is null or undefined
    return "Invalid value";
  }
}

format("Hello"); // This will return "HELLO" because the value is a string and the toUpperCase method is used

format(3.14159); // This will return "3.14" because the value is a number and the toFixed method is used with 2 as the argument

format(null); // This will return "Invalid value" because the value is null and the typeof operator returns "object"
```

## The `instanceof` Type Guard

Sometimes, we need to check the type of object created from a class or a constructor function. A class is like a blueprint or a template that defines how to create and use objects of a certain kind. A constructor function is a unique function that creates and initializes objects of a certain class. An object created from a class or a constructor function is called an instantiated object. For example, we can create an instantiated object of a class using the new keyword and the constructor function.

Imagine you are a carpenter and have a workshop full of tools and materials. Some tools and materials have different properties and methods, such as drills, screwdrivers, screws, tables, chairs, shelves, etc. These are the non-primitive types in TypeScript, derived from primitive types or created by the user using a [class](https://www.typescriptlang.org/docs/handbook/2/classes.html). For example, a drill is a type that has properties like power and speed and methods like turn on or off.

![](https://cdn.sanity.io/images/ok7qsbpm/production/3d27ed95f8ca3ec95ea02cfbc73cc81c3170af36-760x560.png)

Sometimes, a project requires a tool or material that can be either one of two types, such as a drill or screwdriver. You need to know the exact type of the tool or the material to use the correct method on it. For example, suppose you have a project that takes a tool of type `drill | screwdriver`, and you want to turn it on if it is a drill or twist it if it is a screwdriver. How can you tell which type of tool you have?

You can use the physical differences of both tools to tell the drill apart from the screwdriver right? Because a drill and a screwdriver have distinct physical features it’s easier to differentiate them.

![](https://cdn.sanity.io/images/ok7qsbpm/production/bef44d7852f1774ce3bc2579e5992bb441853871-1096x460.png)

The `instanceof` operator is also a way of checking (differentiating with physical differences as a carpenter) the class type of an instantiated object. It checks if an object is an instance of a class or a constructor function by looking at its prototype chain. The prototype chain is a series of links that connect an object to its parent class and its parent’s parent class, and so on, until it reaches the `Object` class, which is the primary class for all objects in TypeScript. The `instanceof` operator returns true if it finds the class or the constructor function in the prototype chain of the object, and false otherwise. Also the `instanceof` operator can also be used with built-in classes or constructor functions, such as `Array`, `Date`, or `RegExp`. For example, we can write something like this:

```typescript
class Drill {
  // A blueprint that defines how to create and use objects that are drills
  power: number;
  speed: number;

  constructor(power: number, speed: number) {
    // A special function that creates and sets up drill objects
    this.power = power;
    this.speed = speed;
  }

  turnOn(): void {
    // A method that turns on the drill
    console.log("The drill is on");
  }

  turnOff(): void {
    // A method that turns off the drill
    console.log("The drill is off");
  }
}

class Screwdriver {
  // A blueprint that defines how to create and use objects that are screwdrivers
  size: number;
  shape: string;

  constructor(size: number, shape: string) {
    // A special function that creates and sets up screwdriver objects
    this.size = size;
    this.shape = shape;
  }

  twist(): void {
    // A method that twists the screwdriver
    console.log("The screwdriver is twisting");
  }
}

let tool1 = new Drill(1000, 3000); // Create a new drill object using the constructor function
let tool2 = new Screwdriver(5, "Phillips"); // Create a new screwdriver object using the constructor function

// Check the type of tool1 and use the methods of the Drill class
if (tool1 instanceof Drill) { //Note this code will onry run when tool1 is an instance of Drill
  tool1.turnOn(); // This will turn on the drill
  tool1.turnOff(); // This will turn off the drill
}

// Check the type of tool2 and use the methods of the Screwdriver class
if (tool2 instanceof Screwdriver) { //Note this code will onry run when tool2 is an instance of Screwdriver
  tool2.twist(); // This will twist the screwdriver
}

console.log(tool1 instanceof Drill); // This will return true because tool1 is an instance of the Drill class

console.log(tool2 instanceof Screwdriver); // This will also return true because tool2 is an instance of the Screwdriver class

console.log(tool1 instanceof Object); // This will return true because tool1 is also an instance of the Object class, which is the parent class of all classes in TypeScript

console.log(tool2 instanceof Object); // This will also return true because tool2 is also an instance of the Object class

console.log(tool1 instanceof Screwdriver); // This will return false because tool1 is not an instance of the Screwdriver class

console.log(tool2 instanceof Drill); // This will also return false because tool2 is not an instance of the Drill class
```

## The `in` Type Guard

Imagine that you have a library of books. Some books have a title, an author, a genre, and a number of pages; some don’t. We can say that the title, author, genre, and number of pages are the properties of the book. You can think of the book as an object and the properties as the names of the attributes that describe the object. Now let’s say your library has many books. The [`in`](https://www.typescriptlang.org/docs/handbook/advanced-types.html) operator in TypeScript allows you to check if an object has a property that belongs to a particular type. You can use the `in` operator to ask questions about the books and the library.

![](https://cdn.sanity.io/images/ok7qsbpm/production/ff88c1ad19e158464e9a46fa4c4a759e80e3f31a-796x660.png)

For example, you can use the `in` operator to check if a book has a title property. To do this, you write `title in book`, where `title` is the property name you want to check, and `book` is the object you want to check. The `in` operator will return true or false depending on whether the book has a title.

![](https://cdn.sanity.io/images/ok7qsbpm/production/730f9106ed31ca18273b2fbb20377f4311bb1630-725x520.png)

One of the features of TypeScript is that it lets you define types for your variables and expressions, which are like labels that tell you what kind of data they can store or produce. For example, you can define a type called `Person` with properties like name, age, and occupation.

Sometimes, you should check if a variable or expression has a specific property or belongs to a particular type. For example, to check if a variable `person` has a property called `name` or is of type `Person`. To do this, you can use the `in` operator.

The `in` operator takes two operands: the left operand is the name of the property you want to check, and the right operand is the variable or expression you want to check. The in operator returns a boolean value, which means it can be either `true` or `false`. For example, if you write `name in person`, the in operator will check if the person variable has a property called name and return true or false accordingly.

You can also use the in operator to check if a variable or expression belongs to a particular type. To do this, you need to use the `typeof` keyword, which returns the name of the type of the variable or expression. For example, if you write `typeof person in Person`, the in operator will check if the type of the person variable is `Person`, and return true or false accordingly.

You can also use the in operator to check if a variable or expression belongs to an `Enum` or an index type. For example, if you write `key in Enum`, the in operator will check if the key is one of the possible values of the `Enum`.

Here is an example of how to use the in operator in TypeScript:

```typescript
// Define a type called Person
type Person = {
  name: string;
  age: number;
  occupation: string;
};

// Create a variable called person of type Person
let person: Person = {
  name: "Alice",
  age: 25,
  occupation: "Software Engineer",
};

// Check if person has a property called name
console.log(name in person); // true

// Check if person has a property called hobby
console.log(hobby in person); // false

// Check if person is of type Person
console.log(typeof person in Person); // true

// Check if person is of type string
console.log(typeof person in string); // false

// Check if person has a property called name
if (name in person) {
  // If true, print the name of the person
  console.log("The name of the person is " + person.name); // The name of the person is Alice
} else {
  // If false, print a message
  console.log("The person does not have a name"); // This will not be printed
}

// Check if person has a property called hobby
if (hobby in person) {
  // If true, print the hobby of the person
  console.log("The hobby of the person is " + person.hobby); // This will not be printed
} else {
  // If false, print a message
  console.log("The person does not have a hobby"); // The person does not have a hobby
}

// Check if person is of type Person
if (typeof person in Person) {
  // If true, print the type of the person
  console.log("The type of the person is Person"); // The type of the person is Person
} else {
  // If false, print a message
  console.log("The type of the person is not Person"); // This will not be printed
}

// Check if person is of type string
if (typeof person in string) {
  // If true, print the type of the person
  console.log("The type of the person is string"); // This will not be printed
} else {
  // If false, print a message
  console.log("The type of the person is not string"); // The type of the person is not string
}
```

## Conclusion

In this article, we have learned about type guards in TypeScript, which are ways of checking and narrowing down the types of variables and expressions. We have covered the three types of type guards: `typeof`, `instanceof`, and `in`.

Type guards are one of the most powerful features of TypeScript, and they can help us write more robust and reliable code. By using type guards, we can ensure that our code is type-safe and consistent and perform the correct operations on the correct types. Type guards can also help us improve the performance and efficiency of our code by avoiding unnecessary type conversions or checks. Type guards are essential tools for any TypeScript developer who wants to write high-quality code.

Hey 👋, I believe you enjoyed this article and learned something new and valuable. You can follow me on [Twitter (or rather X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.