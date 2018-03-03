function EventObject()
{
    this.listeners = [];
    this.addEventListener = function(event, callback, scope)
    {
        this.listeners.push({event: event, callback: callback, scope: scope});
    }
    
    this.removeEventListener = function(event, callback, scope)
    {
        var index = -1;
        for (var i in this.listeners)
        {
            if (this.listeners[i].event === event && this.listeners[i].callback === callback && this.listeners[i].scope === scope)
            {
                index = i;
            }
        }
        
        if (index != -1)
        {
            this.listeners.splice(i, 1);
        }
    }
    
    this.dispatchEvent = function(event, params)
    {
        if (event == "") return;
        for (var i in this.listeners)
        {
            if (this.listeners[i].event === event)
            {
                this.listeners[i].callback.call(this.listeners[i].scope, params);
            }
        }
    }
}

function Container()
{
    EventObject.call(this);
    
    this.visible = true;
    
    this.x = 0;
    this.y = 0;
    
    this.children = [];
    
    this.addChild = function(child)
    {
        this.children.push(child);
    }
    
    this.removeChild = function(child)
    {
        var index = this.children.indexOf(child);
        if (index != -1)
        {
            this.children.splice(index, 1);
        }
    }
    
    this.update = function(delta)
    {
        for (var i in this.children)
        {
            this.children[i].update(delta);
        }
    }
    
    this.draw = function(ctx)
    {
        if (this.visible === true)
        {
            ctx.save();
            
            ctx.translate(this.x, this.y);
            
            for (var i in this.children)
            {
                this.children[i].draw(ctx);
            }
            
            ctx.restore();
        }
    }
}
Container.prototype = Object.create(EventObject.prototype);

function Sprite(image)
{
    Container.call(this);
    
    this.image = image.image;
    
    this.anchor = {x:0,y:0};
    
    this.draw = function(ctx)
    {
        if (this.visible === true)
        {
            ctx.save();
            
            ctx.translate(this.x, this.y);
            
            ctx.translate(-(this.image.width * this.anchor.x), -(this.image.height * this.anchor.y));
            
            ctx.drawImage(this.image, 0, 0);
            
            for (var i in this.children)
            {
                this.children[i].draw(ctx);
            }
            
            ctx.restore();
        }
    }
}
Sprite.prototype = Object.create(Container.prototype);