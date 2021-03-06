precision highp float;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;

void main () {
  vec2 texcoord = gl_FragCoord.st / uResolution;
  vec2 p = texcoord * 2.0 - 1.0;
  vec4 tex = texture2D(uTexture, vUv);
  vec4 color = vec4(tex);
  gl_FragColor = color;
}