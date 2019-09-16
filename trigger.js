document.addEventListener("DOMContentLoaded", () => {
    let _T0 = document.querySelectorAll('script[src="./Seifuncs/trigger.js"]')[0]
    Promise.all([new Promise((resolve) => {
        let sfconfig = document.createElement('script');
        sfconfig.setAttribute("id", "SfConfig");
        sfconfig.setAttribute("src", "./Seifuncs/config.js");
        _T0.parentNode.insertBefore(sfconfig, _T0);
        resolve()
    }), new Promise((resolve) => {
        let sfhelp = document.createElement('script');
        sfhelp.setAttribute("id", "SfHelp");
        sfhelp.setAttribute("src", "./Seifuncs/help.js");
        _T0.parentNode.insertBefore(sfhelp, _T0);
        resolve()
    })]).then(() => {
        let sfmain = document.createElement('script');
        sfmain.setAttribute("id", "SfMain");
        sfmain.setAttribute("src", "./Seifuncs/main.js");
        _T0.parentNode.insertBefore(sfmain, _T0);
    }).then(() => {
        let sfcss = document.createElement('link');
        sfcss.setAttribute("id", "SeifuncCSS");
        sfcss.setAttribute("rel", "stylesheet");
        sfcss.setAttribute("type", "text/css");
        sfcss.setAttribute("href", "./Seifuncs/sfstyle.css");
        _T0.parentNode.insertBefore(sfcss, _T0);
    })
})