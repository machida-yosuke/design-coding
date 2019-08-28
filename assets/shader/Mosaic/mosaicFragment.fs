varying vec2 vUv;
uniform vec4 uColor;
uniform sampler2D texture;

void main() {
  vec4 tex = texture2D(texture, vUv);
  float diff = step(tex.a, 0.5);
  vec3 texBg = diff * uColor.rgb;
  vec3 texColor = (1.0 - diff) * tex.rgb;

  // gl_FragColor = vec4((tex.rgb) + (texBg)  , 1.0);
  gl_FragColor = vec4(texBg + texColor, 1.0);
}