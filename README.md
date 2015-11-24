# phaser-swipe
A swipe component for Phaser.io

## Install

You can grab the swipe.js file and include it in your project, or you can use npm or bower:

```bash
   npm install phaser-swipe
   bower install phaser-swipe
```

## Usage

You can use it in two ways. With or without a model. This is without model

```javascript
  var Swipe = require('phaser-swipe');
  
  // in create
  this.swipe = new Swipe(this.game);
  
  // in update
  var direciton = this.swipe.check();
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

This is with a model. Here you define your methods in your model. Only those methods defined will be used
So if you do not want the diagonals, you can just omit those methods.

```javascript
   function YourModel() {
      up: function(point) {},
      down: function(point) {},
      left: function(point) {},
      right: function(point) {},
      upLeft: function(point) {},
      upRight: fuction(point) {},
      downLeft: function(point) {},
      downRight: fuction(point) {}
   };
   
   // in create
   this.swipe = new Swipe(this.game, yourmodel);
   
   // in update. The methods will only be called if you have a swipe.
   // point: { x: x, y: y }
   this.swipe.check();
```