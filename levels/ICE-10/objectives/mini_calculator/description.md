# Part 3 - Mini Calculator

This exercise is designed to challenge you. You will be working on your knowledge of 
using user inputs, explicit conversion, decision, int.parse and other concepts that
you have learned in this course so far to build a mini calculator that can support
the following operations:
 - Add
 - Subtract
 - Multiply
 - Divide

To keep thing simple, you will be working with two numbers that are obtained from the user using
Console.ReadLine(). You will use If to decide which of the operation mentioned
above the user would like to do. In additional, you will need to verify that the user
select the option 1-4. Lastly but not the least, if the user select divide, you want to 
make sure that the second number is not a 0 as you cannot mathematically divide by a 0.

Steps:
1. cd into the Github Classroom that you cloned
2. Create a new project called **MiniCalculator**
3. Create 4 different constants from 1-4 to represent the following operations
- Add
- Subtract
- Multiply
- Divide

Eg. ```const int ADD = 1;```

4. Display the following menu on screen to the user
```
=======================================
MINI CALCULATOR VERSION 1.0
=======================================

1. Add two numbers
2. Subract two numbers
3. Multipy two numbers
4. Divide two numbers
```

5. Prompt the user and ask them what they would like to do
6. store the user choice in a variable
7. If the user choose a option that is not listed in the menu, show "Invalid choice!!!"
8. Otherwise:
- Prompt the user for the first number
- store the result in a variable
- Prompt the user for the second number
- store the result in a variable
- Perform the math with the two numbers based on the selected choice
- Display the result back to the user

*** Remember you will need to display an error if the user tried to divide the denominator by 0

**ScreenShot examples:**

```
=======================================
MINI CALCULATOR VERSION 1.0
=======================================

1. Add two numbers
2. Subract two numbers
3. Multipy two numbers
4. Divide two numbers

What would you like to do? (1-4):1
Enter the first number:4
Enter the second number:5

The result of the numbers, 4 + 5  = 9
```
