/**It's JavaScript Function Library.
 * SeHelp() : Get Function List or help in rough english.
 * SeHelpJp() : 日本語での関数リストや, ヘルプを得られます。(後日実装予定)
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

function DeriveElement(id, option) {
    return [id].flat().flatMap(_E0 => _E0 instanceof HTMLElement ? _E0 : CQgeny(_E0)).filter(_E0 => _E0)

    function CQgeny(_id) {
        if (document.querySelectorAll(_id).length >= 1) {
            switch (option) {
                case undefined:
                    return Array.from(document.querySelectorAll(_id));
                case "$class":
                    return Aom.A.UnDup(Array.from(document.querySelectorAll(_id)).filter(_E0 => _E0.className != "").flatMap(_E0 => document.getElementsByClassName(_E0)));
                case "$relative":
                    return Aom.A.UnDup(Array.from(document.querySelectorAll(_id)).flatMap(_E0 => document.getElementsByTagName(_E0.tagName))).filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => _E0.parentNode == _E1.parentNode))
                default:
                    return (function CQgeny(pare, arr) {
                        arr = [...arr, ...pare.slice().filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => window.getComputedStyle(_E0).getPropertyValue(option) == window.getComputedStyle(_E1).getPropertyValue(option)))];
                        return pare.filter(_E0 => _E0.hasChildNodes()).flatMap(_E1 => _E1.child).length != 0 ? CQgeny(pare, arr) : Aom.A.UnDup(arr)
                    })(Array.from(document.getElementsByTagName("HTML")), [])
            }
        } else {
            return undefined;
        }
    }
}

function GetStyle(_A0) { return new Getsies(_A0) }

class Getsies extends Array {
    constructor(_A0) { Aom.prototype(_A0) == "Array" ? super(..._A0) : super(_A0) }
    compute(_A0, _A1) {
        return this.map(_E0 => {
            if (_E0 === window) {
                if (Optionalys(_A0, "min", false)) {
                    return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
                } else if (Optionalys(_A0, "max", false)) {
                    return window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
                } else if (Optionalys(_A0, "height", false)) {
                    return window.innerHeight;
                } else if (Optionalys(_A0, "width", false)) {
                    return window.innerWidth;
                } else if (Optionalys(_A0, "rem") && !Optionalys(point, "small", false)) {
                    return window.getComputedStyle(Derie("html")).getPropertyValue("font-size");
                }
            } else if (Optionalys(_A0, "min", false)) {
                return Getsytmp(_E0, true)
            } else if (Optionalys(_A0, "max", false)) {
                return Getsytmp(_E0, false)
            } else {
                return !~_A0.indexOf(":") ? window.getComputedStyle(_E0).getPropertyValue(_A0) : window.getComputedStyle(_E0, _A0).getPropertyValue(_A1);
            }
        })

        function Getsytmp(that, _Ato) {
            let width = that.clientWidth - (that.style.paddingLeft + that.style.paddingRight);
            let height = that.clientHeight - (that.style.paddingTop + that.style.paddingBottom);

            return _Ato ? (width < height ? width : height) : (width < height ? height : width)
        }
    }
    style(_A0) { return this.map(_E0 => _A0 ? new Function("_E1", `return _E1.style.${_A0}`)(_E0) : _E0.style) }
}

function potopx(A0) {
    let rems = document.createElement('span');
    rems.setAttribute("id", "ptp_get");
    rems.style.width = A0;
    Derie("body")[0].insertBefore(rems, Derie("body")[0].firstChild);

    let _T0 = parseFloat(Getsy(Derie("#ptp_get")[0]).compute("width"));

    Derie("body")[0].removeChild(Derie("#ptp_get")[0]);
    return _T0;
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
function MsChainFunction(obj) { return fn => fn ? MsCF(fn(obj)) : obj }

//- Confing -----------------

//- Data --------------------
//共通UI
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
                return args.length > 0 ? new Docobj(args) : new Docobj();
            } else if (Optionalys(proto, "map", false)) {
                return args.length > 0 ? new Docmap(args) : new Docmap();
            } else {
                return args.length > 0 ? new Doclet(args) : new Doclet();
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
    get self() {
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
        } else {
            super.push(...args)
        }
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
            if (!super.includes(_t0)) super.push(_t0)
        } else {
            args.forEach(_E0 => { if (!args.includes(_E0)) super.push(_E0) })
        }
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
            args.forEach((_E0, _E1) => {
                if (super.some(_E2 => _E2 = _E0)) super.splice(_E1, 1)
            })
        }
    }
}

class Docobj extends Object {
    constructor(...args) {
        super()
        this.__proto__.Base = args.length == 0 ? undefined : args.flat();
    }
    cset(property, ...args) {
        if (this.Base) {
            super[property] = (() => {
                let _T0 = new Object()
                this.Base.forEach((_E0, _E1) => {
                    _T0[_E0] = args[_E1];
                })
                return _T0;
            })()
        } else {
            super[property] = args[0]
        }
    }
    admit(property, ...args) { super.forEach((_E0, _E1) => { if (_E1 != property) super.cset(property, ...args) }) }
}

class Docmap extends Map {
    constructor(...args) {
        super()
        this.__proto__.Base = args.length == 0 ? undefined : args.flat();
    }
    cset(key, ...args) {
        if (this.Base) {
            super.set(key, (() => {
                let _T0 = new Object()
                this.Base.forEach((_E0, _E1) => {
                    _T0[_E0] = args[_E1];
                })
                return _T0;
            })())
        } else {
            super.set(key, args[0])
        }
    }
    admit(key, ...args) { if (!super.has(key)) super.cset(key, ...args) }
}

class Doclet {
    constructor(...args) { this.__proto__.Base = args.length == 0 ? undefined : args.flat(); }
    cset(...args) {
        if (this.Base) {
            this.Doc = (() => {
                let _T0 = new Object()
                this.Base.forEach((_E0, _E1) => {
                    _T0[_E0] = args[_E1];
                })
                return _T0;
            })()
        } else { this.Doc = args[0] }
    }
    get self() { return this.Doc; }
}

class Publication { }

let note = new Note()

function BookTag(book, page) { window[page] = new Function(`return ${book}.self.get("${page}")`)() }
DeriveElement("#SfMain")[0].addEventListener('load', () => { if (sfuserconfig.noteBooktag) note.self.forEach((_E0, _E1) => BookTag("note", _E1)) })

note.cset("KeyHold", "map");
note.cset("KeyCount", "map");
const keys = {
    hold: function (code) { return note.self.get("KeyHold").get(code) },
    count: function (code, clear) { if (clear) { note.self.get("KeyCount").set(code, 0) } else { return note.self.get("KeyCount").get(code) } }
}

window.addEventListener('keydown', (event) => { if (!event.repeat) note.self.get("KeyCount").set(event.keyCode, note.self.get("KeyCount").get(event.keyCode) == undefined ? 1 : note.self.get("KeyCount").get(event.keyCode) + 1) })
window.addEventListener('keydown', (event) => { if (!event.repeat) note.self.get("KeyHold").set(event.keyCode, true) })
window.addEventListener('keyup', (event) => { if (!event.repeat) note.self.get("KeyHold").set(event.keyCode, false) })

//-Object--------------------
const Aom = {
    A: {
        flat: function (...args) { return (A2A = _A0 => _A0.flatMap(_E0 => Array.isArray(_E0) ? A2A(_E0) : _E0))(args) },
        unDup: function  /**Duplicate */(array, back) { return array.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i); },
        // from: function (_A0) { return Aom.prototype(_A0) == "Array" ? _A0 : [_A0] }
    },
    O: {
        is: function (o) { return (o instanceof Object && !(o instanceof Array)) ? true : false; },
        forEach: function (obj, fn) { Object.keys(obj).forEach(key => { let val = this[key]; fn(val); }, obj) }
    },
    M: {},
    E: { from: function (_A0) { return _A0 instanceof HTMLElement ? [_A0] : Derie(_A0) } },
    B: function (..._A0) { return Array.from(_A0).map(_E0 => Boolean(_E0)) },
    prototype: function (_A0) { try { return _A0.constructor.name; } catch{ return undefined } }
}

