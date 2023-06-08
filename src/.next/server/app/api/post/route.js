"use strict";
(() => {
var exports = {};
exports.id = 863;
exports.ids = [863];
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

/***/ 5646:
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

// NAMESPACE OBJECT: ./app/api/post/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "DELETE": () => (DELETE),
  "GET": () => (GET),
  "POST": () => (POST)
});

// EXTERNAL MODULE: ../node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6086);
// EXTERNAL MODULE: ../node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(6158);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ../node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9639);
;// CONCATENATED MODULE: ./app/api/post/route.ts
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


async function GET(request) {
    const { searchParams  } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
        const post = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
            include: {
                comments: true
            },
            where: {
                id: Number(id)
            }
        });
        if (!post) return next_response/* default.json */.Z.json({
            error: `Post ${id} not found`
        }, {
            status: 404
        });
        // map the user information to the comments
        const commentsWithUsers = [];
        for (const comment of post.comments){
            const userResponse = await fetch(`${process.env.LOCKR_URL}/api/user?id=${comment.createdBy}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.LOCKR_APPLICATION_SECRET}`
                }
            });
            const userData = await userResponse.json();
            commentsWithUsers.push({
                ...comment,
                user: userData
            });
        }
        post.comments = commentsWithUsers;
        return next_response/* default.json */.Z.json(post);
    }
    const posts = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        orderBy: {
            createdAt: "desc"
        }
    });
    return next_response/* default.json */.Z.json(posts);
}
async function POST(request) {
    const body = await request.json();
    const user = request.headers.get("x-user");
    if (!user) return next_response/* default.json */.Z.json({
        error: "Missing user"
    }, {
        status: 400
    });
    const { isValid , errors  } = validate(body);
    if (!isValid) return next_response/* default.json */.Z.json({
        error: `Invalid ${errors.join(", ")}`
    }, {
        status: 400
    });
    if (!body.id) {
        const createdPost = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
            data: {
                createdBy: user,
                updatedBy: user,
                title: body.title,
                content: body.content,
                image: body.image,
                categories: body.categories
            }
        });
        return next_response/* default.json */.Z.json(createdPost);
    }
    const updatedPost = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        where: {
            id: body.id
        },
        data: {
            updatedBy: user,
            title: body.title,
            content: body.content,
            image: body.image,
            categories: body.categories
        }
    });
    return next_response/* default.json */.Z.json(updatedPost);
}
async function DELETE(request) {
    const { searchParams  } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return next_response/* default.json */.Z.json({
        error: `Missing id`
    }, {
        status: 404
    });
    const deletedPost = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/prisma'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        where: {
            id: Number(id)
        }
    });
    if (!deletedPost) return next_response/* default.json */.Z.json({
        error: `There was a problem deleting post ${id}`
    }, {
        status: 400
    });
    return next_response/* default.json */.Z.json({
        message: `Post ${id} successfully deleted`
    });
}
function validate(body) {
    const errors = [];
    if (!body.title) errors.push("title");
    if (!body.content) errors.push("content");
    if (!body.image) errors.push("image");
    if (!body.categories) errors.push("categories");
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

;// CONCATENATED MODULE: ../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fpost%2Froute&name=app%2Fapi%2Fpost%2Froute&pagePath=private-next-app-dir%2Fapi%2Fpost%2Froute.ts&appDir=%2FUsers%2Fclew%2FDocuments%2Frepos%2Fblog%2Fsrc%2Fapp&appPaths=%2Fapi%2Fpost%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=!

    

    

    

    const routeModule = new (module_default())({
    userland: route_namespaceObject,
    pathname: "/api/post",
    resolvedPagePath: "/Users/clew/Documents/repos/blog/src/app/api/post/route.ts",
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

    const originalPathname = "/api/post/route"

    

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
var __webpack_exports__ = __webpack_require__.X(0, [626,71], () => (__webpack_exec__(5646)));
module.exports = __webpack_exports__;

})();