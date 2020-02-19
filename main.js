//Config---------------------
const sfconfig = {
    TaskInterval: 0,
    AlwaysTasksWork: false,
    MasterKey: Symbol()
};

//Maindish-------------------
/* 
このスクリプトは、どのスクリプトよりも早く読み込まれるようにしてください。

import-htmlタグを追加します。
例えば、<import-html src="./button.html"></import-html> とすれば、 ./button.html の内容でそのタグが置き換えられます。
なお、標準では、最初にページが読み込まれたときにのみ import-html タグの置き換えがされます。
もし、それ以外のタイミングで import-html タグの解釈をさせたい場合、 importHTMLs 関数を引数無しで読んでください。

このスクリプトが読み込まれてから window の load イベントが発火するまでに追加された load イベントハンドラーは、importHTMLs 実行後に呼び出されます。
*/

/*(() => {
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
}*/

export function SublimateElements(id, option) {
    return Aom([id]).fullFlat().flatMap(_E0 => Sem(id).includes("HTML") && Sem(id).includes("Element") ? _E0 : GetElement(id));

    function GetElement(_id) {
        try {
            switch (option) {
                default:
                    return Array.from(document.querySelectorAll(_id));
            }
        } catch (e) {
            switch (option) {
                case "$Descendant":
                    if (Aom(_id).comprise("#")) {
                        return Aom(document.querySelectorAll("html")[0]).DescendantFlat().filter(_E0 => Aom(_E0.id).comprise(_id.replace(/#/g, "")));
                    } else if (Aom(_id).comprise(".")) {
                        return Aom(document.querySelectorAll("html")[0]).DescendantFlat().filter(_E0 => _E0.className.split(" ").filter(_E1 => _E1.match(new RegExp(_id.replace(/[\.]+/g, "")))).length > 0);
                    } else {
                        return Aom(document.querySelectorAll("html")[0]).DescendantFlat().filter(_E0 => Aom(_E0.tagName).comprise(_id.replace(/#/g, "")));
                    };
                default:
                    return undefined;
            }
        }
    }
}

export function GetStyle(_A0) {
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
                    return window.getComputedStyle(Subes("html")).getPropertyValue("font-size");
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

export function potopx(A0) {
    let rems = document.createElement('span');
    rems.setAttribute("class", "sfget_ew");
    rems.style.width = Sem(A0) == "Number" ? A0 + "px" : A0;
    Subes("body")[0].insertBefore(rems, Subes("body")[0].firstChild);

    let _T0 = parseFloat(Getsy(Subes(".sfget_ew")[0]).compute("width"));

    Subes("body")[0].removeChild(Subes(".sfget_ew")[0]);
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
export function ChainArguments(fn) {
    return (tmp = args => arg => arg ? tmp([...args, ...arg]) : fn(...args))([])
}

export function ChainFunctions(obj) {
    return fn => fn ? MsCF(fn(obj)) : obj
}

export class Note extends Map {
    constructor() {
        super();
    }
    set(key, value) {
         super.set(key, value || new letPage());
         return this.get(key);
    }
    aset(name, arg) {
        if (super.has(name)) console.warn(name + " is already written in this Note.")
        if (!super.has(name)) return this.set(name, arg);
    }
    join(newNote) {
        newNote.forEach((value, key) => {
            if (!super.has(key)) this.set(key, value)
        })
        return this;
    }
    assign(newNote) {
        newNote.forEach((value, key) => this.set(key, value))
        return this;
    }
}

class letPage {
    constructor() {
        this.data;
    }
    set(input) {
        this.data = input;
        return this;
    }
    get(input) {
        return this.data;
    }
}

const note = new Note()

// function BookTag(book, page) {
//     window[page] = new Function(`return ${book}.self.get("${page}")`)()
// };

export function baser(...args) {
    if (args.length % 2 != 0) {
        console.warn("length of args must be even");
        return false;
    }
    args = [args.slice(0, args.length / 2), args.slice(-args.length / 2)]

    let _T0 = new Object()
    args[0].forEach((_E0, _E1) => {
        _T0[_E0] = args[1][_E1];
    })
    return _T0;
}

export function cutter(input) {
    return (input === HTMLElement ? "htm" : Sem(new input).toLowerCase().substr(0, 3))
}

export const Subes = SublimateElements;
export const Getsy = GetStyle;
const Cag = ChainArguments;
const Cfn = ChainFunctions;
const Efal = ExeFuncAftLoad;
/*
note.set("OmitFn", Map);
OmitFunctionName("OmitFunctionName", "OmitFn")
OmitFn("SublimateElements", "Subes")
OmitFn("GetStyle", "Getsy")
OmitFn("SfChainArguments", "Cag")
OmitFn("MsChainFunctions", "Cfn")
OmitFn("ExeFuncAftLoad", "Efal");
function OmitFunctionName(base, abbr, Postscript?) {
  if (!Postscript) {
    note.get("OmitFn").set(base, [abbr])
  } else {
    note.get("OmitFn").set(base, note.get("OmitFn").get(base) ? [...note.get("OmitFn").get(base), abbr] : [abbr])
  }
  window[abbr] = new Function("...arg", `return ${Array.from(note.get("OmitFn").entries()).filter(_E0 => _E0[1].some(_E1 => _E1 == abbr))[0][0]}(...arg)`);
}
*/

//-Object--------------------
class Aomadds {
    constructor() {
        this.arr = {};
        this.obj = {};
        this.map = {};
        this.wea = {};
        this.str = {};
        this.num = {};
        this.boo = {};
        this.htm = {};
        this.fun = {};
        this.reg = {};
        this.dat = {};
        this.master_data = [];
    };
    set(proto, name, func) {
        if (this.master_data.filter(_E0 => _E0[0] == cutter(proto) && _E0[1] == name).length == 0) {
            this[cutter(proto)][name] = func;
        } else {
            console.warn(proto + " was used by Developer on " + proto);
        }
        return this;
    };
    aset(proto, name, func) {
        if (!Object.keys(this[cutter(proto)]).includes(name)) {
            this.set(proto, name, func);
        } else {
            console.warn(proto + " was already used on " + proto);
        }
        return this;
    };
    get(proto) {
        return this[proto];
    };
    has(proto, name) {
        return !Object.keys(this[cutter(proto)]).includes(name);
    };
    delete(proto, name) {
        if (this.master_data.filter(_E0 => _E0[0] == cutter(proto) && _E0[1] == name).length == 0) {
            this[cutter(proto)][name] = undefined;
        }
        return this;
    };
    master(proto, name, func, key) {
        if (key == sfconfig.MasterKey) {
            if (this.master_data.filter(_E0 => _E0[0] == cutter(proto) && _E0[1] == name).length == 0) {
                this[cutter(proto)][name] = func;
                this.master_data.push([cutter(proto), name]);
            } else {
                console.warn(proto + " was already used on " + proto);
            }
        } else {
            console.warn("I can't accept your order.")
        }
        return this;
    };
    backup() {
        return baser("arr", "obj", "map", "wea", "str", "num", "boo", "htm", "fun", "reg", "dat", "master", this.arr, this.obj, this.map, this.wea, this.str, this.num, this.boo, this.htm, this.fun, this.reg, this.dat, this.master)
    };
    restore(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
        return this;
    };
    join(data) {
        Object.keys(data).forEach(key => data[key].forEach(datakey => {
            if (!this[key].hasOwnProperty(datakey)) this[key][datakey] = data[key][datakey]
        }));
        return this;
    };
    assign(data) {
        Object.keys(data).forEach(key => data[key].forEach(datakey => this[key][datakey] = data[key][datakey]));
        return this;
    };
}

export function Aom(proto) {
    try {
        if (!proto) {
            return note.get("Aomadds");
        } else {
            let reobj = {};
            Object.keys(note.get("Aomadds").get((Sem(proto).includes("Doc") ? Sem(proto).replace(/Doc/g, "") : Sem(proto)).toLowerCase().substr(0, 3))).forEach(_E0 => reobj[_E0] = note.get("Aomadds").get((Sem(proto).includes("Doc") ? Sem(proto).replace(/Doc/g, "") : Sem(proto)).toLowerCase().substr(0, 3))[_E0].bind(proto))
            return reobj;
        }
    } catch {
        return undefined;
    }
};

note.set("Aomadds", new Aomadds());

note.set("EventListeners", new Map());
note.set("TextSize", new Map());
[
    [Array, "fullFlat", function () {
        let A2A;
        return (A2A = _A0 => _A0.flatMap(_E0 => Array.isArray(_E0) ? A2A(_E0) : _E0))(this)
    }],
    [Array, "unDup", function /**Duplicate */ (back) {
        return this.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i);
    }],
    // [Object, "is", function (arg) {
    //     return (arg instanceof Object && !(arg instanceof Array)) ? true : false;
    // }],
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
    [Object, "toMap", function () {
        return new Map(Object.entries(this));
    }],
    [String, "comprise", function (string) {
        return this.match(new RegExp(string.toLowerCase())) !== null ? true : false
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
            Subes("body")[0].insertBefore(rems, Subes("body")[0].firstChild);

            Subes(".sfget_ew")[0].innerText = this.innerText;
            Subes(".sfget_ew")[0].style.fontSize = Getsy(this).compute("font-size")[0]
            Subes(".sfget_ew")[0].style.writingMode = Getsy(this).compute("writing-mode")[0]
            Subes(".sfget_ew")[0].style.lineHeight = Getsy(this).compute("line-height")[0]
            let [_TH, _TW] = [Subes(".sfget_ew")[0].offsetHeight, Subes(".sfget_ew")[0].offsetWidth]
            // let [_TH, _TW] = [Getsy(Subes(".sfget_ew")[0]).compute("height")[0], Getsy(Subes(".sfget_ew")[0]).compute("width")[0]]
            this.style.fontSize = (parseInt(Getsy(this).compute("width")[0]) / parseInt(_TW) <= parseInt(Getsy(this).compute("height")[0]) / parseInt(_TH) ?
                parseInt(Getsy(this).compute("width")[0]) / parseInt(_TW) * parseInt(Getsy(this).compute("font-size")[0]) * potopx(note.get("TextSize").get(this)["width"]) * 0.01 :
                parseInt(Getsy(this).compute("height")[0]) / parseInt(_TH) * parseInt(Getsy(this).compute("font-size")[0]) * potopx(note.get("TextSize").get(this)["height"]) * 0.01) + "px"

            Subes("body")[0].removeChild(Subes(".sfget_ew")[0]);
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
].forEach((_E0) => Aom().master(_E0[0], _E0[1], _E0[2], sfconfig.MasterKey));

export const aom = Symbol();
[Array, Object, Map, WeakMap, String, Number, Boolean, Function, RegExp, Date].forEach(_E0 => _E0.prototype[aom] = function () {
    return Aom(this);
})
HTMLElement[aom] = function () {
    return Aom(this)
}

Efal(
    () => {
        Subes(".text_contain").forEach(_E0 => {
            Aom(_E0).TextSize();
            Aom(_E0).addEventListener("resize", (() => Aom(_E0).TextSize()))
        })
    }
)

export function Sem(proto) {
    try {
        return proto.constructor.name;
    } catch {
        return undefined
    }
}

export function Sim(proto){
    return typeof proto;
}

function Optionalys(...args) {
    if (args.length == 0 || args[0] == undefined || args.some(_E0 => typeof _E0 == "number")) return false;
    args = [args[0], typeof args.slice(-1)[0] == "boolean" ? args.slice(1, -1) : args.slice(1), args.slice(-1)[0] == false ? false : true]
    return args[1].concat().filter(_E0 => args[2] ? new RegExp(_E0).test(args[0]) : new RegExp(_E0.toLowerCase()).test(args[0].toLowerCase())).length > 0 ? true : false;
    //_T0 = new Array(args[1].filter(_E0 => new RegExp(_E0).test(args[0]))).flat();
}

note.set("KeyHold", new Map());
note.set("KeyCount", new Map());
note.set("KeyCode").set(false)

export function Keys(type, code, clear) {
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
            note.get("KeyCode").set(!note.get("KeyCode"))
            return "KeyCode : " + note.get("KeyCode").get();
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
    (() => note.set("CSSPoint", Aom({
        vwwos: () => Subes(":root")[0].style.setProperty('--vwwos', document.body.clientWidth / 100 + "px"),
        vhwos: () => Subes(":root")[0].style.setProperty('--vhwos', document.body.clientHeight / 100 + "px")
    }).toMap()))
)

export function CSSPoint(id) {
    note.get("CSSPoint").get(id)()
}

window.addEventListener("resize", () => {
    CSSPoint("vwwos");
    CSSPoint("vhwos");
})

//-Auto Process--------------
//Puppeteer
note.set("sfwindow");

export function rewindow(width, height, size) {
    if (width == "close") {
        note.get("sfwindow").set(undefined);
        return false
    }
    if (Sem(width) != Sem(height)) {
        console.log("The first and second arguments must have the same type.");
        return false
    }
    _F0 = () => {
        note.get("sfwindow").set(window.open(location.href, "sfwindow", `width=${Sem(width) == "Number" ? size ? potopx(size) + "px" : "300px" : width},\
                height=${Sem(height) == "Number" ? size ? potopx(size) * height / width + "px" : 300 * height / width : height}`));
        let _T0 = setInterval(() => {
            if (!note.get("sfwindow").get() || note.get("sfwindow").get().closed) {
                clearInterval(_T0);
                rewindow("close")
            }
        }, 1000);
    }
    try {
        if (note.get("sfwindow").get() && !note.get("sfwindow").get().closed) sfwindow.close();
    } catch {}
    _F0()
}

class TasksMember extends Array {
    constructor() {
        super();
    }
    add(If, Fn, ...Arguments) {
        let id = Symbol();
        this.push(baser("Work", "Id", "If", "Function", "Arguments", true, id, If, Fn, Arguments))
        return id;
    }
    remove(id) {
        this.forEach((_E0, _E1, _E2) => {
            if (_E0["Id"] == id) _E2.splice(_E1, 1)
        })
        return this;
    }
    start() {
        if (sfconfig.TaskInterval == 0) {
            note.get("TasksInterval").set(sfconfig.TaskInterval);
            Tasks("call");
        } else if (sfconfig.TaskInterval > 0) {
            if (sfconfig.TaskInterval < 1) {
                console.error("Task Interval must be 0, -1 or a positive natural number.")
            } else {
                note.get("TasksInterval").set(window.setInterval(Tasks, sfconfig.TaskInterval, "call"));
            }
        };
    }
    stop() {
        if (sfconfig.TAskInterval == 0) {
            note.set("TasksInterval").set(-1)
        } else if (sfconfig.TaskInterval > 0) {
            window.clearInterval(note.get("TasksInterval").get());
        };
    }
    call() {
        this.forEach(_E0 => {
            if (_E0["If"]() && _E0["Work"]) {
                _E0["Function"](..._E0["Arguments"])
                if (!sfconfig.AlwaysTasksWork) {
                    _E0["Work"] = false;
                }
            } else if (!_E0["If"]() && !_E0["Work"]) {
                _E0["Work"] = true;
            }
        })
        if (note.get("TasksInterval").get() == 0) window.requestAnimationFrame(Tasks.bind(null, "call"))
    }
}

export function Tasks(_A0, _A1, ..._A2) /**(If, Function, Arguments) */ {
    switch (_A0) {
        case "remove":
            return note.get("Tasks").remove(_A0);
        case "start":
            return note.get("Tasks").start();
        case "stop":
            return note.get("Tasks").stop();
        case "call":
            return note.get("Tasks").call();
        default:
            return note.get("Tasks").set(_A0, _A1, ..._A2);
    };
}

note.set("TasksInterval").set(sfconfig.TaskInterval)
note.set("Tasks", new TasksMember());
Tasks("start");

export function ExeFuncAftLoad(Func) {
    window.addEventListener("load", Func)
}

export function FuncProgeny(elem, fn) {
    return Aom(elem).DescendantFlat().map(_E0 => fn(_E0));
}

//-Item Function-------------
export function Random(min, max, digit) {
    if (!digit) digit = 0;
    return (Math.random() * (max - min) + min).toFixed(digit) - 0
}

/**A revised version will be released soon.
 * 
 * function Funcrand(graph, xmin, xmax, ymin, ymax) {
    let [xx, yy] = [Random(xmin, xmax), Random(ymin, ymax)]
    let x = xx
    return new Function(`return ${graph}`)() >= yy ? yy : Funcrand(graph, xmin, xmax, ymin, ymax);
}*/

export function RandFn(now, min, max) {
    return now >= Random(min, max) ? true : false;
}