function Optionalys(...args) {
    if (args.length == 0 || args[0] == undefined) return false;
    args = [args[0], typeof args.slice(-1)[0] == "boolean" ? args.slice(1, -1) : args.slice(1), args.slice(-1)[0] == false ? false : true]
    return args[1].concat().filter(_E0 => args[2] ? new RegExp(_E0).test(args[0]) : new RegExp(_E0.toLowerCase()).test(args[0].toLowerCase())).length > 0 ? true : false;
    //_T0 = new Array(args[1].filter(_E0 => new RegExp(_E0).test(args[0]))).flat();
}

//-Calculation---------------
note.cset("OmitFnList", "Map");
BookTag("note", "OmitFnList")
OmitFunctionName("OmitFunctionName", "OmitFn")
OmitFn("DeriveElement", "Derie")
OmitFn("GetStyle", "Getsy")

function OmitFunctionName(base, abbr, Postscript) {
    if (!Postscript) { OmitFnList.set(base, [abbr]) } else { OmitFnList.set(base, OmitFnList.get(base) ? [...OmitFnList.get(base), abbr] : [abbr]) }
    window[abbr] = new Function("...arg", `return ${Array.from(OmitFnList.entries()).filter(_E0 => _E0[1].some(_E1 => _E1 == abbr))[0][0]}(...arg)`);
}

