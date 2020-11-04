attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

uniform vec2 sheetSize;
uniform vec2 charCoords;

void main() {
  vTextureCoord = aTextureCoord;
  vTextureCoord2 = aTextureCoord;

  vTextureCoord2.x += charCoords.x;
  vTextureCoord2.y += charCoords.y;
  vTextureCoord2.x /= sheetSize.x;
  vTextureCoord2.y /= sheetSize.y;

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}

