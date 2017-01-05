class mouseMoveHandler{
    constructor() {
        this.startTime;
        this.startPositionX;
        this.timeInterval;
        this.distance;
        // this.moveDirection;
        // this.speed;
    }
    
    setTimeAndPosition(e) {
        this.startTime = performance.now();
        this.startPositionX = e.clientX;
    }

    getTimeAndPosition(e) {
        this.timeInterval = performance.now() - this.startTime;
        this.distance = e.clientX - this.startPositionX;
        // this.moveDirection = (this.distance < 0) ? true : false;
        // this.speed = Math.round(Math.abs(this.distance / this.timeInterval));
    }
}