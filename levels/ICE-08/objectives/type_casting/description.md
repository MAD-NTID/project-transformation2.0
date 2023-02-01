# Type Casting & Conversion

Because C\# is statically-typed at compile time, after a variable is declared, it cannot be declared again or assigned a value of another type unless that type is implicitly convertible to the variable's type. For example, the string cannot be implicitly converted to int. Therefore, after you declare i as an int, you cannot assign the string "Hello" to it, as the following code shows:

```
int i;

// error CS0029: Cannot implicitly convert type 'string' to 'int'
i = "Hello";

```
However, you might sometimes need to copy a value into a variable or method parameter of another type. For example, you might have an integer variable that you need to pass to a method whose parameter is typed as double. Or you might need to assign a class variable to a variable of an interface type. These kinds of operations are called type conversions. In C#, you can perform the following kinds of conversions:

Implicit conversions: No special syntax is required because the conversion always succeeds and no data will be lost. Examples include conversions from smaller to larger integral types, and conversions from derived classes to base classes.

Explicit conversions (casts): Explicit conversions require a cast expression. Casting is required when information might be lost in the conversion, or when the conversion might not succeed for other reasons. Typical examples include numeric conversion to a type that has less precision or a smaller range, and conversion of a base-class instance to a derived class.

User-defined conversions: User-defined conversions are performed by special methods that you can define to enable explicit and implicit conversions between custom types that do not have a base class–derived class relationship. For more information, see User-defined conversion operators.

Conversions with helper classes: To convert between non-compatible types, such as integers and System.DateTime objects, or hexadecimal strings and byte arrays, you can use the System.BitConverter class, the System.Convert class, and the Parse methods of the built-in numeric types, such as Int32.Parse. For more information, see How to convert a byte array to an int, How to convert a string to a number, and How to convert between hexadecimal strings and numeric types.

[Read More](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/types/casting-and-type-conversions)