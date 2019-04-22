import {
  Vector2
} from 'three'
import Engine from '~/assets/js/utils/Engine'
import Primitive from '~/assets/js/utils/Primitive'
import fragmentShader from '~/assets/shader/Reiwa/fragment.fs'
import vertexShader from '~/assets/shader/Reiwa/vertex.vs'

export default class Reiwa extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      fps: 30
    })
    this.mouse = new Vector2(0, 0)
    this.devicePixelRatio = 0.5
    this.createPlane()
    this.canvas.addEventListener('mousemove', e => this.mousemove(e))
  }

  createPlane() {
    const geomConf = {
      width: 2,
      height: 2,
      widthSegments: 2,
      heightSegments: 2
    }
    const matConf = ({
      uniforms: {
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
    this.mouse = new Vector2(e.offsetX, e.offsetY)
    this.plane.children[0].material.uniforms.uMouse.value = this.mouse
  }

  resize() {
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.updateProjectionMatrix()
    if (!this.plane) return
    console.log(this.width, this.height, 'resize')
    this.plane.children[0].material.uniforms.uResolution.value = [this.width, this.height]
  }

  render() {
    this.delta += this.clock.getDelta()
    this.plane.children[0].material.uniforms.uTime.value = this.delta
    this.renderer.render(this.scene, this.camera)
  }
}
