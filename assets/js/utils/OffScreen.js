import {
  Scene
} from 'three'
import Primitive from '~/assets/js/utils/Primitive'
import vertexShader from '~/assets/shader/Mosaic/vertex.vs'
import offScreenFragmentShader from '~/assets/shader/Mosaic/offScreenFragmentShader.fs'

export default class OffScreen {
  constructor(opts) {
    this.width = opts.width
    this.height = opts.height
    this.renderTarget = opts.renderTarget
    this.sceneScreen = new Scene()
    this.createOffScreen()
  }

  createOffScreen() {
    const geomConf = {
      width: this.width,
      height: this.height,
      widthSegments: 2,
      heightSegments: 2
    }
    const matConf = ({
      uniforms: { 'tDiffuse': { value: this.renderTarget.texture } },
      vertexShader: vertexShader,
      fragmentShader: offScreenFragmentShader,
      depthWrite: false
    })

    this.plane = new Primitive(
      'plane',
      'ShaderMaterial',
      {
        geomConf,
        matConf
      }
    )
    this.plane.frustumCulled = false
    this.plane.position.z = -1000
    this.sceneScreen.add(this.plane)
  }
}
