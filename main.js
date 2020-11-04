function Elm(...args) {
    if (["Array", "Object", "String", "Map"].indexOf(Proto(args[0])) == -1) throw "args must be Array, Object, Map or String.";
    if (Proto(args[0]) == "String") {
        return document.querySelectorAll(args);
    } else {
        args = Baser(...args);
        let _T0 = document.createElement(args.get("tag"));
        args.forEach((value, key) => {
            switch (key) {
                case "tag":
                    break;
                case "addEventListener":
                    _T0.addEventListener(value[0], value[1], value[2]);
                    break;
                case "classList":
                    [value].flat().forEach(_E0 => _T0.classList.add(_E0));
                    break;
                case "innerText":
                    _T0.innerText = value;
                    break;
                case "style":
                    Baser(value).forEach((value1, key1) => _T0.style[key1] = value1);
                    break;
                default:
                    _T0.setAttribute(key, value);
            }
        })
        return _T0;
    }
}

//必要に応じて Export.
export class Note extends Map {
    constructor(name) {
        super();
        this.name = name;
    }

    cset(key, value) {
        if (super.has(key)) throw key + " is already written in this Note."
        return this.set(key, value);
    }

    fset(key, value) {
        if (!super.has(key)) this.set(key, value);
        return this;
    }

    oget(key, spare) {
        return this[key] || spare;
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

    //-Plus--------------------------------------

    static json(url) {
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();

        // console.clear(); //It's for deleting log that warn using xMLHttpRequest.
        return request.response;
    }

    save(key, value) { //localStorage 保存
        // if (!["Object", "Map"].includes(Proto(this.get(key)))) throw "Selected Value is not Object or Map";
        let _T0 = JSON.parse(localStorage.getItem(this.name)) || {};
        // _T0[key] = Proto(this.get(key)) == "Map" ? Object.fromEntries(this.get(key).entries()) : this.get(key);
        _T0[key] = value;
        localStorage.setItem(this.name, JSON.stringify(_T0));
        return this;
    }

    restore(key) { //localStorage 解凍
        return JSON.parse(localStorage.getItem(this.name))[key];
    }

    saveReset() {
        localStorage.removeItem(this.name);
        return this;
    }

    saveRemove(key) {
        let _T0 = JSON.parse(localStorage.getItem(this.name)) || {};
        delete _T0.key;
        localStorage.setItem(this.name, JSON.stringify(_T0));
    }

    saveHas(key) {
        return Object.keys(JSON.parse(localStorage.getItem(this.name)) || {}).includes(key);
    }

    download(key, name) { //JSON 保存
        Elm({
            tag: "a",
            download: this.name + "-" + name ? name : "" + "-" + String(new Date()).replace(new RegExp(" ", "g"), "-") + "." + "json",
            href: "data:text/plain," + encodeURIComponent(JSON.stringify(this.get(key)))
        }).click();

    }

    upload(key, url) { //JSON 解凍
        this.set(key, JSON.parse(Note.json(url)));
    }

}

const note = new Note("Seifuncs");
note.upload("config", "./Seifuncs/config.json");
// note.upload("config", "./config.json"); //for Test.html

//-Chain---------------------------------------------------------------------------------------------

class Chainadds {
    constructor() {
        this.Array = {};
        this.Object = {};
        this.Map = {};
        this.WeakMap = {};
        this.String = {};
        this.Number = {};
        this.Boolean = {};
        this.HTMLElement = {};
        this.Function = {};
        this.RegExp = {};
        this.Date = {};
        this.Window = {};

        this.support = {
            Array: new Array(),
            Object: new Object(),
            Map: new Map(),
            WeakMap: new WeakMap(),
            String: new String(),
            Number: new Number(),
            Boolean: new Boolean(),
            HTMLElement: Elm(["tag", "header"]),
            Function: new Function(),
            RegExp: new RegExp(),
            Date: new Date(),
            Window: window
        };
        // support schedule - Proxy, 

        if ([2].includes(note.get("config").Chain.level)) {
            this.restore = () => {
                Object.values(this.support).forEach(_E0 => Chain(_E0).restore());
                return this;
            };

            Object.values(this.support).map(_E0 => Proto(_E0).includes("HTML") ? "HTMLElement" : Proto(_E0)).forEach(_E0 => this
                .set(_E0, "restore", function () {
                    Object.entries(Object.getPrototypeOf(this)).map(_E0 => _E0[0]).forEach(_E0 => delete Object.getPrototypeOf(this)[_E0]);
                    return this;
                })
            )
        }

        Object.values(this.support).map(_E0 => Proto(_E0).includes("HTML") ? "HTMLElement" : Proto(_E0)).forEach(_E0 => this
            .set(_E0, "chain", function (...args) {
                if (Proto(args[0]) == "Function") return args[0].bind(this)(...args(0, 1));
                if (Proto(args[0]) == "String") return this[args[0]](...args.slice(0, 1));
                return args.reduce((accumulator, currentValue) => accumulator[currentValue[0]](...currentValue.slice(0, 1), this));
            }).set(_E0, "branch", function (...args) {
                this.chain(...args)[0];
                return this;
            }).set(_E0, "if", function (If, True, False) {
                return If.bind(this)() ? True ? this.chain(True) : this : False ? this.chain(False) : this;
            })
        )
    }

