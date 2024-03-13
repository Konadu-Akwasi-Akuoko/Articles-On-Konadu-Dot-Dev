# Introduction To OOP: Classes

Published on March 13, 2024

![Introduction to oop: classes](https://cdn.sanity.io/images/ok7qsbpm/production/cd48230fa0b9ed3aa87fc12386c4ce8e0767ebc8-1692x1024.jpg?q=75&fit=clip&auto=format&fm=webp)

In the last post, we talked extensively[ about objects in OOP](https://konadu.dev/introduction-to-oop-objects). We said that objects are the building blocks of every object-oriented program. We also saw that objects are the combination of data or attributes and methods to manipulate that data. Unlike procedural programming, which lets you create global data or attributes and use functions to manipulate the global data, object-oriented programming makes you combine your data and the methods you can use to manipulate that data, and that is what we term an object.  
We can't also talk about objects without talking about classes; if we do that, it will be like talking about algorithms without talking about data structures; it doesn't make sense. So, without further ado, let's talk about classes in OOP.

## What exactly is a class?

A class is a blueprint for an object. When you instantiate an object, you use a class as the basis for building the object. Describing a class without using the term object and describing an object without a class is also tricky. For example, a specific individual bike is an object. However, someone had to have created the blueprints (the class) to build the bike. In OO concepts, the class comes first, and then the objects use the class as a blueprint.

![](https://cdn.sanity.io/images/ok7qsbpm/production/87f7bb2c93957741adaef2a4f214d44808bf8290-2352x1600.jpg)

The following sections describe some of the fundamental concepts of classes and how they interact.

## Creating objects from classes

Classes can be thought of as the templates for objects. A class is used to create an object.

When you create objects, each object has its own attributes (data) and behaviors (functions or routines). A class defines the attributes and behaviors all objects created with this class will possess. Classes are pieces of code. Objects instantiated(created) from classes can be distributed individually or as part of a library. Because objects are created from classes, classes must define the basic building blocks of objects (attributes, behavior, and messages). In short, you must design a class before creating an object.

```java
// Here we define a class called ClassToObject. This is the main entry point of our java file, which contains our main method.
public class ClassToObject {

    // Here we define a static inner class called Employee. This class is also a template for creating objects.
    public static class Employee {

        // These are the attributes of the Employee class. Each object created from this class will have these attributes.
        private String name = "John Doe";
        private String socialSecurityNumber;
        private String dateOfBirth;
        private String phoneNumber;

        // This is a behavior of the Employee class. It allows us to set the value of the socialSecurityNumber attribute.
        public void setSocialSecurityNumber(String socialSecurityNumber) {
            this.socialSecurityNumber = socialSecurityNumber;
        }

        // This is another behavior of the Employee class. It allows us to get the value of the socialSecurityNumber attribute.
        public String getSocialSecurityNumber() {
            return socialSecurityNumber;
        }

        // This is another behavior of the Employee class. It allows us to get the value of the name attribute.
        public String getName() {
            return name;
        }

    }

    // This is the main method where the program starts. Here we create an object of the Employee class.
    public static void main(String[] args) {

        // Here we create an object of the Employee class. This object has its own attributes and behaviors as defined by the Employee class.
        Employee employee = new Employee();

        // Here we use the getName behavior of the employee object to get the value of the name attribute and print it.
        System.err.println(employee.getName());

    }

}
```

The following is also an example of a `Person` class, which will be a blueprint for an `Person` object:

```java
public class Person {

    // Attributes
    private String name;
    private String address;

    // Methods
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String adr) {
        address = adr;
    }

}
```

## Attributes

The data of a class is represented by `attributes`. Each class must define the attributes that will store the state of each object instantiated from that class. In the `Person` class example, the `Person` class defines attributes for `name` and `address`.

> **Access Designations** - When a data type or method is defined as _public_, other objects can directly access it. When a data type or method is defined as _private_, only that specific object can access it. Another access modifier, _protected_, allows access by related objects.

## Methods

Methods implement the required behavior of a class. Every object instantiated from this class includes methods as defined by the class. Methods may implement behaviors that are called from other objects (messages) or provide the fundamental, internal behavior of the class. **Internal behaviors are private methods** that are not accessible by other objects. Here is an example of a private method:

```java
    private void printName() {
        System.out.println(name);
    }
```

In the Person class, the behaviors are `getName()`, `setName()`, `getAddress()`, and `setAddress()` which are public methods. These methods allow other objects to inspect and change the values of the object's attributes. This is a common technique in OO systems. In all cases, access to attributes within an object should be controlled by the object itself with its public methods—no other object should directly change another object's attribute.

## Messages

Messages are the communication mechanism between objects. For example, when Object A invokes a method of Object B, Object A sends a message to Object B. Object B's response is defined by its return value. Only the public methods, not the private methods, of an object can be invoked by another object. The below code demonstrates this concept.

```java
public class Payroll {

    public Payroll() {
        String name;
        // Instantiate a new Person object
        Person person = new Person();
        // Call the public method setName() on the person object
        person.setName("John Doe");
        name = person.getName();

        System.out.println(name);
    }
}
```

In this example (assuming that a `Payroll` the object is instantiated), the Payroll object is sending a message to a `Person` object, to set the name via `setName` and also retrieving the name via the `getName()` method.

## Conclusion

What would you say if I asked you what a class is?

> Basically it is a blueprint for an [object ](https://konadu.dev/introduction-to-oop-objects)in object oriented programs. It contains the attributes or data and the methods other objects will use to interact with the object when it is instantiated.

In the next blog post, we will talk about the four building blocks of OOP:

1. Encapsulation
2. Polymorphism
3. Inheritance
4. Composition

And I am also reading a book called Object-Oriented Thought Process(not an affiliate link), which inspired this blog post. I am also writing some notes down as I read; if it is something you like, check out this [GitHub repo for my notes on OOP](https://github.com/Konadu-Akwasi-Akuoko/Object-Oriented-Thought-Process/tree/main/notes), and don't forget to also star and share the repo with your friends.

Hey 👋, I believe you enjoyed this article and learned something new and valuable. If you are into NextJS, check out if [NextJS is using unreleased React features over here](https://konadu.dev/is-nextjs-using-unreleased-experimental-react-features). You can also follow me on [Twitter](https://twitter.com/akuoko_konadu) (or instead X 😂) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!