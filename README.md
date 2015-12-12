# phaser-swipe
A swipe component for Phaser.io

## Install

You can grab the swipe.js file and include it in your project, or you can use npm or bower:

```bash
   npm install phaser-swipe
   bower install phaser-swipe
```

## Usage

You can use it in two ways; with or without a model. This is without model.

```javascript
  var Swipe = require('phaser-swipe');
  
  // in create
  this.swipe = new Swipe(this.game);
  
  // in update
  var direction = this.swipe.check();
  if (direction!==null) {
    // direction= { x: x, y: y, direction: direction }
    switch(direction.direction) {
       case this.swipe.DIRECTION_LEFT: // do something
       case this.swipe.DIRECTION_RIGHT:
       case this.swipe.DIRECTION_UP:
       case this.swipe.DIRECTION_DOWN:
       case this.swipe.DIRECTION_UP_LEFT:
       case this.swipe.DIRECTION_UP_RIGHT:
       case this.swipe.DIRECTION_DOWN_LEFT:
       case this.swipe.DIRECTION_DOWN_RIGHT:
    }
  }
```

This is with a model. Here you define your methods in your model. Only those methods defined will be used.
So if you do not want the diagonals, you can just omit those methods.

```javascript
   function YourModel() {
      up: function(point) {},
      down: function(point) {},
      left: function(point) {},
      right: function(point) {},
      upLeft: function(point) {},
      upRight: function(point) {},
      downLeft: function(point) {},
      downRight: function(point) {}
   };
   
   // in create
   this.swipe = new Swipe(this.game, yourmodel);
   
   // in update. The methods will only be called if you have a swipe.
   // point: { x: x, y: y }
   this.swipe.check();
```

## Keyboard

The module will automatically understand all arrow keys for understanding up/down/left/right. If you use
the model, it will call the methods for you. If you do not use a model, you will get a direction from
check(), but in both ways you will not get a point for where it was pressed.

It understands the diagonals also, so pressing up and right will return DIRECTION_UP_RIGHT and call
model.upRight() if it exists. Because two keys need to be pressed, the signal for a single key will not
fire until it is released.
