class SearchResultCreator {
    constructor (youTubeRequest) {
        this.request  = youTubeRequest;
        this.url = this.request.getUrl();
        this.next;
        this.idArray;
        this.flag = false;
        this.number;
    }

    getResponce(model, foo) {
        let url = this.url;
        if (this.next) {
            url = this.url + '&pageToken=' + this.next;
            // console.log (url);
        }

        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.next = data.nextPageToken;
            if (!this.flag) {
                this.number = data.pageInfo.totalResults;
            }
            this.idArray = data.items.map(x => x.id.videoId).join(',');
            // model.createModel(data.pageInfo.resultsPerPage);
            fetch(this.request.getUrlWithID(this.idArray))
            .then(res => res.json())
            .then(data => {
                if (this.flag) {                    
                    model.addNextListItems(data);
                }
                else {
                   // model.addNextListItems(data);
                    model.pushItems(data);
                    this.flag = true;
                    foo();
                }
            });
        });
    }
}


// module.exports = SearchResultCreator;


