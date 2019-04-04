import {
  Vector2
} from 'three'
import Engine from '~/assets/js/utils/Engine'
import Primitive from '~/assets/js/utils/Primitive'
import fragmentShader from '~/assets/shader/Top/fragment.fs'
import vertexShader from '~/assets/shader/Top/vertex.vs'
import loadTexture from '~/assets/js/utils/loadTexture'

export default class SketchIndex extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      fps: 30
    })
    this.txetureName = this.canvas.getAttribute('data-name')
    this.devicePixelRatio = 0.5
    this.mouse = new Vector2(0.0, 0.0)
    // this.devicePixelRatio = 2
    this.createPlane()
    this.canvas.addEventListener('mousemove', e => this.mousemove(e))
  }

  async createPlane() {
    this.texture = await loadTexture(this.txetureName, 'png')
    console.log(this.texture, 'this.texture')
    const geomConf = {
      width: 2,
      height: 2,
      widthSegments: 2,
      heightSegments: 2
    }
    const matConf = ({
      uniforms: {
        uTexture: { type: 't', value: this.texture },
        uTime: { type: 'f', value: this.delta },
        uResolution: { type: 'v2', value: new Vector2(this.width, this.height) },
        uMouse: { type: 'v2', value: this.mouse }
      },
      vertexShader,
      fragmentShader
    })
    this.plane = new Primitive(
      'plane',
      'RawShaderMaterial',
      {
        geomConf,
        matConf
      }
    )
    this.plane.frustumCulled = false
    this.add(this.plane)
  }

  mousemove(e) {
    if (!this.plane) return
    this.mouse = new Vector2(e.offsetX / this.width, e.offsetY / this.height)
    this.plane.children[0].material.uniforms.uMouse.value = this.mouse
    console.log(this.mouse)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
