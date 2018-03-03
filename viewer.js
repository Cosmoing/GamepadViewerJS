var canvas = document.getElementById("gamepadView");
canvas.width = 326;
canvas.height = 194;

var core = new Core(canvas);

function Viewer()
{
    Container.call(this);
    
    var gamepad;

    var gamepadButtons = [
        {
            id: 0,
            value: "x",
            gamepadButton: null,
            x: 266,
            y: 120
        },
        {
            id: 1,
            value: "circle",
            gamepadButton: null,
            x: 290,
            y: 95
        },
        {
            id: 2,
            value: "square",
            gamepadButton: null,
            x: 242,
            y: 95
        },
        {
            id: 3,
            value: "triangle",
            gamepadButton: null,
            x: 266,
            y: 71
        },
        {
            id: 4,
            value: "l1",
            gamepadButton: null,
            x: 34,
            y: 56
        },
        {
            id: 5,
            value: "r1",
            gamepadButton: null,
            x: 256,
            y: 56
        },
        {
            id: 6,
            value: "r2",
            gamepadButton: null,
            x: 256,
            y: 12
        },
        {
            id: 7,
            value: "l2",
            gamepadButton: null,
            x: 34,
            y: 12
        },
        {
            id: 8,
            value: "select",
            gamepadButton: null,
            x: 105,
            y: 97
        },
        {
            id: 9,
            value: "start",
            gamepadButton: null,
            x: 203,
            y: 97
        },
        {
            id: 12,
            value: "up",
            gamepadButton: null,
            x: 28,
            y: 80
        },
        {
            id: 13,
            value: "down",
            gamepadButton: null,
            x: 28,
            y: 112
        },
        {
            id: 14,
            value: "left",
            gamepadButton: null,
            x: 9,
            y: 99
        },
        {
            id: 15,
            value: "right",
            gamepadButton: null,
            x: 41,
            y: 99
        },
    ]

    var gamepadJoysticks = [
        {
            xId: 0,
            yId: 1,
            value: "Left Stick",
            x: 89,
            y: 155,
            gamepadJoystick: null
        },
        {
            xId: 2,
            yId: 3,
            value: "Right Stick",
            x: 230,
            y: 155,
            gamepadJoystick: null
        }
    ]

    var imageLoader = new ImageLoader();

    //Idles
    imageLoader.addImage("circle_idle", "assets/idle/circle_idle.png");
    imageLoader.addImage("square_idle", "assets/idle/square_idle.png");
    imageLoader.addImage("triangle_idle", "assets/idle/triangle_idle.png");
    imageLoader.addImage("x_idle", "assets/idle/x_idle.png");
    imageLoader.addImage("down_idle", "assets/idle/down_idle.png");
    imageLoader.addImage("left_idle", "assets/idle/left_idle.png");
    imageLoader.addImage("up_idle", "assets/idle/up_idle.png");
    imageLoader.addImage("right_idle", "assets/idle/right_idle.png");
    imageLoader.addImage("select_idle", "assets/idle/select_idle.png");
    imageLoader.addImage("start_idle", "assets/idle/start_idle.png");
    imageLoader.addImage("r1_idle", "assets/idle/r1_idle.png");
    imageLoader.addImage("l1_idle", "assets/idle/l1_idle.png");
    imageLoader.addImage("r2_idle", "assets/idle/r2_idle.png");
    imageLoader.addImage("l2_idle", "assets/idle/l2_idle.png");

    //Pushed
    imageLoader.addImage("circle_pushed", "assets/pushed/circle_pushed.png");
    imageLoader.addImage("square_pushed", "assets/pushed/square_pushed.png");
    imageLoader.addImage("triangle_pushed", "assets/pushed/triangle_pushed.png");
    imageLoader.addImage("x_pushed", "assets/pushed/x_pushed.png");
    imageLoader.addImage("down_pushed", "assets/pushed/down_pushed.png");
    imageLoader.addImage("left_pushed", "assets/pushed/left_pushed.png");
    imageLoader.addImage("up_pushed", "assets/pushed/up_pushed.png");
    imageLoader.addImage("right_pushed", "assets/pushed/right_pushed.png");
    imageLoader.addImage("select_pushed", "assets/pushed/select_pushed.png");
    imageLoader.addImage("start_pushed", "assets/pushed/start_pushed.png");
    imageLoader.addImage("r1_pushed", "assets/pushed/r1_pushed.png");
    imageLoader.addImage("l1_pushed", "assets/pushed/l1_pushed.png");
    imageLoader.addImage("r2_pushed", "assets/pushed/r2_pushed.png");
    imageLoader.addImage("l2_pushed", "assets/pushed/l2_pushed.png");

    //Joysticks
    imageLoader.addImage("joystick_bg", "assets/joystick/bg.png");
    imageLoader.addImage("joystick", "assets/joystick/joystick.png");

    imageLoader.addImage("reference", "assets/Background.png");

    var imagesLoaded = false;
    this.onImageLoaderComplete = function() {
        imagesLoaded = true;
        for (var i in gamepadButtons) {
            var idle = imageLoader.getImage(gamepadButtons[i].value + "_idle");
            var pushed = imageLoader.getImage(gamepadButtons[i].value + "_pushed");
            var button = new GamepadButton(idle, pushed);
            button.x = gamepadButtons[i].x;
            button.y = gamepadButtons[i].y;
            this.addChild(button);
            gamepadButtons[i].gamepadButton = button;
        }
        
        for (var i in gamepadJoysticks)
        {
            var bgImage = imageLoader.getImage("joystick_bg");
            var joystickImage = imageLoader.getImage("joystick");
            var joystick = new GamepadJoystick(bgImage, joystickImage);
            joystick.x = gamepadJoysticks[i].x;
            joystick.y = gamepadJoysticks[i].y;
            this.addChild(joystick);
            gamepadJoysticks[i].gamepadJoystick = joystick;
        }
    }
    imageLoader.addEventListener("allloaded", this.onImageLoaderComplete, this);
    imageLoader.load();

    this.update = function(delta) {
        
        var gamepads = navigator.getGamepads();
        for (var i = 0; i < gamepads.length; i++)
        {
            if (!gamepads[i]) continue;
            
            if (gamepads[i].id.toLowerCase().search("xinput") != -1) {
                gamepad = gamepads[i];
            }
        }
        
        if (gamepad && imagesLoaded) {
            for (var i in gamepadButtons) {
                var pushed = gamepad.buttons[gamepadButtons[i].id].pressed;
                gamepadButtons[i].gamepadButton.setPushed(pushed);
            }
            
            for (var i in gamepadJoysticks)
            {
                var anchor = {x:0,y:0};
                anchor.x = (-parseFloat(gamepad.axes[gamepadJoysticks[i].xId].toFixed(2)) + 1) / 2;
                anchor.y = (-parseFloat(gamepad.axes[gamepadJoysticks[i].yId].toFixed(2)) + 1) / 2;
                gamepadJoysticks[i].gamepadJoystick.changePosition(anchor);
            }
        }
        
        for (var i in this.children)
        {
            this.children[i].update(delta);
        }
    }
}
Viewer.prototype = Object.create(Container.prototype);

var viewer = new Viewer();
core.addChild(viewer);