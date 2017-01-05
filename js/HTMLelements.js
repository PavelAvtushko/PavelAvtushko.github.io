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
        header.firstChild.innerHTML = 'custom youtube application';
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
    }

    createModel() {
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
        this.maxPages = (value > 4)? 4: value;
        this.pages = Array.from({length: this.maxPages}, (item, index) => {
            item = document.createElement('a');
            item.innerHTML= '<span>' + (index + 1) + '</span>';
            this.pagePanel.appendChild(item);
            return item;
        });
        this.pagePanel.firstChild.className = 'active';
        this.pageItems = Array.from(this.pagePanel.children);
    }

    createListItems() {
        this.listItems = Array.from({length: 15}, (item, index) => {
            item = document.createElement('li');
            item.appendChild(document.createElement('div'));
            this.list.appendChild(item);
            return item;
        });
    }

    pushItems(responce) {
        if (responce.items.length) {
            this.listItems.map((item, index) => {
               // this.fillList(item, responce.items, index)
                item.firstChild.innerHTML += '<h2 class = "title"><a href="https://www.youtube.com/watch?v=' + responce.items[index].id +'">' + responce.items[index].snippet.title + '</a></h2>';
                item.firstChild.innerHTML += '<img class = "preview" src="' + responce.items[index].snippet.thumbnails.medium.url + '">';
                item.firstChild.innerHTML += '<p class = "date">' + 'Date: ' + responce.items[index].snippet.publishedAt.substring(0, 10) + '</p';
                item.firstChild.innerHTML += '<p class = "description">Description:' + responce.items[index].snippet.description + '</p>';
                item.firstChild.innerHTML += '<p class = "views">Views: ' + responce.items[index].statistics.viewCount + '</p>';
                item.firstChild.innerHTML += '<p class = "author">Author: ' + responce.items[index].snippet.channelTitle + '</p>';
            });
        }
        else {
            this.application.classList.add('hidden');
        }
    }

    removeList() {
        this.list.innerHTML = ' ';
        this.application.classList.add('hidden');
        this.createListItems();
    }

    pageUpdate(pageNumber) {
        this.pages.map(elem => elem.classList.remove('active'));
        if (pageNumber <= 1) {
            this.pages[pageNumber].classList.add('active');
            this.pages.map((item, index) => item.innerHTML = '<span>' + (index + 1) + '</span>');
        }
        else {
            this.pages[2].classList.add('active');
            this.pages.map((item, index) => item.innerHTML = '<span>' + (index + pageNumber - 1) + '</span>');
        }
    }

    addNextListItems(responce) {
        if (responce.items.length) {
            for (let index = 0; index < responce.items.length; index++) {
                let item = document.createElement('li');
                item.appendChild(document.createElement('div'));
                item.firstChild.innerHTML += '<h2 class = "title"><a href="https://www.youtube.com/watch?v=' + responce.items[index].id +'">' + responce.items[index].snippet.title + '</a></h2>';
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

    // fillList(elem, arrayData, index) {
    //     elem.innerHTML += '<h2 class = "title"><a href="#">' + arrayData[index].snippet.title + '</a></h2>';
    //     elem.innerHTML += '<img class = "preview" src="' + arrayData[index].snippet.thumbnails.medium.url + '">';
    //     elem.innerHTML += '<p class = "date">' + 'Date: ' + arrayData[index].snippet.publishedAt.substring(0, 10) + '</p';
    //     elem.innerHTML += '<p class = "description">Description:' + arrayData[index].snippet.description + '</p>';
    //     elem.innerHTML += '<p class = "views">Views: ' + arrayData[index].statistics.viewCount + '</p>';
    //     elem.innerHTML += '<p class = "author">Author: ' + arrayData[index].snippet.channelTitle + '</p>';
    // }

    removeHide() {
        this.listItems.map( item => item.classList.remove('hide'));
    }

}


// module.exports = Model;