//-Note--------------------------------------------------------------------------------------------
class Note extends Map {
    constructor(name) {
        super();
        this.name = name;
    }

    //-Plus--------------------------------------

    static json(url) {
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        // request.responseType = 'json';
        request.send();

        // console.clear(); //It's for deleting log that warn using xMLHttpRequest.
        return request.response;
    }

    saveSave(key, value) { //localStorage 保存
        let save = JSON.parse(localStorage.getItem(this.name + "_Note_Seifuncs")) || {};
        if (arguments.length > 0) {
            if (!this.has(key) && !value) return false;
            save[key] = value || (Chain().proto(this.get(key)) == "Map" ? Object.fromEntries(this.get(key).entries()) : this.get(key));
        } else {
            this.forEach((saveValue, saveKey) => save[saveKey] = Chain().proto(saveValue) == "Map" ? Object.fromEntries(saveValue.entries()) : saveValue);
        }
        localStorage.setItem(this.name + "_Note_Seifuncs", JSON.stringify(save));
        return true;
    }

    saveRestore(key) {
        let save = JSON.parse(localStorage.getItem(this.name + "_Note_Seifuncs")) || {};
        if (key) {
            if (!save.hasOwnProperty(key)) return false;
            if (!(this.has(key) && this.get("config").Note.save.restoreLevel == 0)) this.set(key, save[key]);
        } else {
            Object.entries(save).forEach(([saveKey, saveValue]) => {
                if (!(this.has(saveKey) && this.get("config").Note.save.restoreLevel == 0)) this.set(saveKey, saveValue);
            });
        }
        return true;
    }

    saveGet(key) {
        return key ? JSON.parse(localStorage.getItem(this.name + "_Note_Seifuncs"))[key] : JSON.parse(localStorage.getItem(this.name + "_Note_Seifuncs"));
    }

    saveHas(key) {
        return Object.keys(JSON.parse(localStorage.getItem(this.name + "_Note_Seifuncs")) || {}).includes(key);
    }

    saveRemove(key) {
        let save = JSON.parse(localStorage.getItem(this.name + "_Note_Seifuncs")) || {};
        if (key) {
            if (!save.hasOwnProperty(key)) return false;
            delete save[key];
            localStorage.setItem(this.name + "_Note_Seifuncs", JSON.stringify(save));
        } else {
            localStorage.removeItem(this.name + "_Note_Seifuncs");
        }
        return true;
    }

    upload(url, key) { //JSON 解凍
        fetch(url).then(response => response.json()).then(result => {
            if (key) {
                if (!result.hasOwnProperty(key)) return false;
                if (!(this.has(key) && this.get("config").Note.UDload.uploadLevel == 0)) this.set(key, result);
            } else {
                Object.entries(result).forEach(([resultKey, resultValue]) => {
                    if (!(this.has(resultKey) && this.get("config").Note.UDload.uploadLevel == 0)) this.set(resultKey, resultValue);
                });
            }
        });
        return true;
    }

    download(key) { //JSON 保存
        let download = {};
        if (key) {
            if (!this.has(key)) return false;
            download[key] = Chain().proto(this.get(key)) == "Map" ? Object.fromEntries(this.get(key).entries()) : this.get(key);
        } else {
            this.forEach((saveValue, saveKey) => save[saveKey] = Chain().proto(saveValue) == "Map" ? Object.fromEntries(saveValue.entries()) : saveValue);
        }

        Element({
            tag: "a",
            download: this.name + ("_" + key || "") + "_Note_Seifuncs" + "-" + String(new Date()).replace(new RegExp(" ", "g"), "-") + "." + "json",
            href: "data:text/plain," + encodeURIComponent(JSON.stringify(download))
        }).click();

    }
}

const note = new Note("Seifuncs");

