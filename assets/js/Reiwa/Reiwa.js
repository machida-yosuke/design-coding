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

    this.camera.position.z = 1
    this.createPlane()
  }

  createPlane() {
    const geomConf = {
      width: 2,
      height: 2,
      widthSegments: 2,
      heightSegments: 2
    }

    const mouse = new Vector2(0, 0)
    const matConf = ({
      uniforms: {
        uTime: { type: 'f', value: 0.0 },
        uResolution: { type: 'v2', value: new Vector2(512.0, 512.0) },
        uMouse: { type: 'v2', value: mouse }
      },
      vertexShader,
      fragmentShader
    })

    const plane = new Primitive(
      'plane',
      'RawShaderMaterial',
      {
        geomConf,
        matConf
      }
    )
    this.add(plane)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
