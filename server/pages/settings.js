(() => {
var exports = {};
exports.id = 662;
exports.ids = [662];
exports.modules = {

/***/ 9820:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "SettingsPage_container__IlDEZ"
};


/***/ }),

/***/ 2005:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "ThemeInfo_container__ok8ua",
	"info": "ThemeInfo_info__RSZhr"
};


/***/ }),

/***/ 7138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ settings),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./styles/ThemeInfo.module.css
var ThemeInfo_module = __webpack_require__(2005);
var ThemeInfo_module_default = /*#__PURE__*/__webpack_require__.n(ThemeInfo_module);
;// CONCATENATED MODULE: ./components/ThemeInfo.jsx



const ThemeInfo = ({ icon , name , publisher , theme  })=>{
    const setTheme = (theme)=>{
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (ThemeInfo_module_default()).container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: icon,
                alt: name,
                height: 100,
                width: 100
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (ThemeInfo_module_default()).info,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                children: name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                children: publisher
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>setTheme(theme),
                        children: "Set Color Theme"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_ThemeInfo = (ThemeInfo);

// EXTERNAL MODULE: ./styles/SettingsPage.module.css
var SettingsPage_module = __webpack_require__(9820);
var SettingsPage_module_default = /*#__PURE__*/__webpack_require__.n(SettingsPage_module);
;// CONCATENATED MODULE: ./pages/settings.jsx



const SettingsPage = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: "Manage Themes"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (SettingsPage_module_default()).container,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeInfo, {
                        name: "Dracula",
                        icon: "/dracula.png",
                        publisher: "Dracula Theme",
                        theme: "dracula",
                        description: "Official Dracula Theme. A dark theme for many editors, shells, and more."
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeInfo, {
                        name: "GitHub Dark",
                        icon: "/github-dark.png",
                        publisher: "GitHub",
                        theme: "github-dark",
                        description: "GitHub theme for VS Code"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeInfo, {
                        name: "Ayu Dark",
                        icon: "/ayu.png",
                        publisher: "teabyii",
                        theme: "ayu-dark",
                        description: "A simple theme with bright colors."
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeInfo, {
                        name: "Ayu Mirage",
                        icon: "/ayu.png",
                        publisher: "teabyii",
                        theme: "ayu-mirage",
                        description: "A simple theme with bright colors."
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeInfo, {
                        name: "Nord",
                        icon: "/nord.png",
                        publisher: "arcticicestudio",
                        theme: "nord",
                        description: "An arctic, north-bluish clean and elegant Visual Studio Code theme."
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeInfo, {
                        name: "Night Owl",
                        icon: "/night-owl.png",
                        publisher: "sarah.drasner",
                        theme: "night-owl",
                        description: "A VS Code theme for the night owls out there."
                    })
                ]
            })
        ]
    });
};
async function getStaticProps() {
    return {
        props: {
            title: "Settings"
        }
    };
}
/* harmony default export */ const settings = (SettingsPage);


/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [675], () => (__webpack_exec__(7138)));
module.exports = __webpack_exports__;

})();