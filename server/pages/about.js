"use strict";
(() => {
var exports = {};
exports.id = 521;
exports.ids = [521];
exports.modules = {

/***/ 6280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ about),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "react-pdf"
const external_react_pdf_namespaceObject = require("react-pdf");
;// CONCATENATED MODULE: ./pages/about.jsx


external_react_pdf_namespaceObject.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${external_react_pdf_namespaceObject.pdfjs.version}/pdf.worker.min.js`;
const myResume = "./Resume.pdf";
const AboutPage = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("center", {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                    children: [
                        "Resume (",
                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            href: myResume,
                            download: "Resume-KonstantinosGeorgiou.pdf",
                            children: "Download"
                        }),
                        ")"
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_pdf_namespaceObject.Document, {
                    file: myResume,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pdf_namespaceObject.Page, {
                            pageIndex: 0
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pdf_namespaceObject.Page, {
                            pageIndex: 1
                        })
                    ]
                })
            ]
        })
    });
};
async function getStaticProps() {
    return {
        props: {
            title: "About"
        }
    };
}
/* harmony default export */ const about = (AboutPage);


/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6280));
module.exports = __webpack_exports__;

})();