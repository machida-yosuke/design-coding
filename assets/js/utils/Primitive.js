import {
  Object3D,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  CylinderGeometry,
  TorusGeometry,
  CircleGeometry,
  TubeGeometry
} from 'three'

let geom
let mat
export default class Primitive extends Object3D {
  constructor(
    geometryType,
    materialType,
    {
      geomConf,
      matConf,
      isReceiveShadow = false,
      isCastShadow = false
    }
  ) {
    super()
    this.setGeometry(geometryType, geomConf)
    this.setMaterial(materialType, matConf)

    const mesh = new Mesh(geom, mat)
    mesh.nameId = geometryType
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
      case 'sphere':
        // SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
        geom = new SphereGeometry(geomConf.radius, geomConf.widthSegments, geomConf.heightSegments)
        break
      case 'cone':
        // ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
        geom = new ConeGeometry(geomConf.height, geomConf.radialSegments, geomConf.heightSegments)
        break
      case 'cylinder':
        // CylinderBufferGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
        geom = new CylinderGeometry(geomConf.radiusTop, geomConf.radiusBottom, geomConf.height, geomConf.radialSegments)
        break
      case 'torus':
        // TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
        geom = new TorusGeometry(geomConf.radius, geomConf.tube, geomConf.radialSegments, geomConf.tubularSegments, geomConf.arc)
        break
      case 'circle':
        // CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
        geom = new CircleGeometry(geomConf.radius, geomConf.segments, geomConf.thetaStart, geomConf.thetaLength)
        break
      case 'tube':
        // TubeBufferGeometry(path : Curve, tubularSegments : Integer, radius : Float, radialSegments : Integer, closed : Boolean)
        geom = new TubeGeometry(geomConf.path, geomConf.tubularSegments, geomConf.radius, geomConf.radialSegments, geomConf.closed)
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
