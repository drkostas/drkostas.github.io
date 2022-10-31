"use strict";
(() => {
var exports = {};
exports.id = 449;
exports.ids = [449];
exports.modules = {

/***/ 2062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ml_projects),
  "getMLProjects": () => (/* binding */ getMLProjects)
});

;// CONCATENATED MODULE: ./pages/api/ml-projects.json
const ml_projects_namespaceObject = JSON.parse('[{"id":1,"name":"3D Semantic Segmentation","image":"https://imgur.com/NtIvxWG.png","description":"Semantic Segmentation with Transformers on 3D Medical Images.","tags":["PyTorch","OpenCV","SegFormer","Semantic-Segmentation","Medical-Imaging"],"source_code":"https://github.com/drkostas/3D-Semantic-Semgnetation"},{"id":2,"name":"Transformer-based Question Answering using BERT","image":"https://imgur.com/dw21deK.png","description":"BERT-based question answering/reading comprehension methods on Rinehart Novels.","tags":["PyTorch","SpaCy","HuggingFace","Transformers","BERT"],"source_code":"https://github.com/drkostas/Bert-Question-Answering"},{"id":3,"name":"Accident Severity Prediction","image":"https://imgur.com/3w7SKLt.png","description":"Predicting the severity of car accidents from various attributes.","tags":["Pandas","Scipy","Bayesian-Optimization","XGBoost","Logistic-Regression","Neural-Network","K-Means"],"source_code":"https://github.com/drkostas/accident-severity-prediction"},{"id":4,"name":"Hybrid Girvan Newman","image":"https://imgur.com/FcIlWzb.png","description":"Hybrid Girvan Newman. Code for the `A Distributed Hybrid Community Detection Methodology for Social Networks` paper.","tags":["Apache-Spark","Social-Networks","Community-Detection","GraphFrames","MySQL"],"source_code":"https://github.com/drkostas/HGN","scholar":"https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&authuser=1&citation_for_view=b___QQ8AAAAJ:u5HHmVD_uO8C"},{"id":5,"name":"COVID-19 Vaccination Prediction","image":"https://imgur.com/uXxzBBC.png","description":"Simultaneous Time Series Forecasting on the global COVID-19 Daily Vaccinations.","tags":["Tensorflow","LSTMs","Multivariate-Time-Series"],"source_code":"https://github.com/drkostas/covid19-vaccinations-predict"},{"id":6,"name":"Instagram Likes Prediction","image":"https://imgur.com/siwQMhc.png","description":"First attempt on predicting the likes a photo will get on Instagram.","tags":["Tensorflow","OpenCV","Instagram","Scraper","CNN"],"source_code":"https://github.com/drkostas/Insta-Likes-Predict"},{"id":7,"name":"Reinforcement Learning - Value Iteration","image":"https://imgur.com/v0s5gPx.png","description":"Implementation of value iteration algorithm for calculating an optimal MDP policy.","tags":["Markov-Decision-Process","Value-Iteration","RL"],"source_code":"https://github.com/drkostas/RL-Value-Iteration"},{"id":8,"name":"Vanilla Numpy CNN","image":"https://imgur.com/sNrVbbL.png","description":"A Vanilla Numpy-only Convolutional Neural Network.","tags":["Numpy","CNN","Vanilla-Implementation"],"source_code":"https://github.com/drkostas/Numpy-CNN"},{"id":9,"name":"Vanilla Numpy Neural Network","image":"https://imgur.com/mm29qlX.png","description":"A Vanilla Numpy-only Feed-Forward Neural Network.","tags":["Numpy","Neural-Network","Vanilla-Implementation"],"source_code":"https://github.com/drkostas/Numpy-NeuralNet-1"}]');
;// CONCATENATED MODULE: ./pages/api/ml-projects.js

const getMLProjects = ()=>{
    return ml_projects_namespaceObject;
};
/* harmony default export */ const ml_projects = ((req, res)=>{
    const projects = getMLProjects();
    res.json(projects);
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2062));
module.exports = __webpack_exports__;

})();