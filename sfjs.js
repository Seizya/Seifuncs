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
function Derie(id, option, property) {
    return [id].flat().flatMap(_E0 => _E0 instanceof HTMLElement ? _E0 : CQgeny(_E0)).filter(_E0 => _E0)
    function CQgeny(_id) {
        if (document.querySelectorAll(_id).length >= 1) {
            if (option == undefined) {
                return Array.from(document.querySelectorAll(_id));
            } else if (option == "$class") {
                return ArrUnDup(Array.from(document.querySelectorAll(_id)).filter(_E0 => _E0.className != "").flatMap(_E0 => document.getElementsByClassName(_E0)));
            } else if (option == "$relatives") {
                return ArrUnDup(Array.from(document.querySelectorAll(_id)).flatMap(_E0 => document.getElementsByTagName(_E0.tagName))).filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => _E0.parentNode == _E1.parentNode))
            } else {
                return (function CQgeny(pare, arr) { [...arr, ...pare.slice().filter(_E0 => Array.from(document.querySelectorAll(_id)).some(_E1 => window.getComputedStyle(_E0).getPropertyValue(option) == window.getComputedStyle(_E1).getPropertyValue(option)))]; return pare.filter(_E0 => _E0.hasChildNodes()).flatMap(_E1 => _E1.child).length != 0 ? CQgeny(pare, arr) : ArrUnDup(arr) })(Array.from(document.getElementsByTagName("HTML")), [])
            }
        } else {
            return undefined;
        }
    }
}

function GetElementStyle(elem, pro0, pro1) {
    return ArrUnDup([elem].flat().flatMap(_E0 => _E0 instanceof HTMLElement ? _E0 : Derie(_E0))).map(_E0 => !pro0 ? window.getComputedStyle(_E0) : (!~pro0.indexOf(":") ? window.getComputedStyle(_E0).getPropertyValue(pro0) : window.getComputedStyle(_E0, pro0).getPropertyValue(pro1)));
}

/**
 * CSSIC 
 *過去の遺産 / 仕様非推奨
 *取得する要素が1つであることが確定な場合以外での使用は, Bugの原因になる恐れがあります
 */
function CSSIC(id, option) {
    let cr;
    if (typeof id == "string") {
        if (document.querySelectorAll(id).length == 1) {
            if (document.querySelector(id) != undefined) {
                id = document.querySelector(id);
                if (option == "st") {
                    cr = id.style;
                } else if (option == "cl") {
                    cr = id.classList;
                } else {
                    cr = id;
                }
                return cr;
            } else {
                document.querySelectorAll(id)
            }
        } else if (document.querySelectorAll(id).length >= 2) {
            return document.querySelectorAll(id);
        } else {
            console.warn(id + " is a nonexistent element / at CSSIC");
        }
    } else {
        console.warn(id + " is not a string. / at CSSIC");
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


/**
 * こちらは, 眠気と疲労により頭が回らない人が書いた関数です。
 * 現に,この文章も何回か書き直しています。
 * 
 * 一応動くので, 書き直しは後回しです。
 * あと, この関数は私の頭の思考回路と相性が悪いらしく, 十分な能力を発揮できないのです。
 */
let SeList = {};
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
                            SeList[name].filter(_E0 => _arg.every(_E1 => _E0 != _E1));
                        } else {
                            SeList[name].slice().filter(_E0 => Object.key(_E0).filter(_E1 => _E1.some(_E1 == Object.key(_arg[0]))).some(_E1 => _E0[_E1] != _arg[0][_E1]));
                        }
                    } else if (_ud == "filter") {
                        if (!arg[0]) {
                            return SeList[name].slice().filter(_E0 => _E0_arg[0]);
                        } else {
                            let tmp0 = {};
                            for (i = 0; i < arg.length; i++) {
                                tmp0[arg[i]] = _arg[i];
                            }
                            SeList[name].slice().filter(_E0 => Object.key(_E0).filter(_E1 => _E1.some(_E1 == Object.key(tmp0))).every(_E1 => _E0[_E1] == tmp0[_E1]));
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

function isObject(o) { return (o instanceof Object && !(o instanceof Array)) ? true : false; };
function Optionalys(uds, sear) {
    if (uds == "remove") {
        return [uds]
    } else {
        let tmp = [];
        if (~uds.indexOf("add")) tmp.push("add")
        if (~uds.indexOf("exc")) tmp.push("exc")
        if (~uds.indexOf("ud")) tmp.push("ud")
        if (~uds.indexOf("id")) tmp.push("id")
        return sear ? tmp.includes(sear) : tmp;
    }
}

//---add-elements----------------------
window.addEventListener("load", () => {
    let sfcss = document.createElement('style');
    sfcss.setAttribute("id", "SeifuncCSS");
    sfcss.textContent = '@import "./Seifuncs/sfcss.css";';
    Derie("script")[0].parentNode.insertBefore(sfcss, Derie("script")[0].nextSibling);
    //document.querySelectorAll('script[src="index.js"]')

    let rems =
        document.createElement('div');
    sfcss.setAttribute("id", "get_small_rem");
    rems.textContent = "m";
    Derie("#SeifuncCSS")[0].parentNode.insertBefore(rems, Derie("#SeifuncsCSS")[0].nextSibling);
    Derie("#SeifuncCSS")[0].addEventListener("load", () => {
        chara_contain("$start");
    })
})

function GetViewPoint(point) {
    if (point == "vmin") {
        return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    } else if (point == "vmax") {
        return window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
    } else if (point == "vh") {
        return window.innerHeight;
    } else if (point == "vw") {
        return window.innerWidth;
    } else if (point == "rem") {
        return window.getComputedStyle(Derie("html")).getPropertyValue("font-size");
    } else if (point == "small_rem") {
        return Derie("#get_small_rem").innerWidth;
    }
}

function ElementViewMin(elem) {
    elem = Derie(elem);
    return elem.map(_E0 => {
        let width = _E0.clientWidth - (_E0.style.paddingLeft + _E0.style.paddingRight);
        let height = _E0.clientHeight - (_E0.style.paddingTop + _E0.style.paddingBottom);

        return width < height ? width : height;
    })
}

function ElementViewMax(elem) {
    elem = Derie(elem);
    return elem.map(_E0 => {
        let width = _E0.clientWidth - (_E0.style.paddingLeft + _E0.style.paddingRight);
        let height = _E0.clientHeight - (_E0.style.paddingTop + _E0.style.paddingBottom);

        return width < height ? height : width;
    })
}

//作業領域
OwnLists("OmitFn", "Arradmit", "Base", "Abbr");
OmitFunctionName("OmitFunctionName", "omitfn")
omitfn("DeriveElement", "Derie")
omitfn("GetElementStyle", "Getsy")
omitfn("SeChainArgument", "Sa")
omitfn("MsChainFunction", "Mf")
omitfn("GetViewPoInt", "GVP")

function OmitFunctionName(base, abbr) { //abbreviation
    crOmitFn("add", base, abbr);
    //window[abbr] = (..._arg) => eval(_OLFindBase(base))(..._arg);
    //window[abbr] = (...arg) => eval('crOmitFn().filter(_E0 => _E0["Base"] == base)[0]["Abbr"]+(...arg)')
    window[abbr] = (...arg) => eval(base + "(...arg)")
    //console.log(_OLFindBase(base))
}

function _OLFindBase(base) {
    return crOmitFn().filter(_E0 => _E0["Base"] == String(base))[0]["Base"]
}

//---Calculation-----------------------
//chara_contain("#D_s2t2s", 50);

//将来的には "%" 以外でもサイズ調整できるようにしたい
//縦方向文字にも対応したい
//数字はASCIIcode外 M
//:before,::after 対応
//オススメは 90% に縮小

function chara_contain(option, elem) {
    if (option == "$start") {
        let elems = Derie("script");
        if (elems[0]) {
            elems.forEach(_E0 => {
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
                        //-----------
                    }
                })
            })
        }
    }
}

