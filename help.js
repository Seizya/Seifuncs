const sfhelpData = [
	{
		name: "importHTMLs",
		explanatory: "<import-html src='./ button.html'></import-html> will be replaced with the contents of ./button.html."
	},
	{
		name: "CSS",
		explanatory: "It's for getting and setting CSSdata. \n\
		CSS(element or Selector)[Property] 「= Value」 "
	},
	{
		name: "DeriveElement",
		explanatory: "Returns an array with the arguments aligned to Elements. \n\
		DeriveElement(Selector Array or one)"
	}, {
		name: "Derie",
		explanatory: "Standard shorthand for DeriveElement."
	},
	{
		name: "GetStyle",
		explanatory: "Returns Getsies. Getsies is an instance for getting CSSdata, but this cannot be assigned a value. \n\
		GetStyle(element only).「compute()『getComputedStyle』 or style()『Style tag』」"
	}, {
		name: "Getsy",
		explanatory: "Standard shorthand for GetStyle."
	}, {
		name: "potopx",
		explanatory:"translate point into pixel. Units affected by the parent element cannot be used."
	}, {
		name: "SeChainArgument",
		explanatory: "You can put arguments into some round brackets.\n\
		Tmp(a)(b)(c)() equal Tmp(a,b,c). this must be put '()'."
	}, {
		name: "MsChainFunction",
		explanatory: "You can chain plural function.\n\
		Tmp(a)(b)(c)() equal c(b(a)). this must be put '()'."
	}, {
		name: "Note",
		explanatory: "It's class for managing listdata.「note」is Seifuncs's default.\n\
		note.cset(name,prototype,args・・・) : create new List. If there is same name list, overwrite. You can choose prototype in Array, Object, Map or variable. If three or more arguments are entered, an object with those as keys is set.\n\
		note.admit(name,prototype,args・・・) : This function has a function similar to 'note.cset'. If there is same List, Note don't create new List.\n\
		note.remove(name) : Delete list.\n\
		note.clear() : clear all list.\n\
		note.self : It's a getter for getting list's list.\n\
		note.length : return length.\n\
		note.assign = value : Fuse two notes. The source property is not overwritten if there is a property with the same name at the destination.\n\
		note.marge = value : marge two notes. The destination property is overwritten if there is a property with the same name at the source."
	}, {
		name: "BookTag",
		explanatory: "Put the candy anywhere you like on the notebook.\ Create a global variable that directly accesses the specific page of the note that was created.\n\
		For the first argument, enter the name of the note that you want to sandwich, and for the second argument, enter the name of the page you want to sandwich."
	}, {
		name: "keys",
		explanatory: "This is an object that contains key functions.\n\
		keys.hold() : Returns a Blooen value whether the key of the keycode argument is pressed.\n\
		keys.count() : Returns the number of times the key with the keycode specified in the argument was pressed. \
		If a value that is determined to be true is entered in the second argument, the count of the key specified in the first argument will be zero."
	}, {
		name: "Aom",
		explanatory: "This is an object that contains functions related to the object.\n\
		Aom.A : An object that contains functions related to arrays.\n\
		Aom.A.flat : Returns the array given as an argument as an array with no elements.\n\
		Aom.A.unDup : Return the array given as an argument so that it does not have the same child elements.\n\n\
		Aom.O : An object that contains functions related to objects.\n\
		Aom.O.is : Returns a boolean value indicating whether the given argument is an object.\n\
		Aom.O.forEach : The function of the second argument is executed for all values of the first argument Object.\n\n\
		Aom.M : An object that contains functions related to maps.\n\n\
		Aom.prototype : Get the Prototype of the argument. If a value created by the class syntax is given, the created class name is returned."
	}, {
		name: "Optionalys",
		explanatory: "Returns a boolean value indicating whether the second argument string is included in the first argument string. If the third argument is given a value that is determined to be False, it is not case sensitive."
	}, {
		name: "OmitFunctionName",
		explanatory: "The function entered in the first argument can be executed even with the function name entered in the second argument."
	}, {
		name: "OmitFn",
		explanatory: "Standard shorthand for OmitFunctionName.\n\
		If the third argument contains a value that is determined to be true, the function name that can call the function of the first argument is added without erasing the old one."
	}, {
		name: "TextSize",
		explanatory: "This is a function that adjusts the size of characters to fit in the element. '(CSS / background-size: countain)' Adjustment is done automatically when the element size changes. Give 'text_contain' to the element you want to adjust.\n\
		In the first argument, enter the element you want to adjust the size of the string. If a number is entered in the second and third arguments, the maximum width and height will be adjusted to the element percentage respectively. The default is 100%.\n\
		If the third argument is omitted, the same value as the second argument is added. As an exception, if null is entered, the value before the change is inherited for the part where null is entered.\n\
		If you enter a value that is determined to be true in the fourth argument, the percentage is changed and adjusted again with the new value.If undefined is entered in the third argument, the same value as in the second argument is compensated.\n\
		If 'add' is entered in the second argument, the element entered in the first argument is newly adjusted.Enter 'remove' to exclude from adjustment.\n\
		If the second argument is omitted, the element of the first argument is adjusted immediately."
	}, {
		name: "zeroPadding",
		explanatory: "So-called zeroPadding. Enter the number you want to zeropadding in the first argument and the number of digits in the second argument.\n\
		Note: Structurally, the first argument containing a decimal point entered as a number sequence is converted to a number sequence that does not end with 0. If you do not want to convert it, enter it as a string.\n\
		This will be addressed in the near future."
	}, {
		name: "rewindow",
		explanatory: "A function that opens a child window with the desired size and ratio. The first argument is x size and the second argument is y size.\n\
		 If a number is assigned, it indicates the ratio, and the length in the x direction can be specified with the third argument."
	}, {
		name: "Tasks",
		explanatory: "An object with functions related to automatic Tasks. A function is automatically executed when a specific situation occurs, but it is impossible to give an argument to the function. Use variables.\n\
		I want to be able to pass arguments in the near future.\n\
		add: Enter the conditional expression for the first argument, the name of the function you want to execute for the second argument, and the ID for the third argument.The third argument is optional.\n\
		remove: Only tasks that have IDs entered can be excluded from automatic tasks by entering IDs.\n\
		start: Starts automatic processing.\n\
		stop: Pauses automatic processing.\n\
		call: A function for internal processing."
	}, {
		name: "FuncProgeny",
		explanatory:"The function of the second argument is executed for all descendant elements including the element given as the first argument."
	},{
		name:"Random",
		explanatory: "This is a function that generates pseudo-random numbers within a specified range.\n\
		Enter the maximum and minimum values for the first and second arguments.The third argument can specify the number of digits after the decimal point.\n\
		If the range includes a number including a decimal point, 0 is returned unless the third argument is 1 or greater."
	}
]
const sfhelpJpData = []