// const Model  = require('../js/HTMLelements.js');
// const mouseMoveHandler  = require('../js/mouseMoveHandler.js');
// const SearchResultCreator = require('../js/Request.js');
// const YouTubeURLCreator = require('../js/YouTubeURLCreator.js');
// const Pages = require('../js/PageManager.js');

class Application {
    search(model, pageManager) {
        model.removeList();
        if (model.input.value) {
            videoRequest = new YouTubeURLCreator(HOST, API_KEY, 'video', 'snippet', NUMBER_OF_ITEMS, model.input.value);
            result = new SearchResultCreator(videoRequest);
            result.getResponce(model, showData);
            function showData() {
                model.pageUpdate(0);
                pageManager.reset();
                model.list.style.left = 0;
                model.application.classList.remove('hidden');
            }
            this.scaleChange(model, pageManager);
        }
        else {
            model.application.classList.add('hidden');
        }
    }

    scaleChange(model, pageManager) {
        if (screen.width > 480 && model.application.clientWidth > 960) {
            pageManager.setElementsOnPage(3, model);
        }  
        else if (screen.width > 480 && model.application.clientWidth <= 960 && model.application.clientWidth > 640) {
            pageManager.setElementsOnPage(2, model);
        }
        else {
            pageManager.setElementsOnPage(1, model);
        }  
        model.listItems.map( x => x.style.width = pageManager.setELementsWidth(model));
        model.list.style.left = pageManager.setLeftPosition();
        model.pageUpdate(pageManager.currentPage);
        model.removeHide();
    }

    moveList(e, mouseListener,  model, pageManager) {
        mouseListener.getTimeAndPosition(e);
        if (mouseListener.distance < -30) {
            this.addResponce(pageManager, model, result);
            pageManager.currentPage++;
        }
        else if (mouseListener.distance > 30 && pageManager.currentPage > 0) {
            pageManager.currentPage--;      
        }
        pageManager.setLeftElement();
        model.list.style.left = pageManager.setLeftPosition();
        model.pageUpdate(pageManager.currentPage); 
    }

    pageMove(e, model, pageManager, result) {
        this.addResponce(pageManager, model, result);
        pageManager.setCurrentPage(+e.target.innerHTML - 1);
        model.pageUpdate(pageManager.currentPage);  
        model.list.style.left = pageManager.setLeftPosition();    
    }

    addResponce(pageManager, model, result) {
        if (pageManager.currentPage > (pageManager.totalPages - 5)) {
            pageManager.numberOfElements = pageManager.numberOfElements + NUMBER_OF_ITEMS;
            pageManager.setELementsWidth(model);
            result.getResponce(model);
        }
        this.scaleChange(model, pageManager);
    }
}

const NUMBER_OF_ITEMS = 15;
const MOUSE_SWAP  = new mouseMoveHandler();
const MODEL = new Model();
const HOST = 'https://www.googleapis.com/youtube/v3/';
const API_KEY = 'AIzaSyB7Iq0eCr1P99JqhAIJKzYPm-xt8uEU14k';
const PAGE_MANAGER = new Pages(NUMBER_OF_ITEMS);
let videoRequest;
let result;
MODEL.createHeader();
MODEL.createModel();

const main = new Application();

// function search(model, pageManager) {
//     model.removeList();
//     if (model.input.value) {
//         videoRequest = new YouTubeURLCreator(HOST, API_KEY, 'video', 'snippet', NUMBER_OF_ITEMS, model.input.value);
//         result = new SearchResultCreator(videoRequest);
//         result.getResponce(model, showData);
//        function showData() {
//             model.pageUpdate(0);
//             pageManager.reset();
//             model.list.style.left = 0;
//             scaleChange(model, pageManager);
//             model.application.classList.remove('hidden');
//         }
//     }
//     else {
//         model.application.classList.add('hidden');
//     }
// }

// function scaleChange(model, pageManager) {
//     if (screen.width > 480 && model.application.clientWidth > 960) {
//         pageManager.setElementsOnPage(3, model);
//     }  
//     else if (screen.width > 480 && model.application.clientWidth <= 960 && model.application.clientWidth > 640) {
//         pageManager.setElementsOnPage(2, model);
//     }
//     else {
//         pageManager.setElementsOnPage(1, model);
//     }  
//     model.listItems.map( x => x.style.width = pageManager.setELementsWidth(model));
//     model.list.style.left = pageManager.setLeftPosition();
//     model.pageUpdate(pageManager.currentPage);
//     model.removeHide();
// }

// function moveList(e, mouseListener,  model, pageManager) {
//     mouseListener.getTimeAndPosition(e);
//     if (mouseListener.distance < -30) {
//         addResponce(pageManager, model, result);
//         pageManager.currentPage++;
//     }
//     else if (mouseListener.distance > 30 && pageManager.currentPage > 0) {
//         pageManager.currentPage--;      
//     }
//     pageManager.setLeftElement();
//     model.list.style.left = pageManager.setLeftPosition();
//     model.pageUpdate(pageManager.currentPage); 
// }

// function pageMove(e, model, pageManager, result) {
//     addResponce(pageManager, model, result);
//     pageManager.setCurrentPage(+e.target.innerHTML - 1);
//     model.pageUpdate(pageManager.currentPage);  
//     model.list.style.left = pageManager.setLeftPosition();    
// }

// function addResponce(pageManager, model, result) {
//     if (pageManager.currentPage > (pageManager.totalPages - 5)) {
//         pageManager.numberOfElements = pageManager.numberOfElements + NUMBER_OF_ITEMS;
//         pageManager.setELementsWidth(model);
//         result.getResponce(model);
//     }
//     scaleChange(model, pageManager);
// }

window.onkeydown = (e) => {
    (e.keyCode === 13) ? main.search(MODEL, PAGE_MANAGER): null;
};

window.onresize = () => {
    main.scaleChange(MODEL, PAGE_MANAGER);
}

window.onload = () => {
    MODEL.search.addEventListener('click', () => main.search(MODEL, PAGE_MANAGER));

    MODEL.list.addEventListener('mousedown', (e) => {
        MOUSE_SWAP.setTimeAndPosition(e);
    })

    MODEL.list.addEventListener('mouseup', (e) => main.moveList(e, MOUSE_SWAP,  MODEL, PAGE_MANAGER));

    MODEL.pagePanel.addEventListener('click', (e) => main.pageMove(e, MODEL, PAGE_MANAGER, result));
}

