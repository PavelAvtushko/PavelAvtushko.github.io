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

	const mouseMoveHandler = __webpack_require__(1);
	const main = __webpack_require__(2);
	const MOUSE_SWAP = new mouseMoveHandler();

	window.onkeydown = e => {
	    e.keyCode === 13 ? main.search() : null;
	};

	window.onresize = () => {
	    main.scaleChange();
	};

	window.onload = () => {
	    main.model.search.addEventListener('click', () => main.search());

	    main.model.list.addEventListener('mousedown', e => {
	        e.preventDefault();
	        MOUSE_SWAP.setTimeAndPosition(e);
	    });

	    main.model.list.addEventListener('mouseup', e => {
	        e.preventDefault();
	        main.moveList(e, MOUSE_SWAP);
	        MOUSE_SWAP.reset();
	    });

	    main.model.pagePanel.addEventListener('click', e => main.pageMove(e));

	    main.model.list.addEventListener('touchstart', e => {
	        MOUSE_SWAP.setTimeAndPosition(e);
	    });

	    main.model.list.addEventListener('touchend', e => {
	        main.moveList(e, MOUSE_SWAP);
	        MOUSE_SWAP.reset();
	    });
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	class mouseMoveHandler {
	    constructor() {
	        this.startTime;
	        this.startPositionX;
	        this.timeInterval;
	        this.distance;
	    }

	    setTimeAndPosition(e) {
	        this.startTime = performance.now();
	        this.startPositionX = null;
	        if (e.type === 'mousedown') {
	            this.startPositionX = e.clientX;
	        } else if (e.type === 'touchstart') {
	            this.startPositionX = e.touches[0].pageX;
	        }
	    }

	    getTimeAndPosition(e) {
	        this.timeInterval = performance.now() - this.startTime;
	        if (e.type === 'mouseup') {
	            this.distance = e.clientX - this.startPositionX;
	        } else if (e.type === 'touchend') {
	            this.distance = e.changedTouches[0].pageX - this.startPositionX;
	        }
	    }

	    reset() {
	        this.startPositionX = null;
	        this.distance = null;
	    }
	}

	module.exports = mouseMoveHandler;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const YouTubeURLCreator = __webpack_require__(3);
	const SearchResultCreator = __webpack_require__(4);
	const Model = __webpack_require__(5);
	const Pages = __webpack_require__(6);
	const HOST = 'https://www.googleapis.com/youtube/v3/';
	const API_KEY = 'AIzaSyB7Iq0eCr1P99JqhAIJKzYPm-xt8uEU14k';
	const NUMBER_OF_ITEMS = 15;
	const MODEL = new Model();
	const PAGE_MANAGER = new Pages(NUMBER_OF_ITEMS);

	class Application {
	    constructor(model, pageManager) {
	        this.model = model;
	        this.pageManager = pageManager;
	        this.pages;
	        this.result;
	        this.videoRequest;
	    }

	    search() {
	        this.model.removeList();
	        if (this.model.input.value) {
	            this.videoRequest = new YouTubeURLCreator(HOST, API_KEY, 'video', 'snippet', 15, this.model.input.value);
	            this.result = new SearchResultCreator(this.videoRequest);
	            this.result.getResponce(this);
	        } else {
	            this.model.application.classList.add('hidden');
	        }
	    }

	    showData() {
	        this.model.pageUpdate(0);
	        this.pageManager.reset();
	        this.model.list.style.left = 0;
	        this.model.application.classList.remove('hidden');
	    }

	    scaleChange() {
	        if (screen.width > 480 && this.model.application.clientWidth > 960) {
	            this.pageManager.setElementsOnPage(3, this.model);
	        } else if (screen.width > 480 && this.model.application.clientWidth <= 960 && this.model.application.clientWidth > 640) {
	            this.pageManager.setElementsOnPage(2, this.model);
	        } else {
	            this.pageManager.setElementsOnPage(1, this.model);
	        }
	        this.model.listItems.map(x => x.style.width = this.pageManager.setELementsWidth(this.model));
	        this.model.list.style.left = this.pageManager.setLeftPosition();
	        this.model.pageUpdate(this.pageManager.currentPage);
	        this.model.removeHide();
	    }

	    moveList(e, mouseListener) {
	        mouseListener.getTimeAndPosition(e);
	        if (mouseListener.distance < -30) {
	            this.addResponce(this.result);
	            this.pageManager.currentPage++;
	        } else if (mouseListener.distance > 30 && this.pageManager.currentPage > 0) {
	            this.pageManager.currentPage--;
	        }
	        this.pageManager.setLeftElement();
	        this.model.list.style.left = this.pageManager.setLeftPosition();
	        this.model.pageUpdate(this.pageManager.currentPage);
	    }

	    pageMove(e) {
	        this.addResponce(this.result);
	        this.pageManager.setCurrentPage(+e.target.innerHTML - 1);
	        this.model.pageUpdate(this.pageManager.currentPage);
	        this.model.list.style.left = this.pageManager.setLeftPosition();
	    }

	    addResponce() {
	        if (this.pageManager.currentPage > this.pageManager.totalPages - 5) {
	            this.pageManager.numberOfElements = this.pageManager.numberOfElements + 15;
	            this.pageManager.setELementsWidth(this.model);
	            this.result.getResponce(this);
	        }
	    }
	}

	const main = new Application(MODEL, PAGE_MANAGER);
	MODEL.createHeader();
	module.exports = main;

/***/ },
/* 3 */
/***/ function(module, exports) {

	class YouTubeURLCreator {
	    constructor(serverURL, key, type, part, maxResults, q) {
	        this.serverURL = serverURL;
	        this.key = '?key=' + key;
	        this.type = type ? '&type=' + type : '';
	        this.part = '&part=' + part;
	        this.maxResults = maxResults ? '&maxResults=' + maxResults : '';
	        this.q = q ? '&q=' + encodeURIComponent(q) : '';
	        this.baseURL;
	    }

	    getUrl() {
	        this.baseURL = this.serverURL + 'search/' + this.key + this.type + this.part + this.maxResults + this.q;
	        return this.baseURL;
	    }
	    getUrlWithID(idArray) {
	        return this.serverURL + 'videos/' + this.key + '&id=' + idArray + this.part + ',statistics';
	    }
	}

	module.exports = YouTubeURLCreator;

/***/ },
/* 4 */
/***/ function(module, exports) {

	class SearchResultCreator {
	    constructor(youTubeRequest) {
	        this.request = youTubeRequest;
	        this.url = this.request.getUrl();
	        this.next;
	        this.idArray;
	        this.flag = false;
	        this.number;
	    }

	    getResponce(obj) {
	        let url = this.url;
	        if (this.next) {
	            url = this.url + '&pageToken=' + this.next;
	        }

	        fetch(url).then(res => res.json()).then(data => {
	            this.next = data.nextPageToken;
	            if (!this.flag) {
	                this.number = data.pageInfo.totalResults;
	            }
	            this.idArray = data.items.map(x => x.id.videoId).join(',');
	            fetch(this.request.getUrlWithID(this.idArray)).then(res => res.json()).then(data => {
	                if (!data.items.length) {
	                    return;
	                }

	                obj.model.addNextListItems(data);

	                if (this.flag) {
	                    obj.model.application.classList.remove('hidden');
	                } else {
	                    this.flag = true;
	                    obj.showData();
	                }

	                obj.scaleChange();
	            });
	        });
	    }
	}

	module.exports = SearchResultCreator;

/***/ },
/* 5 */
/***/ function(module, exports) {

	class Model {
	    constructor() {
	        this.maxPages;
	        this.wrapper;
	        this.application;
	        this.pagePanel;
	        this.pages; //array of pages
	        this.list;
	        this.search; //search button
	        this.input; //input field
	        this.listItems = []; //array of items 
	    }

	    createHeader() {
	        this.wrapper = document.createElement('div');
	        let header = document.createElement('header');
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
	        this.createPages(4);
	    }

	    createListContainer() {
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

	    createPages(value) {
	        this.maxPages = value > 4 ? 4 : value;
	        this.pages = Array.from({ length: this.maxPages }, (item, index) => {
	            item = document.createElement('a');
	            item.innerHTML = '<span>' + (index + 1) + '</span>';
	            this.pagePanel.appendChild(item);
	            return item;
	        });
	        this.pagePanel.firstChild.className = 'active';
	        this.pageItems = Array.from(this.pagePanel.children);
	    }

	    removeList() {
	        this.list.innerHTML = ' ';
	        this.application.classList.add('hidden');
	    }

	    pageUpdate(pageNumber) {
	        this.pages.map(elem => elem.classList.remove('active'));
	        if (pageNumber <= 1) {
	            this.pages[pageNumber].classList.add('active');
	            this.pages.map((item, index) => item.innerHTML = '<span>' + (index + 1) + '</span>');
	        } else {
	            this.pages[2].classList.add('active');
	            this.pages.map((item, index) => item.innerHTML = '<span>' + (index + pageNumber - 1) + '</span>');
	        }
	    }

	    addNextListItems(responce) {
	        if (responce.items.length) {
	            for (let index = 0; index < responce.items.length; index++) {
	                let item = document.createElement('li');
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
	    }

	    removeHide() {
	        this.listItems.map(item => item.classList.remove('hide'));
	    }

	}

	module.exports = Model;

/***/ },
/* 6 */
/***/ function(module, exports) {

	class Pages {
	    constructor(numberOfElements) {
	        this.numberOfElements = numberOfElements;
	        this.maxNumber = numberOfElements;
	        this.elementsOnPage = 1;
	        this.leftPosition = 0;
	        this.currentPage = 0;
	        this.leftElement = 0;
	        this.pageWidth;
	        this.totalPages;
	    }

	    updatePageWidth(model) {
	        this.totalPages = Math.round(this.numberOfElements / this.elementsOnPage);
	        this.pageWidth = model.application.clientWidth;
	        this.currentPage = Math.trunc(this.leftElement / this.elementsOnPage);
	        this.setLeftElement();
	    }

	    setElementsOnPage(value, model) {
	        this.elementsOnPage = value;
	        this.updatePageWidth(model);
	    }

	    setELementsWidth(model) {
	        model.list.style.width = 2 * model.application.clientWidth * this.totalPages + 'px';
	        return this.pageWidth / this.elementsOnPage + 'px';
	    }

	    setLeftPosition() {
	        this.leftPosition = -this.pageWidth * this.currentPage;
	        return this.leftPosition + 'px';
	    }

	    setLeftElement() {
	        this.leftElement = this.currentPage * this.elementsOnPage;
	        return this.leftElement;
	    }
	    setCurrentPage(value) {
	        if (value >= 0) {
	            this.currentPage = value;
	            this.setLeftElement();
	        }
	    }

	    reset() {
	        this.numberOfElements = this.maxNumber;
	        this.totalPages = Math.round(this.numberOfElements / this.elementsOnPage);
	        this.setCurrentPage(0);
	    }
	}

	module.exports = Pages;

/***/ }
/******/ ]);