function px2rem(pix) {
    return pix / GVP("rem")
}

function rem2px(rem) {
    return rem * GVP(rem)
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
    } else { throw new Error("Digit must be natural number") }
}

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

function Array2Array(...args) {
    return (A2A = (Arg, Arr) => Arg.length > 0 ? A2A(Arg.slice(0, -1), Arg.slice(-1).flat().flatMap(elemG => Arr.map(elem => [elemG, ...elemG]))) : Arr)(args.map(_E0 => Array.isArray(_E0) ? _E0 : [_E0]), [[]])
}

function ArrUnDup/**Duplicate */(array, back) {
    return array.filter((x, i, self) => (back ? self.lastIndexOf(x) : self.indexOf(x)) === i);
}

function FuncProgeny(_E0, fn) {
    (Array.isArray(_E0) ? _E0 : Array.from(_E0)).flatMap(_E1 => _E1 instanceof HTMLElement ? _E1 : (document.querySelectorAll(_E1).length == 0 ? undefined : Array.from(document.querySelectorAll(_E1)))).filter(_E1 => _E1 != undefined).forEach(_E1 => _E1.fn())
    if (_E0.filter(_E0 => _E0.hasChildNodes()).map(_E0 => _E0.child).length != 0) FuncProgeny(_E0, fn)
}

let didTaskswork = true;
OwnList("Tasks", "Arradmit", "If", "Fn", "Id")
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
    crTasks().forEach(_E0 => { if (_E0["If"]) _E0["Fn"]() })
    if (didTadwork) requestAnimationFrame(arguments.callee);
}

/**
 * 製作意欲の低迷により, 開発の一時停止をします。
 * 恐らく, 近日中に再開するかもしれませんし, 開発難易度の高さからこのまま挫折するかもしれません。
 * 未来は, 私のみぞ知るものです。
 * 
 * I will stop development as my willingness to make is on a journey.
 * Perhaps, it may be reopened in the near future, and I may meet the end because of the high level of development difficulty ...
 *The future is something I only know.
 * Transformed with Mr.Google
 */

/*OwnList("KeyTasks", "Arradmit", "Ud", "Elem", "Fn", "Id")
function KeyTasks(ar, ud, elem, fn, id) {
    if (Optionalys(ar, "add")) {
        if (!Optionalys(ar, "id")) {
            crKeyTasks(ud, elem, fn)
        } else {
            crKeyTasks(ud, elem, fn, id)
        }
    } else if (ar == "remove") {
        crKeyTasks("remove", { Id: id })
    }
}

window.addEventListener("mouseup", mousecall)
window.addEventListener("mousedown", mousecall)
window.addEventListener("mousemove", mousecall)
window.addEventListener("mouseover", mousecall)
window.addEventListener("mouseout", mousecall)

function mousecall()

OwnList("MouseTasks", "Arradmit", "Ud", "Elem", "Fn", "Id")
function MouseTasks(ar, ud, elem, fn, id) {
    if (Optionalys(ar, "add")) {
        if (!Optionalys(ar, "id")) {
            crMouseTasks(ud, elem, fn)
        } else {
            crKeyTasks(ud, elem, fn, id)
        }
    } else if (ar == "remove") {
        crMouseTasks("remove", { Id: id })
    }
}*/

console.log("Seifuncs ver.1.1.1 for JS was completely loaded. \n e-mail : Yakumo.Seizya@gmail.com \n Github : https://github.com/Seizya")
