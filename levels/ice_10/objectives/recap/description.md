# Decision Statements(If/Else)
C# if else statement is a common selection statement. The if else in C# statement checks a Boolean expression and executes the code based on if the expression is true or false. The if part of the code executes when the value of the expression is true. The else part of the code is executed when the value of the expression is false. The else part of the if..else is optional.

Here is the syntax of the if..else statement. 
```
if (Boolean condition)
{
    Statement
}
else
{
    Statement
}
```

## If Statement
The if section of the statement or statement block is executed when the condition is true; if it's false, control executes the code in the else statement or statement block. The ‘else’ portion of the statement is optional.

The following code example uses an if statement to check if the value of variable a is less than 0, then display a message, ‘a is negative’. 
```
int a = -1;
if (a < 0)
{
   Console.WriteLine("a is negative.");
}
```
## Else Statement
If the “if” condition is not true, the program control goes to the “else” condition. The following code snippet uses a if..else statement to check if the value of a is less than 0. If not, then it displays a message, ‘a is 0 or positive’.
```
int a = -1;
if (a < 0)
{
   Console.WriteLine("a is negative.");
}
else
{
   Console.WriteLine("a is 0 or positive.");
}
```
# Console
The console is an operating system window where users interact with the operating system or with a text-based console application by entering text input through the computer keyboard, and by reading text output from the computer terminal. For example, in the Windows operating system, the console is called the Command Prompt window and accepts MS-DOS commands. The Console class provides basic support for applications that read characters from, and write characters to, the console.

## Console.ReadLine()
This method is used to read the next line of characters from the standard input stream. It comes under the Console class(System Namespace). If the standard input device is the keyboard, the ReadLine method blocks until the user presses the Enter key.


