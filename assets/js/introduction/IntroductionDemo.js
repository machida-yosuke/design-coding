import Engine from '../utils/Engine'
import Text3D from '../utils/Text3D'

export default class IntroductionDemo extends Engine {
  constructor(opts) {
    super(opts.canvas)
    this.createText()
    this.createFloor()
  }
  createText() {
    const text3D = new Text3D('Design Coding', {
      color: '#ffffff'
    })
    text3D.position.x -= text3D.basePosition * 0.5
    this.add(text3D)
  }
  createFloor() {
    console.log('createFloor')
  }
}
