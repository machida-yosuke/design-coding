import {
  // Scene,
  WebGLRenderTarget,
  LinearFilter,
  NearestFilter,
  RGBAFormat,
  FloatType
} from 'three'
import { chunk, map } from 'lodash'
import Engine from '~/assets/js/utils/Engine'
import Primitive from '~/assets/js/utils/Primitive'
import fragmentShader from '~/assets/shader/Mosaic/fragment.fs'
import vertexShader from '~/assets/shader/Mosaic/vertex.vs'
import OffScreen from '~/assets/js/utils/OffScreen'
const width = 50
const height = 50

export default class PixiColor extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      cameraType: 'orthographicCamera',
      orthographicCameraSize: 2,
      fps: 1,
      fixedSize: {
        width: width,
        height: height
      }
    })

    this.mouseX = 0
    this.mouseY = 0
    this.rtTexture = null
    this.texture = opts.texture
    this.delta = 0.01
    this.init()
  }

  init() {
    this.camera.near = -10000
    this.camera.far = 10000
    this.camera.position.z = 100
    this.rtTexture = new WebGLRenderTarget(
      width,
      height, {
        minFilter: LinearFilter,
        magFilter: NearestFilter,
        format: RGBAFormat,
        type: FloatType
      }
    )

    this.createPlaneRT()
    this.offScreen = new OffScreen({
      renderTarget: this.rtTexture,
      width: width,
      height: width
    })

    this.renderer.autoClear = false
    this.draw()
    // document.addEventListener('mousemove', e => this.onDocumentMouseMove(e), false)
  }

  createPlaneRT() {
    const geomConf = {
      width: width,
      height: height,
      widthSegments: 2,
      heightSegments: 2
    }
    const matConf = ({
      uniforms: { 'texture': { value: this.texture } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })

    this.planeRT = new Primitive(
      'plane',
      'ShaderMaterial',
      {
        geomConf,
        matConf
      }
    )
    this.planeRT.frustumCulled = false
    this.planeRT.position.z = -1000
    this.add(this.planeRT)
  }

  getAllPixels() {
    return new Promise((resolve) => {
      const read = new Float32Array(width * height * 4)
      this.renderer.readRenderTargetPixels(this.rtTexture, 0, 0, width, height, read)
      resolve(chunk(map(read, (i) => { return i }), 4))
    })
  }

  render() {
    return null
  }

  draw() {
    this.renderer.clear()

    this.renderer.setRenderTarget(this.rtTexture)
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera, this.rtTexture)

    this.renderer.setRenderTarget(null)
    this.renderer.render(this.offScreen.sceneScreen, this.camera)
  }
}