    set(proto, name, func) {
        if ([2].includes(note.get("config").Chain.level) && Object.getOwnPropertyNames(Object.getPrototypeOf(this.support[proto])).includes(name)) throw proto + " already has " + name;
        if ([1].includes(note.get("config").Chain.level) && Object.getOwnPropertyNames(Object.getPrototypeOf(this.support[proto])).includes(name)) console.warn(proto + " already has " + name);
        if (!note.get("config").Chain.exclude[proto].includes(name)) this[proto][name] = func;

        if ([0, 1].includes(note.get("config").Chain.level)) Chain(this.support.proto);
        return this;
    }

    cset(proto, name, func) {
        if (!this[Proto(_E0).includes("HTML") ? "HTMLElement" : Proto(_E0)][name]) throw name + "is already  in " + proto + " of Chain.";
        return this.set(proto, name, func);
    }

    fset(key, value) {
        if (!this[key]) this[key] = value;
        return this;
    }

    get(proto) {
        return this[Proto(proto).includes("HTML") ? "HTMLElement" : Proto(proto)];
    }

    sync() {
        Object.values(this.support).forEach(_E0 => Chain(_E0));
        return this;
    }
}

note.set("Chainadds", new Chainadds());

export function Chain(input) {
    return input ? Object.setPrototypeOf(input, Object.assign(Object.getPrototypeOf(input), note.get("Chainadds").get(input))) : note.get("Chainadds");
    // Chain let you add new methods in dynamic but these isn't sync with prototype till executing Chain.
    //You haven't to execute Chain after second time if you don't want dynamic sync.
};

[ //TODO JSONによる選択を可能にする
    ["Array", "fullFlat", function () {
        let A2A = _A0 => _A0.flatMap(_E0 => Array.isArray(_E0) ? A2A(_E0) : _E0)
        return A2A(this);
    }],
    ["Array", "unDup", function (back) {
        return this.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i);
    }],
    ["Array", "to", function (proto) {
        switch (proto) {
            case "Object":
                return Object.fromEntries(this);
            case "Map":
                return new Map(this);
            default:
                throw "Can't translate this array.";
        }
    }],
    ["Array", "equal", function (check) {
        return [...this.filter(_E0 => !check.indexOf(_E0) != -1), ...check.filter(_E0 => !this.indexOf(_E0) != -1)].length == 0;
    }],
    ["Array", "rap", function () {
        return [this];
    }],
    ["Object", "deepCopy", function () {
        return Object.fromEntries(Object.entries(this));
    }],
    ["Object", "to", function (proto) {
        switch (proto) {
            case "Array":
                return Object.entries(this);
            case "Map":
                return new Map(Object.entries(this));
            default:
                throw "Can't translate this object.";
        }
    }],
    ["Map", "cset", function (key, value) {
        if (this.has(key)) throw key + " is already written in this Map.";
        return this.set(key, value);
    }],
    ["Map", "fset", function (key, value) { //TODO fset大幅拡張
        if (!this.has(key)) this.set(key, value);
        return this;
    }],
    ["Map", "to", function (proto) {
        switch (proto) {
            case "Array":
                return this.entries();
            case "Object":
                return Object.fromEntries(this.entries());
            default:
                throw "Can't translate this map.";
        }
    }],
    ["String", "comprise", function (string) {
        return this.match(new RegExp(string.toLowerCase())) !== null ? true : false
    }],
    ["String", "potopx", function () {
        let rems = Elm({
            tag: "span",
            style: {
                width: this,
                visibility: "hidden",
                padding: 0,
                margin: 0
            }
        })
        Elm("body")[0].insertBefore(rems, Elm("body")[0].firstChild);

        let _T0 = parseFloat(rems.css("width"));

        Elm("body")[0].removeChild(rems);
        return _T0;
    }],
    ["Number", "zeroPadding", function (dig) {
        if (Proto(dig) != "Number" || String(dig).includes(".") || String(this).length > dig) throw "Dig isn't Appropriate.";
        return "0".repeat(this < 1 ? dig - String(this).length - 1 : dig - String(this).length) + this;
    }],
    ["Window", "css", function (prop) {
        switch (prop) {
            case "max":
                return Math.max(this.innerHeight, this.innerWidth);
            case "min":
                return Math.min(this.innerHeight, this.innerWidth);
            case "width":
                return this.innerWidth;
            case "height":
                return this.innerHeight;
            default:
                return window[prop];
        }
    }],
    ["HTMLElement", "css", function (prop, value) {
        if (!value) {
            switch (prop) {
                case "max":
                    return Math.max(this.clientWidth - (parseInt(window.getComputedStyle(this).getPropertyValue("padding-left")) + parseInt(window.getComputedStyle(this).getPropertyValue("padding-right"))), this.clientHeight - (parseInt(window.getComputedStyle(this).getPropertyValue("padding-top")) + parseInt(window.getComputedStyle(this).getPropertyValue("padding-bottom"))));
                case "min":
                    return Math.min(this.clientWidth - (parseInt(window.getComputedStyle(this).getPropertyValue("padding-left")) + parseInt(window.getComputedStyle(this).getPropertyValue("padding-right"))), this.clientHeight - (parseInt(window.getComputedStyle(this).getPropertyValue("padding-top")) + parseInt(window.getComputedStyle(this).getPropertyValue("padding-bottom"))));
                default:
                    return window.getComputedStyle(this).getPropertyValue(prop);
            }
        } else {
            this.style[prop] = value;
        }
        return this;
    }],
    ["HTMLElement", "addEventTask", function (type, listener, option) {
        class EventTasksMember {
            constructor() {
                this.func = listener;
                this.option = option;
                this.able = true;
                this.ended = false;
            }

            start() {
                this.able = true;
            }

            stop() {
                this.able = false;
            }

            remove() {
                this.able = false;
                this.ended = true;
            }

            call() {
                this.func(this);
            }
        }
        let _Tm1 = new EventTasksMember();

        note.fset("EventTasks", new Map()).get("EventTasks").fset(type, new Map()) //Target

        let TasksRegister = (Target, If, Start, End) => {
            if (Target.has(this)) {
                Target.get(this).list.push(_Tm1);
                return _Tm1;
            }
            Target.set(this, Baser(["state", undefined], ["list", new Array(_Tm1)]).to("Object"));
            if (Start) Start(Target.get(this));
            return Tasks((task) => {
                if (Target.get(this).list.filter(_E0 => !_E0.ended).length == 0) {
                    if (End) End(Target.get(this));
                    task.remove();
                    Target.delete(this);
                    return false;
                }
                return If(Target.get(this));
            }, () => {
                Target.get(this).list.filter(_E0 => _E0.able).forEach(_E0 => _E0.call());
                if (Proto(option) == "Object" && option.once) Target.get(this).list.forEach(_E0 => _E0.remove());
            });
        }

        switch (type) {
            case "scroll":
                return TasksRegister(note.get("EventTasks").get("scroll"), (target) => {
                    let _T0 = target.state.x !== this.scrollLeft || target.state.y !== this.scrollTop;
                    if (_T0) target.state = Baser(["x", this.scrollTop], ["y", this.scrollLeft]).to("Object");
                    return _T0;
                }, (target) => {
                    target.state = Baser(["x", this.scrollTop], ["y", this.scrollLeft]).to("Object");
                });

            case "resize":
                return TasksRegister(note.get("EventTasks").get("resize"), (target) => {
                    let _T0 = target.state.width !== parseInt(this.css("width")) || target.state.height !== parseInt(this.css("height"));
                    if (_T0) target.state = Baser(["width", parseInt(this.css("width"))], ["height", parseInt(this.css("height"))]).to("Object");
                    return _T0;
                }, (target) => {
                    target.state = Baser(["width", parseInt(this.css("width"))], ["height", parseInt(this.css("height"))]).to("Object");
                });

            case "classChange":
                return TasksRegister(note.get("EventTasks").get("classChange"), (target) => {
                    let _T0 = target.state.equal(Array.from(this.classList));
                    if (_T0) target.state = Array.from(this.classList);
                    return _T0;
                }, (target) => {
                    target.state = Array.from(this.classList);
                });

            case "touchlong": //option : time - Number
                return TasksRegister(note.get("EventTasks").get("touchlong").fset(Proto1("Number", Baser1("time", option).get("time"), note.get("config").Touch.time) + "", new Map()).get(Proto1("Number", Baser1("time", option).get("time"), note.get("config").Touch.time) + ""), (target) => {
                    return false;
                }, (target) => {
                    target.state = {
                        listener: () => {
                            let _T0 = setTimeout(() => {
                                target.list.filter(_E0 => _E0.able).forEach(_E0 => _E0.call());
                                if (Proto(option) == "Object" && option.once) target.list.forEach(_E0 => _E0.remove());
                            }, Proto1("Number", Baser1("time", option).get("time"), note.get("config").Touch.time));
                            this.addEventListener("touchend", () => clearTimeout(_T0), Baser(["once", true]).to("Object"));
                        }
                    };
                    this.addEventListener("touchstart", target.state.list, new Array(["passive", (!option || option.passive == undefined) ? true : option.passive]).to("Object"));
                }, (target) => {
                    this.removeEventListener("touchstart", target.state.list, new Array(["passive", (!option || option.passive == undefined) ? true : option.passive]).to("Object"));
                })

            case "touchslide": //option : direction
                return TasksRegister(note.get("EventTasks").get("touchslide").fset(Baser1("direction", option).get("direction"), new Map()).get(Baser1("direction", option).get("direction")), (target) => {
                    return false;
                }, (target) => {
                    target.state = {
                        coordinate: [],
                        listener: (event) => { //TODO 四捨五入用Round関数
                            let passive = true;
                            // event.preventDefault();
                            target.state.coordinate = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
                            let _T0 = (event1) => { //touchmove
                                if (Math.sqrt(Math.pow(target.state.coordinate[0] - event1.changedTouches[0].pageX, 2) + Math.pow(target.state.coordinate[1] - event1.changedTouches[0].pageY, 2)) >= note.get("config").Touch.slide) {
                                    if ((() => {
                                            switch (Proto(option) == "Object " ? option.slide : option) {
                                                case "x":
                                                    return Math.abs(target.state.coordinate[0] - event1.changedTouches[0].pageX) > Math.abs(target.state.coordinate[1] - event1.changedTouches[0].pageY) ? true : false;
                                                case "y":
                                                    return Math.abs(target.state.coordinate[0] - event1.changedTouches[0].pageX) < Math.abs(target.state.coordinate[1] - event1.changedTouches[0].pageY) ? true : false;
                                                case "right":
                                                    return -1 * (target.state.coordinate[0] - event1.changedTouches[0].pageX) > Math.abs(target.state.coordinate[1] - event1.changedTouches[0].pageY) ? true : false;
                                                case "left":
                                                    return (target.state.coordinate[0] - event1.changedTouches[0].pageX) > Math.abs(target.state.coordinate[1] - event1.changedTouches[0].pageY) ? true : false;
                                                case "top":
                                                    return Math.abs(target.state.coordinate[0] - event1.changedTouches[0].pageX) < (target.state.coordinate[1] - event1.changedTouches[0].pageY) ? true : false;
                                                case "bottom":
                                                    return Math.abs(target.state.coordinate[0] - event1.changedTouches[0].pageX) < -1 * (target.state.coordinate[1] - event1.changedTouches[0].pageY) ? true : false;
                                                default:
                                                    return true;
                                            }
                                        })()) {
                                        target.list.filter(_E0 => _E0.able).forEach(_E0 => _E0.call())
                                        if (Proto(option) == "Object" && option.once) target.list.forEach(_E0 => _E0.remove());
                                    }
                                    target.state.coordinate = [event1.changedTouches[0].pageX, event1.changedTouches[0].pageY];
                                }
                            }
                            this.addEventListener("touchmove", _T0, new Array(["passive", (!option || option.passive == undefined) ? passive : option.passive]).to("Object"));
                            this.addEventListener("touchend", () => {
                                this.removeEventListener("touchmove", _T0, new Array(["passive", (!option || option.passive == undefined) ? passive : option.passive]).to("Object"));
                                target.state.coordinate = [];
                                return false;
                            }, Baser(["once", true]).to("Object"));
                        }
                    };
                    this.addEventListener("touchstart", target.state.list, new Array(["passive", (!option || option.passive == undefined) ? true : option.passive]).to("Object"));
                }, (target) => {
                    this.removeEventListener("touchstart", target.state.list, new Array(["passive", (!option || option.passive == undefined) ? true : option.passive]).to("Object"));
                })

            default:
                throw type + "isn't supported.";
        }
    }],
    ["HTMLElement", "removeEventTask", function (type, listener, option) {
        switch (type) {
            case "scroll":
                note.get("EventTasks").get("scroll").get(this).list.filter(_E0 => _E0.func == listener && _E0.option == option).forEach(_E0 => _E0.remove());
                break;
            case "resize":
                note.get("EventTasks").get("resize").get(this).list.filter(_E0 => _E0.func == listener && _E0.option == option).forEach(_E0 => _E0.remove());
                break;
            case "classChange":
                note.get("EventTasks").get("classChange").get(this).list.filter(_E0 => _E0.func == listener && _E0.option == option).forEach(_E0 => _E0.remove());
                break;
            case "touchlong":
                note.get("EventTasks").get("touchlong").get(Proto1("Number", Baser1("time", option).get("time"), note.get("config").Touch.time) + "").get(this).list.filter(_E0 => _E0.func == listener && _E0.option == option).forEach(_E0 => _E0.remove());
                break;
            case "touchslide":
                note.get("EventTasks").get("touchslide").get(Baser1("direction", option).get("direction")).get(this).list.filter(_E0 => _E0.func == listener && _E0.option == option).forEach(_E0 => _E0.remove());
        }
        return this;
    }],
    ["HTMLElement", "descendantFlat", function () {
        let E2E = _A0 => _A0.flatMap(_E0 => _E0.hasChildNodes() ? [_E0, ...E2E(Array.from(_E0.children))] : _E0);
        return E2E([this]);
    }],
    ["HTMLElement", "textContain", function (Wper, Hper) {
        note.fset("TextContain", new Map()).get("TextContain").fset(this, Baser(["width", Wper || 100], ["height", Hper || 100]));
        if (arguments.length == 0) {
            let _Tm1 = () => {
                let rems = Elm({
                    tag: "span",
                    innerText: this.innerText,
                    style: {
                        fontSize: this.css("font-size"),
                        writingMode: this.css("writing-Mode"),
                        lineHeight: this.css("line-height"),
                        fontWeight: this.css("font-weight"),
                        visibility: "hidden",
                        padding: 0,
                        margin: 0
                    }
                })
                Elm("body")[0].insertBefore(rems, Elm("body")[0].firstChild);

                let [_TextW, _TextH] = [parseInt(rems.offsetWidth), parseInt(rems.offsetHeight)];
                let [_ElemW, _ElemH] = [parseInt(this.offsetWidth) - parseInt(this.css("padding-left")) - parseInt(this.css("padding-right")), parseInt(this.offsetHeight) - parseInt(this.css("padding-top")) - parseInt(this.css("padding-bottom"))];
                this.style.fontSize = (_ElemW / _TextW <= _ElemH / _TextH ?
                    _ElemW / _TextW * parseInt(this.css("font-size")) * note.get("TextContain").get(this).get("width") * 0.01 :
                    _ElemH / _TextH * parseInt(this.css("font-size")) * note.get("TextContain").get(this).get("height") * 0.01) + "px";

                Elm("body")[0].removeChild(rems);
            }

            _Tm1()

            let _T0 = this.addEventTask("resize", _Tm1)

            let _T1 = this.addEventTask("classChange", () => {
                if (!this.classList.contains("text-contain")) {
                    _T0.remove();
                    _T1.remove();
                    note.get("TextContain").delete(this);
                };
            })
        } else {
            [Wper, Hper] = [Wper || Hper, Hper || Wper];
            note.get("TextContain").set(this, baser(["width", Wper], ["height", Hper]))
        }
        return this;
    }],
    ["HTMLElement", "textCenter", function () {
        note.fset("TextCenter", new Array()).get("TextCenter").push(this);
        let _Tm1 = () => {
            this.css("lineHeight", (parseInt(["vertical-lr", "vertical-rl"].includes(this.css("writing-mode")) ? this.css("width") : this.css("height")) / (this.innerText.match(/\n/g) ? this.innerText.match(/\n/g).length + 1 : 1)) + "px");
            this.css("textAlign", "center");
        }

        _Tm1()

        let _T0 = this.addEventTask("resize", _Tm1);

        let _T1 = this.addEventTask("classChange", () => {
            if (!this.classList.contains("text-center")) {
                _T0.remove();
                _T1.remove();
                note.get("TextCenter").splice(note.get("TextCenter").indexOf(this), 1);
            };
        })
        return this;
    }],
    ["HTMLElement", "squareX", function () {
        return this.css("height", this.css("width"));
    }],
    ["HTMLElement", "squareY", function () {
        return this.css("width", this.css("height"));
    }]
].forEach(_E0 => Chain().set(_E0[0], _E0[1], _E0[2]).sync());


