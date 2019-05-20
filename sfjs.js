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
//document.querySelectorAll('script[src="index.js"]')

function CSSQS(id, option, exception, exc_op) {
    if (document.querySelectorAll(id).length >= 1) {
        if (option == undefined) {
            return Array.from(document.querySelectorAll(id).length == 1 ? document.querySelectorAll(id)[0] : document.querySelectorAll(id));
        } else if (option == "$class") {
            return ArrUnDup(Array.from(document.querySelectorAll(id)).filter(_E0 => _E0.className != "").flatmap(_E0 => document.getElementsByClassName(_E0)));
        } else if (option == "$relatives") {
            return ArrUnDup(Array.from(document.querySelectorAll(id)).flatmap(_E0 => document.getElementsByTagName(_E0.tagName))).filter(_E0 => Array.from(document.querySelectorAll(id)).some(_E1 => _E0.parentNode == _E1.parentNode))
        } else {
            return (function CQgeny(pare, arr) { [...arr, ...pare.slice().filter(_E0 => Array.from(document.querySelectorAll(id)).some(_E1 => window.getComputedStyle(_E0).getPropertyValue(option) == window.getComputedStyle(_E1).getPropertyValue(option)))]; return pare.filter(_E0 => _E0.hasChildNodes().flatmap(_E1 => _E1.child)).length != 0 ? CQgeny(pare, arr) : arr })(Array.from(document.getElementsByTagName("HTML")), [])
        }
    } else {
        return undefined;
    }
}

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

const SeCA = fn => (tmp = args => arg => arg ? tmp([...args, ...arg]) : fn(...args))([]);
const MsCF = obj => fn => fn ? MsCF(fn(obj)) : obj;

/**
 * SeCA <Sei Chain Argument> SeCA(fn Name)(arg0)...(argn)() == fn(arg0,...,argn);
 * MsCF <Msy Chain Function> MsCF(obj)(fn0)...(fnn) => arg(obj) ... argn(arg(obj));
 */

//---add-elements----------------------
window.addEventListener("load", () => {
    let sfcss = document.createElement('style');
    sfcss.setAttribute("id", "SeifuncCSS");
    sfcss.textContent = '@import "./Seifuncs/sfcss.css";';
    CSSIC("script").parentNode.insertBefore(sfcss, CSSIC("script").nextSibling);
    //document.querySelectorAll('script[src="index.js"]')

    CSSIC("#SeifuncCSS").addEventListener("load", () => {
        chara_contain("$start");
        resize();
    })
})

//---Calculation-----------------------
//chara_contain("#D_s2t2s", 50);

//将来的には "%" 以外でもサイズ調整できるようにしたい
//縦方向文字にも対応したい
//空白のカウント
//数字はASCIIcode外 M
//:before,::after 対応
//オススメは 90% に縮小
let CC_list = {};

function chara_contain(query, parsent) {
    if (CSSIC("#get_em") == null) {
        let Gem = document.createElement('div');
        Gem.setAttribute("id", "get_em");
        CSSIC("body").insertBefore(Gem, CSSIC("body").firstChild);

        let GemS = document.createElement('div');
        GemS.setAttribute("id", "get_em_small")
        GemS.textContent = 'a';
        CSSIC("#get_em").parentNode.insertBefore(GemS, CSSIC("#get_em").nextSibling);
    }
    if (typeof parsent == "number") {
        if (String(parsent).length - (parsent < 1 ? 1 : 0) > 3) {
            console.warn("Parsentage must be within 3 digits. / at chara_contain")
        } else {
            CC_list[query] = zeroPadding(parsent, 3);
            chara_contain(query);
        }
    } else if (query == "$start") {
        document.querySelectorAll(".chara_contain").forEach(function (value) {
            //CSSIC("#" + value.id).addEventListener("resize", chara_contain("#" + value.id));
            chara_contain("#" + value.id)
        })
    } else {
        let small_chara = 0;
        for (i = 0; i < CSSIC(query).innerHTML.length; i++) {
            if (97 <= CSSIC(query).innerHTML.charCodeAt(i) && CSSIC(query).innerHTML.charCodeAt(i) <= 122) {
                small_chara++;
            }
        }

        let width = CSSIC(query).clientWidth - (CSSIC(query, "st").paddingLeft + CSSIC(query, "st").paddingRight);
        let height = CSSIC(query).clientHeight - (CSSIC(query, "st").paddingTop + CSSIC(query, "st").paddingBottom);
        let sentence_width = (CSSIC(query).innerHTML.length - small_chara) * CSSIC("#get_em").clientWidth + small_chara * CSSIC("#get_em_small").clientWidth;
        let sentence_Height = CSSIC("#get_em").clientWidth;

        //CSSIC(query, "st").lineHeight = height + "px";
        //CSSIC(query, "st").textAlign = "center";

        if (height < sentence_Height) {
            if (width < sentence_width) {
                if (sentence_Height - height > sentence_width - width) {
                    CC_height(query);
                } else {
                    CC_width(query);
                }
            } else {
                CC_height(query);
            }
        } else if (height == sentence_Height) {
            if (width <= sentence_width) {
                CC_width(query);
            } else {
                CC_height(query);
            }
        } else {
            CC_width(query);
        }

        function CC_height(query) {
            if (query in CC_list) {
                CSSIC(query, "st").fontSize = height * Number(CC_list[query]) / 100 + "px";
            } else {
                CSSIC(query, "st").fontSize = height + "px";
            }
        }

        function CC_width(query) {
            if (query in CC_list) {
                CSSIC(query, "st").fontSize = width / (CSSIC(query).innerHTML.length - small_chara + small_chara * CSSIC("#get_em_small").clientWidth / CSSIC("#get_em").clientWidth) * Number(CC_list[query]) / 100 + "px";
            } else {
                CSSIC(query, "st").fontSize = width / (CSSIC(query).innerHTML.length - small_chara + small_chara * CSSIC("#get_em_small").clientWidth / CSSIC("#get_em").clientWidth) + "px";
            }
        }
    }
}

