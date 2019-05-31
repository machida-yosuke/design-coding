import {
  Vector2
} from 'three'

import Engine from '~/assets/js/utils/Engine'
import Light from '~/assets/js/utils/Light'
import Primitive from '~/assets/js/utils/Primitive'
import fragmentShader from '~/assets/shader/Reiwa/fragment.fs'
import vertexShader from '~/assets/shader/Reiwa/vertex.vs'
import loadGltf from '~/assets/js/utils/loadGltf'

export default class Reiwa extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      fps: 1
    })
    this.mouse = new Vector2(0, 0)
    this.devicePixelRatio = 1
    // this.createPlane()
    this.loadKatana()
    this.createLight()
    this.canvas.addEventListener('mousemove', e => this.mousemove(e))
  }

  async loadKatana() {
    this.renderer.gammaOutput = true
    const katana = await loadGltf('models/katana/katana.glb')
    this.add(katana)
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
  createLight() {
    const directionalLightConf = {
      color: '0xffffff',
      intensity: 0.5
    }
    const directionalLight = new Light(
      'directionalLight',
      directionalLightConf,
      {
        isShadow: true
      }
    )
    directionalLight.position.set(8, 0, 4)
    this.add(directionalLight)

    const ambientLightConf = {
      color: '0xffffff',
      intensity: 1.1
    }
    const ambientLight = new Light(
      'ambientLight',
      ambientLightConf,
      {}
    )
    this.add(ambientLight)
  }

  render() {
    this.delta += this.clock.getDelta()
    // this.plane.children[0].material.uniforms.uTime.value = this.delta
    this.renderer.render(this.scene, this.camera)
  }
}
