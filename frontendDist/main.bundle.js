webpackJsonp([2,4],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 113;


/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LandingComponent = (function () {
    function LandingComponent() {
        this.width = 0;
    }
    LandingComponent.prototype.onResize = function (event) {
        this.width = event.target.innerWidth;
    };
    return LandingComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandingComponent.prototype, "onResize", null);
LandingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-landing',
        template: __webpack_require__(435),
        styles: [__webpack_require__(403)]
    })
], LandingComponent);

//# sourceMappingURL=landing.component.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(342);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__landing_landing_component__ = __webpack_require__(115);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__landing_landing_component__["a" /* LandingComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        styles: [__webpack_require__(402)],
        template: '<app-nav></app-nav><router-outlet></router-outlet>'
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_scrollreveal__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_scrollspy__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_scrollspy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_scrollspy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_page_scroll__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_google_maps_core__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing_module__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nav_nav_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__landing_landing_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__nav_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_12__landing_landing_component__["a" /* LandingComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_9__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_scrollreveal__["a" /* NgsRevealModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6_ng2_scrollspy__["ScrollSpyModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7_ng2_page_scroll__["a" /* Ng2PageScrollModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                apiKey: 'yourapikey'
            }),
            __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__["a" /* AlertModule */].forRoot()
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_13__angular_common__["a" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_13__angular_common__["b" /* HashLocationStrategy */] }],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_scrollspy__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_scrollspy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_scrollspy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll_ng2_page_scroll__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var NavComponent = (function () {
    function NavComponent(scrollSpyService, pageScrollService, document) {
        this.scrollSpyService = scrollSpyService;
        this.pageScrollService = pageScrollService;
        this.document = document;
        this.navScroll = 0;
        this.width = 0;
        this.width = window.innerWidth;
    }
    NavComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scrollSpyService.getObservable('window').subscribe(function (e) {
            _this.navScroll = e.currentTarget.scrollY;
        });
    };
    NavComponent.prototype.onResize = function (event) {
        this.width = event.target.innerWidth;
    };
    NavComponent.prototype.ngOnInit = function () {
    };
    return NavComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NavComponent.prototype, "onResize", null);
NavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-nav',
        template: __webpack_require__(436),
        styles: [__webpack_require__(404)]
    }),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DOCUMENT */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_scrollspy__["ScrollSpyService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_scrollspy__["ScrollSpyService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll_ng2_page_scroll__["b" /* PageScrollService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll_ng2_page_scroll__["b" /* PageScrollService */]) === "function" && _b || Object, Object])
], NavComponent);

var _a, _b;
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)(false);
// imports


