"use strict";
(() => {
var exports = {};
exports.id = 979;
exports.ids = [979];
exports.modules = {

/***/ 9328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pypi_projects),
  "getPyPiProjects": () => (/* binding */ getPyPiProjects)
});

;// CONCATENATED MODULE: ./pages/api/pypi-projects.json
const pypi_projects_namespaceObject = JSON.parse('[{"id":1,"name":"High SQL","image":"https://imgur.com/Sx43htM.png","description":"A high-level sql command utility. Currently only MySQL is supported.","tags":["PyPi","MySQL","CircleCI","wrapper"],"source_code":"https://github.com/drkostas/high-sql","pypi":"https://pypi.org/project/high-sql/"},{"id":2,"name":"Cloud File Manager","image":"https://imgur.com/TWD42kg.png","description":"A high-level filemanager utility for cloud services. Currently only Dropbox is supported.","tags":["PyPi","Dropbox","CircleCI","wrapper"],"source_code":"https://github.com/drkostas/cloud-filemanager","pypi":"https://pypi.org/project/cloud-filemanager/"},{"id":3,"name":"YAML Wrapper","image":"https://imgur.com/98sBFjF.png","description":"A YAML configuration wrapper.","tags":["PyPi","CircleCI","yaml","configuration","wrapper"],"source_code":"https://github.com/drkostas/yaml-config-wrapper","pypi":"https://pypi.org/project/yaml-config-wrapper/"},{"id":4,"name":"Color Logger","image":"https://imgur.com/4LumI32.png","description":"A logger with text formatting using termcolor.","tags":["PyPi","CircleCI","logger","termcolor"],"source_code":"https://github.com/drkostas/termcolor-logger","pypi":"https://pypi.org/project/termcolor-logger/"},{"id":5,"name":"Email Sender","image":"https://imgur.com/kWJweYF.png","description":"A utility for sending emails with attachments. Currently only Gmail is supported.","tags":["PyPi","Gmail","wrapper"],"source_code":"https://github.com/drkostas/pyemail-sender","pypi":"https://pypi.org/project/pyemail-sender/"},{"id":6,"name":"Benchmark Tools","image":"https://imgur.com/k64Z12r.png","description":"A collection of benchmarking tools.","tags":["PyPi","CircleCI","benchmarking"],"source_code":"https://github.com/drkostas/bench-utils","pypi":"https://pypi.org/project/bench-utils/"}]');
;// CONCATENATED MODULE: ./pages/api/pypi-projects.js

const getPyPiProjects = ()=>{
    return pypi_projects_namespaceObject;
};
/* harmony default export */ const pypi_projects = ((req, res)=>{
    const projects = getPyPiProjects();
    res.json(projects);
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9328));
module.exports = __webpack_exports__;

})();