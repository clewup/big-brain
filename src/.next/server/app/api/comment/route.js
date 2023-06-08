"use strict";
(() => {
var exports = {};
exports.id = 753;
exports.ids = [753];
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

/***/ 6252:
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

// NAMESPACE OBJECT: ./app/api/comment/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "DELETE": () => (DELETE),
  "PATCH": () => (PATCH),
  "POST": () => (POST)
});

// EXTERNAL MODULE: ../node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6086);
// EXTERNAL MODULE: ../node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(6158);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ../node_modules/next/dist/server/web/spec-extension/response.js
var response = __webpack_require__(3094);
;// CONCATENATED MODULE: ./app/api/comment/route.ts
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


async function POST(request) {
    const body = await request.json();
    const user = request.headers.get("x-user");
    if (!user) return response.NextResponse.json({
        error: "Missing user"
    }, {
        status: 400
    });
    const { isValid , errors  } = validate(body);
    if (!isValid) return response.NextResponse.json({
        error: `Invalid ${errors.join(", ")}`
    }, {
        status: 400
    });
    const createdComment = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        data: {
            createdBy: user,
            updatedBy: user,
            content: body.content,
            post: {
                connect: {
                    id: body.post
                }
            }
        }
    });
    return response.NextResponse.json(createdComment);
}
async function PATCH(request) {
    const body = await request.json();
    if (!body.id) return response.NextResponse.json({
        error: `Missing id`
    }, {
        status: 404
    });
    const user = request.headers.get("x-user");
    if (!user) return response.NextResponse.json({
        error: "Missing user"
    }, {
        status: 400
    });
    const { isValid , errors  } = validate(body);
    if (!isValid) return response.NextResponse.json({
        error: `Invalid ${errors.join(", ")}`
    }, {
        status: 400
    });
    const comment = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        where: {
            id: Number(body.id)
        }
    });
    if (!comment) return response.NextResponse.json({
        error: `There was a problem finding comment ${body.id}`
    }, {
        status: 400
    });
    if (comment.createdBy !== user) return response.NextResponse.json({
        error: `Comment ${body.id} was not created by user ${user}`
    }, {
        status: 400
    });
    const updatedComment = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        where: {
            id: body.id
        },
        data: {
            updatedBy: user,
            content: body.content
        }
    });
    return response.NextResponse.json(updatedComment);
}
async function DELETE(request) {
    const { searchParams  } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return response.NextResponse.json({
        error: `Missing id`
    }, {
        status: 404
    });
    const user = request.headers.get("x-user");
    if (!user) return response.NextResponse.json({
        error: "Missing user"
    }, {
        status: 400
    });
    const comment = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        where: {
            id: Number(id)
        }
    });
    if (!comment) return response.NextResponse.json({
        error: `There was a problem finding comment ${id}`
    }, {
        status: 400
    });
    if (comment.createdBy !== user) return response.NextResponse.json({
        error: `Comment ${id} was not created by user ${user}`
    }, {
        status: 400
    });
    const deletedComment = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        where: {
            id: Number(id)
        }
    });
    if (!deletedComment) return response.NextResponse.json({
        error: `There was a problem deleting comment ${id}`
    }, {
        status: 400
    });
    return response.NextResponse.json({
        message: `Comment ${id} successfully deleted`
    });
}
function validate(body) {
    const errors = [];
    if (!body.post) errors.push("post");
    if (!body.content) errors.push("content");
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

;// CONCATENATED MODULE: ../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcomment%2Froute&name=app%2Fapi%2Fcomment%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcomment%2Froute.ts&appDir=%2FUsers%2Fclew%2FDocuments%2Frepos%2Fblog%2Fsrc%2Fapp&appPaths=%2Fapi%2Fcomment%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=!

    

    

    

    const routeModule = new (module_default())({
    userland: route_namespaceObject,
    pathname: "/api/comment",
    resolvedPagePath: "/Users/clew/Documents/repos/blog/src/app/api/comment/route.ts",
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

    const originalPathname = "/api/comment/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [626,71], () => (__webpack_exec__(6252)));
module.exports = __webpack_exports__;

})();