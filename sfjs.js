/**It's JavaScript Function Library.
 * Seifuncs_List() : View Function List on console.
 * 
 * Made by Seizya.
 * Special thanks : omasakun
 */

/* 訳
このスクリプトは、どのスクリプトよりも早く読み込まれるようにしてください。

import-htmlタグを追加します。
例えば、<import-html src="./button.html"></import-html> とすれば、 ./button.html の内容でそのタグが置き換えられます。
なお、標準では、最初にページが読み込まれたときにのみ import-html タグの置き換えがされます。
もし、それ以外のタイミングで import-html タグの解釈をさせたい場合、 importHTMLs 関数を引数無しで読んでください。

このスクリプトが読み込まれてから window の load イベントが発火するまでに追加された load イベントハンドラーは、importHTMLs 実行後に呼び出されます。

*/
(() => {
    var listeners = [];
    const tmp = window.addEventListener;
    window.addEventListener("load", (...args) => {
        importHTMLs().then(() => {
            listeners.forEach(_ => _[0](...args));
            listeners.forEach(_ => tmp("load", ...args));
            listeners = [];
        });
        window.addEventListener = tmp;
    });
    window.addEventListener = (type, ...args) => {
        if (type == "load") listeners.push(args);
        else tmp(type, ...args);
    }
})();

function importHTMLs() {
    const warn = (..._) => console.warn("[importHTMLs] ", ..._);
    return Promise.all(Array.from(document.getElementsByTagName("import-html")).map(importElem => {
        // This function returns whether the importHTMLs function needs to be re-called to read the newly added import-html tag.
        const path = importElem.getAttribute("src");
        if (!path) {
            warn("There was an import-html tag for whose src does not specify the file path you want to load. Ignored.");
            return false; // It is not necessary to re-call importHTMLs
        }
        return fetch(path)
            .then(res => res.text())
            .then(text => {
                let shouldReCall = false; // Whether it is needed to re-call importHTMLs
                let tmp = document.createElement("div");
                tmp.innerHTML = text;
                (function replaceScriptTag(elem) {
                    elem.childNodes.forEach((child, index) => {
                        if (child.tagName == "IMPORT-HTML") {
                            shouldReCall = true;
                        } else if (child.tagName == "SCRIPT") {
                            let newElem = document.createElement("script");
                            for (let i = 0; i < child.attributes.length; i++) {
                                var attr = child.attributes.item(i);
                                newElem.setAttribute(attr.nodeName, attr.nodeValue);
                            }
                            newElem.innerHTML = child.innerHTML;
                            elem.replaceChild(newElem, child);
                        } else {
                            replaceScriptTag(child);
                        }
                    });
                    return elem;
                })(tmp);
                tmp.childNodes.forEach(_ => importElem.parentElement.insertBefore(_, importElem));
                importElem.parentElement.removeChild(importElem);
                return shouldReCall;
            })
            .catch(err => warn("An error occurred while loading " + path + ". Detail...", err));
    })).then(shouldRecall => {
        if (shouldRecall.some(_ => _))
            return importHTMLs();
    });
}

function CSS(elements) {
    if (typeof elements == "string") {
        // Parse as querySelector
        elements = document.querySelectorAll(elements);
    }
    elements = Array.from(elements);
    // window.getComputedStyle(element).getPropertyValue(name);
    return new Proxy({}, {
        get: function (target, name) {
            return elements.map(function (element) {
                return window.getComputedStyle(element).getPropertyValue(name);
            })
        },
        set: function (target, name, value) {
            var errors = elements.map(function (element) {
                try {
                    element.style[name] = value;
                } catch (e) {
                    return e;
                }
                return undefined;
            });
            if (errors.reduce(function (pv, cv) {
                return pv + (cv ? 1 : 0);
            }, 0) == 0) return true;
            throw errors;
        }
    });
}

//Deel
function DeriveElement(id, option) {
    return [id].flat().flatMap(_E0 => _E0 instanceof HTMLElement ? _E0 : CQgeny(_E0)).filter(_E0 => _E0)

    function CQgeny(_id) {
        if (document.querySelectorAll(_id).length >= 1) {
            switch (option) {
                case undefined:
                    return Array.from(document.querySelectorAll(_id));
                case "$class":
                    return AOM.Arr.UnDup(Array.from(document.querySelectorAll(_id)).filter(_E0 => _E0.className != "").flatMap(_E0 => document.getElementsByClassName(_E0)));
                case "$relative":
                    return AOM.Arr.UnDup(Array.from(document.querySelectorAll(_id)).flatMap(_E0 => document.getElementsByTagName(_E0.tagName))).filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => _E0.parentNode == _E1.parentNode))
                default:
                    return (function CQgeny(pare, arr) {
                        [...arr, ...pare.slice().filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => window.getComputedStyle(_E0).getPropertyValue(option) == window.getComputedStyle(_E1).getPropertyValue(option)))];
                        return pare.filter(_E0 => _E0.hasChildNodes()).flatMap(_E1 => _E1.child).length != 0 ? CQgeny(pare, arr) : AOM.Arr.UnDup(arr)
                    })(Array.from(document.getElementsByTagName("HTML")), [])
            }
        } else {
            return undefined;
        }
    }
}

