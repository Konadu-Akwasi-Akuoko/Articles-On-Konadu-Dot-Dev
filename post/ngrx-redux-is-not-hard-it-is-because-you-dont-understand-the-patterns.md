# NGRX/Redux Is Not Hard! It Is Because You Don't Understand The Pattern

Published on August 15, 2024

![NGRX/Redux Is Not Hard! Its Because You Don't Understand The Pattern](https://cdn.sanity.io/images/ok7qsbpm/production/dd170f9049b794093a852f7e1a6181b1a4cc7876-1692x1024.png?q=75&fit=clip&auto=format&fm=webp)

I have suffered before! I remember when I was trying to learn how to use the [Redux State Mangement](https://redux.js.org/) library (applies to [ngrx/store](https://ngrx.io/guide/store)). I couldn't get my head around how it's done. Moreover, I didn't understand why we are doing things the way we are doing it, it made learning Redux a real pain for me. Luckily as time went by, I began to understand the core concepts of redux.

I have learnt that to understand something better in the software engineering world we need to understand the intricate patterns pertaining to the problem.

In the book [**A Pattern Language: Towns, Buildings, Construction**](https://www.amazon.com/Pattern-Language-Buildings-Construction-Environmental/dp/0195019199), they define patterns as:

> “Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use the solution a million times over, without ever doing it the same way twice.”

So, this clearly means that to understand redux, first we need to thoroughly understand the redux pattern, until then we are [copy pasters](https://en.wikipedia.org/wiki/Copy-and-paste_programming) when it comes to [redux](https://redux.js.org/) or [ngrx](https://ngrx.io/) who are just copying and pasting methods and functions because that's what everyone is doing. And besides, in case you didn't know both [redux toolkit](https://redux-toolkit.js.org/) and ngrx are heavily based on the redux pattern, to learn about the history of the redux pattern [check this article.](https://redux.js.org/understanding/history-and-design/history-of-redux)

But we are here to just understand redux, by looking at the redux pattern in details, so let's just get started.

To really understand redux, we must first look at functional programming, because redux is heavily based on the functional programming style. After that we will go ahead and look at the redux pattern. Here is an accompanying [repo that contains files](https://github.com/Konadu-Akwasi-Akuoko/custom-redux) you can reference. And remember to understand this really well, you must code along. Now let's start.

## Functional Programming

Understanding functional programming is crucial for mastering Redux because Redux is built on functional programming principles. Such as

1. Functions as first-class citizens
2. Higher order functions
3. Function composition
4. Composition and pipping of functions
5. Currying
6. Pure functions
7. Immutability

We will first start by understanding these functional programming concepts one by one.

### Functions as first-class citizens

When we say a function is a first-class citizen, it means that we can treat functions like any other variable. We can pass functions as arguments to other functions. We can return functions from other functions. We can assign functions to variables. Take a look at the below code:

```undefined
function sayHello() {
  return "Hello World!";
}

let fn = sayHello;

console.log(fn()); // Hello World!
```

In the above code, we have a function called `sayHello`. We then assign the function to a variable called `fn`. Note that we didn't call the function `sayHello` using the parenthesis `()`. We just assigned the function to the variable `fn`. We can then call the function using the variable `fn`.

Now let's take a look at another example:

```undefined
function sayHello() {
  return "Hello World!";
}

let fn = sayHello;

function greet(fnMessage : () => string) {
  console.log(fnMessage());
}

greet(fn); // Output: Hello World!
```

In the above code, we have a function called `greet` that takes a function as an argument. We can pass the `sayHello` function to the `greet` function. This is what we mean by functions as first-class citizens. Thus, we can pass functions as arguments to other functions, return functions from other functions and assign functions to variables.

Now let's see how we can return a function from another function as if it is a variable:

```undefined
function sayHello2() {
  return function () {
    return "Hello World!";
  };
}

let fn2 = sayHello2();

let message = fn2(); 

console.log(message) // Output: Hello World!
```

From the above code, we have a function called `sayHello2` that returns another function. We can call the `sayHello2` function and assign the returned function to a variable called `fn2`. We can then call the `fn2` function to get the message `Hello World!` And this is a powerful technique in functional programming, treating functions as if they are variables.

### Higher Order Functions

Higher order functions are functions that take other functions as arguments or return functions as their results. We have seen examples of higher order functions in the previous examples. 

The key differences between higher order functions and functions as first-class citizens are

* **Scope**: First-class functions describe the ability of functions to be used as values, while higher-order functions specifically refer to functions that operate on other functions like returning or accepting a function as an argument.
* **Dependency**: Higher-order functions rely on the concept of first-class functions. [Without first-class functions, higher-order functions wouldn’t be possible.](https://www.geeksforgeeks.org/difference-between-first-class-and-higher-order-functions-in-javascript/)

Let's take a look at an example:

```undefined
function sayHello() {
  return "Hello World!";
}

function greet(fnMessage : () => string) {
  console.log(fnMessage());
}

greet(sayHello); // Output: Hello World!
```

In the above code, the `greet` function is a higher order function because it takes another function as an argument. We can pass the `sayHello` function to the `greet` function. This is what we mean by higher order functions. Functions that return or take other functions as arguments, and operate on them.

In Javascript, there are a couple of higher order functions, that take other functions as arguments. Some of these higher order functions are `map`, `filter`, `reduce`, `forEach`, `find`, `every`, `some`, `sort`, `setTimeout`, `setInterval`, etc. Here is an example of a higher order function:

```undefined
let numbers = [1, 2, 3];

let computedNumbers = numbers.map((num) => num * 2);

console.log(computedNumbers); // Output: [2, 4, 6]
```

From the above code, we have an array of numbers `[1, 2, 3]`. We then use the `map` higher order function to multiply each number by 2. The `map` function takes a function as an argument and applies (operates) the function to each element in the array. The `map` function then returns a new array with the computed values.

### Function Composition

An ideal functional program is a program that consist of small pure functions that are composed together to build more complex functions. Function composition is the process of combining two or more functions to produce a new function. We can take the output of one function and pass it as the input to another function. This is what we mean by function composition.

Take a look at the following code:

```undefined
// Initial input string with extra whitespace
let input = "  JavaScript  ";

// Function to trim whitespace from the input string
const trim = (str: string) => str.trim();

// Function to wrap the trimmed string in a <div> element
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;

// Compose the functions: first trim the input, then wrap the result in a <div>
const result = wrapInDiv(trim(input));

// Output the final result
console.log(result); // Output: <div>JavaScript</div>
```

In the above code, we have two functions `trim` and `wrapInDiv`. The `trim` function removes any whitespace around the input string. The `wrapInDiv` function wraps the input string in a div tag. We can compose these two functions together to build a more complex function. We can take the output of the `trim` function and pass it as the input to the `wrapInDiv` function.

So this is what we call function composition. We can take small [pure functions](https://en.wikipedia.org/wiki/Pure_function#:~:text=In%20computer%20programming%2C%20a%20pure,i.e.%2C%20referential%20transparency)%2C%20and) and compose them together to build more complex functions. Let's take a look at another example:

```undefined
// Initial input string with extra whitespace
let input = "  JavaScript  ";

// Function to trim whitespace from the input string
const trim = (str: string) => str.trim();

// Function to convert the string to lowercase
const toLowerCase = (str: string) => str.toLowerCase();

// Function to wrap the processed string in a <div> element
const wrapInDiv = (processedString: string) => `<div>${processedString}</div>`;

// Compose the functions: first trim the input, then convert to lowercase, then wrap in a <div>
const result = wrapInDiv(toLowerCase(trim(input)));

// Output the final result
console.log(result); // Output: <div>javascript</div>
```

In the above code, we have three functions `trim`, `toLowerCase` and `wrapInDiv`. We can compose these three functions together to build a more complex function. We can take the output of the `trim` function and pass it as the input to the `toLowerCase` function. We can then take the output of the `toLowerCase` function and pass it as the input to the `wrapInDiv` function. In this case when reading the code, we need to read it from right to left. We first trim the input, then convert it to lowercase and finally wrap it in a div tag. And remember all these are made possible by functions as first-class citizens and higher order functions.

### Composing and piping functions

In the previous examples we took a look at function composition. But we can see that sometimes it get's hard to read the code when we compose functions together. We can use a technique called composing and piping functions to make the code more readable. With this we will use a package called [`lodash/fp`](https://github.com/lodash/lodash/wiki/FP-Guide). This package provides a couple of functions that we can use to compose and pipe functions. Let's take a look at how we can use the compose function in `lodash/fp` to make our code more readable:

```undefined
// Importing compose and pipe functions from lodash/fp
import { compose, pipe } from "lodash/fp";

// Initial input string with extra whitespace
let input = "  JavaScript  ";

// Function to trim whitespace from the input string
const trim = (str: string) => str.trim();

// Function to convert the string to lowercase
const toLowerCase = (str: string) => str.toLowerCase();

// Function to wrap the processed string in a <div> element
const wrapInDiv = (processedString: string) => `<div>${processedString}</div>`;

// Compose the functions: first trim the input, then convert to lowercase, then wrap in a <div>
// compose applies functions from right to left
const transform = compose(wrapInDiv, toLowerCase, trim);

// Apply the composed function to the input
const result = transform(input);

// Output the final result
console.log(result); // Output: <div>javascript</div>

```

In the above code, we import the `compose` function from `lodash/fp`. We then compose the three functions `wrapInDiv`, `toLowerCase` and `trim` together to build a new function called `transform`. We can then call the `transform` function with the input string. This makes the code more readable and easier to understand. But remember we are still composing the functions from right to left which is someway.

We can use the `pipe` function to compose the functions from left to right. Let's take a look at how we can use the `pipe` function to compose the functions from left to right:

```undefined
// Importing compose and pipe functions from lodash/fp
import { compose, pipe } from "lodash/fp";

// Initial input string with extra whitespace
let input = "  JavaScript  ";

// Function to trim whitespace from the input string
const trim = (str: string) => str.trim();

// Function to convert the string to lowercase
const toLowerCase = (str: string) => str.toLowerCase();

// Function to wrap the processed string in a <div> element
const wrapInDiv = (processedString: string) => `<div>${processedString}</div>`;

// Compose the functions using compose: functions are applied from right to left
const transform = compose(wrapInDiv, toLowerCase, trim);

// Compose the functions using pipe: functions are applied from left to right
const transform2 = pipe(trim, toLowerCase, wrapInDiv);

// Apply the composed function (using compose) to the input
const result = transform(input);

// Apply the composed function (using pipe) to the input
const result2 = transform2(input);

// Output the final results
console.log(result); // Output: <div>javascript</div>
console.log(result2); // Output: <div>javascript</div>
```

In the above code, we import the `pipe` function from `lodash/fp`. We then compose the three functions `trim`, `toLowerCase` and `wrapInDiv` together to build a new function called `transform2`. We can then call the `transform2` function with the input string. This makes the code more readable and easier to understand. But remember we are now composing the functions from left to right, as if we are reading (ltr baby). So we first trim the input, then convert it to lowercase and finally wrap it in a `div` tag.

### Currying

Currying in functional programming is a process in which a function with multiple arguments is transformed into a sequence of functions, each with a single argument.

For example, let's say we have a function that adds two numbers:

```undefined
function add(a, b) {
  return a + b;
}
```

We can call this function with two arguments like this: `add(1, 2)`, and it will return `3`.

Now, let's curry this function:

```undefined
// Define a function named curryAdd that takes one argument 'a'
function curryAdd(a) {
  // Return a new function that takes one argument 'b'
  return function(b) {
    // This inner function returns the sum of 'a' and 'b'
    return a + b;
  }
}

// Example usage of the curried function
const addFive = curryAdd(5); // Returns a function that adds 5 to its argument, something like:
/**
*  function (b) { return 5 + b }
*/
console.log(addFive(3)); // Outputs: 8 (5 + 3)

console.log(curryAdd(5)(3)); // Outputs: 8 (5 + 3)
```

Now, we can call the curried function like this: `curryAdd(1)(2)`, and it will also return `3`.

The benefit of currying is that it allows you to create new functions by partially applying some arguments to the original function. For example, we can create a new function that adds `5` to its initial argument:

```undefined
// Call the curryAdd function with the argument 5
// This returns a new function that will add 5 to its argument
const addFive = curryAdd(5);

// Call the returned function with the argument 10
// This adds 5 (from the previous step) to 10
console.log(addFive(10)); // Outputs: 15
```

In this example, `addFive` is a new function that we created by partially applying the argument `5` to the `curryAdd` function. Now, `addFive(10)` is equivalent to `curryAdd(5)(10)`. This is a powerful technique that can make your code more flexible and reusable. It's widely used in functional programming and in JavaScript libraries such as [Ramda](https://ramdajs.com/) and [Lodash.](https://lodash.com/)

Let's take a look at anoher example:



```undefined
// Wrap the input in the div, and remove any whitespace around the input and convert
// the input to lowercase.

import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();

//  To combine these two functions into one function we can do the following:
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;
const wrapInSpan = (trimmedString: string) => `<span>${trimmedString}</span>`;

// The below function has combined the wrapInDiv and wrapInSpan functions into one function,
// which can be used to wrap the input in either a div or a span. But when using the pipe function
// we can only pass one argument to the function, so we need to create a new function that takes
// the tag as an argument and returns a new function that takes the trimmedString as an argument.
// This is called currying.
const wrapCombined = (tag: string, trimmedString: string) =>
  `<${tag}>${trimmedString}</${tag}>`;

// Rather than the above function, we can create a curried function that takes the tag as an argument
// and returns a new function that takes the trimmedString as an argument.
const wrap = (tag: string) => (trimmedString: string) =>
  `<${tag}>${trimmedString}</${tag}>`;

// So over here, we have created a curried function that takes the tag as an argument and returns a new function
// that takes the trimmedString as an argument. This is called currying.
const transform = pipe(trim, toLowerCase, wrap("div"));
// So this can also be written verbosely as:
let trimTransform = trim(input); // First, trim the input
let lowerCaseTransform = toLowerCase(trimTransform); // Then, convert the trimmed input to lowercase
let finalTransform = wrap("div")(lowerCaseTransform); // Finally, wrap the lowercase string in a <div>

const result = transform(input);

console.log(result); // Output: <div>javascript</div>
```

In the above code, we have a function called `wrap` that takes the tag as an argument and returns a new function that takes the trimmed string as an argument. We can then use the `wrap` function to create new functions that wrap the input string in different tags. This makes the code more flexible and reusable. So to call this wrap function with different arguements we can do the following:

```undefined
cont result = wrap("span")("JavaScript"); //Output: <span>JavaScript</span>
```

So we first pass in `span` as the wrap function's argument, and because the function is curried, it returns a new function that also takes/expects a string as an argument. We can then call this new function with the input string `JavaScript`.

### Pure functions

My favorite part in functional programming.

A pure function is a function that given the same input will always return the same output. It does not depend on any external state or variable. It does not modify any external state or variable. It does not have any side effects. There is also no mutation of parameters or variables. Pure functions are predictable and easy to test. They are also composable and can be used to build more complex functions. Pure functions are self-documenting and easy to understand. Take a look at this example:

```undefined
function add(a: number, b: number): boolean {
  return a > b;
}

console.log(add(1, 2)); // false

```

The above function is a pure function. It takes two numbers as input and returns true or false, based on the condition. It does not depend on any external state or variable. It does not modify any external state or variable. It does not have any side effects. It is a pure function.

Now what if we don't use pure functions, and rather we compare the value with an external variable:

```undefined
let a = 10;

function add(b: number): boolean {
  return a > b;
}

console.log(add(5)); // Output: true
```

Although the function is working as we intended, but the moment we change the value of `a` the function will return a different value. This is because the function depends on an external state or variable. It is not a pure function. It is not predictable and can have side effects. One benefit of pure functions is that it is also cachable. We can cache the result of a pure function and reuse it later. This can help improve the performance of our application.

### Immutability

Immutability simply means that once you create an object/data that data cannot be changed. If you want to change you need to first copy it then change that copy. This is a fundamental concept in functional programming. It makes our code more predictable and easier to understand. It also helps us avoid bugs and side effects. Let's take a look at an example of a direct mutation:

```undefined
let person = { name: "John", age: 30 };

// We can change the age of the person object like this:
person.age = 40;

console.log(person); // Output: { name: "John", age: 40 }
```

In the above code, we have an object called `person` with two properties `name` and `age`. We can change the `age` property of the `person` object directly. This is called mutation. It is not recommended in functional programming. Instead, we should create a new object with the updated properties. Let's take a look at how we can do this:

```undefined
let person = { name: "John", age: 30 };

// We can change the age of the person object like this:
let newPerson = { ...person, age: 40 };

console.log(person); // Output: { name: "John", age: 30 }
console.log(newPerson); // Output: { name: "John", age: 40 }
```

In the above code, we have an object called `person` with two properties `name` and `age`. We can create a new object called `newPerson` with the updated `age` property. We use the spread operator `...` to copy all the properties of the `person` object to the `newPerson` object. We then update the `age` property of the `newPerson` object. This is how we can achieve immutability in Javascript.

> A common misconception about the const keyword: The const keyword in Javascript does not make the object immutable. It only makes the reference to the object immutable. This means that you cannot reassign the variable to a new object. But you can still change the properties of the object, thus you can assign `person.age` to a different value and that will still work. So the const keyword does not guarantee immutability.

So the bottom line here is, when building applications in Redux, you should not mutate data, because this is a fundamental principle in redux. You should always create new objects with the updated properties. This will make your code more predictable and easier to understand.

One problem with copying objects into new objects is shallow copying. This means that if we have nested data, and we use the spread operator to copy the object into a new updated object, and we directly mutate the nested data, both the original object and the new object will be affected. 

> A [**shallow copy**](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) of an object is a copy whose properties share the same [references](https://developer.mozilla.org/en-US/docs/Glossary/Object_reference) (point to the same underlying values) as those of the source object from which the copy was made. As a result, when you change either the source or the copy, you may also cause the other object to change too. That behavior contrasts with the behavior of a [deep copy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy), in which the source and copy are completely independent.

This is because the spread operator only does a shallow copy. Take a look at this example:

```undefined
const person = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'New York', country: 'USA' }
// }

// Now let's do a shallow copy
const updated = {
  ...person,
  name: "Bob",
};

// Now let's change the address of the updated address city's to "Chicago"
updated.address.city = "Chicago";

console.log(updated);
// Output:
// {
//   name: 'Bob',
//   address: { city: 'Chicago', country: 'USA' }
// }

// Now let's also log the original person object
console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'Chicago', country: 'USA' }
// }
```

From the above code we clearly see that the original person object is also affected when we change the address of the updated object. This is because the spread operator only does a shallow copy. It does not do a deep copy. To solve this problem, we need to also reassign the nested object. We can use the spread operator to copy the nested object into a new object. This is how we can achieve deep copying. Take a look at this example:

```undefined
const person = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'New York', country: 'USA' }
// }

// Now let's do a deep copy

const updated = {
  ...person,
  address: {
    ...person.address,
  },
};

// Now let's change the address of the updated address city's to "Chicago"

updated.address.city = "Chicago";

console.log(updated);

// Output:
// {
//   name: 'John',
//   address: { city: 'Chicago', country: 'USA' }
// }

// Now let's also log the original person object
console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'New York', country: 'USA' }
// }
```

So you see, by copying the nested object into a new object, we can achieve deep copying. This will make sure that the original object is not affected when we change the nested object. This is how we can avoid shallow copying in Javascript. But this approach can be cumbersome and error prone. There are libraries like [`immer`](https://immerjs.github.io/immer/) that can help us achieve deep copying in a more elegant way.

#### Updating Arrays

There are many ways we can update arrays immutably, take a look at the following examples:

```undefined
const numbers = [1, 2, 3];

// Adding 
const updatedNumbers = [...numbers, 4, 5, 6];

console.log(updatedNumbers); // Output: [1, 2, 3, 4, 5, 6]

// To add an element at the beginning of the array

const updatedNumbers2 = [0, ...numbers];

console.log(updatedNumbers2); // Output: [0, 1, 2, 3]

// To add an element at a specific index

// First of all we need to find the index of the value where we want to add the element
const index = numbers.indexOf(2);
const updatedNumbers3 = [...numbers.slice(0, index), 4, ...numbers.slice(index-1)];

console.log(updatedNumbers3); // Output: [1, 4, 3]
```

Note that the `slice` method does not mutate the original array, but rather returns a new array, but it unfortunately returns a [new shallow copy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) of the original array, so the problems we spoke about still apply. But that new array is a shallow copy of the original array. This means that if the array contains objects or arrays, then the original and the copied will share the same objects or arrays.

From the above code, we have an array of numbers `[1, 2, 3]`. We can add elements to the array by using the spread operator `...`. We can add elements at the beginning of the array, at the end of the array, or at a specific index in the array. To add a value at a specific index, we first find the index of the value where we want to add the element, and store it inside a variable. We then use the `slice` method to split the array into two parts, first of all we start at index 0 and end at the index where we want to insert the new value. Note that the second parameter of the `slice` method is not inclusive, but rather exclusive. We then use the `slice` method again to get the second part of the array starting from the index which we stored. We then spread the two slices of the array into a new array. This is because the `slice` method does not mutate the original array, but rather returns a new array, so we need to spread the two slices into a new array.

To also delete a value, say `2` from the array, we can do the following:

```undefined
const updatedNumbers4 = numbers.filter((n) => n !== 2);

console.log(updatedNumbers4); // Output: [1, 3]
```

This will return a new array with all the values that are not equal to `2`. This is how we can delete a value from an array immutably.

To also update a value in an array, say we want to update the value `2` to `20`, we can do the following:

```undefined
const updatedNumbers5 = numbers.map((n) => (n === 2 ? 20 : n));

console.log(updatedNumbers5); // Output: [1, 20, 3]
```

This will return a new array with all the values that are not equal to `2` as they are, but the value that is equal to `2` will be updated to `20`. This is because the `map` method accepts a function that takes each element of the array and returns a new value. In this case, we check if the element is equal to `2`, we return `20`, otherwise we return the element as it is.

#### Enforcing immutability

Although javascript supports the functional way of building applications, it does not enforce immutability. This means that you can still mutate data in javascript. But there are libraries that can help us enforce immutability. One of such libraries is [`immutable.js`](https://immutable-js.com/) and [`immer`](https://immerjs.github.io/immer/).

#### Immutable.js

Immutable.js is a library that provides immutable data structures for javascript. It provides a set of immutable data structures that can help us enforce immutability in our applications. It provides List, Map, Set, Stack, OrderedMap, OrderedSet, Record, Range, Repeat, Seq, Collection, and Iterable. These data structures are immutable and can help us build applications in a more functional way. Let's take a look at an example of how we can use the List data structure in Immutable.js:

```undefined
import Immutable, { Map } from "immutable";

let book = Map({ title: "Harry Potter" });

function publish(book: Immutable.Map<any, any>) {
  return book.set("isPublished", true);
}

const newBook = publish(book);

console.log(book.toJS()); // Output: { title: 'Harry Potter' }
console.log(newBook!.toJS()); // Output: { title: 'Harry Potter', isPublished: true }
```

In the above code, we import the `Map` data structure from `immutable`. We then create a new `Map` object called `book` with a title property. We then create a function called `publish` that takes a `Map` object as an argument and returns a new `Map` object with the `isPublished` property set to `true`. We then call the `publish` function with the `book` object and store the result in a new variable called `newBook`. We then log the `book` object and the `newBook` object to the console. We can see that the `book` object is not mutated, but rather a new `Map` object is created with the `isPublished` property set to `true`. This is how we can enforce immutability in our applications using `immutable.js`.

#### Immer

[Immer](https://immerjs.github.io/immer/) is a library that provides a simple and effective way to work with immutable data in JavaScript. It allows us to write code that looks like it is mutating data, but under the hood, it is creating a new copy of the data. This makes our code more readable and easier to understand. Let's take a look at an example of how we can use Immer to work with immutable data:

```undefined
import { produce } from "immer";

let book = { title: "Harry Potter" };

function publish(book: any) {
  return produce(book, (draftBook : any) => {
    draftBook.isPublished = true;
  });
}

const newBook = publish(book);

console.log(book); // Output: { title: 'Harry Potter' }
console.log(newBook); // Output: { title: 'Harry Potter', isPublished: true }
```

In the above code, we import the `produce` function from `immer`. We then create a new object called `book` with a title property. We then create a function called `publish` that takes an object as an argument and returns a new object with the `isPublished` property set to `true`. We use the `produce` function to create a new object based on the `book` object. We then update the `draftBook` object inside the `produce` function. We then log the `book` object and the `newBook` object to the console. We can see that the `book` object is not mutated, but rather a new object is created with the `isPublished` property set to `true`. This is how we can work with immutable data in javascript using `immer`.

## Redux Pattern

Now after understanding all the basics of functional programming, we can now dive into Redux. Redux is a predictable state container for javascript applications. It helps us manage the state of our application in a predictable way. It is based on these principles/patterns/architectures:

### **Single source of truth - A store**

 The state of the whole application is stored in an object tree within a single store. This makes it easier to debug and inspect the state of the application. So this means that all data inside our application is stored inside a single object called the store. We can not directly mutate or change the state of the store, because redux is built on the fundamental principle of immutability(functional programming). So this means that we cannot write code like this:

```undefined
 store.currentUser = { name: "John", age: 30 };
```

In the above code we are directly mutating the value of the `currentUser` which is found in the store, and this is not allowed in redux. So, to update the store we will need to write a function that will take the current state of the store and return an `updated/new` store with updated values.

### A function to compute the new state of the store - A Reducer

In the function that we will write we need to use the spread operator to copy the current state of the store into a new object, and then update the values of the new object.

Or we can use libraries like [`immer`](https://immerjs.github.io/immer/) to help us update the store in a more elegant way. So, this function that we write is called a **`reducer`** function.

The term "reducer" comes from the concept of a **reduce function** in functional programming. A reducer function in functional programming is used to reduce a collection of values down to a single value.

In Redux, a **reducer** function serves a similar purpose. It takes the current state and an **action **(we will explain it later), and then returns a new state, effectively reducing both the state and the action into a new state.

It's a way of describing a function that takes a collection of values **(the current state and an action)**, and reduces them down to a single value **(the new state)**. This aligns with the principles of immutability and pure functions, which are core concepts in Redux. Here is an example of how a reducer function looks like:

```undefined
function reducer(store) {
  const update =  { ...store };
  return update;
}
```

In the above code, we have a function called `reducer` that takes the current state of the store as an argument. We then copy the current state of the store into a new object called `update`. We then return the `update` object, meaning we can add or update the values inside the update object and return it as our new store.

### What to update - An Action

But the question is, if we want to update a part of the store, how will the reducer function know which part of the store to update? 

This is where **`actions`** come in. So, basically an action will tell the reducer function what part of the plain object store to update. Now based on that action the reducer function will know which part of the store to update.

The action is an object mostly containing 2 values in most redux patterns, the `type` and the `payload.`

This is how an action looks like:

```undefined
const action = {
  type: "UPDATE_USER",
  payload: { name: "John", age: 30 },
};

function reducer(store, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...store, user: action.payload };
    default:
      return store;
  }
}
```

From the above code you saw that the action is also a JavaScript object, that contains the `type` of action and the `payload`. The `type` of action is a string that describes the action that we want to perform. The `payload` is the data that we want to update in the store (the new data). So in the reducer function we use a `switch` statement to check the `type` of action. If the `type` of action is `UPDATE_USER`, we update the `user` property of the store with the `payload` data. If the `type` of action is not `UPDATE_USER`, we return the current state of the store.

Now from the above we now know 3 basic concepts in Redux.

* First of all, we have the store, which is a plain object that contains all the data of our application.

```undefined
{
  user : {
    name : 'Akwasi Konadu',
    age : 58,
    hobbies : ['reading', 'swimming', 'eating']    
  },
  fruits : ['apple', 'onion', 'lettuce']
}
```

* Secondly, we have the reducer function, which is a function that takes the current state of the store and an action, and computes a new state based on the action that we want to perform.

![](https://cdn.sanity.io/images/ok7qsbpm/production/da166d691ed0246c7b17d8203dc44fbd9b90e9ee-564x243.png)

```undefined
const action = {
  type: "UPDATE_USER",
  payload: { name: "John", age: 30 },
};

function reducer(store, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...store, user: action.payload };
    default:
      return store;
  }
}

// New store
{
  user : {
    name : 'Jhon',
    age : 30,    
  },
  fruits : ['apple', 'onion', 'lettuce']
}

```

* And lastly we have the action, which is an object that describes the action that we want to perform and the data that we want to update in the store (type and payload).

```undefined
const action = {
  type: "UPDATE_USER",
  payload: { name: "John", age: 30 },
};
```

Now how do all these building blocks work together?

* Updating the store or the state in Redux always starts with an action. You will need to dispatch an action to update the store. The action is an object that describes the action that we want to perform and the data that we want to update in the store (type and payload).
* The store takes in the action and the current state of the store and passes it to the reducer function.
* The reducer function then computes a new state based on the action that we want to perform. The reducer function then returns the new state of the store.
* The store then updates the state of the store with the new state, thus replaces the old state with the new state of the store.

![](https://cdn.sanity.io/images/ok7qsbpm/production/cbae1e4422edb0724cc368a1cb5752fce9266570-852x648.png)

This is how all the building blocks work together in Redux. So in a more complete form we would have something like this as our diagram:

![](https://cdn.sanity.io/images/ok7qsbpm/production/267c2a636b1b0b6c87586a3d4d0ea17bc684296c-852x648.png)

An action, which is an object describing the action to be performed and the data to be updated (type and payload), is dispatched to initiate the update. This action is then taken by the store, which combines it with the current state and passes both to the reducer function. The reducer function processes the current state and the action to compute a new state. This new state is then returned to the store, which updates its state by replacing the old state with the new one. This cycle ensures that the state is consistently updated based on the actions dispatched, maintaining a predictable state management flow in the application.

## Redux State Management Library

Now let's build a small app that utilizes all the concepts we have spoken about. We will build a simple bug tracking redux store that will have the following features:

* Add a bug.
* Remove a bug.
* Resolve a bug.
* Set a bug to in progress.

Let's start listing the steps to create our redux store:

* Design the store.
* Design the actions.
* Create a reducer function.
* Set up the store.

### Designing the store

In a simple bug tracking app, we can use this structure as a store:

```undefined
{
  bugs: [
    { id: 1, description: "Bug 1", resolved: false },
    { id: 2, description: "Bug 2", resolved: false },
    { id: 3, description: "Bug 3", resolved: false },
  ];
  currentUser : {}
}
```

From the above store, we have a `bugs` property that is an array of bugs. Each bug has an `id`, `description`, and `resolved` property. We also have a `currentUser` property that is an object that contains the current user of the application, which we will set the `currentUser` when the user logs in.

Now let's introduce a new terminology called a `slice`. A slice is a part of the store that contains a specific part of the state. In our store, we have two slices, the `bugs` slice and the `currentUser` slice. Each slice contains a specific part of the state of the application. So we can say that in an object tree a slice is one level down in the tree.

![](https://cdn.sanity.io/images/ok7qsbpm/production/d96379944b7c649675714662582d10fc7c009549-852x648.png)

But for now let's make our store simple, something like this will do:

```undefined
{
  bugs : []
}
```

### Defining the actions

Now the question is what are some of the actions that we can perform in our bug tracking app? We can have the following actions:

* Add a Bug
* Mark as Resolved
* Delete a Bug

So an action is just a plain JavaScript object that defines what has happened in the application. It has a `type` property that describes the action that we want to perform and a `payload` property that contains the data that we want to update in the store. So, let's define the actions that we can perform in our bug tracking app:

```undefined
{
  type: "ADD_BUG",
  payload: { id: 1, description: "Bug 1" , resolved: false }
}

{
  type : "REMOVE_BUG",
  payload: { id: 1 }
}

{
  type: "RESOLVE_BUG",
  payload: { id: 1 }
}
```

From the above code we have defined three actions that we can perform in our bug tracking app. We have the `ADD_BUG` action that adds a bug to the store. We have the `REMOVE_BUG` action that removes a bug from the store. We have the `RESOLVE_BUG` action that marks a bug as resolved in the store. Each action has a `type` property that describes the action that we want to perform and a `payload` property that contains the data that we want to update or add in the store.

### Creating a reducer

Now as we said earlier, a reducer is a function that takes in 2 arguments, the current state of the store and an action, and then returns a new state based on the action that we want to perform. So let's create a reducer function that will take in the current state of the store and an action, and then return a new state based on the action that we want to perform:

```undefined
export function reducer(state: any, action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_BUG":
      return [...state, action.payload];
    case "REMOVE_BUG":
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case "RESOLVE_BUG":
      return state.map((bug: any) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
```

From the above code, we have created a reducer function that takes in the current state of the store and an action. We then use a `switch` statement to check the `type` of action.

* If the `type` of action is `ADD_BUG`, we add a new bug to the store. We use the spread operator `...` to copy the current state of the store into a new array and then add the new bug to the array.
* If the `type` of action is `REMOVE_BUG`, we remove a bug from the store. We use the `filter` method to filter out the bug that we want to remove from the store. Remember the filter method does not mutate the original array, but rather returns a new array. But this methods does a shallow copy, so if the array contains objects or arrays, then the original and the copied will share the same reference address of the objects or arrays.
* If the `type` of action is `RESOLVE_BUG`, we mark a bug as resolved in the store. We use the `map` method to map over the array of bugs and then update the bug that we want to mark as resolved. If we find a value that matches the id of the bug that we want to mark as resolved, we copy the bug into a new object and then update the `resolved` property of the bug to `true`. If the value does not match the id of the bug that we want to mark as resolved, we return the bug as it is.

Now note that the reducer function will be called by the store, in it's instantiating, so we will need to provide the initial state of the store in the reducer. So let's provide the initial state of the store in the reducer function:

```undefined
export function reducer(state: any = [], action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_BUG":
      return [...state, action.payload];
    case "REMOVE_BUG":
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case "RESOLVE_BUG":
      return state.map((bug: any) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
```

From the above code, we have provided the initial state of the store as an empty array `[]`. This is the initial state of the store. When the store is instantiated, the reducer function will be called with the initial state of the store and an action. If the state is not provided, the reducer function will use the initial state of the store as an empty array `[]`.

### Creating the Store

After creating our reducer function we then proceed to create our store.

```undefined
import { legacy_createStore as createStore } from "redux";
import { reducer } from "./reducer";

export const store = createStore(reducer);
```

From the above code, we import the `createStore` function from `redux`. We then import the `reducer` function that we created earlier. We then create a store using the `createStore` function and pass in the `reducer` function as an argument. This will create a store with the initial state of the store as an empty array `[]` and the reducer function that we created earlier.

### Dispatching actions

Dispatching simply means triggering a state change with the store.

Now that we have created our store, we can now dispatch actions to the store to update the state of the store. We can dispatch actions using the `dispatch` method of the store.

> Note that in the original redux, the store takes in an action, and as we have stated over and over again, the action is an object with a `type` and `payload` properties.

 Let's take a look at how we can dispatch actions to the store:

```undefined
import { store } from "./store";

// Subscribe to store changes and log the state
const unsubscribe = store.subscribe(() => {
  console.log("Current state:\n", store.getState());
});

// Dispatch an action to add a bug
store.dispatch({
  type: "ADD_BUG",
  payload: { id: 1, description: "Bug 1", resolved: false },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false }
  ]
}
*/

// Dispatch another action to add a second bug
store.dispatch({
  type: "ADD_BUG",
  payload: { id: 2, description: "Bug 2", resolved: false },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ]
}
*/

// Dispatch an action to resolve the first bug
store.dispatch({
  type: "RESOLVE_BUG",
  payload: { id: 1 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ]
}
*/

// Log the current state directly
console.log(store.getState());
/*
Output:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ]
}
*/

// Dispatch an action to remove the second bug
store.dispatch({
  type: "REMOVE_BUG",
  payload: { id: 2 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true }
  ]
}
*/

// Unsubscribe from store changes
unsubscribe();

```

From the above code, we import the `store` that we created earlier. We then subscribe to the store using the `subscribe` method of the store. The `subscribe` method takes a callback function that will be called whenever the state of the store changes. We then dispatch actions to the store using the `dispatch` method of the store. We dispatch an `ADD_BUG` action to add a bug to the store. We then dispatch a `RESOLVE_BUG` action to mark a bug as resolved in the store. We then log the state of the store to the console. We then dispatch a `REMOVE_BUG` action to remove a bug from the store. We then log the state of the store to the console.

### Using `combineReducers() in redux state management library`

In a real-world application, we will have multiple slices of the store. Each slice will have its own reducer function. We can use the `combineReducers` function from `redux` to combine multiple reducer functions into a single reducer function. Let's take a look at how we can use the `combineReducers` function to combine multiple reducer functions into a single reducer function. 

We will start by creating an action type file. Why you are asking?

By defining action types as constants, you avoid typos and inconsistencies, ensuring that the action types are used consistently throughout your codebase. This approach also simplifies refactoring, as you only need to update the action type in one place. So let's create one:  


```undefined
export const ADD_BUG = "ADD_BUG";
export const REMOVE_BUG = "REMOVE_BUG";
export const RESOLVE_BUG = "RESOLVE_BUG";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

```

Then we create our customer reducer:

```undefined
import { ADD_USER, REMOVE_USER } from "./actionTypes";

export function customerReducer(
  state: { name: string; age: number; id: number }[] = [],
  action: { type: string; payload: { name?: string; age?: number; id: number } }
) {
  switch (action.type) {
    case ADD_USER:
      return [...state, { ...action.payload }];
    case REMOVE_USER:
      return state.filter((user: any) => user.id !== action.payload.id);
    default:
      return state;
  }
}

```

From the above code, we import the `combineReducers` function from `redux`. We then import the `bugReducer` and the `customerReducer` that we created earlier. We then use the `combineReducers` function to combine the `bugReducer` and the `customerReducer` into a single reducer function called `rootReducer`. We then create a store using the `createStore` function and pass in the `rootReducer` function as an argument. This will create a store with the initial state of the store as:

```undefined
{
  bugs: [],
  customers: [],
}
```

Now how many slices do we have?

Two right, the `bugs` slice and the `customers` slice.

Now we have a single reducer function that combines the `bugReducer` and the `customerReducer` into a single reducer function. This makes it easier to manage the state of the store in a more organized way. And note that when working with the reducer function, the state argument of the reducer function will only return the slice of the store that we are interested in. So in the `bugReducer` function, the state argument will only return the `bugs` slice of the store. And in the `customerReducer` function, the state argument will only return the `customers` slice of the store.

Now let's see how we can use our store.

```undefined
import { ADD_BUG, ADD_USER, REMOVE_BUG, REMOVE_USER, RESOLVE_BUG } from "./actionTypes";
import { store } from "./store";

// Subscribe to store changes and log the state
const unsubscribe = store.subscribe(() => {
  console.log("Current state:\n", store.getState());
});

// Dispatch an action to add a bug
store.dispatch({
  type: ADD_BUG,
  payload: { id: 1, description: "Bug 1", resolved: false },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false }
  ],
  "users": []
}
*/

// Dispatch an action to add a user
store.dispatch({
  type: ADD_USER,
  payload: { name: "John Doe", age: 25, id: 1 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false }
  ],
  "users": [
    { "name": "John Doe", "age": 25, "id": 1 }
  ]
}
*/

// Dispatch another action to add a second bug
store.dispatch({
  type: ADD_BUG,
  payload: { id: 2, description: "Bug 2", resolved: false },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ],
  "users": [
    { "name": "John Doe", "age": 25, "id": 1 }
  ]
}
*/

// Dispatch an action to add a second user
store.dispatch({
  type: ADD_USER,
  payload: { name: "Jane Doe", age: 22, id: 2 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ],
  "users": [
    { "name": "John Doe", "age": 25, "id": 1 },
    { "name": "Jane Doe", "age": 22, "id": 2 }
  ]
}
*/

// Dispatch an action to remove the first user
store.dispatch({
  type: REMOVE_USER,
  payload: { id: 1 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ],
  "users": [
    { "name": "Jane Doe", "age": 22, "id": 2 }
  ]
}
*/

// Dispatch an action to resolve the first bug
store.dispatch({
  type: RESOLVE_BUG,
  payload: { id: 1 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ],
  "users": [
    { "name": "Jane Doe", "age": 22, "id": 2 }
  ]
}
*/

// Dispatch an action to remove the second bug
store.dispatch({
  type: REMOVE_BUG,
  payload: { id: 2 },
});
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true }
  ],
  "users": [
    { "name": "Jane Doe", "age": 22, "id": 2 }
  ]
}
*/

// Unsubscribe from store changes
unsubscribe();

```

From the above code, we import the `store` that we created earlier. 

* We then subscribe to the store using the `subscribe` method of the store. 
* We then dispatch actions to the store using the `dispatch` method of the store. 
  * We dispatch an `ADD_BUG` action to add a bug to the store. 
  * We then dispatch an `ADD_USER` action to add a user to the store. 
  * We then dispatch an `ADD_BUG` action to add another bug to the store. 
  * We then dispatch an `ADD_USER` action to add another user to the store. 
  * We then dispatch a `REMOVE_USER` action to remove a user from the store. 
  * We then dispatch a `RESOLVE_BUG` action to mark a bug as resolved in the store. 
  * We then dispatch a `REMOVE_BUG` action to remove a bug from the store. We then unsubscribe from the store.

### Action Creators

Action creators are pure functions that create actions by returning an object. They are used to encapsulate the logic of creating actions. This makes it easier to create actions in our application. Let's take a look at how we can create action creators in our bug tracking app:



```undefined
import { ADD_BUG, REMOVE_BUG, RESOLVE_BUG } from "./actionTypes";

export function addBug(payload: { id: number; description: string; resolved: boolean }) {
  return {
    type: ADD_BUG,
    payload,
  };
}

export function removeBug(payload: { id: number }) {
  return {
    type: REMOVE_BUG,
    payload,
  };
}

export function resolveBug(payload: { id: number }) {
  return {
    type: RESOLVE_BUG,
    payload,
  };
}
```

From the above code, we have created action creators for the `ADD_BUG`, `REMOVE_BUG`, and `RESOLVE_BUG` actions. Each action creator is a function that takes a `payload` as an argument and returns an action object with the `type` and `payload` properties. This makes it easier to create actions in our application. To use these action creators, we can import them into our application and call them to create actions:

```undefined
import { addBug, removeBug, resolveBug } from "./actionCreators";
import { store } from "./store";

// Subscribe to store changes and log the state
const unsubscribe = store.subscribe(() => {
  console.log("Current state:\n", store.getState());
});

// Dispatch an action to add the first bug
store.dispatch(addBug({ id: 1, description: "Bug 1", resolved: false }));
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false }
  ]
}
*/

// Dispatch an action to add the second bug
store.dispatch(addBug({ id: 2, description: "Bug 2", resolved: false }));
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": false },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ]
}
*/

// Dispatch an action to resolve the first bug
store.dispatch(resolveBug({ id: 1 }));
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true },
    { "id": 2, "description": "Bug 2", "resolved": false }
  ]
}
*/

// Dispatch an action to remove the second bug
store.dispatch(removeBug({ id: 2 }));
/*
Current state:
{
  "bugs": [
    { "id": 1, "description": "Bug 1", "resolved": true }
  ]
}
*/

// Unsubscribe from store changes
unsubscribe();

```

Now we can use the action creators to create actions in our application. This makes it easier to create actions in our application and encapsulates the logic of creating actions.

## Conclusion

If you ask me, I would say we had fun, getting to know redux, from the functional programming perspective to creating our own store. And that is all there is to something like redux or ngrx.

All these libraries are not monsters, but it takes time to understand it really well, but the thing is if you understand the basics, you just need a few hours to get conversant with something like [redux-toolkit](https://redux-toolkit.js.org/) or [ngrx/store](https://ngrx.io/guide/store).

And did you notice that we did not talk about selectors, the thing is if you get all there is to know about store, reducers, and actions, it will be easy to wrap your head around selectors (it's not something hard).

Hey 👋, I believe you enjoyed this book 😂😂😂 and learned something new and valuable. Learn about how to test [Router.navigate in Angular here.](https://konadu.devhow-to-test-router-navigate-in-angular)

You can also follow me on [Twitter (or instead X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!