"use strict";
(() => {
var exports = {};
exports.id = 909;
exports.ids = [909];
exports.modules = {

/***/ 1967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ bots_projects),
  "getBotsProjects": () => (/* binding */ getBotsProjects)
});

;// CONCATENATED MODULE: ./pages/api/bots-projects.json
const bots_projects_namespaceObject = JSON.parse('[{"id":1,"name":"Youtube Comment Bot","image":"https://imgur.com/bFXeKlG.png","description":"A bot that post the first comment on every new video of specified channels.","tags":["Youtube","Gmail","Dropbox","MySQL","AWS","RDS","CircleCI","Heroku"],"source_code":"https://github.com/drkostas/Youtube-FirstCommentBot","demo":"https://www.youtube.com/channel/UC_nnPV1zXEqIP42HOiVdg1A"},{"id":2,"name":"Job Application Bot","image":"https://imgur.com/BX6C6ke.png","description":"A bot that automatically sends emails to new ads posted in any desired xe.gr search url.","tags":["Gmail","Dropbox","MySQL","AWS","RDS","CircleCI","Heroku","Crawler","Scraper"],"source_code":"https://github.com/drkostas/JobApplicationBot"}]');
;// CONCATENATED MODULE: ./pages/api/bots-projects.js

const getBotsProjects = ()=>{
    return bots_projects_namespaceObject;
};
/* harmony default export */ const bots_projects = ((req, res)=>{
    const projects = getBotsProjects();
    res.json(projects);
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1967));
module.exports = __webpack_exports__;

})();