//Getsy(elem,prpperty)
//Getsy(elem,:~ ,Property)
function GetElementStyle(elem, pro0, pro1) {
    return AOM.Arr.UnDup([elem].flat().flatMap(_E0 => _E0 instanceof HTMLElement ? _E0 : Derie(_E0))).map(_E0 => !pro0 ? window.getComputedStyle(_E0) : (!~pro0.indexOf(":") ? window.getComputedStyle(_E0).getPropertyValue(pro0) : window.getComputedStyle(_E0, pro0).getPropertyValue(pro1)));
}

const View = {
    get: function (point) {
        switch (point) {
            case "vmin":
                return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
            case "vmax":
                return window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
            case "vh":
                return window.innerHeight;
            case "vw":
                return window.innerWidth;
            case "rem":
                return window.getComputedStyle(Derie("html")).getPropertyValue("font-size");
            case "small_rem":
                return Derie("#get_small_rem").innerWidth;
        }
    },
    elemMin: function (elem) {
        Derie(elem).map(_E0 => {
            let width = _E0.clientWidth - (_E0.style.paddingLeft + _E0.style.paddingRight);
            let height = _E0.clientHeight - (_E0.style.paddingTop + _E0.style.paddingBottom);

            return width < height ? width : height;
        })
    },
    elemMax: function (elem) {
        Derie(elem).map(_E0 => {
            let width = _E0.clientWidth - (_E0.style.paddingLeft + _E0.style.paddingRight);
            let height = _E0.clientHeight - (_E0.style.paddingTop + _E0.style.paddingBottom);

            return width < height ? height : width;
        })
    }
}

/**
 * const SeCA = fn => (tmp = args => arg => arg ? tmp([...args, ...arg]) : fn(...args))([]);
 * const MsCF = obj => fn => fn ? MsCF(fn(obj)) : obj; 
 */
/**
 * SeCA <Sei Chain Argument> SeCA(fn Name)(arg0)...(argn)() == fn(arg0,...,argn);
 * MsCF <Msy Chain Function> MsCF(obj)(fn0)...(fnn) => arg(obj) ... argn(arg(obj));
 */
function SeChainArgument(fn) { return (tmp = args => arg => arg ? tmp([...args, ...arg]) : fn(...args))([]) }
function MsChainFundtion(obj) { return fn => fn ? MsCF(fn(obj)) : obj }

//- Data --------------------
//共通UI
//#region
let SeList = new Object();
function OwnLists(name, ud, ...arg) {
    [name, ud, ...arg] = [String(name), String(ud), ...arg.map(_E0 => String(_E0))]
    if (ud) {
        if (ud == "expel") {
            delete SeList[name];
        } else if (!SeList[name]) {
            if (ud == "admit") {
                SeList[name] = {};
                window["cr" + name] = (_name, _ud, ..._arg) => {
                    if (Optionalys(_ud, "add")) {
                        if (!arg[0] || _ud == "excadd") {
                            SeList[name][_name] = _arg[0];
                        } else {
                            let tmp0 = {};
                            for (i = 0; i < arg.length; i++) {
                                tmp0[arg[i]] = _arg[i];
                            }
                            SeList[name][_name] = tmp0;
                        }
                        //{name : {_name:{_arg:arg,arg1:_arg1},_name1..}}
                    } else if (_ud == "remove") {
                        delete SeList[name][_name]
                    } else if (_ud == "filter") {
                        return Selist[name][_name];
                    } else if (_ud == "clear") {
                        SeList[name] = {};
                    } else {
                        return SeList[name];
                    }
                }
            } else if (ud == "Arradmit") {
                SeList[name] = [];
                window["cr" + name] = (_ud, ..._arg) => {
                    if (Optionalys(_ud, "add")) {
                        if (!arg[0] || Optionalys(_ud, "exc")) {
                            if (Optionalys(_ud, "ud")) {
                                if (!SeList[name].includes(_arg[0])) SeList[name].push(_arg[0]);
                            } else {
                                SeList[name].push(_arg[0]);
                            }
                        } else {
                            let tmp0 = {};
                            for (i = 0; i < arg.length; i++) {
                                tmp0[arg[i]] = _arg[i];
                            }
                            if (Optionalys(_ud, "ud")) {
                                if (!SeList[name].includes(_arg[0])) SeList[name].push(tmp0);
                            } else {
                                SeList[name].push(tmp0);
                            }
                        }
                        //[arg,arg1,{arg2:arg3}]
                    } else if (_ud == "remove") {
                        if (!arg[0]) {
                            SeList[name] = SeList[name].filter(_E0 => !_arg.some(_E1 => _E0 === _E1));
                        } else {
                            SeList[name] = SeList[name].filter(_E0 => Object.key(_E0).filter(_E1 => _E1.some(_E1 == Object.key(_arg[0]))).some(_E1 => _E0[_E1] != _arg[0][_E1]));
                        }
                    } else if (_ud == "filter") {
                        if (!arg[0]) {
                            return SeList[name].filter(_E0 => _arg.some(_E1 => _E0 == _E1));
                        } else {
                            return SeList[name].filter(_E0 => Object.key(_E0).filter(_E1 => _E1.some(_E1 == Object.key(_arg[0]))).every(_E1 => _E0[_E1] == _arg[0][_E1]));
                        }
                    } else if (_ud == "clear") {
                        SeList[name] = [];
                    } else {
                        return SeList[name];
                    }
                }
            }
        }
    } else if (!name) {
        return SeList[name];
    } else {
        return SeList
    }
}
//#endregion
*
 * cset /create and sest
 * admit
 * remove
 * clear
 * page
 * length
 * assign
 * marge

