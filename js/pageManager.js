class Pages {
    constructor(numberOfElements){
        this.numberOfElements = numberOfElements;
        this.maxNumber  = numberOfElements;
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
        return  this.pageWidth / this.elementsOnPage + 'px'
    }

    setLeftPosition() {
        this.leftPosition = - this.pageWidth * this.currentPage;
        return this.leftPosition + 'px';
    }
    setLeftElement(){
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

// module.exports = Pages;