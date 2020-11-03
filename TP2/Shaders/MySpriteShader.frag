#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler2, vTextureCoord);

  if (color.a <= 0.1)
	  color = texture2D(uSampler, vTextureCoord);

	gl_FragColor = color;
}
