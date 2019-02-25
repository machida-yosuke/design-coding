import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera
} from 'three'
import { TweenMax } from 'gsap'

TweenMax.lagSmoothing(1000, 20)
export default class Engine {
  constructor(opts) {
    this.canvas = opts
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)
    window.addEventListener('orientationchange', this.resize)
    this.init()
    this.resize()
  }

  init() {
    this.devicePixelRatio = window.devicePixelRatio ? Math.min(1.6, window.devicePixelRatio) : 1
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: this.canvas })
    this.renderer.setPixelRatio(this.devicePixelRatio)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.setSize(this.width, this.height)
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(45, this.width / this.height, 0.1, 100)
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
    TweenMax.ticker.addEventListener('tick', this.update)
  }

  destroy() {
    TweenMax.ticker.removeEventListener('tick', this.render)
  }

  resize() {
    console.log(this.canvas)
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    console.log('resize', this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }
}
