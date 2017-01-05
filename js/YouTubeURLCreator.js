class YouTubeURLCreator {
    constructor (serverURL, key, type, part, maxResults, q) {
        this.serverURL = serverURL;
        this.key = '?key=' + key;
        this.type = type ? '&type=' + type : '';
        this.part = '&part=' + part;
        this.maxResults = maxResults ? '&maxResults=' + maxResults: '';
        this.q = q ? '&q=' + encodeURIComponent(q): '';
        this.baseURL;
    }

    getUrl() {
        this.baseURL = this.serverURL + 'search/' +  this.key +  this.type + this.part + this.maxResults + this.q;
        return this.baseURL;
    }
    getUrlWithID(idArray) {
        return this.serverURL + 'videos/' + this.key + '&id=' +  idArray + this.part + ',statistics';
    }
}

// module.exports = YouTubeURLCreator;