note.set("config", JSON.parse((() => {
    const url = "./Seifuncs/config.json";
    const url2 = "./config.json";
    const request = new XMLHttpRequest();

    if ((() => {
            request.open("HEAD", url, false);
            request.send();
            return request.status == 200;
        })()) {
        request.open("GET", url, false);
    } else {
        console.info("Seifuncs : Seifuncs is load from Test.html");
        request.open("GET", url2, false);
    }
    request.send();

    return request.response;
})()));

//-Chain---------------------------------------------------------------------------------------------

export default function Chain(input) {
    return arguments.length >= 1 ? note.get("ChainMethod").use(input) : note.get("ChainMethod");
}

class ChainMethod {
    constructor() {
        this.support = ["Array", "Object", "Map", "WeakMap", "String", "Number", "Boolean", "HTMLElement", "Function", "RegExp", "Date", "Window", "NodeList"];
        this.support = Object.fromEntries(this.support.map(protoName => [protoName, {
            "Default": {},
            "Method": []
        }]));
        /*
        //this.support =
        {
            prototypeName: {
                Default: {
                    Name:naitive_function
				},
                Method: [{
                    Prototype: String,
                    Name: String,
                    Function: Function
                }, ...]
            }
        }
        */
    }

    set(obj) {
        this.delete(obj);
        switch (obj.Prototype) {
            case "*":
                Object.values(this.support).forEach(protoObj => protoObj.Method.push(obj));
                break;
            default:
                this.support[obj.Prototype].Method.push(obj);
        }
        if (note.get("config").Chain.sync.auto) this.sync(obj);
        return this;
    }

    add(obj) {
        if ((obj.Prototype == "*" && Object.values(this.support).flatMap(ptotoObj => ptotoObj.Method).some(methodObj => methodObj.Name == obj.Name)) ||
            (obj.Prototype != "*" && obj.Prototype != "Summon" && this.support[obj.Prototype].Method.some(methodObj => methodObj.Name == obj.Name)))
            throw "Seifuncs : " + obj.Name + " is already used.";
        return this.set(obj);
    }

    delete(obj) {
        let delList;
        switch (obj.Prototype) {
            case "*":
                delList = Object.values(this.support).flatMap(ptotoObj => ptotoObj.Method).some(methodObj => methodObj.Name == obj.Name);
                Object.entries(this.support).forEach(([key, value]) => value.Method.filter(methodObj => methodObj.Name == obj.Name).forEach(delObj => this.support[key].splice(this.indexOf(delObj), 1)));
                return delList;
            default:
                delList = this.support[obj.Prototype].Method.filter(methodObj => methodObj.Name == obj.Name);
                delList.forEach(delObj => this.support[obj.Prototype].Method.splice(this.support[obj.Prototype].Method.indexOf(delObj), 1));
                return delList;
        }
    }

    use(input) {
        return Object.fromEntries(this.pickup(input).Method.map(_obj => [_obj.Name, _obj.Function.bind(input)]));
    }

    pickup(proto) {
        return this.support[this.proto(proto).includes("HTML") ? "HTMLElement" : this.proto(proto)];
    }

    proto(input) {
        try {
            return input.constructor.name;
        } catch (e) {
            return e;
        }
    }

    summon(name) {
        switch (name.toLowerCase()) {
            case "note":
                return new Note();
            case "task":
                return new TaskObject();
            case "keys":
                return new KeysObject();
            default:
                return {
                    array: [],
                        object: {},
                        map: new Map(),
                        weakmap: new WeakMap(),
                        string: String(),
                        number: Number(),
                        boolean: Boolean(),
                        htmlelement: Element("header")[0],
                        function: () => {},
                        regexp: new RegExp(),
                        date: new Date(),
                        window: window,
                        nodelist: document.querySelectorAll("Seifuncs_" + Math.random().toString(36).slice(-8))
                } [name.toLowerCase()];
        }
    }

    generate(name) {
        return (arg) => {
            switch (name.toLowerCase()) {
                case "note":
                    return new Note(arg);
                case "element":
                    return Element(arg);
                case "task":
                    return new TaskObject(arg);
                case "keys":
                    if (!arg) return note.get("Keys");
                    return note.get("Keys").entry(arg);
            }
        };
    }

