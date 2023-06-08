"use strict";
(() => {
var exports = {};
exports.id = 280;
exports.ids = [280];
exports.modules = {

/***/ 7783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 8530:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 4426:
/***/ ((module) => {

module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 252:
/***/ ((module) => {

module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 9193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "headerHooks": () => (/* binding */ headerHooks),
  "originalPathname": () => (/* binding */ originalPathname),
  "requestAsyncStorage": () => (/* binding */ requestAsyncStorage),
  "routeModule": () => (/* binding */ routeModule),
  "serverHooks": () => (/* binding */ serverHooks),
  "staticGenerationAsyncStorage": () => (/* binding */ staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/search/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "GET": () => (GET)
});

// EXTERNAL MODULE: ../node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6086);
// EXTERNAL MODULE: ../node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(6158);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ../node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9639);
;// CONCATENATED MODULE: ./app/api/search/route.ts
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


async function GET(request) {
    const PAGE_SIZE = 6;
    const { searchParams  } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const page = searchParams.get("page") || "1";
    const posts = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        orderBy: {
            createdAt: "desc"
        }
    });
    let filteredPosts = posts;
    if (search) filteredPosts = filteredPosts.filter((post)=>post.title.toLowerCase().includes(search.toLowerCase()));
    if (category) filteredPosts = filteredPosts.filter((post)=>post.categories.some((cat)=>cat.toLowerCase() === category.toLowerCase()));
    const paginatedPosts = filteredPosts.slice((Number(page) - 1) * PAGE_SIZE, Number(page) * PAGE_SIZE);
    const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
    return next_response/* default.json */.Z.json({
        results: paginatedPosts,
        pagination: {
            totalResults: filteredPosts.length,
            pageResults: paginatedPosts.length,
            page: Number(page),
            totalPages: totalPages,
            resultsPerPage: PAGE_SIZE
        }
    });
}

;// CONCATENATED MODULE: ../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fsearch%2Froute&name=app%2Fapi%2Fsearch%2Froute&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fclew%2FDocuments%2Frepos%2Fblog%2Fsrc%2Fapp&appPaths=%2Fapi%2Fsearch%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=!

    

    

    

    const routeModule = new (module_default())({
    userland: route_namespaceObject,
    pathname: "/api/search",
    resolvedPagePath: "/Users/clew/Documents/repos/blog/src/app/api/search/route.ts",
    nextConfigOutput: undefined,
  })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/search/route"

    

/***/ }),

/***/ 9639:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;
// This file is for modularized imports for next/server to get fully-treeshaking.

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _response.NextResponse;
    }
}));
const _response = __webpack_require__(3094); //# sourceMappingURL=next-response.js.map


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [626,71], () => (__webpack_exec__(9193)));
module.exports = __webpack_exports__;

})();