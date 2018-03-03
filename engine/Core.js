function Core(canvas)
{
    Container.call(this);
    
    var canvas = canvas;
    var ctx = canvas.getContext("2d");
    
    var lastUpdateTime = new Date().valueOf();
    this.updateLoop = function()
    {
        var updateTime = new Date().valueOf();
        var delta = updateTime - lastUpdateTime;
        
        this.update(delta);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(ctx);
        
        lastUpdateTime = updateTime;
        
        window.requestAnimationFrame(this.updateLoop.bind(this));
    }
    
    this.updateLoop();
}
Core.prototype = Object.create(Container.prototype);