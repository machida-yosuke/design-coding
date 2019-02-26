import {
  Object3D,
  DirectionalLight,
  AmbientLight,
  DirectionalLightHelper
} from 'three'

let light
let helper
export default class Light extends Object3D {
  constructor(lightType, { lightConf }) {
    super()
    if (lightType === 'directionalLight') {
      light = new DirectionalLight(lightConf)
      helper = new DirectionalLightHelper(light, 0)
      light.castShadow = true
      light.shadow.mapSize.width = 2048
      light.shadow.mapSize.height = 2048
    }
    if (lightType === 'ambientLight') {
      light = new AmbientLight(lightConf)
    }
    this.add(light)
    this.add(helper)
  }
}
