import {
  Object3D,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  BoxGeometry,
  SphereGeometry
} from 'three'

let geom
let mat
export default class Primitive extends Object3D {
  constructor(geometryType, materialType, { geomConf, matConf, isReceiveShadow, isCastShadow }) {
    super()
    this.setGeometry(geometryType, geomConf)
    this.setMaterial(materialType, matConf)

    const mesh = new Mesh(geom, mat)
    mesh.position.set(0, 0, 0)
    mesh.receiveShadow = isReceiveShadow
    mesh.castShadow = isCastShadow
    this.add(mesh)
  }

  setGeometry(geometryType, geomConf) {
    switch (geometryType) {
      case 'plane':
        // PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
        geom = new PlaneGeometry(geomConf.width, geomConf.height, geomConf.widthSegments, geomConf.heightSegments)
        break
      case 'box':
        // BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
        geom = new BoxGeometry(geomConf.width, geomConf.height, geomConf.depth, geomConf.widthSegments, geomConf.heightSegments, geomConf.depthSegments)
        break
      case 'Sphere':
        // SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
        geom = new SphereGeometry(geomConf.radius, geomConf.widthSegments, geomConf.heightSegments)
        break
      default:
        break
    }
  }
  setMaterial(materialType, matConf) {
    switch (materialType) {
      case 'meshBasicMaterial':
        mat = new MeshBasicMaterial(matConf)
        break
      case 'meshStandardMaterial':
        mat = new MeshStandardMaterial(matConf)
        break
      case 'meshLambertMaterial':
        mat = new MeshLambertMaterial(matConf)
        break
      default:
        break
    }
  }
}
