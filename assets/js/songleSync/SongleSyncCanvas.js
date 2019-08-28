import {
  TweenMax,
  TimelineMax,
  Circ
//   Power1,
//   Power0
} from 'gsap'
import Engine from '~/assets/js/utils/Engine'
import Text3D from '~/assets/js/utils/Text3D'
import createGroup from '~/assets/js/utils/createGroup'
import Light from '~/assets/js/utils/Light'
import calcDegtoRad from '~/assets/js/utils/calcDegtoRad'
import getRandomFloat from '~/assets/js/utils/getRandomFloat'
import tohex from '~/assets/js/utils/tohex'
const COLORS = {
  brown: 0xa6741b,
  yellow: 0xdca94a,
  beige: 0xdbd0c7,
  red: 0xc7465e,
  green: 0x477059,
  blue: 0x1c376c
}

const MIN_SCALE = 0.0001
const MAX_SCALE = 2
const colorLen = Object.keys(COLORS).length
export default class SongleSyncCanvas extends Engine {
  constructor(opts) {
    super(opts.canvas, {
      isOrbitControls: true,
      fps: 30
    })
    this.deviceType = opts.deviceType
    this.beatDom = document.querySelector('.beat')
    this.beatDomWidth = this.beatDom.offsetWidth
    this.dotDom = document.querySelector('.dot')
    this.createTextShin()
    this.createTextTakara()
    this.createTextZima()
    this.createLight()
    console.log(this.deviceType)
  }
  createTextShin() {
    this.textShinGroup = createGroup()
    const depth = 1
    const textShin = new Text3D('新', 'meshStandardMaterial', {
      fontType: 'shintakarazimaFont',
      color: COLORS.red,
      size: 1.5,
      letterSpacing: 0.2,
      depth,
      steps: 1,
      isCastShadow: false
    })
    textShin.position.y -= textShin.size * 0.5
    textShin.position.x -= textShin.size * 0.5
    if (this.deviceType === 'pc') {
      this.textShinGroup.position.x -= (textShin.size + 1.5)
    }
    if (this.deviceType === 'smartphone') {
      this.textShinGroup.position.y += textShin.size
    }

    this.textShinGroup.rotation.y = calcDegtoRad(10)
    this.textShinGroup.scale.set(MIN_SCALE, MIN_SCALE, MIN_SCALE)
    this.textShinGroup.add(textShin)
    this.add(this.textShinGroup)
  }
  createTextTakara() {
    this.textTakaraGroup = createGroup()
    const depth = 1
    const textTakara = new Text3D('宝', 'meshStandardMaterial', {
      fontType: 'shintakarazimaFont',
      color: COLORS.yellow,
      size: 1.5,
      letterSpacing: 0.2,
      depth,
      steps: 1,
      isCastShadow: false
    })
    textTakara.position.y -= textTakara.size * 0.5
    textTakara.position.x -= textTakara.size * 0.5
    this.textTakaraGroup.rotation.y = calcDegtoRad(-10)
    this.textTakaraGroup.scale.set(MIN_SCALE, MIN_SCALE, MIN_SCALE)
    this.textTakaraGroup.add(textTakara)
    this.add(this.textTakaraGroup)
  }
  createTextZima() {
    this.textZimaGroup = createGroup()
    const depth = 1
    const textZima = new Text3D('島', 'meshStandardMaterial', {
      fontType: 'shintakarazimaFont',
      color: COLORS.blue,
      size: 1.5,
      letterSpacing: 0.2,
      depth,
      steps: 1,
      isCastShadow: false
    })
    textZima.position.y -= textZima.size * 0.5
    textZima.position.x -= textZima.size * 0.5
    if (this.deviceType === 'pc') {
      this.textZimaGroup.position.x += (textZima.size + 1.5)
    }
    if (this.deviceType === 'smartphone') {
      this.textZimaGroup.position.y -= textZima.size
    }

    this.textZimaGroup.rotation.y = calcDegtoRad(12)
    this.textZimaGroup.scale.set(MIN_SCALE, MIN_SCALE, MIN_SCALE)
    this.textZimaGroup.add(textZima)
    this.add(this.textZimaGroup)
  }

  createLight() {
    const directionalLightConf = {
      color: COLORS.beige,
      intensity: 0.8
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
      intensity: 1.9
    }
    const ambientLight = new Light(
      'ambientLight',
      ambientLightConf,
      {}
    )
    this.add(ambientLight)
  }

  tweenBeat(position) {
    this.beatDomWidth = this.beatDom.offsetWidth
    this.beatDom.style.background = `#${tohex(this.getRandomColor())}`
    TweenMax.set(
      this.beatDom,
      { x: (position - 1) * this.beatDomWidth }
    )
    if (position === 1) {
      this.tweenText(this.textShinGroup)
    }
    if (position === 2) {
      this.tweenBot()
      this.tweenText(this.textTakaraGroup)
    }
    if (position === 3) {
      this.tweenText(this.textZimaGroup)
    }
    if (position === 4) {
      this.tweenBot()
    }
  }
  tweenText(text) {
    const tl = new TimelineMax({
      onComplete: () => {
        const retrunTl = new TimelineMax()
        retrunTl.to(text.scale, 0.5, {
          x: MIN_SCALE,
          y: MIN_SCALE,
          z: MIN_SCALE,
          ease: Circ.easeInOut
        })
      }
    })
    tl.fromTo(text.scale, 0.2, {
      x: MIN_SCALE,
      y: MIN_SCALE,
      z: MIN_SCALE
    }, {
      x: MAX_SCALE,
      y: MAX_SCALE,
      z: MAX_SCALE,
      ease: Circ.easeOut
    })
  }

  tweenBot() {
    const random = Math.floor(getRandomFloat(0, 10)) * 10
    TweenMax.to(this.dotDom, 0.3, {
      backgroundImage: `radial-gradient(circle farthest-side, #${tohex(this.getRandomColor())} ${random}%, transparent 40%, transparent 100%), radial-gradient(circle farthest-side, #${tohex(this.getRandomColor())} ${random}%, #${tohex(this.getRandomColor())} 25%, #${tohex(this.getRandomColor())} 40%, transparent 40%, transparent 100%)`,
      backgroundSize: `${random}px ${random}px, ${random}px ${random}px`,
      backgroundPosition: `0px 0px, ${random}px ${random}px`,
      ease: Circ.easeInOut
    })
  }
  getRandomColor() {
    return COLORS[Object.keys(COLORS)[Math.floor(getRandomFloat(0, colorLen))]]
  }

  render() {
    console.log('songle')
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