class Note {
    constructor() {
        this.Page = new Map();
        this.publication = new Publication();
    }
    cset(name, proto, ...args) {
        if (this.Page.has(name)) console.warn(name + " is already written in this Note.")
        this.Page.set(name, (() => {
            if (Optionalys(proto, "arr", false)) {
                return args.length > 0 ? new Docarr(args) : new Docarr();
            } else if (Optionalys(proto, "obj", false)) {
                return args.length > 0 ? new Docbj(args) : new Docobj();
            } else if (Optionalys(proto, "map", false)) {
                return new Docmap();
            } else {
                return new Doclet();
            }
        })())
    }
    admit(...args) {
        if (!this.Page.has(name)) this.cset(...args);
    }
    remove(name) {
        this.Page.delete(name);
    }
    clear() {
        this.Page.clear()
    }
    get page() {
        return this.Page;
    }
    get length() {
        return this.Page.size;
    }
    set assign(newNote) {
        newNote.forEach((value, key) => { if (!this.Page.has(key)) this.Page.set(key, value) })
    }
    set marge(newNote) {
        newNote.forEach((value, key) => this.Page.set(key, value))
    }
}

class Docarr extends Array {
    constructor(...args) {
        super()
        this.__proto__.Base = args.length == 0 ? undefined : args.flat();
    }
    cset(...args) {
        if (this.Base) {
            super.push((() => {
                let _T0 = new Object()
                this.Base.forEach((_E0, _E1) => {
                    _T0[_E0] = args[_E1];
                })
                return _T0;
            })())
        } else { super.push(...args) }
    }
    admit(...args) {
        if (this.Base) {
            let _t0 = (() => {
                let _T0 = new Object()
                this.Base.forEach((_E0, _E1) => {
                    _T0[_E0] = args[_E1];
                })
                return _T0;
            })()
            if (this.Base.includes(_t0)) super.push(_t0)
        } else { args.forEach(_E0 => { if (args.includes(_E0)) super.push(_E0) }) }
    }
    remove(...args) {
        if (this.Base) {
            super.forEach((_E0, _E1) => {
                if (_E0 == (() => {
                    let _T0 = new Object()
                    this.Base.forEach((_E2, _E3) => {
                        _T0[_E2] = args[_E3];
                    })
                    return _T0;
                })()) super.splice(_E1, 1)
            })
        } else {
            args.forEach((_E0, _E1) => { if (super.some(_E2 => _E2 = _E0)) super.splice(_E1, 1) })
        }
    }
}
class Docobj extends Object {
	constructor(...args){
		super();
		this.__proto__.Base = args.length == 0 ? undefined : args.flat();
	}
	cset(property,...args){
		if(this.Base){
			
		}
	}
}
class Docmap extends Map { }
class Doclet { }

class Publication { }

let note = new Note()

OwnLists("KeyMemo", "Arradmit");
const keymemoDown = (event) => crKeyMemo("udadd", event.keyCode);
const keymemoUp = (event) => crKeyMemo("remove", event.keyCode);
window.addEventListener("keydown", keymemoDown);
window.addEventListener("keyup", keymemoUp);