//-Bundle-----------------------------------------------------------------------------------------
//TODO release soon
class Ringadds {}

export function Ring(input) {}

//-Tasks-------------------------------------------------------------------------------------------

class TasksMember {
    constructor(If, Func, Arg) {
        this.if = If;
        this.func = Func;
        this.arg = Arg;
        this.exe = true; //Execute now?
        this.able = true; // Once Executed?
    }

    start() {
        this.exe = true;
        this.call();
    }

    stop() {
        this.exe = false;
    }

    call() {
        if (this.exe && this.if(this) && this.able) {
            this.func(this)
            if (note.get("config").Tasks.exeOnce) this.able = false;
        } else if (!this.able && !this.if(this)) {
            this.able = true;
        }
        if (this.exe) note.get("config").Tasks.exeInterval == 0 ? window.requestAnimationFrame(this.call.bind(this)) : setTimeout(this.call.bind(this), note.get("config").Tasks.exeInterval);
    }

    remove() {
        note.get("Tasks").splice(note.get("Tasks").indexOf(this), 1);
        this.exe = false;
    }

}

function Tasks(If, Func, ...Arg) {
    note.fset("Tasks", new Array());
    if (arguments.length == 1) {
        switch (If) {
            case "start":
                note.get("Tasks").forEach(_E0 => _E0.start());
            case "stop":
                note.get("Tasks").forEach(_E0 => _E0.stop());
        }
    } else {
        let _T0 = new TasksMember(If, Func, Arg);
        note.get("Tasks").push(_T0);
        _T0.call();
        return _T0;
    }
}

