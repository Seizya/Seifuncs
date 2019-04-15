# Seifuncs
It's a template for only me.
This is a collection of Javascript functions I thought useful.

# How use
0. Download this.
1. Put and unzip downloaded folder into your folder you want use.
2. Write `<script src="./Seifuncs/sfjs.js"></script>` to will be loaded before others JS files.

# contents
0.Chara Contain
  Adjust the size so that the HTML text fits the element exactly.
  How use : Put class named `chara_contain` at element you want.
  
1.CSSIC
  To be easily getting Elements.
  How use : write`CSSIC(selecter and tag name etc. , "cl" or "st" or none)`,return elemetns.
  cl : classList, st : style
  
2.AnimationCSS
  ex)
  function keycode() {key(down or up, keycode, function name);}
  function mousecode() {mouse(down or up, [func 1 , func 2])}

  function animation(Judgment) {
    //---conversion---v---
    //id:$;
    //class:$c;
    //---conversion---^---
    eval(Judgment).call();
    
    function hogehoge() {}
 }
 
3.ZeroPadding
  zeroPadding(number.digit)

4.VP
  transport view port to pixcel

5.Rewindow
  make new window you want size.
  
# license
It is basically free only for redistribution and use other than commercial purpose use

# Bug report
send e-mail or pullquest
