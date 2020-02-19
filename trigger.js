window.addEventListener("load", function () {
    const sfcss = document.createElement('link');
    sfcss.setAttribute("id", "SeifuncCSS");
    sfcss.setAttribute("rel", "stylesheet");
    sfcss.setAttribute("type", "text/css");
    sfcss.setAttribute("href", "./Seifuncs/sfstyle.css");
    Subes('script[src="./Seifuncs/trigger.js"]')[0].parentNode.insertBefore(sfcss, Subes('script[src="./Seifuncs/trigger.js"]')[0]);
});

import {
    SublimateElements,
    GetStyle,
    Subes,
    Getsy,
    potopx,
    ChainArguments,
    ChainFunctions,
    Note,
    baser,
    cutter,
    Aom,
    aom,
    Sem,
    Sim,
    Keys,
    CSSPoint,
    rewindow,
    Tasks,
    ExeFuncAftLoad,
    FuncProgeny,
    Random,
    RandFn
} from "./main.js";

//-Loaded--------------------
console.clear();
console.log("Seifuncs ver.1.8.β for JS was completely loaded.")
if (/^(?=.*Chrome)(?!.*Edge)/.test(window.navigator.userAgent)) {
    console.log("%c %c Seifuncs for JS %c \n%c %c Developer : Seizya \n%c %c GitHub : https://github.com/Seizya \n%c %c Special Thanks : omasakun (github.com/omasakun)",
        "background-color:#165e83;border-bottom:solid #f0f 2px", "border-bottom:solid #f0f 2px", "", "background-color:#165e83", "", "background-color:#165e83", "", "background-color:#165e83", "color: transparent")
} else {
    console.log("Seifuncs for JS \nDeveloper : Seizya \nGitHub : https://github.com/Seizya")
}
if (/MSIE|Trident|Edge/.test(window.navigator.userAgent)) console.warn("The use of Seifuncs in IE is not envisaged at all. \nPlease immediately stop using Seifucs and use another browser. \nThere are no plans to support IE.")