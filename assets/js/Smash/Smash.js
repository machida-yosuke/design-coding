import Engine from '~/assets/js/utils/Engine'
import Primitive from '~/assets/js/utils/Primitive'
import Light from '~/assets/js/utils/Light'
const COLORS = {
  pink: 0xf099aa,
  blue: 0x99c0f0,
  beige: 0xe0d1c3,
  red: 0xe26e5a,
  green: 0x477c62
}
export default class Smash extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: false,
      fps: 30
    })
    this.world = null
    this.meshes = []
    this.bodies = []

    this.camera.position.z = 300
    this.camera.position.y = 50
    this.initOimo()
    this.createFloor()
    this.createLight()
    window.addEventListener('click', () => {
      this.onMouseDown()
    }, false)
  }

  initOimo() {
    this.world = new OIMO.World(1 / 60, 2, 8)
  }

  createFloor() {
    const geomConf = {
      width: 4,
      height: 4,
      depth: 4,
      widthSegments: 2,
      heightSegments: 2,
      depthSegments: 2
    }
    const matConf = {
      color: COLORS.blue
    }
    const floor = new Primitive(
      'box',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: false
      }
    )
    this.world.add({
      size: [40, 8, 40],
      pos: [0, -40, 0],
      world: this.world
    })
    floor.scale.set(40, 8, 40)
    floor.position.set(0, -4, 0)
    floor.rotation.set(0, 0, 0)
    this.add(floor)
    this.world.gravity = new OIMO.Vec3(0, -100, 0)
  }

  updatePhysics() {
    if (this.world === null) return
    this.world.step()
    for (let i = 0, len = this.bodies.length; i < len; i++) {
      const b = this.bodies[i]
      const m = this.meshes[i]

      if (!b.sleeping) {
        m.position.copy(b.getPosition())
        m.quaternion.copy(b.getQuaternion())
      }
    }
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
      intensity: 0.5
    }
    const ambientLight = new Light(
      'ambientLight',
      ambientLightConf,
      {}
    )
    this.add(ambientLight)
  }

  createSphere() {
    const sphereSize = 10
    const rndm = Math.random()
    const w = sphereSize + rndm
    // const h = 1
    // const d = 1
    const x = Math.random() * 200 - 100
    const y = Math.random() * 100 + 100
    const z = Math.random() * 200 - 100
    const body = this.world.add({
      type: 'box',
      size: [w * 0.5, w * 0.5, w * 0.5],
      pos: [x, y, z],
      move: true,
      world: this.world
    })
    const geomConf = {
      width: w * 0.5,
      height: w * 0.5,
      depth: w * 0.5,
      widthSegments: 2,
      heightSegments: 2,
      depthSegments: 2
    }
    const matConf = {
      color: COLORS.blue
    }
    const mesh = new Primitive(
      'box',
      'meshLambertMaterial',
      {
        geomConf,
        matConf,
        isCastShadow: false
      }
    )
    mesh.scale.set(w * 0.5, w * 0.5, w * 0.5)
    mesh.position.set(x, y, z)
    this.bodies.push(body)
    this.meshes.push(mesh)
    this.add(mesh)
  }
  render() {
    // this.controls.update()
    this.updatePhysics()
    this.renderer.render(this.scene, this.camera)
  }

  onMouseDown() {
    for (let i = 0; i < 20; i++) {
      this.createSphere()
    }
  }
}
