# Seifuncs

そこら辺に転がってた瓦礫の残骸を適当にかき集めてきたもの。</br>
趣味でプログラミングしてるレベルなので, リアルに瓦礫の寄せ集めです。

別の言い方をすると, 過去に作ったものの中から使いまわせそうなパーツを集めてきたもの。

近々の YLevel リリースで TypeScript 対応させる予定。

今からバグ探しする気力はないので, 目立ったバグがあったら次の ZLevel リリースで。

# Table of contents

0. [How to use](#Howtouse) : 使い方
1. [License](#License) : ライセンス
2. [Bug report](#Bugreport) : バグの報告方法
3. [Caution](#Caution) : 注意事項
4. [Contents](#Contents) : コンテンツ

   0. [Chain](#Contents_Chain)
   1. [Note](#Contents_Note)
   2. [Element](#Contents_Element)
   3. [Keys](#Contents_Keys)

5. [Release Note](#ReleaseNote) : リリースノート

<a id="Howtouse"></a>

# How to use

0. ダウンロードして, 使いたい HTML ファイルが在るところに解凍。
1. `import Chain from "./Seifuncs/main.js"` です。

<a id="License"></a>

# License

LCIENSE を読んで。

<a id="Bugreport"></a>

# Bug report

Issue or Pullrequest on Github

<a id="Caution"></a>

# Caution

*IE*とそれっぽいものには対応しないので, よろしく。

<a id="Contents"></a>

# Contents

近々, これ用の説明ページを作るかもしれないし, 作らないかもしれない。</br>
もしくは, 別の MarkDown か何かにしたほうが良いとは思うんだけど, シンプルに面倒。

<a id="Contents_Chain"></a>

## Chain

---

Prototype をいじるとかいう, 頭の古いことしてるので注意してね。</br>
最低限の配慮として, Prototype を汚染しなくても使えるようにはしてある。

### **About**

`Chain`という関数を追加。</br>
引数に何かを与えてやると, 引数につなげて Chain に登録した関数を使えるよ。</br>

```javascript:例
Chain([a,[b],[c,[d,e]]]).fullFlat();
-> [a,b,c,d,e]
```

※ デフォルトでは, Prototype を汚してるので Chain に与えなくても実行可能</br>

```javascript:例
([a,[b],[c,[d,e]]]).fullFlat();
-> [a,b,c,d,e]
```

</br>
引数に何も与えないと, Chain 自身のための関数が実行可能。</br>
詳細は以下に。</br>
</br>

### **original method**

0. **set** / Chain に関数を登録する</br>

   > 引数 : [ Prototype, Name, Function ] を Key に持つ Object。</br> &emsp;&emsp;&nbsp;&thinsp;&nbsp;Prototype に指定した型に紐づけて Name という名前の Function を追加。</br> &emsp;&emsp;&nbsp;&thinsp;&nbsp;Prototype を \* にすると, 全ての型に追加。</br>
   > 返値 : Chain() と同じ

1. **add** / 既に Chain に登録されている場合に Error を投げてくれる Set。
2. **delete** / set の逆版。
   > 返値 : 削除した関数が有ったか否かの真偽値
3. **use** / for Debug
4. **pickup** / for Debug
5. **Proto** / 引数に与えたデータの型名を文字列で返す
6. **summon** / proto の逆版。
7. **generate** / Seifuncs 独自の Class を作るためのもの。詳細は後記。
   > 対応 : Note, Element, Task, Keys
8. **sync** / Chain に登録されている関数達を Prototype に追加する。
   > 引数 : set と同じ</br>
   > 返値 : set と同じ
9. **restore** / Prototype に追加した関数たちを Prototype から退去させる。
   > 引数 : set と同じ</br>
   > 返値 : delete と同じ

### **All**

0. **chain** / Any.chain(Function) == Function.bind(Any)

### **Array**

0. **delete** / 与えられた関数の実行結果によって, 配列の要素を削除する
   > 引数 : Array.prototype.filter() と同じ</br>
   > 返値 : 接続元の関数から要素を破壊的に削除した配列
1. **equal** / 接続元と与えられた配列が持つ要素が全て同じであるかを順不同に判断する。
2. **fullFlat** / 接続元の配列を一列の配列にする
3. **pushed** / 要素を接続元の配列に追加し, 追加した要素を返す。
4. **rap** / 接続元の配列のみを内包する配列を返す
   > 引数 : 内包する回数を指定する数値
5. **unDup** / 接続元の配列が同じ要素を持つ場合に, 一つのみを残して削除する。
   > 引数 : 被ったときにより後ろの要素を優先するか否かの真偽値

### **HTMLElement**

0. **addEventTask** / TasksObject (後述) を利用した addEventListener の独自版

   > 引数 : [ type, listener, option ] の 3 つ</br>
   >
   > > type : [ "scroll", "resize", "classChange", "touchLong", "touchSlide" ] のいずれかの文字列</br>
   > >
   > > > scroll : 要素がスクロールされているとき</br>
   > > > resize : 要素のサイズが変更されているとき</br>
   > > > classChange : 要素の class が変更されたとき</br>
   > > > touchLong : 指定秒の間, touch し続けたとき</br>
   > > > touchSlide : 指定方向にドラッグしたとき</br>
   > >
   > > listener : TasksObject を引数に取れる関数</br>
   > > option : Tasks を参照
   >
   > 返値 : TaskObject</br>

   なんか多重引用の見た目が好きじゃないから, 近々なんとかしたいなぁ... (なんとかするとは言ってない)

1. **css** / 要素の style を取得したり, 変更したりする。
   > 引数 : 取得する style の名前と, 必要に応じて変更したい値</br> &emsp;&emsp;&nbsp;&thinsp;&nbsp;_element_.css(style) == window.getComputedStyle(_element_).getPropertyValue(style)</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;_element_.css(style, value) == _element_.style\[style\] = value</br>
   > 返値 : 取得した値 or 変更した要素自身
2. **descendantFlat** / 子要素を全て一列の配列に内包した配列
3. **square** / 要素を正方形にする
   > 引数 : [ "x", "y", "max", "min", undefined ] のいずれか</br>
   >
   > > x : x 方向の長さを一辺とした正方形</br>
   > > y : y 方向の長さを一辺とした正方形</br>
   > > max : 最大の辺の長さを一辺とした正方形</br>
   > > min : 最小の辺の長さを一辺とした正方形</br>
   > > undefiend : 各辺の長さの平均値を一辺とした正方形</br>
   >
   > 返値 :変更した要素自身
4. **textCenter** / 要素の中心に text が来るように調整する</br>
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;&thinsp;&nbsp;※ デフォルトでは textCenter という class を持つ HTMLElement は自動で実行される。
5. **textContain** / 要素の中に text が入り切るように調整する</br>
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;&thinsp;&nbsp;※ デフォルトでは textContain という class を持つ HTMLElement は自動で実行される。

### **Map**

0. **addGet** / 追加した value を返す。指定した Key が既にあった場合は Key の値を取得する。
1. **assign** / 接続元の Map と与えられた Map を結合する。同じ Key があった場合は上書きする。
2. **merge** / 接続元の Map と与えられた Map を結合する。同じ Key があった場合は無視する。

### **NodeList**

0. **toArray** / Arry.from(_NodeList_) == _NodeList_.toArray()

### **Number**

0. **adeg** / radian 2 dgree
1. **arad** / dgree 2 radian

### **Object**

0. **addGet** / _Map_.addGet と同じ
1. **cover** / _Map_.merge と同じ
2. **deepCopy** / そのまんま
3. **delete** / _Object_.delete(key) == delete _Object_.key
4. **define** / [ configurable, enumerable, writable ] の全てが true の defineProperty
   > 引数 : Key (String), Value (Any)</br>
   > 返値 : 追加した Object

### **String**

0. **comprise** / 大文字小文字を区別しない String.includes
   </br>

<a id="Contents_Note"></a>

## Note

---

### **About**

_Map_ を基にいろいろ改造したもの</br>
主に, loaclStorage と JSON ファイル の諸々に関するやつ</br>

元々は, グローバル変数を汚したくなくて作ったやつ</br>
役に立つかはわからない。

</br>

生成時に, Note の名前を与えてあげてね。

```javascript:例
Chain().generate("Note")(名前);
-> new Note(名前);
```

### **method**

0. Chain に Map に紐付けられてデフォルトで登録されているのを受け継ぐ
1. **json** / ローカルな JSON ファイル を同期的に読み込む static なやつ。</br>
   &ensp;&ensp;&ensp;&ensp;&nbsp;&thinsp;&nbsp;色々考えるのが面倒になって, XMLHttpRequest 使ってるからおすすめはしない。
   > 引数 : 読み込みたい URL の文字列</br>
   > 返値 : JSON
2. **saveSave** / localStorage に保存する
   > 仕様 : localStorage 関連は同じ名前を与えられた Note 間でのみ実行される</br>
   > 引数 : Key, Value</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;指定した Key の値を登録する。</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;Value を与えると, 与えた Value を Key に紐づけて登録する。</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;Key を与えずに実行すると全ての中身を登録する
3. **saveRestore** / loaclStorage に保存されているデータを反映する。
   > 引数 : Key (String)</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;Key を与えないと全てのデータを復元する。
4. **saveGet** / localStorage に与えられた Key に紐付けられて保存されているデータを取得する。
5. **saveHas** / localStorage に与えられた Key に紐付けられて保存されているデータが有るか否か。
6. **saveRemove** / localStorage に保存されているデータを消す。
   > 引数 : Key (String)</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;Key を与えないと全てのデータを削除する。
7. **upload** / saveRestore の JSON ファイル 版
   > 引数 : url, Key</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;Key を与えると与えた Key に upload 結果 を保存する
8. **download** / JSON ファイル にしてダウンロードする
   > 引数 : Key</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;指定した Key のデータ入りのをダウンロードする。</br>&emsp;&emsp;&nbsp;&thinsp;&nbsp;Key を指定しないと, 全部の中身をダウンロードする。

<a id="Contents_Element"></a>

## Element

---

### **About**

要素を検索したり, 作ったりするやつ</br>
それ以上でもそれ以下でもない。

### **引数**

文字列 or Object</br>

> 文字列 : document.querySelectorAll と同じ</br>
> Object : [ "tag", "addEventListner", "classList", "innerText", "style", その他 ]　を Key に持つことのできる Object
>
> > tag : 必須。生成する要素のタグ名。</br>
> > addEventListener : [ "type", "listener", "option" ] を Key に持つことのできる Object。意味はそのまま。</br>
> > classList : 生成した要素に与える class 。String or Array.</br>
> > innerText : そのまま。
> > style :要素に追加する style の [ Key と Value ] の Object.</br>
> > その他 : _element_.setAttribute に与える [ Key と Value ] の Object.

### **返値**

引数によって異なる

> 文字列 : NodeList. document.querySelectoeAll(_string_) == Chain().generate("element")(_string_)</br>
> Object : 与えた内容に応じた要素。

<a id="Contents_Taksks"></a>

## Tasks

---

### **About**

自動的に色々処理してくれるやつ。</br>
毎回, 条件関数を実行してるから使いすぎはオススメしないよ。なんとかそこは軽量化したいなぁ...。

条件を満たしてるかを確認する関数を自作しなくても済むのがメリット</br>
最適化や軽量化がしづらいのがデメリット

注 : TaskObject は実行単体で活動するやつなので, 一時停止したり再開したりしたいときは変数か何かに取っといてね。

```javascript:例
Chain().generate("Tasks")(Argument Object);
-> new TaskObject(Argument Object);
```

### **引数**

引数には, [ If, Function, Option ] の 3 つの Key をもつ Object を与えてください。</br>

**If** : 条件関数</br>
実行して返値が true のときに, 登録したメイン関数が実行される。</br>
実行関数の引数には, TaskObject 自身 が渡される。

**Function** : メイン関数</br>
実行関数が true を返したときに実行される関数</br>
メイン関数の引数にも, TaskObject 自身 が渡される。

**Option** : 実行のための option</br>

0. **callDelay** / 条件関数を実行うする間隔。デフォルトでは 毎フレーム。
1. **hold** / 条件関数が真の時に, メイン関数を連続して実行し続けるか否か。
2. **once** / 一度メイン関数を実行すると, TaskObject 自身 を削除するか否か。
3. **state** / TaskObject 内にデータを保存するための場所。
4. **nativeState** / for Debug

### **Method**

1. **start** / 実行開始。これをしないと条件関数が判断され始めないよ。
2. **stop** / 実行一時停止。start で再開。
3. **call** / for Debug.
4. **remove** / TaskObject 自身 を削除

<a id="Contents_Keys"></a>

## Keys

---

### **About**

特定の Key が押されてるかを知るためのもの</br>
generate 実行時に与えた key が押されているかを判断する関数を返す。</br>
Key の判断は _KeyEvent_.code に基づいて判断されます。

```javascript:例
let KeyA = Chain().generate("Keys")("A");
KeyA(); -> true or false
```

### **特別な引数**

generate 実行時に, Key code 以外を与えると, 少し違ったものが返ってきます。</br>

0. **"List"** / 押されている Key の配列
1. **undefiend** / KeysObject 自身。

### **Method**

0. **keydown** / forDebug.
1. **keyup** / forDebug.
2. **entry** / for Debug.
3. **check** / 「 console に押された Key code を出力する機能 」の ONOFF を切替可能。

</br>

<a id="Config"></a>

# Config

同フォルダ内の config.json について。</br>
これも, ちゃんとそれ用のファイルを作るべきなんだろうけど...面倒。

## Chain

0. sync

   0. level : `Cain().sync()` 実行時に, 既に同名の関数があった場合にどの程度上書きするか。
      > 0 : 全て上書きする</br>
      > 1 : 上書きしない
   1. auto : 自動で Chain に登録された関数を prototype に反映するか否か。

## Note

0. save

   0. restoreLevel : 既に同名の関数があった場合にどの程度上書きするか。

      > 0 : 全て上書きする</br>
      > 1 : 上書きしない

1. UDload

   1. uploadLevel : 既に同名の関数があった場合にどの程度上書きするか。
      > 0 : 全て上書きする</br>
      > 1 : 上書きしない

## Tasks

0. exeHold : 条件関数が真の時に, メイン関数を連続して実行し続けるか否か。
1. exeInterval : 条件関数を実行うする間隔。0 を指定すると毎フレーム。
2. exeOnce : 一度メイン関数を実行すると, TaskObject 自身 を削除するか否か。

## EventTask

0. touchLong : 何ミリ秒以上 touch し続けると発火するか
1. touchSlide

   0. mode : 判定の仕組み
      > 0 : 「 他に要素にタッチしていない状態でのタッチ 」の開始点と現時点で判定</br>
      > 1 : 「 他に要素にタッチしていない状態でのタッチ 」の開始点と</br>&ensp;&nbsp;&nbsp;&nbsp;「 現時点で最も古いタッチ」の座標で判定</br>
      > 2 : 「 現時点で最も古いタッチ 」になった時の座標と現時点で判定
   1. type : 判定基準の種類
      > 値 : "distance", "vector", "radian"
   2. distance : 開始地点との距離で判定 (px 単位)

      > 値 : Number, Array</br>
      >
      > > Number : 正負を区別しない直線距離</br>
      > > Array : X 距離と Y 距離を指定する数値のみを内包する配列 ※ x, y ともに満たしている時に発火

   3. vector : 開始地点とのベクトルで判定 (px 単位) ※ x, y ともに満たしている時に発火

      > x : X 方向の正負を区別する移動距離</br>
      > y : Y 方向の正負を区別する移動距離

   4. radian : 角度と距離で判定

      0. angle : X 軸を 0° とする角度 (度数法)
      1. distance : 距離を指定する数値 (px 単位)

## textCenter

0. autoExe : `textCenter` class が与えられた要素に対し自動的に `textCenter` 関数を実行するか否か

## textContain

0. autoExe : `textContain` class が与えられた要素に対し自動的に `textContain` 関数を実行するか否か

<a id="ReleaseNote"></a>

# Release Note

これも [Contents](#Contents) と合わせて, 別ファイルにしたいね。

## **Version Number**

ver.X.Y.Z</br>
X : 大きなアップデート。互換切りする。</br>
Y : 中位のアップデート。互換切りすることもある。</br>
Z : 小さなアップデート。互換切りしない。</br>

## **History**

| version |        Release Name        |    Day     |
| :-----: | :------------------------: | :--------: |
|  1.0.0  |       First release        | 2019/04/20 |
|  1.1.0  |     Way getting Elems      | 2019/05/20 |
|  1.1.1  |         Debug 1.1          | 2019/05/20 |
|  1.2.0  |        Functionalys        | 2019/06/03 |
|  1.3.1  |   Add function like keys   | 2019/06/18 |
|  1.4.0  |   Publication Note Book    | 2019/07/12 |
|  1.4.1  |       Remove Classic       | 2019/07/13 |
|  1.4.2  |      usability update      | 2019/09/17 |
|  1.6.0  |   Usability Huge Update    | 2019/11/17 |
|  1.6.1  |        Aom UpGrade         | 2019/12/05 |
|  1.7.β  | Change the How to Use Note | 2020/02/18 |
|  1.8.β  |      Module Test Use       | 2020/02/19 |
|  2.0.0  |           Rework           | 2020/09/24 |
|  3.0.0  |          Rework 2          | 2021/08/26 |
|  3.0.1  |         Debug load         | 2021/09/17 |
|  3.0.2  |     Sync Restore Debug     | 2021/12/08 |
