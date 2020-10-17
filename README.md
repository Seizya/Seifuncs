# Seifuncs
This is usefull corection of JavaScript Functions.  
This improves method chain.</br>
*caution* : Developer only think good for Seizya because they are Seizya alone.  

# How use
0. Download and unZip this.
1. Load `main.js` as ESmodule.
  
# License
Read LICENSE.

# Bug report
Issue or Pullrequest on Github;
or e-mail.

# Caution 
0. Developer never like `IE` and `like IE`.  
 -> they will not be supported.
1. This uses XMLHttpRequest on the main thread because some funcs need sync request, but there is few determinal effects.

# Contents
## 0. Chain
### original method
0. **set** / literally (level2 : can not accept same named key that prototype already has.)
1. **cset** / like below.
2. **fset** / like below.
3. **get** / return added arg's prototype's method  / arg : any
4. **sync** / all prototype sync.
5. **restore** / release added method (only can use level2)

### Array
0. **fullFlat** / completely make array flated.
1. **unDup** / remove duplicate element. / aeg0 : choose element more behind or not.
2. **to** / translate into Object or Map / aeg0 : String
3. **equal** / whether array and arged array have not difference elements / arg0 : array 
4. **rap** / return contained array.

### Object 
0. **deepCopy** / literally.
1. **to** / like above.

### Map
0. **cset** / if key is not in map, key is set. / arg : like Map.set
1. **fset** / key is set only once. / arg : like Map.set
2. **to** / like above.

### String
 0. **comprise** / whether string has arged string without distinction.   / arg0 : string
 1. **potopx** / traslate unit into px.
 
### Number
0. **zeroPadding** / literally / arg0 : dig (number)

### Window
0. **css** / return computedStyle / arg0 : string (min, max, width, height)

### HTMLElement
0. **css** / like above + set style value / arg0 : string (like above + proto + key) - arg1 : any (value)
1. **addEventTasks** / like addEventListener / args : if · listener · args
2. **descendantFlat** / like fullFlat
3. **textContain** / literally / arg0 : undefined (register) or string (WidthPercent) - arg1 : string (HeightPercent)
4. **textCenter** / literally 
5. **squareX** / make element square base on X.
6. **squareY** / like above.


## 1. Note
### method
0. **cset** / like above.
1.  **fset** / like above.
2. **oget** / Not being first argument key, return second argument. / args : any
3. **join** / merge two note. Being same key, set this note's value. / arg : note
4. **assign** / merge two note. Being same key, set argument note's value. / arg : note
5. **json** / return json object. / static function. / arg : URL (string)
6. **save** / save arg's key's value into localstorage. / arg : any
7. **restore** / restore from localstorage. / arg : string (keyname)
8. **saveReset** / delete saved data. / arg : any (keyname)
9. **download** / download json argument key. / static function / arg : any (keyname)
10. **upload** / upload json as argument key. / arg0 : any (keyname) - arg1 URL (string)