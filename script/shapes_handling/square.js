function handleMouseSquare(event, mode, interactionType) {
  if (mode == "draw") {
    if (interactionType == "mouse-down") {
      const pos = getCursorPos(event);
      data["square"]["vertices"].push(initVertexArray(pos.x, pos.y, 4));
      data["square"]["colors"].push(initColorArray(shapeColor, 4));
    } else if (interactionType == "mouse-move") {
      const pos = getCursorPos(event);
      const originX =
        data["square"]["vertices"][data["square"]["vertices"].length - 1][0];
      const originY =
        data["square"]["vertices"][data["square"]["vertices"].length - 1][1];

      const distanceX = Math.abs(originX - pos.x);
      const distanceY = Math.abs(originY - pos.y);

      if (distanceX < distanceY) {
        data["square"]["vertices"][data["square"]["vertices"].length - 1][2] =
          pos.x;
        data["square"]["vertices"][data["square"]["vertices"].length - 1][4] =
          pos.x;
        data["square"]["vertices"][data["square"]["vertices"].length - 1][5] =
          originY < pos.y ? originY + distanceX : originY - distanceX;
        data["square"]["vertices"][data["square"]["vertices"].length - 1][7] =
          originY < pos.y ? originY + distanceX : originY - distanceX;
      } else if (distanceX > distanceY) {
        data["square"]["vertices"][data["square"]["vertices"].length - 1][2] =
          originX < pos.x ? originX + distanceY : originX - distanceY;
        data["square"]["vertices"][data["square"]["vertices"].length - 1][4] =
          originX < pos.x ? originX + distanceY : originX - distanceY;
        data["square"]["vertices"][data["square"]["vertices"].length - 1][5] =
          pos.y;
        data["square"]["vertices"][data["square"]["vertices"].length - 1][7] =
          pos.y;
      }

      render();
    }
  } else if (mode == "move-point") {
  }
}

function renderSquares(shader) {
  let squareVertexBuffer = fillBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(data["square"]["vertices"].flat(2))
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
  activateAttr(shader, "vPosition", 2);

  let squareColorBuffer = fillBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(data["square"]["colors"].flat(2))
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, squareColorBuffer);
  activateAttr(shader, "vColor", 4);

  if (data["square"]["vertices"].length != 0) {
    for (var i = 0; i < data["square"]["vertices"].length; i++) {
      gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
    }
  }
}
