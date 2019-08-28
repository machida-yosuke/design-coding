import OrbitControls from 'three-orbitcontrols'
import calcDegtoRad from './calcDegtoRad'
const setOrbitControls = (
  camera,
  renderer,
  isOrbitControls,
  {
    enableDamping = true,
    dampingFactor = 1,
    enableZoom = false,
    maxDistance = 10,
    minDistance = 1,
    minAzimuthAngle = -30,
    maxAzimuthAngle = 45,
    minPolarAngle = 45,
    maxPolarAngle = 135
  }
) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = isOrbitControls
  controls.enableDamping = enableDamping
  controls.dampingFactor = dampingFactor
  controls.enableZoom = enableZoom
  controls.maxDistance = maxDistance
  controls.minDistance = minDistance
  controls.minAzimuthAngle = calcDegtoRad(minAzimuthAngle)
  controls.maxAzimuthAngle = calcDegtoRad(maxAzimuthAngle)
  controls.minPolarAngle = calcDegtoRad(minPolarAngle)
  controls.maxPolarAngle = calcDegtoRad(maxPolarAngle)
  return controls
}
export default setOrbitControls
