(() => {
var exports = {};
exports.id = 327;
exports.ids = [327];
exports.modules = {

/***/ 7068:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "ProjectCard_card__Ilp8p",
	"content": "ProjectCard_content__SHdnM",
	"tags": "ProjectCard_tags__Atl1P",
	"cta": "ProjectCard_cta__J86_O",
	"underline": "ProjectCard_underline__IoTds"
};


/***/ }),

/***/ 9872:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "ProjectsPage_container__f2WwY"
};


/***/ }),

/***/ 4413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ projects),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./styles/ProjectCard.module.css
var ProjectCard_module = __webpack_require__(7068);
var ProjectCard_module_default = /*#__PURE__*/__webpack_require__.n(ProjectCard_module);
;// CONCATENATED MODULE: ./components/ProjectCard.jsx



const ProjectCard = ({ project  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (ProjectCard_module_default()).card,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: project.image,
                height: 300,
                width: 600,
                alt: project.name
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (ProjectCard_module_default()).content,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        children: project.name
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: project.description
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (ProjectCard_module_default()).tags,
                        children: project.tags.map((tag)=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: tag,
                                children: tag
                            }, tag))
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (ProjectCard_module_default()).cta,
                        children: [
                            project.source_code && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: project.source_code,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: (ProjectCard_module_default()).underline,
                                children: "Code"
                            }),
                            project.demo && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: project.demo,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: (ProjectCard_module_default()).underline,
                                children: "Demo"
                            }),
                            project.scholar && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: project.scholar,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: (ProjectCard_module_default()).underline,
                                children: "Paper"
                            }),
                            project.pypi && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: project.pypi,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: (ProjectCard_module_default()).underline,
                                children: "PyPi"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_ProjectCard = (ProjectCard);

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

// EXTERNAL MODULE: ./styles/ProjectsPage.module.css
var ProjectsPage_module = __webpack_require__(9872);
var ProjectsPage_module_default = /*#__PURE__*/__webpack_require__.n(ProjectsPage_module);
;// CONCATENATED MODULE: ./pages/projects.jsx







const ProjectsPage = ({ ml_projects , bots_projects , pypi_projects , misc_projects  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                children: "Open Source Projects"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("center", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                    children: "Machine Learning"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ProjectsPage_module_default()).container,
                children: ml_projects.map((project)=>/*#__PURE__*/ jsx_runtime_.jsx(components_ProjectCard, {
                        project: project
                    }, project.id))
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("center", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                    children: "Bots"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ProjectsPage_module_default()).container,
                children: bots_projects.map((project)=>/*#__PURE__*/ jsx_runtime_.jsx(components_ProjectCard, {
                        project: project
                    }, project.id))
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("center", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                    children: "PyPi Packages"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ProjectsPage_module_default()).container,
                children: pypi_projects.map((project)=>/*#__PURE__*/ jsx_runtime_.jsx(components_ProjectCard, {
                        project: project
                    }, project.id))
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("center", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                    children: "Misc Projects"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ProjectsPage_module_default()).container,
                children: misc_projects.map((project)=>/*#__PURE__*/ jsx_runtime_.jsx(components_ProjectCard, {
                        project: project
                    }, project.id))
            })
        ]
    });
};
async function getStaticProps() {
    const ml_projects = getMLProjects();
    const bots_projects = getBotsProjects();
    const pypi_projects = getPyPiProjects();
    const misc_projects = getMiscProjects();
    return {
        props: {
            title: "Projects",
            ml_projects,
            bots_projects,
            pypi_projects,
            misc_projects
        }
    };
}
/* harmony default export */ const projects = (ProjectsPage);


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
var __webpack_exports__ = __webpack_require__.X(0, [675], () => (__webpack_exec__(4413)));
module.exports = __webpack_exports__;

})();