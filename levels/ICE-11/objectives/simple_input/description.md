# Part 1 - Simple Inputs

In this exercise, you will be working with simple inputs. The goal of this exercise is for you to practice interacting with
inputs that are entered from the keyboard, store them in a variable, verify inputed numeric value are number and display some information back to the user.

*** For this exercise, you are required to use string interpolation technique. In other word, you are not allowed to use replacement or concatentation on this exercise ***

Steps:
1. cd into the classroom repository folder that you cloned
2. Create a new project called **SimpleInputs** in the repository using the dotnet command
3. cd into the SimpleInputs project
4. Delete the Console.WriteLine("Hello World");
5. Prompt the user for their full name
6. Store the name in a variable with the appropriate type
7. Prompt the user for their age
8. Use  try parse to ensure the user entered a number. If the user didnt enter a number, display "You must enter a number for age!". Otherwise proceed with the rest of the prompting as follow below
9. Store the age in a variable with the appropriate type
10. Perform a simple calculation with the age that the user will be in 5 years time and store the result in a variable
11. Display the following information back to the console
```
    Hello <name>,
    You are <age> and in 5 years time you will be <age in 5 years time>
```

Screenshot example:
```
Enter your name:Kemoy Campbell
Enter your age:15

Hello Kemoy,
You are 15 and in 5 years time you will be 20.
```