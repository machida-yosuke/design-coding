import * as THREE from 'three'
export default class Engine {
  constructor(opts) {
    this.canvas = opts
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.canvas.addEventListener('resize', this.resize)
    this.canvas.addEventListener('orientationchange', this.resize)
    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)
    this.init()
    this.resize()
  }

  init() {
    this.devicePixelRatio = window.devicePixelRatio ? Math.min(1.6, window.devicePixelRatio) : 1
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: this.canvas })
    this.renderer.setPixelRatio(this.devicePixelRatio)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.setSize(this.width, this.height)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 2000)
    this.camera.position.set(0, 0, 10)
  }

  add(mesh) {
    this.scene.add(mesh)
  }
  remove(mesh) {
    this.scene.remove(mesh)
  }
  start() {
    this.update()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  update() {
    this.render()
    requestAnimationFrame(this.update)
  }

  resize() {
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }
}