function Keys(code) { return code == "$list" ? crKeyMemo() : Boolean(crKeyMemo("filter", code)[0]) };

OwnLists("Saynumber", "Arradmit", "Code", "Number")
crSaynumber("add", 13, 0)
crSaynumber("add", 70, 0)
crSaynumber("add", 83, 0)
crSaynumber().forEach(_E0 => _E0["Number"] = 0)
window.addEventListener("keydown", (event) => {
    if (!event.repeat) {
        crSaynumber().forEach(_E0 => {
            if (_E0["Code"] == event.keyCode) {
                _E0["Number"]++
            }
        })
    }
})

//Sayclickが実行されたときに, SeList似なかったら作る。あれば通常
function Sayclick(code, delet) {
    if (delet) crSaynumber().filter(_E0 => _E0["Code"] == code).forEach(_E0 => _E0["Number"] = 0)
    return crSaynumber().filter(_E0 => _E0["Code"] == code).map(_E0 => _E0["Number"])
}


//-Object--------------------
const AOM = {
    Arr: {
        flat: function (...args) { return (A2A = _A0 => _A0.flatMap(_E0 => Array.isArray(_E0) ? A2A(_E0) : _E0))(args) },
        unDup: function  /**Duplicate */(array, back) { return array.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i); }
    },
    Obj: {
        is: function (o) { return (o instanceof Object && !(o instanceof Array)) ? true : false; },
        forEach: function (obj, fn) { Object.keys(obj).forEach(key => { let val = this[key]; fn(val); }, obj) }
    },
    Map: {},
    prototype: function (_A0) { return Object.prototype.toString.call(_A0).slice(8, -1) }
}

function Optionalys(...args) {
    if (args.length == 0 || args[0] == undefined) return false;
    args = [args[0], typeof args.slice(-1)[0] == "boolean" ? args.slice(1, -1) : args.slice(1), args.slice(-1)[0] == false ? false : true]
    return args[1].concat().filter(_E0 => args[2] ? new RegExp(_E0).test(args[0]) : new RegExp(_E0.toLowerCase()).test(args[0].toLowerCase())).length > 0 ? true : false;
    //_T0 = new Array(args[1].filter(_E0 => new RegExp(_E0).test(args[0]))).flat();
}

//-Add Elements--------------
window.addEventListener("load", () => {
    let sfcss = document.createElement('style');
    sfcss.setAttribute("id", "SeifuncCSS");
    sfcss.textContent = '@import "./Seifuncs/sfcss.css";';
    Derie("script")[0].parentNode.insertBefore(sfcss, Derie("script")[0].nextSibling);
    //document.querySelectorAll('script[src="index.js"]')

    Derie("#SeifuncCSS")[0].addEventListener("load", () => {
        let rems = document.createElement('div');
        rems.setAttribute("id", "get_small_rem");
        rems.textContent = "m";
        Derie("#SeifuncCSS")[0].parentNode.insertBefore(rems, Derie("#SeifuncCSS")[0].nextSibling);

        Characon("$start");
    })
})

//-Calculation---------------
OwnLists("OmitFn", "Arradmit", "Base", "Abbr");
OmitFunctionName("OmitFunctionName", "omitfn")
OmitFunctionName("DeriveElement", "Derie")
OmitFunctionName("CharaContain", "Characon")

function OmitFunctionName(base, abbr) { //abbreviation
    crOmitFn("add", base, abbr);
    window[abbr] = (...arg) => eval(base + "(...arg)")
}

//chara_contain(elem, 50);
//動作未確認
OwnLists("Characon", "Arradmit", "Elem", "Parse")

function CharaContain(option, elem) {
    if (option == "$start") {
        let elems = Derie(".chara_contain");
        if (elems[0]) {
            elems.forEach(_E0 => {
                crCharacon("udadd", _E0, 100)
                _E0.addEventListener('resize', () => {
                    let width = _E0.clientWidth - (_E0.style.paddingLeft + _E0.style.paddingRight);
                    let height = _E0.clientHeight - (_E0.style.paddingTop + _E0.style.paddingBottom);
                    if (Getsy(_E0, "writing-mdoe")[0] == "horizontal-tb") {
                        let con_width = Nomall(_E0.clientWidth - (_E0.style.paddingLeft + _E0.style.paddingRight));
                        let con_height = GVP("rem")
                    } else {
                        let con_height = Nomall(_E0.clientHeight - (_E0.style.paddingTop + _E0.style.paddingBottom));
                        let = con_width = GVP("rem")
                    }
                    if (con_width / width >= con_height) {
                        Derie(_E0)[0].style.fontSize = px2rem(parseInt(Getsy(_E0, "font-size")) * wide / con_wide * crCharacon("filter", {
                            Elem: _E0
                        })[0][Parse] * 0.01) + "rem"
                    }
                })
            })
        }
    } else if (typeof option == "number") {
        crCharacon("udadd", elem, option);
    }
}

