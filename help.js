function sfHelp(command) {
    const sfhelpData = [{
        name: "importHTMLs",
        explanatory: "<import-html src='./ button.html'></import-html> will be replaced with the contents of ./button.html."
    }, {
        name: "CSS",
        explanatory: "It's for getting and setting CSSdata. \n CSS(element or Selector)[Property] = Value"
    }, {
        name: "DeriveElements",
        explanatory: "Returns an array with the arguments aligned to Elements. \n DeriveElement(Selector Array or one)"
    }, {
        name: "Derie",
        explanatory: "Standard shorthand for DeriveElement."
    }, {
        name: "GetStyle",
        explanatory: "Returns Getsies. Getsies is an instance for getting CSSdata, but this cannot be assigned a value. \n GetStyle(element only).「compute()『getComputedStyle』 or style()『Style tag』」"
    }, {
        name: "Getsy",
        explanatory: "Standard shorthand for GetStyle."
    }, {
        name: "potopx",
        explanatory: "translate point into pixel. Units affected by the parent element cannot be used."
    }, {
        name: "SeChainArguments",
        explanatory: "You can put arguments into some round brackets.\n Tmp(a)(b)(c)() equal Tmp(a,b,c). this must be put '()'."
    }, {
        name: "Cag",
        explanatory: "Standard shorthand for SfChainArguments."
    }, {
        name: "MsChainFunctions",
        explanatory: "You can chain plural function.\n Tmp(a)(b)(c)() equal c(b(a)). this must be put '()'."
    }, {
        name: "Cfn",
        explanatory: "Standard shorthand for MsChainfunctions."
    }, {
        name: "Note",
        explanatory: "It's class for managing listdata.「note」is Seifuncs's default.\n note.cset(name,prototype,...args) : create new List. If there is same name list, overwrite. You can choose prototype in Array, Object, Map or variable. \n note.aset(name,prototype,...args) : This function has a function similar to 'note.cset'. If there is same List, Note don't create new List.\n note.join = value : Fuse two notes. The source property is not overwritten if there is a property with the same name at the destination.\n note.assign = value : marge two notes. The destination property is overwritten if there is a property with the same name at the source."
    }, {
        name: "BookTag",
        explanatory: "Put the candy anywhere you like on the notebook.\n Create a global variable that directly accesses the specific page of the note that was created.\n For the first argument, enter the name of the note that you want to sandwich, and for the second argument, enter the name of the page you want to sandwich."
    }, {
        name: "keys",
        explanatory: "This is an object that contains key functions.\n keys('hold') : Returns a Bloolen value whether the key of the keycode argument(Second Arg) is pressed.\n keys('count') : Returns the number of times the key with the keycode specified in the argument(Second Arg) was pressed. \n	If a value that is determined to be true is entered in the third argument, the count of the key specified in the second argument will be zero.\n keys('code') : console.log(keyCode you push)"
    }, {
        name: "Aom",
        explanatory: "A function that adds or uses a method to a specific type. \nIf only one variable is assigned and executed, an associative array containing a group of functions corresponding to that variable is returned. \n\nWhen entering two or more arguments, substitute the type, function name, and function to be executed (function executed with the Aom argument as this).\n\nThis function cannot be used continuously in a chain. \nHowever, in a type with prototype, the same return value as Aom (~) can be obtained by executing ~ [aom] ()."
    }, {
        name: "Sem",
        explanatory: "This Fucntion can return Prototype of first Argument."
    }, {
        name: "Optionalys",
        explanatory: "Returns a boolean value indicating whether the second argument string is included in the first argument string. If the third argument is given a value that is determined to be False, it is not case sensitive."
    }, {
        name: "OmitFunctionName",
        explanatory: "The function entered in the first argument can be executed even with the function name entered in the second argument."
    }, {
        name: "OmitFn",
        explanatory: "Standard shorthand for OmitFunctionName.\n If the third argument contains a value that is determined to be true, the function name that can call the function of the first argument is added without erasing the old one."
    }, {
        name: "TextSize",
        explanatory: "This is a function that adjusts the size of characters to fit in the element.\n'(CSS / background-size: countain)' Adjustment is done automatically when the element size changes.\nGive 'text_contain' to the element you want to adjust.\n\n In the first argument, enter the element you want to adjust the size of the string.\n\n If a number is entered in the second and third arguments, the maximum width and height will be adjusted to the element percentage respectively.\nThe default is 100%.\n\n If the third argument is omitted, the same value as the second argument is added.\nAs an exception, if null is entered, the value before the change is inherited for the part where null is entered.\n\n If you enter a value that is determined to be true in the fourth argument, the percentage is changed and adjusted again with the new value.\nIf undefined is entered in the third argument, the same value as in the second argument is compensated.\n\n If 'add' is entered in the second argument, the element entered in the first argument is newly adjusted.\nEnter 'remove' to exclude from adjustment.\nIf the second argument is omitted, the element of the first argument is adjusted immediately."
    }, {
        name: "zeroPadding",
        explanatory: "So-called zeroPadding. Enter the number you want to zeropadding in the first argument and the number of digits in the second argument.\n Note: Structurally, the first argument containing a decimal point entered as a number sequence is converted to a number sequence that does not end with 0. If you do not want to convert it, enter it as a string.\n	This will be addressed in the near future."
    }, {
        name: "rewindow",
        explanatory: "A function that opens a child window with the desired size and ratio. The first argument is x size and the second argument is y size.\n If a number is assigned, it indicates the ratio, and the length in the x direction can be specified with the third argument."
    }, {
        name: "Tasks",
        explanatory: "This function manages automatic processing.\nTasks ('remove'): Removes the function whose ID matches the second argument from automatic processing.\nTasks ('Start'): Starts function execution.\nTasks ('Stop'): Stops function execution.\nTasks ('call'): Call automatic task processing at the time.\n\nTasks (if, function, ... args): Add a new automated task. \nAssign if and function in function format. \nThe arguments specified after the third argument are passed as arguments when the function is executed. \nThe return value is a Symbol type ID."
    }, {
        name: "ExeFuncAfterLoad",
        explanatory: "Execute Function After Window load completelty"
    }, {
        name: "Efal",
        explanatory: "Standard shorthand for ExeFuncAfterLoad."
    }, {
        name: "FuncProgeny",
        explanatory: "The function of the second argument is executed for all descendant elements including the element given as the first argument."
    }, {
        name: "Random",
        explanatory: "This is a function that generates pseudo-random numbers within a specified range.\n Enter the maximum and minimum values for the first and second arguments.\nThe third argument can specify the number of digits after the decimal point.\n If the range includes a number including a decimal point, 0 is returned unless the third argument is 1 or greater."
    }];

    if (!command) {
        return sfhelpData.map(_E0 => _E0.name);
    } else {
        return sfhelpData.filter(_E0 => _E0.name == command)[0].explanatory;
    }
}
const sfhelpJpData = [];