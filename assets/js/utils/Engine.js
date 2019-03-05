import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  Vector3
} from 'three'
import { TweenMax } from 'gsap'
import setOrbitControls from './setOrbitControls'

TweenMax.lagSmoothing(1000, 20)

export default class Engine {
  constructor(canvas, {
    isOrbitControls = true,
    cameraType = 'perspectiveCamera',
    orthographicCameraSize = 0.0025,
    fps = 60
  }) {
    TweenMax.ticker.fps(fps)
    this.cameraType = cameraType
    this.orthographicCameraSize = orthographicCameraSize
    this.canvas = canvas
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)
    window.addEventListener('orientationchange', this.resize)
    this.devicePixelRatio = window.devicePixelRatio ? Math.min(1.6, window.devicePixelRatio) : 1
    this.devicePixelRatio = 1
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: this.canvas })
    this.renderer.setPixelRatio(this.devicePixelRatio)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.setSize(this.width, this.height)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = 1
    this.scene = new Scene()
    this.camera()
    this.orbitControl(isOrbitControls)
    this.resize()
  }

  camera() {
    if (this.cameraType === 'perspectiveCamera') this.camera = new PerspectiveCamera(45, this.width / this.height, 0.1, 100)
    if (this.cameraType === 'orthographicCamera') this.camera = new OrthographicCamera(-this.width * this.orthographicCameraSize, this.width * this.orthographicCameraSize, this.height * this.orthographicCameraSize, -this.height * this.orthographicCameraSize, 0.001, 1000)
    this.camera.position.set(0, 0, 10)
    this.camera.lookAt(new Vector3(0, 0, 0))
  }

  orbitControl(isOrbitControls) {
    this.controls = setOrbitControls(this.camera, this.renderer, isOrbitControls)
  }

  add(object) {
    this.scene.add(object)
  }
  remove(object) {
    this.scene.remove(object)
  }
  start() {
    this.update()
  }

  render() {
    this.controls.update()
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
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight

    if (this.cameraType === 'perspectiveCamera') {
      this.camera.aspect = this.width / this.height
    }

    if (this.cameraType === 'orthographicCamera') {
      this.camera.left = -this.width * this.orthographicCameraSize
      this.camera.right = this.width * this.orthographicCameraSize
      this.camera.top = this.height * this.orthographicCameraSize
      this.camera.bottom = -this.height * this.orthographicCameraSize
    }
    this.renderer.setSize(this.width, this.height)
    this.camera.updateProjectionMatrix()
  }
}
