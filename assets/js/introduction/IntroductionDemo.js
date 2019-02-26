import { TweenMax, Linear } from 'gsap'
import Engine from '../utils/Engine'
import Text3D from '../utils/Text3D'
import Primitive from '../utils/Primitive'
import Light from '../utils/Light'

export default class IntroductionDemo extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      cameraType: 'orthographicCamera'
    })
    this.createFloor()
    this.createText()
    this.createSphere()
    this.createBox()
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
    text3D.position.z = -depth - 0.02
    TweenMax.to(text3D.position, 2, { z: 0, repeat: -1, yoyo: true, repeatDelay: 2, ease: Linear.easeNone })
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
    const sphere = new Primitive('Sphere', 'meshLambertMaterial', { geomConf, matConf, isReceiveShadow: false, isCastShadow: true })
    sphere.position.set(0, 2, 0.5)
    TweenMax.to(sphere.position, 5, { x: 2, repeat: -1, yoyo: true, ease: Linear.easeNone })

    this.add(sphere)
  }

  createBox() {
    const geomConf = {
      width: 2,
      height: 0.1,
      depth: 0.1,
      widthSegments: 2,
      heightSegments: 2,
      depthSegments: 2
    }
    const matConf = {
      color: 0x8195a6
    }
    const box = new Primitive('box', 'meshLambertMaterial', { geomConf, matConf, isReceiveShadow: false, isCastShadow: true })
    box.position.set(0, -1, 1)
    this.add(box)
  }

  createFloor() {
    const geomConf = {
      width: 50,
      height: 50,
      widthSegments: 2,
      heightSegments: 2
    }
    const matConf = {
      color: 0xe49185
    }
    const floor = new Primitive('plane', 'meshLambertMaterial', { geomConf, matConf, isReceiveShadow: true, isCastShadow: false })
    this.add(floor)
  }

  createLight() {
    const directionalLightConf = {
      color: 0xffffff,
      intensity: 0.5
    }
    const directionalLight = new Light('directionalLight', { directionalLightConf })
    directionalLight.position.set(6, 6, 4)
    this.add(directionalLight)

    const ambientLightConf = {
      color: 0xffffff,
      intensity: 1.0
    }
    const ambientLight = new Light('ambientLight', { ambientLightConf })
    this.add(ambientLight)
  }
}
