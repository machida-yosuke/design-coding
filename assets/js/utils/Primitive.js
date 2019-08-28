import {
  Object3D,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshLambertMaterial,
  RawShaderMaterial,
  ShaderMaterial,
  PlaneBufferGeometry,
  BoxBufferGeometry,
  SphereGeometry,
  ConeGeometry,
  CylinderGeometry,
  TorusGeometry,
  CircleGeometry,
  TubeGeometry,
  RingGeometry,
  BufferAttribute
} from 'three'

export default class Primitive extends Object3D {
  constructor(
    geometryType,
    materialType,
    {
      geomConf,
      matConf,
      isReceiveShadow = false,
      isCastShadow = false,
      attribute = {}
    }
  ) {
    super()
    this.geom = null
    this.mat = null
    this.attribute = attribute
    this.setGeometry(geometryType, geomConf)
    this.setAttribute()
    this.setMaterial(materialType, matConf)

    const mesh = new Mesh(this.geom, this.mat)
    mesh.nameId = geometryType
    mesh.position.set(0, 0, 0)
    mesh.receiveShadow = isReceiveShadow
    mesh.castShadow = isCastShadow
    this.add(mesh)
  }

  setGeometry(geometryType, geomConf) {
    switch (geometryType) {
      case 'plane':
        // PlaneBufferGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
        this.geom = new PlaneBufferGeometry(geomConf.width, geomConf.height, geomConf.widthSegments, geomConf.heightSegments)
        break
      case 'box':
        // BoxBufferGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
        this.geom = new BoxBufferGeometry(geomConf.width, geomConf.height, geomConf.depth, geomConf.widthSegments, geomConf.heightSegments, geomConf.depthSegments)
        break
      case 'sphere':
        // SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
        this.geom = new SphereGeometry(geomConf.radius, geomConf.widthSegments, geomConf.heightSegments)
        break
      case 'cone':
        // ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
        this.geom = new ConeGeometry(geomConf.height, geomConf.radialSegments, geomConf.heightSegments)
        break
      case 'cylinder':
        // CylinderBufferGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
        this.geom = new CylinderGeometry(geomConf.radiusTop, geomConf.radiusBottom, geomConf.height, geomConf.radialSegments)
        break
      case 'torus':
        // TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
        this.geom = new TorusGeometry(geomConf.radius, geomConf.tube, geomConf.radialSegments, geomConf.tubularSegments, geomConf.arc)
        break
      case 'circle':
        // CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
        this.geom = new CircleGeometry(geomConf.radius, geomConf.segments, geomConf.thetaStart, geomConf.thetaLength)
        break
      case 'tube':
        // TubeBufferGeometry(path : Curve, tubularSegments : Integer, radius : Float, radialSegments : Integer, closed : Boolean)
        this.geom = new TubeGeometry(geomConf.path, geomConf.tubularSegments, geomConf.radius, geomConf.radialSegments, geomConf.closed)
        break
      case 'ring':
        // RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
        this.geom = new RingGeometry(geomConf.innerRadius, geomConf.outerRadius, geomConf.thetaSegments, geomConf.phiSegments)
        break
      default:
        break
    }
  }

  setAttribute() {
    if (Object.keys(this.attribute).length === 0) return
    this.geom.addAttribute('color', new BufferAttribute(new Float32Array(this.attribute.color), 4))
  }

  setMaterial(materialType, matConf) {
    switch (materialType) {
      case 'meshBasicMaterial':
        this.mat = new MeshBasicMaterial(matConf)
        break
      case 'meshStandardMaterial':
        this.mat = new MeshStandardMaterial(matConf)
        break
      case 'meshLambertMaterial':
        this.mat = new MeshLambertMaterial(matConf)
        this.mat.side = 2
        break
      case 'RawShaderMaterial':
        this.mat = new RawShaderMaterial(matConf)
        break
      case 'ShaderMaterial':
        this.mat = new ShaderMaterial(matConf)
        break
      default:
        break
    }
  }
}
