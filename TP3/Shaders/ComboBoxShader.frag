#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform float perc;

void main() {
  vec4 color = vec4(0.8 - perc * 0.6,  0.3 * perc, 0.9 * perc, 1.0);
  gl_FragColor = color;
}