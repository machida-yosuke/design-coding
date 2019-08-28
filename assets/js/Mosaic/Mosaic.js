import {
  Raycaster,
  Vector2
} from 'three'

import Engine from '~/assets/js/utils/Engine'
import Primitive from '~/assets/js/utils/Primitive'
import mosaicFragment from '~/assets/shader/Mosaic/mosaicFragment.fs'
import mosaicVertex from '~/assets/shader/Mosaic/mosaicVertex.vs'

const width = 750
const height = 750
const tile = 15
let count = 0
export default class Mosaic extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: true,
      cameraType: 'perspectiveCamera',
      fps: 30,
      fixedSize: {
        width: width,
        height: height
      },
      orbitOpts: {
        enableDamping: false,
        dampingFactor: 0.2,
        enableZoom: true,
        maxDistance: 900,
        minDistance: 1,
        minAzimuthAngle: -30,
        maxAzimuthAngle: 45,
        minPolarAngle: 45,
        maxPolarAngle: 135
      }
    })

    this.canvas = opts.canvas
    this.pixels = opts.pixels
    this.texture = opts.texture
    this.raycaster = new Raycaster()
    this.mouse = new Vector2()
    this.canvas.addEventListener('mousemove', event => this.handleMouseMove(event), false)
    this.init()
  }

  init() {
    this.camera.near = 0.1
    this.camera.far = 1000
    this.camera.position.z = 900
    this.scene.position.z = 0
    this.scene.position.x = width / -2
    this.scene.position.y = height / -2

    this.createPlane()
    this.renderer.autoClear = false
  }

  handleMouseMove(event) {
    const element = event.currentTarget
    const x = event.clientX - element.offsetLeft
    const y = event.clientY - element.offsetTop
    const w = element.offsetWidth
    const h = element.offsetHeight
    this.mouse.x = (x / w) * 2 - 1
    this.mouse.y = -(y / h) * 2 + 1
  }

  createPlane() {
    const geomConf = {
      width: tile,
      height: tile,
      widthSegments: 2,
      heightSegments: 2
    }

    for (let x = 0; x < width / tile; x++) {
      for (let y = 0; y < height / tile; y++) {
        const matConf = ({
          uniforms: {
            'texture': { value: this.texture },
            'uColor': { value: this.pixels[count] }
          },
          vertexShader: mosaicVertex,
          fragmentShader: mosaicFragment
        })
        const plane = new Primitive(
          'plane',
          'ShaderMaterial',
          {
            geomConf,
            matConf
          }
        )
        plane.position.x = x * tile + (tile / 2)
        plane.position.y = y * tile + (tile / 2)
        plane.nameX = x
        plane.nameY = y

        this.add(plane)
        count++
      }
    }
  }

  render() {
    if (this.controls) this.controls.update()
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    if (intersects.length > 0) {
      const vertex = intersects[0].object
      vertex.position.z = 100
    }
    this.renderer.render(this.scene, this.camera)
  }
}
