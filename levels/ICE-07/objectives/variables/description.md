# C\# Variables
Variables represent storage locations. Every variable has a type that determines what values can be stored in the variable. C# is a type-safe language, and the C# compiler guarantees that values stored in variables are always of the appropriate type.
In short, A variable is a named container for a value with a type

In C#, there are different types of variables (defined with different keywords), for example:

- int - stores integers (whole numbers), without decimals, such as 123 or -123
- double - stores floating point numbers, with decimals, such as 19.99 or -19.99
- char - stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes
- string - stores text, such as "Hello World". String values are surrounded by double quotes
- bool - stores values with two states: true or false

Declaring (Creating) Variables
To create a variable, you must specify the type and assign it a value:

Syntax
```type variableName = value;```

Examples
Create a variable called name of type string and assign it the value "John":

```C#
string name = "John";
Console.WriteLine(name);
```
Create a variable called myNum of type int and assign it the value 15:
```
int myNum = 15;
Console.WriteLine(myNum);
```
You can also declare a variable without assigning the value, and assign the value later:
```
int myNum;
myNum = 15;
Console.WriteLine(myNum);
```
[Read More](https://www.w3schools.com/cs/cs_variables.php)