"use strict";
(() => {
var exports = {};
exports.id = 534;
exports.ids = [534];
exports.modules = {

/***/ 1216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ misc_projects),
  "getMiscProjects": () => (/* binding */ getMiscProjects)
});

;// CONCATENATED MODULE: ./pages/api/misc-projects.json
const misc_projects_namespaceObject = JSON.parse('[{"id":1,"name":"Spotify Button Presser","image":"https://imgur.com/Ek1p3sE.png","description":"An app that clicks a physical button whenever Spotify starts playing on the target device.","tags":["RaspberryPI","Spotify","SwitchBot","button-presser","automation","smart-home"],"source_code":"https://github.com/drkostas/SpotiClick"},{"id":2,"name":"Cross The Floor","image":"https://imgur.com/jjPQmxf.png","description":"Uses Sankey Diagrams to visualize politicians that have `crossed the floor` from election to election.","tags":["Sankey-Diagram","Parliament","Scraper","Visualization"],"source_code":"https://github.com/drkostas/Cross-The-Floor"},{"id":3,"name":"2D Shooter Game","image":"https://imgur.com/GP9wwc0.png","description":"Simple 2d shooter game written with JavaScript and the p5.js library.","tags":["P5.js","game","shooter-game"],"source_code":"https://github.com/drkostas/shooter-game-with-p5js","demo":"http://shooter-game.gkos.tech"},{"id":4,"name":"Quantum Mechanics Quiz App","image":"https://imgur.com/GZAcsg4.png","description":"Android app with 10 questions about Quantum Mechanics.","tags":["Android-App","App","Java","Quantum-Mechanics","Quiz"],"source_code":"https://github.com/drkostas/Quantum-Mechanics-Quiz-App"}]');
;// CONCATENATED MODULE: ./pages/api/misc-projects.js

const getMiscProjects = ()=>{
    return misc_projects_namespaceObject;
};
/* harmony default export */ const misc_projects = ((req, res)=>{
    const projects = getMiscProjects();
    res.json(projects);
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1216));
module.exports = __webpack_exports__;

})();