    sync(obj) { //TODO Property Value (Array)
        let syncObject = Object.entries(this.support).reduce((accumulator, [currentKey, currentValue]) => {
            if (!obj || !obj.Prototype || obj.Prototype == "*" ? false : currentKey != obj.Prototype) return accumulator;
            let syncMethods = currentValue.Method.filter(methodObj => !obj || !obj.Name || obj.Name == "*" ? true : methodObj.Name == obj.Name);
            if (note.get("config").Chain.sync.level == 0) syncMethods = syncMethods.filter(methodObj => !Object.getPrototypeOf(this.summon(currentKey)).hasOwnProperty(methodObj.Name));
            if (syncMethods.length >= 1) accumulator[currentKey] = syncMethods;
            return accumulator;
        }, {});

        // syncObject = {
        //     Prototype:[...Methods]
        // };

        Object.keys(syncObject).forEach(prototype => syncObject[prototype].forEach(methods => {
            if (Object.getPrototypeOf(this.summon(prototype)).hasOwnProperty(methods.Name)) this.support[prototype].Default[methods.Name] = Object.getPrototypeOf(this.summon(prototype))[methods.Name];
            Object.setPrototypeOf(this.summon(prototype), Object.assign(Object.getPrototypeOf(this.summon(prototype)), Object.fromEntries(new Array([methods.Name, methods.Function]))));
        }));

        return this;
    }

    restore(obj) {
        let restoreObject = Object.entries(this.support).reduce((accumulator, [currentKey, currentValue]) => {
            if (!obj || !obj.Prototype || obj.Prototype == "*" ? false : currentKey != obj.Prototype) return accumulator;

            let restoreMethods = currentValue.Method.reduce((methodsAcc, methodsCur) => (!obj || !obj.Name || obj.Name == "*" ? true : methodsCur.Name == obj.Name) ? [...methodsAcc, methodsCur.Name] : methodsAcc, []);
            if (restoreMethods.length == 0) return accumulator;

            accumulator[currentKey] = {};
            accumulator[currentKey].list = restoreMethods;
            accumulator[currentKey].default = restoreMethods.reduce((methodAcc, methodCur) => currentValue.Default.hasOwnProperty(methodCur) ? Chain(methodAcc).define(methodCur, currentValue.Default[methodsAcc]) : methodAcc, {});

            return accumulator;
        }, {});

        // restoreObj = {
        //     Prototype:{
        //         list:[...Name],
        //         default:{
        //             Name:nativeFunction
        //         }
        //     }
        // }

        if (Object.keys(restoreObject).length == 0) return false;

        Object.entries(restoreObject).forEach(([key, value]) => { //Prototype
            value.list.forEach(methodName => delete Object.getPrototypeOf(this.summon(key))[methodName]);
            Object.keys(value.default).forEach(defaultName => delete this.support[key].Default[defaultName]);
            Object.setPrototypeOf(this.summon(key), Object.assign(Object.getPrototypeOf(this.summon(key)), restoreObject.default));
        });

        return true;
    }

}

note.set("ChainMethod", new ChainMethod());

