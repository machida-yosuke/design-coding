varying vec2 vUv;
uniform float time;
void main() {
  gl_FragColor = vec4( vUv, vUv.y, 1.0 );
}