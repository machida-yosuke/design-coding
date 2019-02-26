import { TweenMax, Linear } from 'gsap/TweenMax'
const loopAnimation = (object, duration, value) => {
  const tl = new TweenMax()
  tl.to(object.position, duration, { z: value, repeat: -1, yoyo: true, ease: Linear.easeNone })
}
export default loopAnimation
