import {
  OrthographicCamera,
  Scene,
  WebGLRenderTarget,
  ShaderMaterial,
  PlaneBufferGeometry,
  Mesh,
  WebGLRenderer,
  LinearFilter,
  NearestFilter,
  RGBAFormat,
  FloatType
} from 'three'
import { chunk, map } from 'lodash'
// import Engine from '~/assets/js/utils/Engine'
// import Primitive from '~/assets/js/utils/Primitive'
import fragmentShader from '~/assets/shader/Mosaic/fragment.fs'
import vertexShader from '~/assets/shader/Mosaic/vertex.vs'
import offScreenFragmentShader from '~/assets/shader/Mosaic/offScreenFragmentShader.fs'
// import PixelColor from '~/assets/js/utils/PixelColor'
// import OffScreen from '~/assets/js/utils/OffScreen'

const width = 50
const height = 50
export default class Mosaic {
  constructor(opts) {
    this.canvas = opts.canvas
    this.colors = opts.colors
    this.cameraRTT = null
    this.sceneRTT = null
    this.sceneScreen = null
    this.renderer = null
    this.mouseX = 0
    this.mouseY = 0

    this.windowHalfX = width / 2
    this.windowHalfY = height / 2
    this.rtTexture = null
    this.material = null
    this.quad = null
    this.delta = 0.01
    this.update = this.update.bind(this)
    this.init()
    this.update()
  }

  init() {
    this.cameraRTT = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      -10000,
      10000
    )
    this.cameraRTT.position.z = 100
    this.sceneRTT = new Scene()
    this.sceneScreen = new Scene()

    this.rtTexture = new WebGLRenderTarget(
      width,
      height, {
        minFilter: LinearFilter,
        magFilter: NearestFilter,
        format: RGBAFormat,
        type: FloatType
      }
    )

    this.material = new ShaderMaterial({
      uniforms: { 'time': { value: 0.0 } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })

    const materialScreen = new ShaderMaterial({
      uniforms: { 'tDiffuse': { value: this.rtTexture.texture } },
      vertexShader: vertexShader,
      fragmentShader: offScreenFragmentShader,
      depthWrite: false
    })

    const plane = new PlaneBufferGeometry(width, height)
    this.quad = new Mesh(plane, this.material)
    this.quad.position.z = -100
    this.sceneRTT.add(this.quad)

    this.quad = new Mesh(plane, materialScreen)
    this.quad.position.z = -100
    this.sceneScreen.add(this.quad)

    this.renderer = new WebGLRenderer({ canvas: this.canvas })
    this.renderer.setPixelRatio(0.1)
    this.renderer.setSize(width, height)
    this.renderer.autoClear = false

    // document.addEventListener('mousemove', e => this.onDocumentMouseMove(e), false)
  }

  onDocumentMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX)
    this.mouseY = (event.clientY - this.windowHalfY)
    const read = new Float32Array(4)
    this.renderer.readRenderTargetPixels(this.rtTexture, this.windowHalfX + this.mouseX, this.windowHalfY - this.mouseY, 1, 1, read)
    this.colors.innerText = 'r:' + read[ 0 ] + 'g:' + read[ 1 ] + 'b:' + read[ 2 ]
  }

  getAllPixels() {
    const read = new Float32Array(width * height * 4)
    this.renderer.readRenderTargetPixels(this.rtTexture, 0, 0, width, height, read)
    return chunk(map(read, (i) => { return i * 255 }), 4)
  }

  update() {
    this.render()
    // requestAnimationFrame(this.update)
  }

  render() {
    if (this.material.uniforms.time.value > 1 || this.material.uniforms.time.value < 0) {
      this.delta *= -1
    }
    this.material.uniforms.time.value += this.delta
    this.renderer.clear()
    // Render first scene into texture
    this.renderer.setRenderTarget(this.rtTexture)
    this.renderer.clear()
    this.renderer.render(this.sceneRTT, this.cameraRTT, this.rtTexture)

    // Render full screen this.quad with generated texture
    this.renderer.setRenderTarget(null)

    this.renderer.render(this.sceneScreen, this.cameraRTT)
    const read = new Float32Array(4)
    this.renderer.readRenderTargetPixels(this.rtTexture, this.windowHalfX + this.mouseX, this.windowHalfY - this.mouseY, 1, 1, read)
    this.colors.innerText = '  r:' + read[ 0 ] + '  g:' + read[ 1 ] + '  b:' + read[ 2 ]
  }
}

// export default class Mosaic extends Engine {
//   constructor(opts) {
//     super(opts.canvas, {
//       isOrbitControls: false,
//       fps: 10,
//       fixedSize: {
//         width: width,
//         height: height
//       }
//     })
//     this.renderer.autoClear = false
//     this.devicePixelRatio = 1
//     this.createPlane()

//     this.pixelColor = new PixelColor({
//       renderer: this.renderer,
//       width: this.width,
//       height: this.height
//     })

//     this.offScreen = new OffScreen({ renderTarget: this.pixelColor.renderTarget })
//     this.canvas.addEventListener('mousemove', e => this.mousemove(e))
//   }

//   createPlane() {
//     const geomConf = {
//       width: 2,
//       height: 2,
//       widthSegments: 2,
//       heightSegments: 2
//     }

//     const matConf = ({
//       uniforms: {
//         uTime: { type: 'f', value: this.delta },
//         uResolution: { type: 'v2', value: new Vector2(this.width, this.height) }
//       },
//       vertexShader,
//       fragmentShader
//     })

//     this.plane = new Primitive(
//       'plane',
//       'ShaderMaterial',
//       {
//         geomConf,
//         matConf
//       }
//     )
//     this.plane.frustumCulled = false
//     this.add(this.plane)
//   }

//   mousemove(e) {
//     if (!this.plane) return
//     const mouseX = (e.clientX - width / 2)
//     const mouseY = (e.clientY - height / 2)

//     this.renderer.clear()
//     this.pixelColor.setRenderTexture()
//     this.renderer.clear()
//     this.renderer.render(this.scene, this.camera)
//     this.pixelColor.resetRenderTexture()
//     this.renderer.render(this.offScreen.sceneRT, this.camera)

//     this.pixelColor.getPixlePointColor({
//       mouseX: mouseX,
//       mouseY: mouseY,
//       halfWidth: width / 2,
//       halfHeight: height / 2
//     })
//   }

//   resize() {
//     this.width = this.canvas.offsetWidth
//     this.height = this.canvas.offsetHeight
//     this.setFixedSize()
//     this.renderer.setSize(this.width, this.height)
//     this.camera.updateProjectionMatrix()
//     if (!this.plane) return
//     this.plane.children[0].material.uniforms.uResolution.value = [this.width, this.height]
//   }

//   render() {
//     this.delta += this.clock.getDelta()
//     this.plane.children[0].material.uniforms.uTime.value = this.delta
//     this.renderer.clear()
//     this.renderer.render(this.scene, this.camera, this.pixelColor.renderTarget)
//     this.renderer.clear()
//     this.renderer.render(this.offScreen.sceneRT, this.camera)
//   }
// }