function zeroPadding(number, digit) {
    if (String(digit).indexOf(".") == -1) {
        R_number = String(number);
        if (String(number).indexOf(".") != -1) {
            if (String(number).length - 1 <= digit) {
                for (let i = 0; digit - (String(number).length - 1) > i; i++) {
                    R_number = "0" + R_number;
                }
                R_number = R_number.slice(0, -1 * String(number).split(".")[1].length) + String(number).split(".")[1];
            } else {
                console.log(number + " is " + digit + " digit or more / at zeroPading")
                R_number = undefined;
            }
        } else {
            if (String(number).length <= digit) {
                for (let i = 0; digit - String(number).length > i; i++) {
                    R_number = "0" + R_number;
                }
            } else {
                console.log(number + " is " + digit + " digit or more / at zeroPading")
                R_number = undefined;
            }
        }
    } else {
        console.log(digit + " must be a natural number / at zeroPading")
        R_number = undefined;
    }
    return R_number;
}


function vp(value, point, unit) {
    let point_R;
    if (point == "vmin") {
        point_R = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    } else if (point == "vh") {
        point_R = window.innerHeight;
    } else {
        point_R = window.innerWidth;
    }
    cr = value * 0.01 * point_R;
    //CSSIC("#get_em", "st").width = "1" + unit;
    if (unit == "em_small") {
        cr = value * Math.floor(point_R * 0.01 / parseFloat(CSSIC("#get_em_small").offsetWidth) * 100) / 100;
    } else if (unit == "em") {
        cr = value * Math.floor(point_R * 0.01 / parseFloat(CSSIC("#get_em").clientWidth) * 100) / 100;
    }
    cr = Math.floor(cr * 100) / 100;
    //console.log(value, point, unit, point_R);
    return cr;
}

function resize() {
    CSSIC(":root").style.setProperty('--emvmin', vp(1, "vmin", "em") + "em");
    CSSIC(":root").style.setProperty('--emvh', vp(1, "vh", "em") + "em");
    CSSIC(":root").style.setProperty('--emvw', vp(1, "vw", "em") + "em");
    CSSIC(":root").style.setProperty('--emvmin_small', vp(1, "vmin", "em_small") + "em");
    CSSIC(":root").style.setProperty('--emvh_small', vp(1, "vh", "em_small") + "em");
    CSSIC(":root").style.setProperty('--emvw_small', vp(1, "vw", "em_small") + "em");
}

window.addEventListener("resize", function () {
    resize();
    chara_contain("$start");
});

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
    //let Arg = Array.prototype.slice(arguments);
    let Arg = args.map(elem => { if (!Array.isArray(elem)) { return [elem] } else { return elem } })
    let Arr = [[]];


    return (A2A = (Arg, Arr) => Arg.length > 0 ? A2A(Arg.slice(0, -1), Arg.slice(-1).flat().map(elemG => Arr.map(elem => [elemG, ...elem])).flat()) : Arr)(Arg, Arr)
}

function ArrUnDup/**Duplicate */(array) {
    return array.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
}

function FuncProgeny(_E0, fn) {
    (Array.isArray(_E0) ? _E0 : Array.from(_E0)).flatmap(_E1 => _E1 instanceof HTMLElement ? _E1 : (document.querySelectorAll(_E1).length == 0 ? undefined : Array.from(document.querySelectorAll(_E1)))).filter(_E1 => _E1 != undefined).forEach(_E1 => _E1.fn())
    if (_E0.filter(_E0 => _E0.hasChildNodes()).map(_E0 => _E0.child).length != 0) FuncProgeny(_E0, fn)
}
//---key-------------------------------
document.addEventListener("keyup", () => key_summon("up"));
document.addEventListener("keydown", () => key_summon("down"));

let KeyEvent = [];

function KeyTask(UD, Code, Func) { }

function key_summon(UD) {
}
//----mouse----------------------------
window.addEventListener("load", () => {
    try {
        mousecode()
    } catch {
        console.warn("There are not mousecode()")
    }
})

let mc = [];
let [mouseud_recog, mousequery] = [undefined, undefined];

function mouseud(ud, query) {
    mouseud_recog = ud;
    mousequery = query;
    mousecode();
}


function mouse(ud, query, name) {
    if (mc.indexOf(ud + "/" + query) == -1) {
        if (CSSIC(query).length > 1) {
            CSSIC(query).forEach(function (value) {
                CSSIC("#" + value.id).addEventListener("mouse" + ud, () => {
                    mouseud(ud, query);
                });
            })
        } else {
            CSSIC(query).addEventListener("mouse" + ud, () => {
                mouseud(ud, query);
            });
        }
        mc.push(ud + "/" + query);
    } else {
        if (mouseud_recog == ud && mousequery == query) {
            if (name == undefined) {
                while (query.indexOf(".") != -1) {
                    query = query.replace(".", "$c");
                }
                animation(ud + query.replace(/#/g, "$"));
            } else if (typeof name == "string") {
                animation(name)
            } else if (Array.isArray(name)) {
                name.forEach(element => {
                    animation(element);
                });
            }
        }
    }
}

/*---
//KeyTask("down", 16, "openshort");

//mouse("down", "#A_menu", ["openmenu", "closeshort"])

let flag = {};

//function openshort() {}
//function down$A_play(){}
---*/

console.log("Seifuncs ver.1.1.0 for JS was completely loaded.")