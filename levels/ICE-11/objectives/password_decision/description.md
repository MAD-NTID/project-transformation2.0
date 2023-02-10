# Part 2 - Simple User Login System
```
Note: The password has changed from ICE-10
```

In this exercise, you will be working with inputs, constants, try parse and if statement to build a simple
user logon system. In fact, you will be building the logon screen that is used by Tony Stark!

Steps:
1. cd into the classroom repository that you cloned
2. Create a new project called ***PasswordDecision***
3. Create a constant to store the username, "tony"
4. Create a constant to store the password, 124687
5. Display the following on the console 
```
========================================
||        TONY STARK                  ||
||        ENTERPRISE		              ||
||======================================

Please Login
```
6. Prompt the user for the username
7. Store the username in a variable
8. Prompt the user for the password
9. Since the password are integer, you will need to verify that the user enter digits. If the user enter a non-digit for the password, you must show "Password must be a digit"
10. Store the password in a variable

11. Use decision statement to check if the user supplied the correct username and password
    1. If the username and password are correct, display "Welcome Tony Stark!"
    2. If the username and password are incorrect, display "Incorrect username or password!"

**Screenshot example:**
- Correct username and password
```
Username:tony
Password:124687

Welcome Tony Stark!
```

- Incorrect username or password
```
  Username:foo
  Password:jarvisTheBestAI!
  
  Incorrect username or password!
```