[{
    Prototype: "*",
    Name: "chain",
    Function: function (func) {
        return (...arg) => func.bind(this)(...arg);
    }
}, {
    Prototype: "Array",
    Name: "delete",
    Function: function (func) {
        let delList = this.filter(func);
        delList.forEach(delElement => this.splice(this.indexOf(delElement)));
        return delList.length > 0;
    }
}, {
    Prototype: "Array",
    Name: "equal",
    Function: function (arr) {
        return this.every(element => arr.includes(element)) && arr.every(element => this.includes(element));
    }
}, {
    Prototype: "Array",
    Name: "fullFlat",
    Function: function () {
        let A2A = _A0 => _A0.flatMap(_E0 => Array.isArray(_E0) ? A2A(_E0) : _E0);
        return A2A(this);
    }
}, {
    Prototype: "Array",
    Name: "pushed",
    Function: function (add) {
        this.push(add);
        return add;
    }
}, {
    Prototype: "Array",
    Name: "rap",
    Function: function (time = 1) {
        let array = this;
        for (let i = 0; i < time; i++) {
            array = [array];
        }
        return array;
    }
}, {
    Prototype: "Array",
    Name: "unDup",
    Function: function (back = false) {
        return this.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i);
    }
}, {
    Prototype: "HTMLElement",
    Name: "addEventTask",
    Function: function (type, listener, option) {
        switch (type) {
            case "scroll":
                return Tasks({
                    If: (taskObj) => {
                        if (!taskObj.nativeState || taskObj.nativeState.x != this.scrollLeft || taskObj.nativeState.y != this.scrollTop) {
                            taskObj.nativeState = {
                                x: this.scrollTop,
                                y: this.scrollLeft
                            };
                            if (taskObj.nativeState) return true;
                        }
                        return false;
                    },
                    Function: listener,
                    Option: option
                }).start();

            case "resize":
                return Tasks({
                    If: (taskObj) => {
                        if (!taskObj.nativeState || taskObj.nativeState.width !== parseInt(Chain(this).css("width")) || taskObj.nativeState.height !== parseInt(Chain(this).css("height"))) {
                            taskObj.nativeState = {
                                width: parseInt(Chain(this).css("width")),
                                height: parseInt(Chain(this).css("height"))
                            };
                            if (taskObj.nativeState) return true;
                        }
                        return false;
                    },
                    Function: listener,
                    Option: option
                }).start();

            case "classChange":
                return Tasks({
                    If: (taskObj) => {
                        if (!taskObj.nativeState || Chain(taskObj.nativeState).equal(Array.of(this.classList))) {
                            taskObj.nativeState = Array.of(this.classList);
                            if (taskObj.nativeState) return true;
                        }
                        return false;
                    },
                    Function: listener,
                    Option: option
                }).start();

            case "touchLong":
                return Tasks({
                    If: (taskObj) => {
                        if (!taskObj.nativeState) {
                            taskObj.nativeState = {
                                flag: false,
                                time: (option || {}).time || note.get("config").EventTask.touchLong
                            };

                            let counter;
                            let countStart = () => counter = setTimeout(() => taskObj.nativeState.flag = true, taskObj.nativeState.time);
                            let countEnd = () => {
                                clearTimeout(counter);
                                taskObj.nativeState.flag = false;
                            };

                            this.addEventListener("touchstart", countStart);
                            this.addEventListener("touchend", countEnd);

                            taskObj.remove = () => {
                                countEnd();
                                this.removeEventListener("touchstart", countStart);
                                this.removeEventListener("touchend", countEnd);
                                return TaskObject.remove().call(this);
                            };
                        }
                        return taskObj.nativeState.flag;
                    },
                    Function: listener,
                    Option: Chain(option || {}).define("hold", false)
                }).start();

            case "touchSlide":
                return Tasks({
                    If: (taskObj) => {
                        if (!taskObj.nativeState) {
                            taskObj.nativeState = {
                                mode: (option || {}).mode || note.get("config").EventTask.touchSlide.mode,
                                flag: false,
                                criteria: {
                                    type: ["distance", "vector", "radian"].find((element) => Object.keys(option || {}).includes(element)) || note.get("config").EventTask.touchSlide.type,
                                    value: undefined //Define as follows
                                },
                                coordinate: {
                                    start: {
                                        x: undefined,
                                        y: undefined
                                    },
                                    now: {
                                        x: undefined,
                                        y: undefined
                                    }
                                }
                            };
                            taskObj.nativeState.criteria.value = (option || {})[taskObj.nativeState.criteria.type] || note.get("config").EventTask.touchSlide[taskObj.nativeState.criteria.type];

                            let touchStart = (event) => {
                                if (event.targetTouches.length == 1) {
                                    taskObj.nativeState.coordinate.start.x = event.targetTouches[0].screenX;
                                    taskObj.nativeState.coordinate.start.y = event.targetTouches[0].screenY;
                                }
                            };

                            let touchMove = (event) => {
                                if (taskObj.nativeState.mode == 0 && (taskObj.nativeState.coordinate.start.x == undefined || taskObj.nativeState.coordinate.start.y == undefined)) return;

                                event.preventDefault();
                                let startX = taskObj.nativeState.coordinate.start.x;
                                let startY = taskObj.nativeState.coordinate.start.y;
                                let nowX = taskObj.nativeState.coordinate.now.x = event.targetTouches[0].screenX;
                                let nowY = taskObj.nativeState.coordinate.now.y = event.targetTouches[0].screenY;
                                let criteria = taskObj.nativeState.criteria;

                                switch (criteria.type) {
                                    case "distance":
                                        if (Chain().proto(criteria.value) == "Array") {
                                            taskObj.nativeState.flag = Math.abs(nowX - startX) >= criteria.value[0] && Math.abs(nowY - startY) >= criteria.value[1];
                                        } else {
                                            taskObj.nativeState.flag = Math.sqrt(Math.pow(nowX - startX, 2) + Math.pow(nowY - startY, 2)) >= criteria.value;
                                        }
                                        break;
                                    case "vector":
                                        taskObj.nativeState.flag = (Math.sign(nowX - startX) == criteria.value.x && Math.abs(nowX - startX) >= Math.abs(criteria.value.x)) && (Math.sign(nowY - startY) == criteria.value.y && Math.abs(nowY - startY) >= Math.abs(criteria.value.y));
                                        break;
                                    case "radian":
                                        if (Math.abs(Chain(Math.atan2(nowY - startY, nowX - startX)).adeg() - criteria.value.angle) <= 90) taskObj.nativeState.flag = Math.sqrt(Math.pow(nowX - startX, 2) + Math.pow(nowY - startY, 2)) >= criteria.value.distance / Math.cos(Math.atan2(nowY - startY, nowX - startX) - Chain(criteria.value.angle).arad());
                                        break;
                                }
                            };

                            let touchEnd = (event) => {
                                if (event.targetTouches.length == 0) {
                                    taskObj.nativeState.flag = false;
                                } else if (event.targetTouches[0].screenX != taskObj.nativeState.coordinate.now.x || event.targetTouches[0].screenY != taskObj.nativeState.coordinate.now.y) {
                                    if (taskObj.nativeState.mode == 0) {
                                        taskObj.nativeState.coordinate.startX = undefined;
                                        taskObj.nativeState.coordinate.startY = undefined;
                                        taskObj.nativeState.flag = false;
                                    } else if (taskObj.nativeState.mode == 1) {
                                        taskObj.nativeState.coordinate.now.x = event.targetTouches[0].screenX;
                                        taskObj.nativeState.coordinate.now.y = event.targetTouches[0].screenY;
                                    } else {
                                        taskObj.nativeState.coordinate.now.x = event.targetTouches[0].screenX;
                                        taskObj.nativeState.coordinate.now.y = event.targetTouches[0].screenY;
                                        taskObj.nativeState.coordinate.start.x = event.targetTouches[0].screenX;
                                        taskObj.nativeState.coordinate.start.y = event.targetTouches[0].screenY;
                                    }
                                }
                            };
                            let touchCancel = () => taskObj.nativeState.flag = false;

                            this.addEventListener("touchstart", touchStart);
                            this.addEventListener("touchmove", touchMove, Chain({}).define("passive", false));
                            this.addEventListener("touchend", touchEnd);
                            this.addEventListener("touchcancel", touchCancel);

                            taskObj.remove = () => {
                                touchCancel();
                                this.removeEventListener("touchstart", touchStart);
                                this.removeEventListener("touchmove", touchMove, Chain({}).define("passive", false));
                                this.removeEventListener("touchend", touchEnd);
                                this.removeEventListener("touchcancel", touchCancel);
                                return TaskObject.remove().call(this);
                            };
                        }
                        return taskObj.nativeState.flag;
                    },
                    Function: listener,
                    Option: option
                }).start();

            default:
                throw "Seifuncs : " + type + " isn't supported.";
        }
    }
}, {
    Prototype: "HTMLElement",
    Name: "css",
    Function: function (prop, value) {
        if (!value) return window.getComputedStyle(this).getPropertyValue(prop);
        this.style[prop] = value;
        return this;
    }
}, {
    Prototype: "HTMLElement",
    Name: "descendantFlat",
    Function: function () {
        let E2E = _A0 => _A0.flatMap(_E0 => _E0.hasChildNodes() ? [_E0, ...E2E(Array.from(_E0.children))] : _E0);
        return E2E([this]);
    }
}, {
    Prototype: "HTMLElement",
    Name: "square",
    Function: function (base) {
        switch (base) {
            case "x":
                return Chain(this).css("height", Chain(this).css("width"));
            case "y":
                return Chain(this).css("width", Chain(this).css("height"));
            case "max":
                return parseInt(Chain(this).css("width")) >= parseInt(Chain(this).css("hegiht")) ? Chain(this).square("x") : Chain(this).square("y");
            case "min":
                return parseInt(Chain(this).css("width")) <= parseInt(Chain(this).css("hegiht")) ? Chain(this).square("x") : Chain(this).square("y");
            default:
                Chain(this).css("width", parseInt(Chain(this).css("width")) + parseInt(Chain(this).css("hegiht")) / 2 + "px");
                return Chain(this).css("height", parseInt(Chain(this).css("width")) + parseInt(Chain(this).css("hegiht")) / 2 + "px");
        }
    }
}, {
    Prototype: "HTMLElement",
    Name: "textCenter",
    Function: function () {
        let adjust = () => {
            Chain(this).css("lineHeight", (parseInt(["vertical-lr", "vertical-rl"].includes(Chain(this).css("writing-mode")) ? Chain(this).css("width") : Chain(this).css("height")) / (this.innerText.match(/\n/g) ? this.innerText.match(/\n/g).length + 1 : 1)) + "px");
            Chain(this).css("textAlign", "center");
        };

        adjust();

        let resizeTask = Chain(this).addEventTask("resize", adjust);

        Chain(this).addEventTask("classChange", (taskObj) => {
            if (!this.classList.contains("textCenter")) {
                resizeTask.remove();
                taskObj.remove();
            }
        });
        return this;
    }
}, {
    Prototype: "HTMLElement",
    Name: "textContain",
    Function: function () {
        let adjust = () => {
            let rems = Element({
                tag: "span",
                innerText: this.innerText,
                style: {
                    fontSize: Chain(this).css("font-size"),
                    writingMode: Chain(this).css("writing-Mode"),
                    lineHeight: Chain(this).css("line-height"),
                    fontWeight: Chain(this).css("font-weight"),
                    visibility: "hidden",
                    padding: 0,
                    margin: 0
                }
            });
            Element("body")[0].insertBefore(rems, Element("body")[0].firstChild);

            let [TextW, TextH] = [parseInt(rems.offsetWidth), parseInt(rems.offsetHeight)];
            let [ElemW, ElemH] = [parseInt(this.offsetWidth) - parseInt(Chain(this).css("padding-left")) - parseInt(Chain(this).css("padding-right")), parseInt(this.offsetHeight) - parseInt(Chain(this).css("padding-top")) - parseInt(Chain(this).css("padding-bottom"))];
            this.style.fontSize = (ElemW / TextW <= ElemH / TextH ? ElemW / TextW * parseInt(Chain(this).css("font-size")) : ElemH / TextH * parseInt(Chain(this).css("font-size"))) + "px";

            Element("body")[0].removeChild(rems);
        };

        adjust();

        let resizeTask = Chain(this).addEventTask("resize", adjust);

        Chain(this).addEventTask("classChange", (taskObj) => {
            if (!this.classList.contains("textContain")) {
                resizeTask.remove();
                taskObj.remove();
            }
        });
        return this;
    }
}, {
    Prototype: "Map",
    Name: "addGet",
    Function: function (key, value) { //fset + oset
        if (this.has(key)) return this.get(key);
        this.set(key, value);
        return this.get(key);
    }
}, {
    Prototype: "Map",
    Name: "assign",
    Function: function (newMap) {
        newMap.forEach((value, key) => this.set(key, value));
        return this;
    }
}, {
    Prototype: "Map",
    Name: "merge",
    Function: function (newMap) {
        newMap.forEach((value, key) => {
            if (!this.has(key)) this.set(key, value);
        });
        return this;
    }
}, {
    Prototype: "NodeList",
    Name: "toArray",
    Function: function () {
        return Array.from(this);
    }
}, {
    Prototype: "Number",
    Name: "adeg",
    Function: function () {
        return this * (180 / Math.PI);
    }
}, {
    Prototype: "Number",
    Name: "arad",
    Function: function () {
        return this * (Math.PI / 180);
    }
}, {
    Prototype: "Object",
    Name: "addGet",
    Function: function (key, value) {
        if (this.hasOwnProperty(key)) return this[key];
        this[key] = value;
        return this;
    }
}, {
    Prototype: "Object",
    Name: "cover",
    Function: function (obj) {
        return Object.assign(this, Object.fromEntries(Object.entries(obj).filter(entry => !this.hasOwnProperty(entry[0]))));
    }
}, {
    Prototype: "Object",
    Name: "deepCopy",
    Function: function () {
        return Object.fromEntries(Object.entries(this));
    }
}, {
    Prototype: "Object",
    Name: "delete",
    Function: function (key) {
        let Return = this.hasOwnProperty(key);
        delete this[key];
        return Return;
    }
}, {
    Prototype: "Object",
    Name: "define",
    Function: function (key, value) {
        // let addObj = {};
        // addObj[key] = value;
        // Object.assign(this, addObj);

        // this[key] = value;

        Object.defineProperty(this, key, {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        });

        return this;
    }
}, {
    Prototype: "String",
    Name: "comprise",
    Function: function (string) {
        return this.match(new RegExp(string.toLowerCase())) !== null ? true : false;
    }
}].forEach(obj => Chain().set(obj));
// if (note.get("config").Chain.sync.auto) Chain().sync(); //Auto sync

