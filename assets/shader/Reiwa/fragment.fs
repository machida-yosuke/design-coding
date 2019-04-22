precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;

float drawSin(vec2 m, vec2 p){
  return smoothstep(0.5, 0.6, sin(length(m - p) * 10.0 - (uTime * 5.0)));
}

float drawHikari(vec2 m, vec2 p){
  float l = 0.1 /length(m - p);
  // l = pow(l, 5.0);
  return l;
}

float drawRing(vec2 m, vec2 p){
  // float l = 0.02 / abs(abs(sin(uTime)) - length(p));
  float l = 0.01 / abs(abs(sin(uTime)) - length(p));
  return l;
}

float drawGradiation(vec2 p){
  //内積vに近ければ１になる
  vec2 v = vec2(0.0, 1.0);
  // float g = abs(dot(p, v) / (length(p) * length(v)));
  float g = abs(dot(p, v) / (length(p) * length(v)));
  return g;
}

float drawZoomline(vec2 p){
  float t = atan(p.y, p.x) + uTime;
  t = sin(t * 10.0);
  return t;
}

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

const float sphereSize = 2.0; // 球の半径

float distanceFunc(vec3 p){
    return length(p) - sphereSize;
}

void main () {
  vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
  vec2 m = vec2((uMouse.x / min(uResolution.x, uResolution.y)) * 2.0 - 1.0, (-uMouse.y / min(uResolution.x, uResolution.y)) * 2.0 + 1.0);
  // float t = drawSin(m, p);
  // float t = drawHikari(m, p);
  // float t = drawRing(m, p);
  // float t = drawGradiation(p);
  // float t = drawZoomline(p);
  // vec4 color = vec4(vec3(t), 1.0);
  // camera
  vec3 cPos = vec3(0.0,  0.0,  3.0); // カメラの位置
  vec3 cDir = vec3(0.0,  0.0, -1.0); // カメラの向き(視線)
  vec3 cUp  = vec3(0.0,  1.0,  0.0); // カメラの上方向
  vec3 cSide = cross(cDir, cUp);     // 外積を使って横方向を算出
  float targetDepth = 1.0;           // フォーカスする深度
  
  // ray
  vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);
  // marching loop
  float distance = 0.0; // レイとオブジェクト間の最短距離
  float rLen = 0.0;     // レイに継ぎ足す長さ
  vec3  rPos = cPos;    // レイの先端位置
  
  for(int i = 0; i < 16; i++){
      distance = distanceFunc(rPos);
      rLen += distance;
      rPos = cPos + ray * rLen;
  }
  
  // hit check
  // if(abs(distance) < 0.001){
  //     gl_FragColor = vec4(vec3(1.0), 1.0);
  // }else{
  //     gl_FragColor = vec4(vec3(0.0), 1.0);
  // }
  gl_FragColor = vec4(vec3(distance), 1.0);
  // color
  // gl_FragColor = vec4(ray.xy, -ray.z, 1.0);
}