//Auto Tasks Register----------------------------
Tasks(() => true, function () {
    Array.from(Elm(".text-contain")).filter(_E0 => !note.oget("TextContain", new Map()).has(_E0)).forEach(_E0 => _E0.textContain());
    Array.from(Elm(".text-center")).filter(_E0 => !note.oget("TextCenter", new Array()).includes(_E0)).forEach(_E0 => _E0.textCenter());
});

//-Input-------------------------------------------------------------------------------------------

note.set("Keys", new Map());

function Keys(number) {
    switch (number) {
        case "list":
            return Array.from(note.get("Keys").entries()).filter(_E0 => _E0[1]).map(_E0 => _E0[0]);
        default:
            return note.get("Keys").get(number);
    }
}

window.addEventListener('keydown', (event) => {
    if (!event.repeat) note.get("Keys").set(event.keyCode, true);
})
window.addEventListener('keyup', (event) => {
    if (!event.repeat) note.get("Keys").set(event.keyCode, false);
})

//-Tools-------------------------------------------------------------------------------------------

function Proto(arg) {
    try {
        return arg.constructor.name;
    } catch (e) {
        return e;
    }
}

function Proto1(proto, True, False) {
    return Proto(True) == proto ? True : False;
}

function Baser(...args) {
    if (["Array", "Object", "Map"].indexOf(Proto(args[0])) == -1) throw "args must be Array, Object or Map.";
    if (args.length == 1) args = args[0];
    if (Proto(args) == "Object") args = new Map(Object.entries(args))
    if (Proto(args) == "Array") {
        try {
            args = new Map(args);
        } catch (e) {
            args = new Map(new Array(args));
        }
    }
    return args;
}