//Note sync
Object.setPrototypeOf(Chain().summon("note"), Object.assign(Object.getPrototypeOf(Chain().summon("note")), Chain().pickup(Chain().summon("map")).Method.reduce((accumulator, currentValue) => Chain(accumulator).define(currentValue.Name, currentValue.Function), {})));

//-Element-----------------------------------------------------------------------------------------
function Element(arg) {
    if (Chain().proto(arg) == "String") {
        return document.querySelectorAll(arg);
    } else {
        let element = document.createElement(arg.tag);
        Object.entries(arg).forEach(([key, value]) => {
            switch (key) {
                case "tag":
                    break;
                case "addEventListener":
                    element.addEventListener(value.Type, value.listener, value.Options);
                    break;
                case "classList":
                    [value].flat().forEach(_E0 => element.classList.add(_E0));
                    break;
                case "innerText":
                    element.innerText = value;
                    break;
                case "style":
                    Object.entries(value).forEach(([key1, value1]) => element.style[key1] = value1);
                    break;
                default:
                    element.setAttribute(key, value);
            }
        });
        return element;
    }
}

//-Tasks-------------------------------------------------------------------------------------------
class TaskObject {
    constructor(argObj) {
        this.if = argObj.If;
        this.func = argObj.Function;
        this.callDelay = (argObj.Option || {}).hasOwnProperty("callDelay") ? argObj.Option.callDelay : note.get("config").Tasks.exeInterval;
        this.hold = (argObj.Option || {}).hasOwnProperty("hold") ? argObj.Option.hold : note.get("config").Tasks.exeHold;
        this.once = (argObj.Option || {}).hasOwnProperty("once") ? argObj.Option.once : note.get("config").Tasks.exeOnce;
        this.nativeState = (argObj.Option || {}).hasOwnProperty("nativeState") ? argObj.Option.nativeState : undefined;
        this.state = (argObj.Option || {}).hasOwnProperty("state") ? argObj.Option.state : undefined;

        this.able = true;
        this.wait = false;
    }

