# Writing your first program

Cd to your preferred location on your computer system to create assignments and run the command below to create a new C# project
```angular2html
dotnet new console -n HelloWorld
```

After you run the above command, it will create a folder called HelloWorld with your first C# project inside it.

Cd into the HelloWorld folder by running the command
```
cd HelloWorld
```

Run the command ``code .`` to open your C# project in visual studio code.
When you open your project, you should see 
```
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```
This is the default program that is generate by .NET when you create a new project.

On the top of your VSC, click on terminal and type 
```dotnet run`` to run the project. You should see Hello World print on the console

Modify the program to show
```Hello World. My name is <Your name>
```
Your program should not include the <>



