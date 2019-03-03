import {
  Object3D,
  DirectionalLight,
  AmbientLight,
  DirectionalLightHelper
} from 'three'

let light
let helper
export default class Light extends Object3D {
  constructor(
    lightType,
    lightConf,
    {
      isShadow = false,
      isHelper = false
    }
  ) {
    super()
    if (lightType === 'directionalLight') {
      // DirectionalLight( color : Integer, intensity : Float )
      light = new DirectionalLight(lightConf.color, lightConf.intensity)
      if (isHelper) {
        helper = new DirectionalLightHelper(light, 3)
        this.add(helper)
      }
      if (isShadow) {
        light.castShadow = true
        light.shadow.mapSize.width = 2048
        light.shadow.mapSize.height = 2048
      }
    }
    if (lightType === 'ambientLight') {
      // AmbientLight( color : Integer, intensity : Float )
      light = new AmbientLight(lightConf.color, lightConf.intensity)
    }
    this.add(light)
  }
}