function Baser1(...args) {
    if (args.length == 1) args[0];
    let proto = args.slice(0, args.length / 2);
    let value = args.slice(args.length / 2, args.length);
    let map = new Map();
    proto.forEach((_E0, _E1) => map.set(_E0, value[_E1]));
    return map;
}

// TODO Rework before long.
// function reWindow(Wper, Hper, size) {
//     return window.open(location.href, "sfWindow", `width=${Chain(size).potopx()}, height=${Hper/Wper*parseInt(size.potopx())+"px"}`);
// }

function Efal() {
    return document.addEventListener("load", ...arguments);
}

//-Test Area-----------------
console.log();

//-Loaded--------------------
// console.log("Seifuncs ver.2.0 for JS was completely loaded.");
if (/^(?=.*Chrome)(?!.*Edge)/.test(window.navigator.userAgent)) {
    console.log("%c %c Seifuncs for JS / ver.2.0%c \n%c %c Developer : Seizya \n%c %c GitHub : https://github.com/Seizya",
        "background-color:#165e83;border-bottom:solid #f0f 2px", "border-bottom:solid #f0f 2px", "", "background-color:#165e83", "", "background-color:#165e83", "")
} else {
    console.log("Seifuncs for JS \nDeveloper : Seizya \nGitHub : https://github.com/Seizya")
}
if (/MSIE|Trident|Edge/.test(window.navigator.userAgent)) console.warn("Seifuncs doesn't support IE.")