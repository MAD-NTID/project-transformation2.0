# Concatenate strings in C\#

Concatenation is the process of appending one string to the end of another string. You concatenate strings by using the + operator. For string literals and string constants, concatenation occurs at compile time; no run-time concatenation occurs. For string variables, concatenation occurs only at run time.

```C#
string userName = "<Type your name here>";
string dateString = DateTime.Today.ToShortDateString();

// Use the + and += operators for one-time concatenations.
string str = "Hello " + userName + ". Today is " + dateString + ".";
System.Console.WriteLine(str);

str += " How are you today?";
System.Console.WriteLine(str);
```

[Read More](https://docs.microsoft.com/en-us/dotnet/csharp/how-to/concatenate-multiple-strings)