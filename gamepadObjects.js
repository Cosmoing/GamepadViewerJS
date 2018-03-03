function GamepadButton(idleImage, activeImage)
{
    Sprite.call(this, idleImage);
    
    this.activeImage = new Sprite(activeImage);
    this.activeImage.visible = false;
    this.addChild(this.activeImage);
    
    this.setPushed = function(value)
    {
        this.activeImage.visible = value;
    }
}
GamepadButton.prototype = Object.create(Sprite.prototype);

function GamepadJoystick(bgImage, joystickImage)
{
    Container.call(this);
    
    this.intensity = 0.75;
    
    this.bgImage = new Sprite(bgImage);
    this.bgImage.anchor = {x:.5,y:.5};
    this.addChild(this.bgImage);
    
    this.joystickImage = new Sprite(joystickImage);
    this.joystickImage.anchor = {x:.5,y:.5};
    this.addChild(this.joystickImage);
    
    this.changePosition = function(anchor)
    {
        anchor.x = ((anchor.x - 0.5) * this.intensity) + 0.5;
        anchor.y = ((anchor.y - 0.5) * this.intensity) + 0.5;
        this.joystickImage.anchor = anchor;
    }
}
GamepadJoystick.prototype = Object.create(Container.prototype);