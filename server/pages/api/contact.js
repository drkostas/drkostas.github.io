"use strict";
(() => {
var exports = {};
exports.id = 91;
exports.ids = [91];
exports.modules = {

/***/ 891:
/***/ ((module) => {

module.exports = require("@notionhq/client");

/***/ }),

/***/ 7221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { Client  } = __webpack_require__(891);
const notion = new Client({
    auth: process.env.NOTION_API_TOKEN
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{
    if (req.method !== "POST") {
        return res.status(405).json({
            msg: "Only POST requests are allowed"
        });
    }
    try {
        const { name , email , subject , message  } = JSON.parse(req.body);
        await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }, 
                    ]
                },
                Email: {
                    email
                },
                Subject: {
                    rich_text: [
                        {
                            text: {
                                content: subject
                            }
                        }, 
                    ]
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: message
                            }
                        }, 
                    ]
                }
            }
        });
        res.status(201).json({
            msg: "Success"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Failed"
        });
    }
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7221));
module.exports = __webpack_exports__;

})();