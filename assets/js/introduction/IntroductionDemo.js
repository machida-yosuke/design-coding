import {
  TweenMax,
  TimelineMax,
  Circ,
  Power1,
  Power0
} from 'gsap'
import Engine from '../utils/Engine'
import Text3D from '../utils/Text3D'
import Primitive from '../utils/Primitive'
import Light from '../utils/Light'

export default class IntroductionDemo extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      cameraType: 'orthographicCamera',
      fps: 30
    })
    this.createFloor()
    this.createText()
    this.createSphere()
    this.createRod()
    this.createCone()
    this.createLight()
    this.camera.position.x = 10
    this.camera.position.y = 2
  }

  createText() {
    const depth = 0.25
    const text3D = new Text3D('Design Coding', 'meshLambertMaterial', {
      color: 0xe49185,
      size: 0.8,
      letterSpacing: 0.02,
      depth,
      steps: 1
    })
    text3D.position.x -= text3D.basePosition * 0.5
    text3D.position.z = -depth - 0.01
    TweenMax.to(text3D.position, 2, { z: 0, repeat: -1, yoyo: true, repeatDelay: 1, ease: Circ.easeInOut })
    this.add(text3D)
  }

  createSphere() {
    const geomConf = {
      radius: 0.3,
      widthSegments: 32,
      heightSegments: 32
    }
    const matConf = {
      color: 0x97c4bf
    }
    const sphere = new Primitive(
      'sphere',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    sphere.position.set(0, 2, 0.5)
    TweenMax.to(sphere.position, 10, { x: 2, repeat: -1, yoyo: true, ease: Power1.easeInOut })
    this.add(sphere)
  }

  createRod() {
    const geomConf = {
      width: 2,
      height: 0.05,
      depth: 0.05,
      widthSegments: 2,
      heightSegments: 2,
      depthSegments: 2
    }
    const matConf = {
      color: 0x8195a6
    }

    for (let index = 0; index < 15; index++) {
      const box = new Primitive(
        'box',
        'meshLambertMaterial',
        {
          geomConf,
          matConf,
          isCastShadow: true
        }
      )
      box.position.set(-3, -2.5 + (index * 0.1), 0.1)
      const tl = new TimelineMax()
      tl.to(box.position, 3, { z: 0.5, repeat: -1, yoyo: true, ease: Circ.easeInOut })
      tl.startTime(tl.startTime() - index * 0.3)
      this.add(box)
    }
  }

  createCone() {
    const geomConf = {
      height: 0.5,
      radialSegments: 1.0,
      heightSegments: 3
    }
    const matConf = {
      color: 0x153859
    }
    this.cone = new Primitive(
      'cone',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    this.cone.position.set(5.5, -2, 0)
    const tl = new TimelineMax()
    tl.to(this.cone.position, 10, { y: 2, repeat: -1, yoyo: true, ease: Power0.easeNone })
    tl.startTime(tl.startTime() - 5)
    this.add(this.cone)
  }

  createFloor() {
    const geomConf = {
      width: 50,
      height: 50,
      depth: 1,
      widthSegments: 32,
      heightSegments: 32,
      depthSegments: 2
    }
    const matConf = {
      color: 0xe49185
    }
    const floor = new Primitive('box', 'meshLambertMaterial', { geomConf, matConf, isReceiveShadow: true })
    floor.position.z = -geomConf.depth * 0.5
    this.add(floor)
  }

  createLight() {
    const directionalLightConf = {
      color: 0xffffff,
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
      color: 0xffffff,
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
    this.cone.rotation.y += 0.1
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
