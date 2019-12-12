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

//Config---------------------
const sfconfig = {
    TaskInterval: 0,
    AlwaysTasksWork: false
};

//CSS load-------------------
window.addEventListener("load", function () {
    const sfcss = document.createElement('link');
    sfcss.setAttribute("id", "SeifuncCSS");
    sfcss.setAttribute("rel", "stylesheet");
    sfcss.setAttribute("type", "text/css");
    sfcss.setAttribute("href", "./Seifuncs/sfstyle.css");
    Derie('script[src="./Seifuncs/main.js"]')[0].parentNode.insertBefore(sfcss, Derie('script[src="./Seifuncs/main.js"]')[0]);
});

//Maindish-------------------
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

function DeriveElements(id, option) {
    return [id].flat()[aom]().flat().flatMap(_E0 => _E0 instanceof HTMLElement ? _E0 : CQgeny(_E0)).filter(_E0 => _E0);

    function CQgeny(_id) {
        if (document.querySelectorAll(_id).length >= 1) {
            switch (option) {
                case undefined:
                    return Array.from(document.querySelectorAll(_id));
                case "$SameClass":
                    return Array.from(document.querySelectorAll(_id)).filter(_E0 => _E0.className != "").flatMap(_E0 => _E0.className.split(" ").flatMap(_E1 => document.getElementsByClassName(_E1)))[aom]().unDupA();
                case "$Relative":
                    return Array.from(document.querySelectorAll(_id)).flatMap(_E0 => document.getElementsByTagName(_E0.tagName)).filter(_E0 => Array.from(document.querySelectorAll(_id))).some(_E1 => _E0.parentNode == _E1.parentNode)[aom]().unDupA();
                default:
                    return (function CQgeny(pare, arr) {
                        arr = [...arr, ...pare.slice().filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => window.getComputedStyle(_E0).getPropertyValue(option) == window.getComputedStyle(_E1).getPropertyValue(option)))];
                        return pare.filter(_E0 => _E0.hasChildNodes()).flatMap(_E1 => _E1.child).length != 0 ? CQgeny(pare, arr) : Aom(arr).unDup();
                    })(Array.from(document.getElementsByTagName("HTML")), []);
            }
        } else {
            switch (option) {
                case "$Descendant":
                    if (Aom(_id).comprise("#")) {
                        return Aom(document.querySelectorAll("html")[0]).DescendantFlat().filter(_E0 => Aom(_E0.id).comprise(_id.replace(/#/g, "")))
                    } else if (Aom(_id).comprise(".")) {
                        return Aom(document.querySelectorAll("html")[0]).DescendantFlat().filter(_E0 => _E0.className.split(" ").filter(_E1 => _E1.match(new RegExp(_id.replace(/[\.]+/g, "")))).length > 0)
                    } else {
                        return Aom(document.querySelectorAll("html")[0]).DescendantFlat().filter(_E0 => Aom(_E0.tagName).comprise(_id.replace(/#/g, "")))
                    }
            }
            return undefined;
        }
    }
}

function GetStyle(_A0) {
    return new Getsies(_A0);
}

class Getsies extends Array {
    constructor(_A0) {
        Sem(_A0) == "Array" ? super(..._A0) : super(_A0)
    }
    compute(_A0, _A1) {
        return this.map(_E0 => {
            if (_E0 === window) {
                if (Aom(_A0).comprise("min")) {
                    return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
                } else if (Aom(_A0).comprise("max")) {
                    return window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
                } else if (Aom(_A0).comprise("height")) {
                    return window.innerHeight;
                } else if (Aom(_A0).comprise("width")) {
                    return window.innerWidth;
                } else if (_A0.includes("rem") && !poAom(int).comprise("small")) {
                    return window.getComputedStyle(Derie("html")).getPropertyValue("font-size");
                }
            } else if (Aom(_A0).comprise("min")) {
                return Getsytmp(_E0, true)
            } else if (Aom(_A0).comprise("max")) {
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
    style(_A0) {
        return this.map(_E0 => _A0 ? new Function("_E1", `return _E1.style.${_A0}`)(_E0) : _E0.style)
    }
}

function potopx(A0) {
    let rems = document.createElement('span');
    rems.setAttribute("class", "sfget_ew");
    rems.style.width = Sem(A0) == "Number" ? A0 + "px" : A0;
    Derie("body")[0].insertBefore(rems, Derie("body")[0].firstChild);

    let _T0 = parseFloat(Getsy(Derie(".sfget_ew")[0]).compute("width"));

    Derie("body")[0].removeChild(Derie(".sfget_ew")[0]);
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
function SfChainArguments(fn) {
    return (tmp = args => arg => arg ? tmp([...args, ...arg]) : fn(...args))([])
}

function MsChainFunctions(obj) {
    return fn => fn ? MsCF(fn(obj)) : obj
}

class Note extends Map {
    constructor() {
        super();
    }
    cset(name, proto) {
        super.set(name, (() => {
            switch (proto) {
                case Array:
                    return new Docarr()
                case Object:
                    return new Docobj()
                case Map:
                    return new Docmap()
                default:
                    return new Doclet()
            }
        })())
        return super.get(name);
    }
    aset(name, arg) {
        if (super.has(name)) console.warn(name + " is already written in this Note.")
        if (!super.has(name)) return this.cset(name, arg);
    }
    set join(newNote) {
        newNote.forEach((value, key) => {
            if (!super.has(key)) super.set(key, value)
        })
        return this;
    }
    set assign(newNote) {
        new Note.forEach((value, key) => super.set(key, value))
        return this;
    }
}

class Docarr extends Array {
    constructor() {
        super()
    }
    cset(arg) {
        super.push(arg)
        return this;
    }
    aset(arg) {
        if (!arg.includes(arg)) super.push(arg)
    }
    remove(arg) {
        super.forEach((_E0, _E1) => {
            if (_E0 == arg) super.splice(_E1, 1)
        })
    }
    replace(arg) {
        super.splice(0);
        arg.forEach(_E0 => super.cset(_E0))
    }
}

class Docobj extends Object {
    constructor() {
        super()
    }
    cset(property, arg) {
        super[property] = arg;
        return this;
    }
    aset(property, arg) {
        Object.keys(this).forEach((_E0) => {
            if (_E0 != property) super.cset(property, arg)
        })
    }
    remove(property) {
        delete super[property];
    }
    replace(arg) {
        Object.keys(this).forEach(_E0 => delete super[_E0]);
        Object.keys(arg).forEach(_E0 => this.cset(_E0, arg[_E0]));
    }
}

class Docmap extends Map {
    constructor() {
        super()
    }
    cset(key, arg) {
        super.set(key, arg)
    }
    aset(key, arg) {
        if (!super.has(key)) super.cset(key, arg)
    }
    replace(arg) {
        super.keys().forEach(_E0 => super.delete(_E0))
        arg.keys().forEach(_E0 => super.cset(_E0, arg.get(_E0)))
    }
}

class Doclet {
    cset(arg) {
        this.value = arg;
        return this;
    }
    get self() {
        return this.value;
    }
}

const note = new Note()

function BookTag(book, page) {
    window[page] = new Function(`return ${book}.self.get("${page}")`)()
};

function baser(...args) {
    if (args.length % 2 != 0) {
        console.warn("length of args must be even");
        return false
    }
    args = [args.slice(0, args.length / 2), args.slice(-args.length / 2)]

    let _T0 = new Object()
    args[0].forEach((_E0, _E1) => {
        _T0[_E0] = args[1][_E1];
    })
    return _T0;
}

note.cset("OmitFn", Map);
OmitFunctionName("OmitFunctionName", "OmitFn")
OmitFn("DeriveElements", "Derie")
OmitFn("GetStyle", "Getsy")
OmitFn("SeChainArguments", "Cag")
OmitFn("MsChainfunctions", "Cfn")
OmitFn("ExeFuncAftLoad", "Efal");

function OmitFunctionName(base, abbr, Postscript) {
    if (!Postscript) {
        note.get("OmitFn").set(base, [abbr])
    } else {
        note.get("OmitFn").set(base, note.get("OmitFn").get(base) ? [...note.get("OmitFn").get(base), abbr] : [abbr])
    }
    window[abbr] = new Function("...arg", `return ${Array.from(note.get("OmitFn").entries()).filter(_E0 => _E0[1].some(_E1 => _E1 == abbr))[0][0]}(...arg)`);
}

//-Object--------------------
note.cset("Aomadds", Object).replace({
    Aomarr: {},
    Aomobj: {},
    Aommap: {},
    Aomwea: {},
    Aomstr: {},
    Aomnum: {},
    Aomboo: {},
    Aomhtm: {},
    Aomfun: {},
    Aomreg: {},
    Aomdat: {}
});

function Aom(proto, name, func) {
    try {
        if (name) {
            note.get("Aomadds")["Aom" + (proto === HTMLElement ? "htm" : Sem(new proto).toLowerCase().substr(0, 3))][name] = func;
        } else {
            let reobj = {};
            Object.keys(note.get("Aomadds")["Aom" + Sem(proto).toLowerCase().substr(0, 3)]).forEach(_E0 => reobj[_E0] = note.get("Aomadds")["Aom" + Sem(proto).toLowerCase().substr(0, 3)][_E0].bind(proto))
            return reobj;
        }
    } catch {
        return undefined;
    }
};

note.cset("EventListeners", Map);
note.cset("TextSize", Map);
[
    [Array, "flat", function () {
        return (A2A = _A0 => _A0.flatMap(_E0 => Array.isArray(_E0) ? A2A(_E0) : _E0))(this)
    }],
    [Array, "unDup", function /**Duplicate */ (back) {
        return this.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i);
    }],
    [Object, "is", function (arg) {
        return (arg instanceof Object && !(arg instanceof Array)) ? true : false;
    }],
    [Object, "forEach", function (fn) {
        Object.keys(this).forEach(key => {
            let val = this[key];
            fn(key, val);
        }, this)
    }],
    [Object, "deepCopy", function () {
        let reobj = {};
        Object.keys(this).forEach(key => {
            reobj[key] = this[key]
        })
        return reobj;
    }],
    [String, "comprise", function (string) {
        return this.match(new RegExp(string.toLowerCase())) !== null ? true : false
    }],
    [Number, "that", function () {
        return this
    }],
    [Number, "zeroPadding", function (dig) {
        const AddZero = (_num, _dig) => _num.length < (_num.indexOf(".") == -1 ? _dig : _dig + 1) ? AddZero("0" + _num, _dig) : _num;
        if (String(dig).indexOf(".") == -1) {
            if (String(this).length < (String(this).indexOf(".") == -1 ? dig : dig + 1)) {
                return AddZero(String(this), dig /**(String(num).indexOf(".") == -1 ? dig : dig + 1)*/ );
            } else {
                throw new Error("Digit must be bigger than digit of number")
            }
        } else {
            throw new Error("Digit must be natural number")
        }
    }],
    [Function, "bind", function (that) {
        let it = this;
        return it.bind(that)
    }],
    [HTMLElement, "addEventListener", function (type, listener, ...args) {
        switch (type) {
            case "scroll":
                let symscroll = Symbol();
                note.get("EventListeners").cset(symscroll, [this.scrollLeft, this.scrollTop]);
                return Tasks(() => {
                    let _T0 = note.get("EventListeners").get(symscroll)[0] !== this.scrollLeft || note.get("EventListeners").get(symscroll)[1] !== this.scrollTop;
                    if (_T0) note.get("EventListeners").cset(symscroll, [this.scrollLeft, this.scrollTop]);
                    return _T0;
                }, listener, ...args);
            case "resize":
                let symresize = Symbol();
                note.get("EventListeners").cset(symresize, [parseInt(Getsy(this).compute("width")[0]), parseInt(Getsy(this).compute("height")[0])]);
                return Tasks(() => {
                    let _T1 = note.get("EventListeners").get(symresize)[0] !== parseInt(Getsy(this).compute("width")[0]) || note.get("EventListeners").get(symresize)[1] !== parseInt(Getsy(this).compute("height")[0]);
                    if (_T1) note.get("EventListeners").cset(symresize, [parseInt(Getsy(this).compute("width")[0]), parseInt(Getsy(this).compute("height")[0])]);
                    return _T1;
                }, listener, ...args);
        }
    }],
    [HTMLElement, "removeEventListener", function (id) {
        Tasks("remove", id);
    }],
    [HTMLElement, "DescendantFlat", function () {
        return Aom(child(this)).unDup();

        function child(elem) {
            return elem.children.length > 0 ? Array.from(elem.children).flatMap(_E0 => {
                return [elem].concat(child(_E0));
            }) : elem;
        }
    }],
    [HTMLElement, "TextSize", function (Wper, Hper) {
        if (!note.get("TextSize").has(this)) note.get("TextSize").cset(this, baser("height", "width", 100, 100))
        if (Wper === undefined) {
            let rems = document.createElement('span');
            rems.setAttribute("class", "sfget_ew");
            Derie("body")[0].insertBefore(rems, Derie("body")[0].firstChild);

            Derie(".sfget_ew")[0].innerText = this.innerText;
            Derie(".sfget_ew")[0].style.fontSize = Getsy(this).compute("font-size")[0]
            Derie(".sfget_ew")[0].style.writingMode = Getsy(this).compute("writing-mode")[0]
            Derie(".sfget_ew")[0].style.lineHeight = Getsy(this).compute("line-height")[0]
            let [_TH, _TW] = [Derie(".sfget_ew")[0].offsetHeight, Derie(".sfget_ew")[0].offsetWidth]
            // let [_TH, _TW] = [Getsy(Derie(".sfget_ew")[0]).compute("height")[0], Getsy(Derie(".sfget_ew")[0]).compute("width")[0]]
            this.style.fontSize = (parseInt(Getsy(this).compute("width")[0]) / parseInt(_TW) <= parseInt(Getsy(this).compute("height")[0]) / parseInt(_TH) ?
                parseInt(Getsy(this).compute("width")[0]) / parseInt(_TW) * parseInt(Getsy(this).compute("font-size")[0]) * potopx(note.get("TextSize").get(this)["width"]) * 0.01 :
                parseInt(Getsy(this).compute("height")[0]) / parseInt(_TH) * parseInt(Getsy(this).compute("font-size")[0]) * potopx(note.get("TextSize").get(this)["height"]) * 0.01) + "px"

            Derie("body")[0].removeChild(Derie(".sfget_ew")[0]);
        } else if (Aom(Wper).comprise("add")) {
            this.classList.add("text_contain")
            Aom(this).addEventListener("resize", TextSize, _E0)
        }
        /*else if (Aom(Wper).comprise("remove")) {
                   this.classList.remove("text_contain")
                   Aom(this).removeEventListener("resize", TextSize, _E0)
               } */
        else {
            Wper = Wper === null ? note.get("TextSize").get(this)["width"] : Wper;
            Hper = Hper === null ? note.get("TextSize").get(this)["height"] : (Hper === undefined ? Wper : Hper);
            note.get("TextSize").cset(this, baser("height", "width", Wper, Hper))
        }
    }]
].forEach((_E0) => Aom(..._E0));

const aom = Symbol();
[Array, Object, Map, WeakMap, String, Number, Boolean, Function, RegExp, Date].forEach(_E0 => _E0.prototype[aom] = function () {
    return Aom(this);
})
HTMLElement[aom] = function () {
    return Aom(this)
}

Efal(
    () => {
        Derie(".text_contain").forEach(_E0 => {
            Aom(_E0).TextSize();
            Aom(_E0).addEventListener("resize", (() => Aom(_E0).TextSize()))
        })
    }
)

function Sem(proto) {
    try {
        return proto.constructor.name;
    } catch {
        return undefined
    }
}

function Optionalys(...args) {
    if (args.length == 0 || args[0] == undefined || args.some(_E0 => typeof _E0 == "number")) return false;
    args = [args[0], typeof args.slice(-1)[0] == "boolean" ? args.slice(1, -1) : args.slice(1), args.slice(-1)[0] == false ? false : true]
    return args[1].concat().filter(_E0 => args[2] ? new RegExp(_E0).test(args[0]) : new RegExp(_E0.toLowerCase()).test(args[0].toLowerCase())).length > 0 ? true : false;
    //_T0 = new Array(args[1].filter(_E0 => new RegExp(_E0).test(args[0]))).flat();
}

note.cset("KeyHold", Map);
note.cset("KeyCount", Map);
note.cset("KeyCode").cset(false)

function Keys(type, code, clear) {
    switch (type) {
        case "hold":
            return note.get("KeyHold").get(code)
        case "count":
            if (!code) note.get("KeyCount")
            if (clear) {
                note.get("KeyCount").set(code, 0)
                break;
            } else {
                return note.get("KeyCount").get(code)
            };
        case "code":
            note.get("KeyCode").cset(!note.get("KeyCode").self)
            return "KeyCode : " + note.get("KeyCode").self;
    }
}

window.addEventListener('keydown', (event) => {
    if (!event.repeat) note.get("KeyCount").set(event.keyCode, note.get("KeyCount").get(event.keyCode) == undefined ? 1 : note.get("KeyCount").get(event.keyCode) + 1)
    if (note.get("KeyCode").self) console.log(event.keyCode);
})
window.addEventListener('keydown', (event) => {
    if (!event.repeat) note.get("KeyHold").set(event.keyCode, true)
})
window.addEventListener('keyup', (event) => {
    if (!event.repeat) note.get("KeyHold").set(event.keyCode, false)
})

//-Calculation---------------

Efal(
    (() => note.cset("CSSPoint", Object).replace({
        vwwos: () => Derie(":root")[0].style.setProperty('--vwwos', document.body.clientWidth / 100 + "px"),
        vhwos: () => Derie(":root")[0].style.setProperty('--vhwos', document.body.clientHeight / 100 + "px")
    }))
)

function CSSPoint(id) {
    note.get("CSSPoint")[id]()
}

window.addEventListener("resize", () => {
    CSSPoint("vwwos");
    CSSPoint("vhwos");
})

//-Auto Process--------------
//Puppeteer
note.cset("sfwindow");

function rewindow(width, height, size) {
    if (width == "close") {
        note.get("sfwindow").cset(undefined);
        return false
    }
    if (Sem(width) != Sem(height)) {
        console.log("The first and second arguments must have the same type.");
        return false
    }
    _F0 = () => {
        note.get("sfwindow").cset(window.open(location.href, "sfwindow", `width=${Sem(width) == "Number" ? size ? potopx(size) + "px" : "300px" : width},\
                height=${Sem(height) == "Number" ? size ? potopx(size) * height / width + "px" : 300 * height / width : height}`));
        let _T0 = setInterval(() => {
            if (!note.get("sfwindow") || note.get("sfwindow").closed) {
                clearInterval(_T0);
                rewindow("close")
            }
        }, 1000);
    }
    try {
        if (sfwindow && !sfwindow.closed) sfwindow.close();
    } catch {}
    _F0()
}

note.cset("TasksInterval").cset(sfconfig.TaskInterval)
note.cset("Tasks", Array)
Tasks("start");

function Tasks(_A0, _A1, ..._A2) /**(If, Function, Arguments) */ {
    switch (_A0) {
        case "remove":
            note.get("Tasks").forEach((_E0, _E1, _E2) => {
                if (_E0["Id"] == _A1) _E2.splice(_E1, 1)
            })
            break;
        case "start":
            if (sfconfig.TaskInterval == 0) {
                note.get("TasksInterval").cset(sfconfig.TaskInterval);
                Tasks("call");
            } else if (sfconfig.TaskInterval > 0) {
                if (sfconfig.TaskInterval < 1) {
                    console.error("Task Interval must be 0, -1 or a positive natural number.")
                } else {
                    note.get("TasksInterval").cset(window.setInterval(Tasks, sfconfig.TaskInterval, "call"));
                }
            };
            break;
        case "stop":
            if (sfconfig.TAskInterval == 0) {
                note.cset("TasksInterval").cset(-1)
            } else if (sfconfig.TaskInterval > 0) {
                window.clearInterval(note.get("TasksInterval"));
            };
            break;
        case "call":
            note.get("Tasks").forEach(_E0 => {
                if (_E0["If"]() && _E0["Work"]) {
                    _E0["Function"](..._E0["Arguments"])
                    if (!sfconfig.AlwaysTasksWork) {
                        _E0["Work"] = false;
                    }
                } else if (!_E0["If"]() && !_E0["Work"]) {
                    _E0["Work"] = true;
                }
            })
            if (note.get("TasksInterval").self == 0) window.requestAnimationFrame(Tasks.bind(null, "call"))
            break;
        default:
            let id = Symbol();
            note.get("Tasks").cset(baser("Work", "Id", "If", "Function", "Arguments", true, id, _A0, _A1, _A2))
            return id;
    };
}

function ExeFuncAftLoad(Func) {
    window.addEventListener("load", Func)
}

/*function FuncProgeny(_E0, fn) {
    return Derie(_E0).map(_E1 => {
        if (_E1.hasChildNodes().length != 0) {
            return Array.from(_E1.childNodes).map(_E2 => {
                return FuncProgeny(_E2, fn)
            })
        } else {
            return fn(_E1);
        }
    })
}*/

//-Item Function-------------
function Random(min, max, digit) {
    if (!digit) digit = 0;
    return (Math.random() * (max - min) + min).toFixed(digit) - 0
}

/**A revised version will be released soon.
 * 
 * function Funcrand(graph, xmin, xmax, ymin, ymax) {
    let [xx, yy] = [Random(xmin, xmax), Random(ymin, ymax)]
    let x = xx
    return new Function(`return ${graph}`)() >= yy ? yy : Funcrand(graph, xmin, xmax, ymin, ymax);
}

function RandFn(now, min, max) { return now >= Random(min, max) ? true : false; }*/

//-Loaded--------------------
console.log("Seifuncs ver.1.6.1 for JS was completely loaded.")
if (/^(?=.*Chrome)(?!.*Edge)/.test(window.navigator.userAgent)) {
    console.log("%c %c Seifuncs for JS %c \n%c %c Developer : Seizya \n%c %c GitHub : https://github.com/Seizya \n%c %c Special Thanks : omasakun (github.com/omasakun)",
        "background-color:#165e83;border-bottom:solid #f0f 2px", "border-bottom:solid #f0f 2px", "", "background-color:#165e83", "", "background-color:#165e83", "", "background-color:#165e83", "color: transparent")
} else {
    console.log("Seifuncs for JS \nDeveloper : Seizya \nGitHub : https://github.com/Seizya")
}
if (/MSIE|Trident|Edge/.test(window.navigator.userAgent)) console.warn("The use of Seifuncs in IE is not envisaged at all. \nPlease immediately stop using Seifucs and use another browser. \nThere are no plans to support IE.")