// module
exports.push([module.i, "h1 {\n  margin-top: 70px;\n  text-align: center;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 135,
	"./af.js": 135,
	"./ar": 142,
	"./ar-dz": 136,
	"./ar-dz.js": 136,
	"./ar-kw": 137,
	"./ar-kw.js": 137,
	"./ar-ly": 138,
	"./ar-ly.js": 138,
	"./ar-ma": 139,
	"./ar-ma.js": 139,
	"./ar-sa": 140,
	"./ar-sa.js": 140,
	"./ar-tn": 141,
	"./ar-tn.js": 141,
	"./ar.js": 142,
	"./az": 143,
	"./az.js": 143,
	"./be": 144,
	"./be.js": 144,
	"./bg": 145,
	"./bg.js": 145,
	"./bn": 146,
	"./bn.js": 146,
	"./bo": 147,
	"./bo.js": 147,
	"./br": 148,
	"./br.js": 148,
	"./bs": 149,
	"./bs.js": 149,
	"./ca": 150,
	"./ca.js": 150,
	"./cs": 151,
	"./cs.js": 151,
	"./cv": 152,
	"./cv.js": 152,
	"./cy": 153,
	"./cy.js": 153,
	"./da": 154,
	"./da.js": 154,
	"./de": 157,
	"./de-at": 155,
	"./de-at.js": 155,
	"./de-ch": 156,
	"./de-ch.js": 156,
	"./de.js": 157,
	"./dv": 158,
	"./dv.js": 158,
	"./el": 159,
	"./el.js": 159,
	"./en-au": 160,
	"./en-au.js": 160,
	"./en-ca": 161,
	"./en-ca.js": 161,
	"./en-gb": 162,
	"./en-gb.js": 162,
	"./en-ie": 163,
	"./en-ie.js": 163,
	"./en-nz": 164,
	"./en-nz.js": 164,
	"./eo": 165,
	"./eo.js": 165,
	"./es": 167,
	"./es-do": 166,
	"./es-do.js": 166,
	"./es.js": 167,
	"./et": 168,
	"./et.js": 168,
	"./eu": 169,
	"./eu.js": 169,
	"./fa": 170,
	"./fa.js": 170,
	"./fi": 171,
	"./fi.js": 171,
	"./fo": 172,
	"./fo.js": 172,
	"./fr": 175,
	"./fr-ca": 173,
	"./fr-ca.js": 173,
	"./fr-ch": 174,
	"./fr-ch.js": 174,
	"./fr.js": 175,
	"./fy": 176,
	"./fy.js": 176,
	"./gd": 177,
	"./gd.js": 177,
	"./gl": 178,
	"./gl.js": 178,
	"./gom-latn": 179,
	"./gom-latn.js": 179,
	"./he": 180,
	"./he.js": 180,
	"./hi": 181,
	"./hi.js": 181,
	"./hr": 182,
	"./hr.js": 182,
	"./hu": 183,
	"./hu.js": 183,
	"./hy-am": 184,
	"./hy-am.js": 184,
	"./id": 185,
	"./id.js": 185,
	"./is": 186,
	"./is.js": 186,
	"./it": 187,
	"./it.js": 187,
	"./ja": 188,
	"./ja.js": 188,
	"./jv": 189,
	"./jv.js": 189,
	"./ka": 190,
	"./ka.js": 190,
	"./kk": 191,
	"./kk.js": 191,
	"./km": 192,
	"./km.js": 192,
	"./kn": 193,
	"./kn.js": 193,
	"./ko": 194,
	"./ko.js": 194,
	"./ky": 195,
	"./ky.js": 195,
	"./lb": 196,
	"./lb.js": 196,
	"./lo": 197,
	"./lo.js": 197,
	"./lt": 198,
	"./lt.js": 198,
	"./lv": 199,
	"./lv.js": 199,
	"./me": 200,
	"./me.js": 200,
	"./mi": 201,
	"./mi.js": 201,
	"./mk": 202,
	"./mk.js": 202,
	"./ml": 203,
	"./ml.js": 203,
	"./mr": 204,
	"./mr.js": 204,
	"./ms": 206,
	"./ms-my": 205,
	"./ms-my.js": 205,
	"./ms.js": 206,
	"./my": 207,
	"./my.js": 207,
	"./nb": 208,
	"./nb.js": 208,
	"./ne": 209,
	"./ne.js": 209,
	"./nl": 211,
	"./nl-be": 210,
	"./nl-be.js": 210,
	"./nl.js": 211,
	"./nn": 212,
	"./nn.js": 212,
	"./pa-in": 213,
	"./pa-in.js": 213,
	"./pl": 214,
	"./pl.js": 214,
	"./pt": 216,
	"./pt-br": 215,
	"./pt-br.js": 215,
	"./pt.js": 216,
	"./ro": 217,
	"./ro.js": 217,
	"./ru": 218,
	"./ru.js": 218,
	"./sd": 219,
	"./sd.js": 219,
	"./se": 220,
	"./se.js": 220,
	"./si": 221,
	"./si.js": 221,
	"./sk": 222,
	"./sk.js": 222,
	"./sl": 223,
	"./sl.js": 223,
	"./sq": 224,
	"./sq.js": 224,
	"./sr": 226,
	"./sr-cyrl": 225,
	"./sr-cyrl.js": 225,
	"./sr.js": 226,
	"./ss": 227,
	"./ss.js": 227,
	"./sv": 228,
	"./sv.js": 228,
	"./sw": 229,
	"./sw.js": 229,
	"./ta": 230,
	"./ta.js": 230,
	"./te": 231,
	"./te.js": 231,
	"./tet": 232,
	"./tet.js": 232,
	"./th": 233,
	"./th.js": 233,
	"./tl-ph": 234,
	"./tl-ph.js": 234,
	"./tlh": 235,
	"./tlh.js": 235,
	"./tr": 236,
	"./tr.js": 236,
	"./tzl": 237,
	"./tzl.js": 237,
	"./tzm": 239,
	"./tzm-latn": 238,
	"./tzm-latn.js": 238,
	"./tzm.js": 239,
	"./uk": 240,
	"./uk.js": 240,
	"./ur": 241,
	"./ur.js": 241,
	"./uz": 243,
	"./uz-latn": 242,
	"./uz-latn.js": 242,
	"./uz.js": 243,
	"./vi": 244,
	"./vi.js": 244,
	"./x-pseudo": 245,
	"./x-pseudo.js": 245,
	"./yo": 246,
	"./yo.js": 246,
	"./zh-cn": 247,
	"./zh-cn.js": 247,
	"./zh-hk": 248,
	"./zh-hk.js": 248,
	"./zh-tw": 249,
	"./zh-tw.js": 249
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 406;


/***/ }),

/***/ 435:
/***/ (function(module, exports) {

module.exports = "<h1>My first Angular app</h1>"

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

module.exports = "<nav scrollSpy id=\"mainNav\" class=\"navbar navbar-default navbar-fixed-top\" [ngClass]=\"{'affix': navScroll>50}\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed toggle-nav\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n                    <span class=\"sr-only \">Toggle navigation</span> <i class=\"fa fa-bars\"></i>\n                </button>\n            <a class=\"navbar-brand page-scroll\" href=\"javascript:void(0)\">Navigation bar</a>\n        </div>\n\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li>\n                    <a class=\"page-scroll\" href=\"javascript:void(0)\">Test</a>\n                </li>\n            </ul>\n        </div>\n        <!-- /.navbar-collapse -->\n    </div>\n    <!-- /.container-fluid -->\n</nav>"

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(331);


/***/ })

},[479]);
//# sourceMappingURL=main.bundle.js.map