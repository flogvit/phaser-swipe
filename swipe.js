/**
 * Created by flogvit on 2015-11-03.
 *
 * @copyright Cellar Labs AS, 2015, www.cellarlabs.com, all rights reserved
 * @file
 * @license MIT
 * @author Vegard Hanssen <Vegard.Hanssen@cellarlabs.com>
 *
 */


function Swipe(game, model) {
  var self = this;

  self.DIRECTION_UP = 1;
  self.DIRECTION_DOWN = 2;
  self.DIRECTION_LEFT = 4;
  self.DIRECTION_RIGHT = 8;
  self.DIRECTION_UP_RIGHT = 16;
  self.DIRECTION_UP_LEFT = 32;
  self.DIRECTION_DOWN_RIGHT = 64;
  self.DIRECTION_DOWN_LEFT = 128;

  self.game = game;
  self.model = model !== undefined ? model : null;
  self.dragLength = 20;
  self.swiping = false;
  self.direction = null;
  self.diagonalDisabled = false;

  this.game.input.onDown.add(function () {
    self.swiping = true;
  });
  this.game.input.onUp.add(function () {
    self.swiping = false;
  })

  var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
  up.onDown.add(function() {
    self.direction = self.DIRECTION_UP;
    self.model !== null && self.model.up && self.model.up();
  })
  var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  down.onDown.add(function() {
    self.direction = self.DIRECTION_DOWN;
    self.model !== null && self.model.down && self.model.down();
  })
  var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  left.onDown.add(function() {
    self.direction = self.DIRECTION_LEFT;
    self.model !== null && self.model.left && self.model.left();
  })
  var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  right.onDown.add(function() {
    self.direction = self.DIRECTION_RIGHT;
    self.model !== null && self.model.right && self.model.right();
  })

}

Swipe.prototype.check = function () {
  if (this.direction!==null) {
    var result = {x: 0, y: 0, direction: this.direction};
    this.direction = null;
    return result;
  }
  if (!this.swiping) return null;

  if (Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown) < this.dragLength + 20) return null;

  this.swiping = false;

  var direction = null;
  var deltaX = this.game.input.activePointer.position.x - this.game.input.activePointer.positionDown.x;
  var deltaY = this.game.input.activePointer.position.y - this.game.input.activePointer.positionDown.y;

  var result = {
    x: this.game.input.activePointer.positionDown.x,
    y: this.game.input.activePointer.positionDown.y
  };

  var deltaXabs = Math.abs(deltaX);
  var deltaYabs = Math.abs(deltaY);

  if (!this.diagonalDisabled && deltaXabs > this.dragLength && deltaYabs > this.dragLength) {
    if (deltaX > 0 && deltaY > 0) {
      direction = this.DIRECTION_DOWN_RIGHT;
      this.model !== null && this.model.downRight && this.model.downRight(result);
    } else if (deltaX > 0 && deltaY < 0) {
      direction = this.DIRECTION_UP_RIGHT;
      this.model !== null && this.model.upRight && this.model.upRight(result);
    } else if (deltaX < 0 && deltaY > 0) {
      direction = this.DIRECTION_DOWN_LEFT;
      this.model !== null && this.model.downLeft && this.model.downLeft(result);
    } else if (deltaX < 0 && deltaY < 0) {
      direction = this.DIRECTION_UP_LEFT;
      this.model !== null && this.model.upLeft && this.model.upLeft(result);
    }
  } else if (deltaXabs > this.dragLength || deltaYabs > this.dragLength) {
    if (deltaXabs > deltaYabs) {
      if (deltaX > 0) {
        direction = this.DIRECTION_RIGHT;
        this.model !== null && this.model.right && this.model.right(result);
      } else if (deltaX < 0) {
        direction = this.DIRECTION_LEFT;
        this.model !== null && this.model.left && this.model.left(result);
      }
    } else {
      if (deltaY > 0) {
        direction = this.DIRECTION_DOWN;
        this.model !== null && this.model.down && this.model.down(result);
      } else if (deltaY < 0) {
        direction = this.DIRECTION_UP;
        this.model !== null && this.model.up && this.model.up(result);
      }
    }
  }
  if (direction !== null) {
    result['direction'] = direction;
    return result;
  }
  return null;
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Swipe;
  }
}
