import {
  TweenMax,
  TimelineMax,
  Circ,
  Power1,
  Power0
} from 'gsap'

import {
  Vector3,
  QuadraticBezierCurve3
} from 'three'

import Engine from '../utils/Engine'
import Text3D from '../utils/Text3D'
import Primitive from '../utils/Primitive'
import Light from '../utils/Light'
import calcDegtoRad from '../utils/calcDegtoRad'
import getRandomFloat from '../utils/getRandomFloat'
const COLORS = {
  pink: 0xf099aa,
  blue: 0x99c0f0,
  beige: 0xe0d1c3,
  red: 0xe26e5a,
  green: 0x477c62
}
const colorLen = Object.keys(COLORS).length

export default class IntroductionDemo extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      cameraType: 'orthographicCamera',
      orthographicCameraSize: 0.003,
      fps: 30
    })
    this.createFloor()
    this.createText()
    this.createSphere()
    this.createHexagon()
    this.createCylinder()
    this.createTorus()
    this.createStairsTorus()
    this.createStairs()
    this.createCone()
    this.createBox()
    this.createCircleTube()
    this.createTube()
    this.createTriangular()
    this.createLight()
    this.camera.position.x = 10
    this.camera.position.y = 2
  }

  createSphere() {
    const geomConf = {
      radius: 0.7,
      widthSegments: 32,
      heightSegments: 32
    }
    const matConf = {
      color: COLORS.beige
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
    sphere.position.set(3, 2.5, 1)
    const tl = new TimelineMax()
    tl.to(sphere.position, 30, { x: 2, repeat: -1, yoyo: true, ease: Power1.easeInOut })
    this.add(sphere)
  }

  createCylinder() {
    const geomConf = {
      radiusTop: 0.3,
      radiusBottom: 0.3,
      height: 2,
      radialSegments: 32
    }
    const matConf = {
      color: COLORS.green
    }
    const sphere = new Primitive(
      'cylinder',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    sphere.rotation.x = calcDegtoRad(50)

    sphere.position.set(3, -2.5, 1.5)
    const tl = new TimelineMax()
    tl.to(sphere.position, 10, { z: 1, repeat: -1, yoyo: true, ease: Power1.easeInOut })
    this.add(sphere)
  }

  createTorus() {
    const geomConf = {
      radius: 1,
      tube: 0.6,
      radialSegments: 32,
      tubularSegments: 32
    }
    const matConf = {
      color: COLORS.pink
    }
    const torus = new Primitive(
      'torus',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    torus.rotation.y = calcDegtoRad(40)
    torus.rotation.x = calcDegtoRad(20)

    torus.position.set(-2, 2.5, 5.5)
    const tl = new TimelineMax()
    tl.to(torus.rotation, 12, { y: calcDegtoRad(320), repeat: -1, yoyo: true, ease: Power1.easeInOut })
    this.add(torus)
  }

  createHexagon() {
    const geomConf = {
      radiusTop: 1.0,
      radiusBottom: 1.0,
      height: 0.1,
      radialSegments: 6
    }
    const matConf = {
      color: COLORS.green
    }
    const hexagon = new Primitive(
      'cylinder',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    hexagon.rotation.z = calcDegtoRad(-80)
    hexagon.position.set(-3.5, -0.5, 1.8)

    TweenMax.to(hexagon.position, 40, { y: 1.5, repeat: -1, yoyo: true, ease: Power1.easeInOut })
    TweenMax.to(hexagon.rotation, 30, { x: calcDegtoRad(340), repeat: -1, yoyo: true, ease: Power1.easeInOut })
    this.add(hexagon)
  }

  createStairs() {
    for (let index = 0; index < 3; index++) {
      const geomConf = {
        width: 2 - index * 0.6,
        height: 0.5,
        depth: 4,
        widthSegments: 2,
        heightSegments: 2,
        depthSegments: 2
      }
      const matConf = {
        color: COLORS.beige
      }
      const box = new Primitive(
        'box',
        'meshLambertMaterial',
        {
          geomConf,
          matConf,
          isCastShadow: true
        }
      )
      box.position.set(-0.5 - index * 0.3, -2.5 + index * 0.5, 4)
      const tl = new TimelineMax()
      tl.to(box.position, 20, { z: 3, repeat: -1, yoyo: true, ease: Circ.easeInOut })
      tl.startTime(tl.startTime() - index * 0.3)
      this.add(box)
    }
  }

  createStairsTorus() {
    const geomConf = {
      radius: 2.6,
      tube: 0.2,
      radialSegments: 4,
      tubularSegments: 4
    }
    const matConf = {
      color: COLORS.red
    }
    const stairsTorus = new Primitive(
      'torus',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    stairsTorus.position.set(0.0, -2.0, 5)
    this.add(stairsTorus)
  }

  createCone() {
    const geomConf = {
      height: 0.5,
      radialSegments: 1.0,
      heightSegments: 3
    }
    const matConf = {
      color: COLORS.blue
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
    this.cone.position.set(5.5, -1.3, 1.0)
    this.cone.scale.y = 1.8
    const tl = new TimelineMax()
    tl.to(this.cone.position, 25, { z: 1, repeat: -1, yoyo: true, ease: Power0.easeNone })
    tl.startTime(tl.startTime() - 5)
    this.add(this.cone)
  }

  createBox() {
    const geomConf = {
      width: 2,
      height: 2,
      depth: 0.1,
      widthSegments: 2,
      heightSegments: 2,
      depthSegments: 2
    }
    const matConf = {
      color: COLORS.blue
    }
    this.box = new Primitive(
      'box',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    this.box.position.set(-0.7, 3.0, 2)
    this.add(this.box)
  }

  createTriangular() {
    const geomConf = {
      radiusTop: 1.8,
      radiusBottom: 1.8,
      height: 0.3,
      radialSegments: 3
    }
    const matConf = {
      color: COLORS.red
    }
    const circle = new Primitive(
      'cylinder',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )

    circle.position.set(7.8, 2.7, 1.0)
    circle.rotation.x = calcDegtoRad(40)
    circle.rotation.z = calcDegtoRad(90)
    TweenMax.to(circle.position, 25, { z: 1, repeat: -1, yoyo: true, ease: Power0.easeNone })
    TweenMax.to(circle.rotation, 20, { x: calcDegtoRad(90), repeat: -1, yoyo: true, ease: Power0.easeNone })

    this.add(circle)
  }

  createCircleTube() {
    const numPoints = 100
    const start = new Vector3(0, 0, 1)
    const middle = new Vector3(0, 0, 1)
    const end = new Vector3(0, 0, 1)
    const curveQuad = new QuadraticBezierCurve3(start, middle, end)

    const geomConf = {
      path: curveQuad,
      tubularSegments: numPoints,
      radius: 0.7,
      radialSegments: 32,
      closed: false
    }
    const matConf = {
      color: COLORS.red
    }
    const tube = new Primitive(
      'tube',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    tube.rotation.y = calcDegtoRad(10)
    tube.position.set(1, -1, 0)
    this.add(tube)
  }

  createTube() {
    const numPoints = 100
    const start = new Vector3(-4, 2, 2)
    const middle = new Vector3(0, -1, 10)
    const end = new Vector3(2, 0, 2)
    const curveQuad = new QuadraticBezierCurve3(start, middle, end)

    const geomConf = {
      path: curveQuad,
      tubularSegments: numPoints,
      radius: 0.03,
      radialSegments: 32,
      closed: false
    }
    const matConf = {
      color: COLORS.beige
    }
    const tube = new Primitive(
      'tube',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: true
      }
    )
    this.add(tube)
  }

  createText() {
    const depth = 0.25
    const text3D = new Text3D('Design Coding', 'meshLambertMaterial', {
      color: COLORS.pink,
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
      color: COLORS.pink
    }
    const floor = new Primitive('box', 'meshLambertMaterial', { geomConf, matConf, isReceiveShadow: true })
    floor.position.z = -geomConf.depth * 0.5
    this.add(floor)
  }

  createLight() {
    const directionalLightConf = {
      color: COLORS.beige,
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
      color: COLORS.beige,
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
    this.cone.rotation.y += 0.001
    this.box.rotation.z += 0.001
    this.box.rotation.x -= 0.001
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  getRandomColor() {
    return COLORS[Object.keys(COLORS)[Math.floor(getRandomFloat(0, colorLen))]]
  }
}