// 要改良 言語識別効率化
note.cset("TextSizeList", "Map", "height", "width")
BookTag("note", "TextSizeList");
function TextSize(elem, Wper, Hper, redo) {
    if (!TextSizeList.has(elem)) TextSizeList.cset(elem, 100, 100)
    if (Wper === undefined && Wper !== null) {
        let rems = document.createElement('span');
        rems.setAttribute("id", "get_text_size");
        Derie("body")[0].insertBefore(rems, Derie("body")[0].firstChild);

        elem = elem || elem.target;
        Derie("#get_text_size")[0].innerText = elem.innerText;
        Derie("#get_text_size")[0].style.fontSize = Getsy(elem).compute("font-size")[0]
        Derie("#get_text_size")[0].style.writingMode = Getsy(elem).compute("writing-mode")[0]
        Derie("#get_text_size")[0].style.lineHeight = Getsy(elem).compute("line-height")[0]
        let [_TH, _TW] = [Getsy(Derie("#get_text_size")[0]).compute("height")[0], Getsy(Derie("#get_text_size")[0]).compute("width")[0]]
        elem.style.fontSize = (parseInt(Getsy(elem).compute("width")[0]) - parseInt(_TW) <= parseInt(Getsy(elem).compute("height")[0]) - parseInt(_TH)
            ? parseInt(Getsy(elem).compute("width")[0]) / parseInt(_TW) * parseInt(Getsy(elem).compute("font-size")[0]) * Number(TextSizeList.get(Aom.E.from(elem)[0])["width"]) * 0.01
            : parseInt(Getsy(elem).compute("height")[0]) / parseInt(_TH) * parseInt(Getsy(elem).compute("font-size")[0]) * Number(TextSizeList.get(Aom.E.from(elem)[0])["height"]) * 0.01) + "px"

        Derie("body")[0].removeChild(Derie("#get_text_size")[0]);
    } else if (Optionalys(Wper, "add", false)) {
        elem.classList.add("text_contain")
        elem.addEventListener("resize", TextSize)
    } else if (Optionalys(Wper, "remove", false)) {
        elem.classList.remove("text_contain")
        elem.removeEventListener("resize", TextSize)
    } else {
        Wper = Wper === null ? TextSizeList.get(elem)["width"] : Wper;
        Hper = Hper === null ? TextSizeList.get(elem)["height"] : (Hper === undefined && redo ? Wper : Hper);
        // Wper = Wper === undefined ? Hper : Wper;
        // Wper = Wper === null ? (!TextSizeList.has(Aom.E.from(elem)[0] || !TextSizeList.get(Aom.E.from(elem)[0]).hasOwnProperty("width")) ? Hper : TextSizeList.get(Aom.E.from(elem)[0])["width"]) : Wper;
        TextSizeList.cset(elem, Hper, Wper)
        if (redo) TextSize(elem);
    }
}

window.addEventListener("load", () => { Derie(".text_contain").forEach(_E0 => { TextSize(_E0); _E0.addEventListener("resize", TextSize) }) })

// function Nomall(str) {
//     let tmp = Array.from(str).slice().filter(_E0 => _E0 == ((0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) || _E0.charCodeAt(0) <= 122)).length
//     return tmp * GVP(small_rem) + (str.length - tmp) * GVP(rem)
// }