    start() {
        this.able = true;
        this.call();
        return this;
    }

    stop() {
        this.able = false;
        return this;
    }

    call() {
        if (this.able && !this.wait && this.if(this)) {
            if (!this.hold) this.wait = true;
            this.func(this);
            if (this.once) return this.remove();
        } else if (this.wait && !this.if(this)) {
            this.wait = false;
        }
        if (this.able) this.callDelay == 0 ? window.requestAnimationFrame(this.call.bind(this)) : setTimeout(this.call.bind(this), this.callDelay);
    }

    remove() {
        this.able = false;
    }

}

function Tasks(argObj) {
    return new TaskObject(argObj);
}

//Auto Tasks Register----------------------------
if (note.get("config").textCenter.autoExe) Tasks({
    If: (taskObj) => {
        if (!taskObj.nativeState) taskObj.nativeState = [];
        return !Chain(taskObj.nativeState).equal(Chain(Element(".textCenter")).toArray());
    },
    Function: (taskObj) => {
        let now = Chain(Element(".textCenter")).toArray();
        now.filter(element => !taskObj.nativeState.includes(element)).forEach(element => Chain(element).textCenter());
        taskObj.nativeState = now;
    }
}).start();

if (note.get("config").textContain.autoExe) Tasks({
    If: (taskObj) => {
        if (!taskObj.nativeState) taskObj.nativeState = [];
        return !Chain(taskObj.nativeState).equal(Chain(Element(".textContain")).toArray());
    },
    Function: (taskObj) => {
        let now = Chain(Element(".textContain")).toArray();
        now.filter(element => !taskObj.nativeState.includes(element)).forEach(element => Chain(element).textContain());
        taskObj.nativeState = now;
    }
}).start();

