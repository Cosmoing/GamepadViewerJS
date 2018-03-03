var resources;

function ImageLoader()
{
    EventObject.call(this);
    
    var images = [];
    
    this.addImage = function(name, path)
    {
        images.push({name: name, image: null, path: path});
    }
    
    var imagesLoaded = 0;
    this.load = function()
    {
        imagesLoaded = 0;
        
        for (var i in images)
        {
            var img = new Image();
            img.onload = this.onImageLoaded.bind(this);
            img.src = images[i].path;
            img.__id = i;
        }
    }
    
    this.onImageLoaded = function(e)
    {   
        var object = images[e.target.__id];
        object.image = e.target;
        
        imagesLoaded++;
        if (imagesLoaded === images.length)
        {
            resources = images;
            this.dispatchEvent("allloaded", images);
        }
    }
    
    this.getImage = function(name)
    {
        for (var i in images)
        {
            if (images[i].name == name)
            {
                return images[i];
            }
        }
        
        return null;
    }
}
ImageLoader.prototype = Object.create(EventObject.prototype);