function zeroPadding(num, dig) {
    const AddZero = (_num, _dig) => _num.length < (_num.indexOf(".") == -1 ? _dig : _dig + 1) ? AddZero("0" + _num, _dig) : _num;
    if (String(dig).indexOf(".") == -1) {
        if (String(num).length < (String(num).indexOf(".") == -1 ? dig : dig + 1)) {
            return AddZero(String(num), dig/**(String(num).indexOf(".") == -1 ? dig : dig + 1)*/);
        } else {
            throw new Error("Digit must be bigger than digit of number")
        }
    } else {
        throw new Error("Digit must be natural number")
    }
}

//-Auto Process--------------
//Puppeteer
let sfwindow;
function rewindow(width, height, size) {
    if (width == "close") { sfwindow = undefined; return false }
    if (Aom.prototype(width) != Aom.prototype(height)) { console.log("The first and second arguments must have the same type."); return false }
    _F0 = () => {
        sfwindow = window.open(location.href, "sfwindow", `width=${Aom.prototype(width) == "Number" ? size ? potopx(size) + "px" : "300px" : width},\
                height=${Aom.prototype(height) == "Number" ? size ? potopx(width) * height / width + "px" : 300 * height / width : height}`);
        let _T0 = setInterval(() => { if (!sfwindow || sfwindow.closed) { clearInterval(_T0); rewindow("close") } }, 1000);
    }
    try { if (sfwindow && !sfwindow.closed) sfwindow.close(); } catch{ }
    _F0()
}

let didTaskswork = sfuserconfig.TaskWork;
note.cset("TasksList", "Array", "If", "Fn", "Id")

const Tasks = {
    add: function (equa, fn, id) { TasksList.cset(equa, fn, (id ? id : undefined)) },
    remove: function (id) { TasksList.forEach((_E0, _E1, _E2) => { if (_E0["Id"] == id) _E2.splice(_E1, 1) }) },
    start: () => didTaskswork = true,
    stop: () => didTaskswork = false,
    call: () => {
        TasksList.forEach(_E0 => { new Function(`if (${_E0["If"]}) ${_E0["Fn"]}()`)() })
        if (didTadwork) requestAnimationFrame(arguments.callee);
    }
}
// Tasks.call()

function FuncProgeny(_E0, fn) {
    (Array.isArray(_E0) ? _E0 : Array.from(_E0)).flatMap(_E1 => _E1 instanceof HTMLElement ? _E1 : (document.querySelectorAll(_E1).length == 0 ? undefined : Array.from(document.querySelectorAll(_E1)))).filter(_E1 => _E1 != undefined).forEach(_E1 => _E1.fn())
    if (_E0.filter(_E0 => _E0.hasChildNodes()).map(_E0 => _E0.child).length != 0) FuncProgeny(_E0, fn)
}

//-Item Function-------------
function Random(min, max, digit) { if (!digit) digit = 0; return (Math.random() * (max - min) + min).toFixed(digit) - 0 }

/**A revised version will be released soon.
 * 
 * function Funcrand(graph, xmin, xmax, ymin, ymax) {
    let [xx, yy] = [Random(xmin, xmax), Random(ymin, ymax)]
    let x = xx
    return new Function(`return ${graph}`)() >= yy ? yy : Funcrand(graph, xmin, xmax, ymin, ymax);
}

function RandFn(now, min, max) { return now >= Random(min, max) ? true : false; }*/

function sfHelp(command) {
    if (!command) { return sfhelpData.map(_E0 => _E0.name) }
    else { return sfhelpData.filter(_E0 => _E0.name == command)[0].explanatory }
}

//-Loaded--------------------
console.log("Seifuncs ver.1.5.0 for JS was completely loaded.")
if (/^(?=.*Chrome)(?!.*Edge)/.test(window.navigator.userAgent)) {
    console.log("%c %c Seifuncs for JS %c \n%c %c Developper : Seizya \n%c %c Github : https://github.com/Seizya \n%c %c Special Thanks : omasakun (https://github.com/omasakun)",
        "background-color:#165e83;border-bottom:solid #f0f 2px", "border-bottom:solid #f0f 2px", "", "background-color:#165e83", "", "background-color:#165e83", "", "background-color:#165e83", "")
} else {
    console.log("Seifuncs for JS \nDevelopper : Seizya \nE-mail : Yakumo.Seizya@gmail.com \nGithub : https://github.com/Seizya")
}
if (/MSIE|Trident|Edge/.test(window.navigator.userAgent)) console.warn("The use of Seifuncs in IE is not envisaged at all. \nPlease immediately stop using Seifucs and use another browser. \nThere are no plans to support IE.")