//-Keys--------------------------------------------------------------------------------------------
class KeysObject {
    constructor() {
        this.list = [];
        this.testFlag = false;
    }
    keydown(event) {
        if (this.testFlag) console.log(event.key);
        if (!this.list.includes(event.key)) this.list.push(event.key);
    }
    keyup(event) {
        Chain(this.list).delete(element => element == event.key);
    }
    check() {
        this.testFlag = !this.testFlag;
        return this.testFlag;
    }
    entry(key) {
        return () => key.toLowerCase() == "list" ? this.list : this.list.includes(key);
    }
}

note.set("Keys", new KeysObject());

window.addEventListener('keydown', (event) => {
    if (!event.repeat) note.get("Keys").keydown(event);
});
window.addEventListener('keyup', (event) => {
    if (!event.repeat) note.get("Keys").keyup(event);
});


//-Loaded--------------------
// console.log("Seifuncs ver.2.0 for JS was completely loaded.");
if (/^(?=.*Chrome)(?!.*Edge)/.test(window.navigator.userAgent)) {
    console.log("%c %c Seifuncs for JS / ver.3.0.0%c \n%c %c Developer : Seizya \n%c %c GitHub : https://github.com/Seizya",
        "background-color:#165e83;border-bottom:solid #f0f 2px", "border-bottom:solid #f0f 2px", "", "background-color:#165e83", "", "background-color:#165e83", "");
} else {
    console.log("Seifuncs for JS \nDeveloper : Seizya \nGitHub : https://github.com/Seizya");
}
if (/MSIE|Trident|Edge/.test(window.navigator.userAgent)) console.warn("Seifuncs doesn't support IE.");

//-Test Area-----------------
// console.log(note);