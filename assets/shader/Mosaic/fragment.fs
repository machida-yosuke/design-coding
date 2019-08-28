varying vec2 vUv;
uniform sampler2D texture;

void main() {
  vec4 color = texture2D(texture, vUv);
  gl_FragColor = color;
}