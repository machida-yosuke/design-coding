import THREE from 'three'
export default class ThreeBase {
  constructor(opts) {
    this.canvas = opts.canvas
    console.log(this.canvas)
    this.resizeWindow()
    this.initThree()
  }

  resizeWindow() {
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
  }

  initThree() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 2000)
  }
}
