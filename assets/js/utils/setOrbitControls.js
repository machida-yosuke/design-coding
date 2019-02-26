import OrbitControls from 'three-orbitcontrols'
import calcDegtoRad from './calcDegtoRad'
const setOrbitControls = (camera, renderer, isOrbitControls) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = isOrbitControls
  controls.enableDamping = true
  controls.dampingFactor = 1
  controls.enableZoom = false
  controls.maxDistance = 10
  controls.minDistance = 1
  controls.minAzimuthAngle = -calcDegtoRad(30)
  controls.maxAzimuthAngle = calcDegtoRad(45)
  controls.minPolarAngle = calcDegtoRad(45)
  controls.maxPolarAngle = calcDegtoRad(135)
  return controls
}
export default setOrbitControls
