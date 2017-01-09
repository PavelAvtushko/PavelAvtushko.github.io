/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mouseMoveHandler = __webpack_require__(1);
	var main = __webpack_require__(2);
	var MOUSE_SWAP = new mouseMoveHandler();

	window.onkeydown = function (e) {
	    e.keyCode === 13 ? main.search() : null;
	};

	window.onresize = function () {
	    main.scaleChange();
	};

	window.onload = function () {

	    main.model.search.addEventListener('click', function () {
	        return main.search();
	    });

	    main.model.list.addEventListener('mousedown', function (e) {
	        e.preventDefault();
	        MOUSE_SWAP.setTimeAndPosition(e);
	    });

	    main.model.list.addEventListener('mouseup', function (e) {
	        e.preventDefault();
	        main.moveList(e, MOUSE_SWAP);
	        MOUSE_SWAP.reset();
	    });

	    main.model.pagePanel.addEventListener('click', function (e) {
	        return main.pageMove(e);
	    });

	    main.model.list.addEventListener('touchstart', function (e) {
	        MOUSE_SWAP.setTimeAndPosition(e);
	    });

	    main.model.list.addEventListener('touchend', function (e) {
	        main.moveList(e, MOUSE_SWAP);
	        MOUSE_SWAP.reset();
	    });
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var mouseMoveHandler = function () {
	    function mouseMoveHandler() {
	        _classCallCheck(this, mouseMoveHandler);

	        this.startTime;
	        this.startPositionX;
	        this.timeInterval;
	        this.distance;
	    }

	    _createClass(mouseMoveHandler, [{
	        key: 'setTimeAndPosition',
	        value: function setTimeAndPosition(e) {
	            this.startTime = performance.now();
	            this.startPositionX = null;
	            if (e.type === 'mousedown') {
	                this.startPositionX = e.clientX;
	            } else if (e.type === 'touchstart') {
	                this.startPositionX = e.touches[0].pageX;
	            }
	        }
	    }, {
	        key: 'getTimeAndPosition',
	        value: function getTimeAndPosition(e) {
	            this.timeInterval = performance.now() - this.startTime;
	            if (e.type === 'mouseup') {
	                this.distance = e.clientX - this.startPositionX;
	            } else if (e.type === 'touchend') {
	                this.distance = e.changedTouches[0].pageX - this.startPositionX;
	            }
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.startPositionX = null;
	            this.distance = null;
	        }
	    }]);

	    return mouseMoveHandler;
	}();

	module.exports = mouseMoveHandler;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var YouTubeURLCreator = __webpack_require__(3);
	var SearchResultCreator = __webpack_require__(4);
	var Model = __webpack_require__(5);
	var Pages = __webpack_require__(6);
	var HOST = 'https://www.googleapis.com/youtube/v3/';
	var API_KEY = 'AIzaSyB7Iq0eCr1P99JqhAIJKzYPm-xt8uEU14k';
	var NUMBER_OF_ITEMS = 15;
	var MODEL = new Model();
	var PAGE_MANAGER = new Pages(NUMBER_OF_ITEMS);

	var Application = function () {
	    function Application(model, pageManager) {
	        _classCallCheck(this, Application);

	        this.model = model;
	        this.pageManager = pageManager;
	        this.pages;
	        this.result;
	        this.videoRequest;
	    }

	    _createClass(Application, [{
	        key: 'search',
	        value: function search() {
	            this.model.removeList();
	            if (this.model.input.value) {
	                this.videoRequest = new YouTubeURLCreator(HOST, API_KEY, 'video', 'snippet', 15, this.model.input.value);
	                this.result = new SearchResultCreator(this.videoRequest);
	                this.result.getResponce(this);
	            } else {
	                this.model.application.classList.add('hidden');
	            }
	        }
	    }, {
	        key: 'showData',
	        value: function showData() {
	            this.pageManager.reset();
	            this.model.list.style.left = 0;
	            this.model.application.classList.remove('hidden');
	        }
	    }, {
	        key: 'scaleChange',
	        value: function scaleChange() {
	            var _this = this;

	            if (screen.width > 480 && this.model.application.clientWidth > 960) {
	                this.pageManager.setElementsOnPage(3, this.model);
	            } else if (screen.width > 480 && this.model.application.clientWidth <= 960 && this.model.application.clientWidth > 640) {
	                this.pageManager.setElementsOnPage(2, this.model);
	            } else {
	                this.pageManager.setElementsOnPage(1, this.model);
	            }
	            this.model.listItems.map(function (x) {
	                return x.style.width = _this.pageManager.setELementsWidth(_this.model);
	            });
	            this.model.list.style.left = this.pageManager.setLeftPosition();
	            this.model.pageUpdate(this.pageManager.currentPage);
	            this.model.removeHide();
	        }
	    }, {
	        key: 'getElementsOnPage',
	        value: function getElementsOnPage() {
	            if (screen.width > 480 && this.model.application.clientWidth > 960) {
	                return 3;
	            } else if (screen.width > 480 && this.model.application.clientWidth <= 960 && this.model.application.clientWidth > 640) {
	                return 2;
	            } else {
	                return 1;
	            }
	        }
	    }, {
	        key: 'moveList',
	        value: function moveList(e, mouseListener) {
	            mouseListener.getTimeAndPosition(e);
	            if (mouseListener.distance < -30 && (this.pageManager.currentPage + 1) * this.getElementsOnPage() < this.result.number) {
	                this.addResponce();
	                this.pageManager.currentPage++;
	            } else if (mouseListener.distance > 30 && this.pageManager.currentPage > 0) {
	                this.pageManager.currentPage--;
	            }
	            this.pageManager.setLeftElement();
	            this.model.list.style.left = this.pageManager.setLeftPosition();
	            this.model.pageUpdate(this.pageManager.currentPage);
	        }
	    }, {
	        key: 'pageMove',
	        value: function pageMove(e) {
	            if (e.target.innerHTML > Math.ceil(main.result.number / main.getElementsOnPage())) {
	                e.target.innerHTML = '-N-';
	                return;
	            }
	            this.addResponce();
	            this.pageManager.setCurrentPage(+e.target.innerHTML - 1);
	            this.model.pageUpdate(this.pageManager.currentPage);
	            this.model.list.style.left = this.pageManager.setLeftPosition();
	        }
	    }, {
	        key: 'addResponce',
	        value: function addResponce() {
	            if (this.pageManager.currentPage > this.pageManager.totalPages - 3) {
	                this.pageManager.setELementsWidth(this.model);
	                this.result.getResponce(this);
	                this.pageManager.numberOfElements = this.pageManager.numberOfElements + 15;
	            }
	        }
	    }]);

	    return Application;
	}();

	var main = new Application(MODEL, PAGE_MANAGER);
	MODEL.createHeader();
	module.exports = main;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var YouTubeURLCreator = function () {
	    function YouTubeURLCreator(serverURL, key, type, part, maxResults, q) {
	        _classCallCheck(this, YouTubeURLCreator);

	        this.serverURL = serverURL;
	        this.key = '?key=' + key;
	        this.type = type ? '&type=' + type : '';
	        this.part = '&part=' + part;
	        this.maxResults = maxResults ? '&maxResults=' + maxResults : '';
	        this.q = q ? '&q=' + encodeURIComponent(q) : '';
	        this.baseURL;
	    }

	    _createClass(YouTubeURLCreator, [{
	        key: 'getUrl',
	        value: function getUrl() {
	            this.baseURL = this.serverURL + 'search/' + this.key + this.type + this.part + this.maxResults + this.q;
	            return this.baseURL;
	        }
	    }, {
	        key: 'getUrlWithID',
	        value: function getUrlWithID(idArray) {
	            return this.serverURL + 'videos/' + this.key + '&id=' + idArray + this.part + ',statistics';
	        }
	    }]);

	    return YouTubeURLCreator;
	}();

	module.exports = YouTubeURLCreator;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SearchResultCreator = function () {
	    function SearchResultCreator(youTubeRequest) {
	        _classCallCheck(this, SearchResultCreator);

	        this.request = youTubeRequest;
	        this.url = this.request.getUrl();
	        this.next;
	        this.idArray;
	        this.flag = false;
	        this.number;
	    }

	    _createClass(SearchResultCreator, [{
	        key: 'getResponce',
	        value: function getResponce(obj) {
	            var _this = this;

	            var url = this.url;
	            if (this.next) {
	                url = this.url + '&pageToken=' + this.next;
	            }

	            fetch(url).then(function (res) {
	                return res.json();
	            }).then(function (data) {
	                _this.next = data.nextPageToken;
	                if (!_this.flag) {
	                    _this.number = data.pageInfo.totalResults;
	                }
	                _this.idArray = data.items.map(function (x) {
	                    return x.id.videoId;
	                }).join(',');
	                if (!_this.idArray.length) {
	                    obj.model.message();
	                }
	                fetch(_this.request.getUrlWithID(_this.idArray)).then(function (res) {
	                    return res.json();
	                }).then(function (data) {
	                    if (!data.items.length) {
	                        return;
	                    }

	                    obj.model.addNextListItems(data);

	                    if (_this.flag) {
	                        obj.model.application.classList.remove('hidden');
	                    } else {
	                        _this.flag = true;
	                        obj.model.createPages(_this.number);
	                        obj.showData();
	                    }
	                    obj.scaleChange();
	                });
	            });
	        }
	    }]);

	    return SearchResultCreator;
	}();

	module.exports = SearchResultCreator;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	    function Model() {
	        _classCallCheck(this, Model);

	        this.maxPages;
	        this.wrapper;
	        this.application;
	        this.pagePanel;
	        this.pages;
	        this.list;
	        this.search;
	        this.input;
	        this.listItems = [];
	    }

	    _createClass(Model, [{
	        key: 'createHeader',
	        value: function createHeader() {
	            this.wrapper = document.createElement('div');
	            var header = document.createElement('header');
	            document.body.appendChild(this.wrapper);
	            this.wrapper.appendChild(header);
	            header.appendChild(document.createElement('h1'));
	            header.appendChild(document.createElement('input'));
	            header.appendChild(document.createElement('input'));
	            header.firstChild.innerHTML = '<a href="https://www.youtube.com"><i class="fa fa-youtube fa-stack fa-lg" aria-hidden="true"></i></a>custom youtube application';
	            this.input = header.children[1];
	            this.search = header.children[2];
	            this.input.setAttribute('type', 'text');
	            this.input.setAttribute('id', 'inputAria');
	            this.input.setAttribute('placeholder', 'enter request...');
	            this.input.className = 'wrapper';
	            this.search.setAttribute('type', 'button');
	            this.search.setAttribute('id', 'searchButton');
	            this.search.setAttribute('value', 'search');
	            this.wrapper.className = 'wrapper';
	            this.createListContainer();
	        }
	    }, {
	        key: 'createListContainer',
	        value: function createListContainer() {
	            this.application = document.createElement('div');
	            this.application.classList.add('hidden');
	            this.list = document.createElement('ul');
	            this.pagePanel = document.createElement('div');
	            this.application.appendChild(document.createElement('div'));
	            this.application.className = 'application';
	            this.pagePanel.className = 'application-pages';
	            this.application.firstChild.className = 'carousel';
	            this.list.className = 'clearfix';
	            this.application.firstChild.appendChild(this.list);
	            this.wrapper.appendChild(this.application);
	            this.application.classList.add('hidden');
	            this.application.appendChild(this.pagePanel);
	        }
	    }, {
	        key: 'createPages',
	        value: function createPages(totalValue) {
	            var _this = this;

	            this.maxPages = totalValue > 4 ? 4 : totalValue;
	            this.pages = Array.from({ length: this.maxPages }, function (item, index) {
	                item = document.createElement('a');
	                item.innerHTML = '<span>' + (index + 1) + '</span>';
	                _this.pagePanel.appendChild(item);
	                return item;
	            });
	            this.pagePanel.firstChild.className = 'active';
	            this.pageItems = Array.from(this.pagePanel.children);
	        }
	    }, {
	        key: 'removeList',
	        value: function removeList() {
	            this.list.innerHTML = ' ';
	            this.pagePanel.innerHTML = ' ';
	            this.application.classList.add('hidden');
	        }
	    }, {
	        key: 'pageUpdate',
	        value: function pageUpdate(pageNumber) {
	            if (!this.pages) {
	                return;
	            }
	            if (this.pages.length) {
	                this.pages.map(function (elem) {
	                    return elem.classList.remove('active');
	                });
	            }
	            if (pageNumber <= 1) {
	                this.pages[pageNumber].classList.add('active');
	                this.pages.map(function (item, index) {
	                    return item.innerHTML = '<span>' + (index + 1) + '</span>';
	                });
	            } else {
	                this.pages[2].classList.add('active');
	                this.pages.map(function (item, index) {
	                    return item.innerHTML = '<span>' + (index + pageNumber - 1) + '</span>';
	                });
	            }
	        }
	    }, {
	        key: 'addNextListItems',
	        value: function addNextListItems(responce) {
	            for (var index = 0; index < responce.items.length; index++) {
	                var item = document.createElement('li');
	                item.appendChild(document.createElement('div'));
	                item.firstChild.innerHTML += '<h2 class = "title"></h2>';
	                item.firstChild.firstChild.innerHTML += '<a href="https://www.youtube.com/watch?v=' + responce.items[index].id + '">' + responce.items[index].snippet.title + '</a>';
	                item.firstChild.innerHTML += '<img class = "preview" src="' + responce.items[index].snippet.thumbnails.medium.url + '">';
	                item.firstChild.innerHTML += '<p class = "date">' + 'Date ' + responce.items[index].snippet.publishedAt.substring(0, 10) + '</p';
	                item.firstChild.innerHTML += '<p class = "description">DESCRIPTION ' + responce.items[index].snippet.description + '</p>';
	                item.firstChild.innerHTML += '<p class = "views">Views: ' + responce.items[index].statistics.viewCount + '</p>';
	                item.firstChild.innerHTML += '<p class = "author">Author: ' + responce.items[index].snippet.channelTitle + '</p>';
	                item.classList.add('hide');
	                this.listItems.push(item);
	                this.list.appendChild(item);
	            }
	        }
	    }, {
	        key: 'message',
	        value: function message() {
	            this.list.innerHTML = '<li><span class = "warning">Nothing is found! Please, try again...</span></li>';
	            this.application.classList.remove('hidden');
	        }
	    }, {
	        key: 'removeHide',
	        value: function removeHide() {
	            this.listItems.map(function (item) {
	                return item.classList.remove('hide');
	            });
	        }
	    }]);

	    return Model;
	}();

	module.exports = Model;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pages = function () {
	    function Pages(numberOfElements) {
	        _classCallCheck(this, Pages);

	        this.numberOfElements = numberOfElements;
	        this.maxNumber = numberOfElements;
	        this.elementsOnPage = 1;
	        this.leftPosition = 0;
	        this.currentPage = 0;
	        this.leftElement = 0;
	        this.pageWidth;
	        this.totalPages;
	    }

	    _createClass(Pages, [{
	        key: 'updatePageWidth',
	        value: function updatePageWidth(model) {
	            this.totalPages = Math.round(this.numberOfElements / this.elementsOnPage);
	            this.pageWidth = model.application.clientWidth;
	            this.currentPage = Math.trunc(this.leftElement / this.elementsOnPage);
	            this.setLeftElement();
	        }
	    }, {
	        key: 'setElementsOnPage',
	        value: function setElementsOnPage(value, model) {
	            this.elementsOnPage = value;
	            this.updatePageWidth(model);
	        }
	    }, {
	        key: 'setELementsWidth',
	        value: function setELementsWidth(model) {
	            model.list.style.width = 2 * model.application.clientWidth * this.totalPages + 'px';
	            return this.pageWidth / this.elementsOnPage + 'px';
	        }
	    }, {
	        key: 'setLeftPosition',
	        value: function setLeftPosition() {
	            this.leftPosition = -this.pageWidth * this.currentPage;
	            return this.leftPosition + 'px';
	        }
	    }, {
	        key: 'setLeftElement',
	        value: function setLeftElement() {
	            this.leftElement = this.currentPage * this.elementsOnPage;
	            return this.leftElement;
	        }
	    }, {
	        key: 'setCurrentPage',
	        value: function setCurrentPage(value) {
	            if (value >= 0) {
	                this.currentPage = value;
	                this.setLeftElement();
	            }
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.numberOfElements = this.maxNumber;
	            this.totalPages = Math.round(this.numberOfElements / this.elementsOnPage);
	            this.setCurrentPage(0);
	        }
	    }]);

	    return Pages;
	}();

	module.exports = Pages;

/***/ }
/******/ ]);