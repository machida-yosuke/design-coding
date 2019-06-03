import {
  Scene
} from 'three'
import Primitive from '~/assets/js/utils/Primitive'
import offScreenFragmentShader from '~/assets/shader/Mosaic/offScreenFragmentShader.fs'
import vertexShader from '~/assets/shader/Mosaic/vertex.vs'

export default class OffScreen {
  constructor(opts) {
    this.renderTarget = opts.renderTarget
    this.sceneRT = new Scene()
    this.createOffScreen()
  }

  createOffScreen() {
    const geomConf = {
      width: 2,
      height: 2,
      widthSegments: 2,
      heightSegments: 2
    }

    const matConf = ({
      uniforms: {
        tDiffuse: { type: 't', value: this.renderTarget.texture }
      },
      vertexShader,
      offScreenFragmentShader
    })

    const plane = new Primitive(
      'plane',
      'ShaderMaterial',
      {
        geomConf,
        matConf
      }
    )
    plane.frustumCulled = false
    this.sceneRT.add(plane)
  }
}