function Nomall(str) {
    let tmp = Array.from(str).slice().filter(_E0 => _E0 == ((0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) || _E0.charCodeAt(0) <= 122)).length
    return tmp * GVP(small_rem) + (str.length - tmp) * GVP(rem)
}

function zeroPadding(num, dig) {
    const AddZero = (_num, _dig) => _num.length < (_num.indexOf(".") == -1 ? _dig : _dig + 1) ? AddZero("0" + _num, _dig) : _num;
    if (String(dig).indexOf(".") == -1) {
        if (String(num).length < (String(num).indexOf(".") == -1 ? dig : dig + 1)) {
            return AddZero(String(num), (String(num).indexOf(".") == -1 ? dig : dig + 1));
        } else {
            throw new Error("Digt must be bigger than digit of number")
        }
    } else {
        throw new Error("Digit must be natural number")
    }
}

//-Auto Process--------------
//Puppeteer
function rewindow(toww, towh) {
    let fromheight = window.outerHeight;
    let fromwidth = window.outerWidth;

    if (fromheight <= fromwidth) {
        window.open("./index.html", null, "top=0,left=0,height=" + fromheight * towh / toww + ",width=" + fromwidth)
    } else {
        window.open("./index.html", null, "top=0,left=0,height=" + fromheight + ",width=" + fromwidth * toww / towh)
    }
}

let didTaskswork = true;
OwnLists("Tasks", "Arradmit", "If", "Fn", "Id")

function Tasks(ar, equa, fn, id) {
    if (Optionalys(ar, "add")) {
        if (Optionalys(ar, "id")) {
            crTasks("add", equa, fn, id)
        } else {
            crTasks("add", equa, fn)
        }
    } else if (ar == "remove") {
        SeList["Tasks"].filter(_E0 => _E0["id"] != id)
    }
}

function Tasksstart() { didTaskswork = true; }

function Tasksstop() { didTaskswork = false; }

function Taskscall() {
    crTasks().forEach(_E0 => {
        if (_E0["If"]) _E0["Fn"]()
    })
    if (didTadwork) requestAnimationFrame(arguments.callee);
}

function FuncProgeny(_E0, fn) {
    (Array.isArray(_E0) ? _E0 : Array.from(_E0)).flatMap(_E1 => _E1 instanceof HTMLElement ? _E1 : (document.querySelectorAll(_E1).length == 0 ? undefined : Array.from(document.querySelectorAll(_E1)))).filter(_E1 => _E1 != undefined).forEach(_E1 => _E1.fn())
    if (_E0.filter(_E0 => _E0.hasChildNodes()).map(_E0 => _E0.child).length != 0) FuncProgeny(_E0, fn)
}

//-Item Function-------------
function Random(min, max) { return Math.floor(Math.random() * (max - min) + min) }

function Funcrand(graph, xmin, xmax, ymin, ymax) {
    let [xx, yy] = [Random(xmin, xmax), Random(ymin, ymax)]
    let x = xx
    return eval(graph) >= yy ? yy : Funcrand(graph, xmin, xmax, ymin, ymax);
}

function RandFn(now, min, max) { return now >= Random(min, max) ? true : false; }

function px2rem(pix) { return pix / GVP("rem") }

function rem2px(rem) { return rem * GVP("rem") }

//-Loaded--------------------
console.log("Seifuncs ver.1.3.1 for JS was completely loaded.")
if (/^(?=.*Chrome)(?!.*Edge)/.test(window.navigator.userAgent)) {
    console.log("%c %c Seifuncs for JS %c \n%c %c E-mail : Yakumo.Seizya@gmail.com \n%c %c Github : https://github.com/Seizya",
        "background-color:#165e83;border-bottom:solid #f0f 2px", "border-bottom:solid #f0f 2px", "", "background-color:#165e83", "", "background-color:#165e83", "")
} else {
    console.log("Seifuncs for JS \nE-mail : Yakumo.Seizya@gmail.com \nGithub : https://github.com/Seizya")
}
if (/MSIE|Trident|Edge/.test(window.navigator.userAgent)) console.warn("The use of Seifuncs in IE is not envisaged at all. \nPlease immediately stop using Seifucs and use another browser. \nThere are no plans to support IE.")