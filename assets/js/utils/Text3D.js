import {
  Object3D,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshLambertMaterial,
  Mesh,
  FontLoader,
  ExtrudeBufferGeometry
} from 'three'

import fontFile from '~/assets/json/FontOpenSansBold'
const fontLoader = new FontLoader()
const font = fontLoader.parse(fontFile)
let mat
export default class Text3D extends Object3D {
  constructor(
    text,
    materialType,
    {
      size = 0.8,
      letterSpacing = 0.03,
      color = '#000000',
      wireframe = false,
      steps = 12,
      depth = 0.2,
      bevelEnabled = false,
      bevelThickness = 0,
      bevelSize = 0,
      bevelSegments = 0,
      roughness = 0.5
    }
  ) {
    super()
    this.basePosition = 0
    this.size = size
    const letters = [...text]
    letters.forEach((letter) => {
      if (letter === ' ') {
        // 空白スペースの場合
        this.basePosition += size * 0.5
      } else {
        // ここで文字のジオメトリー作成
        // const geom = new ShapeGeometry(font.generateShapes(letter, size, 1))
        const geom = new ExtrudeBufferGeometry(font.generateShapes(letter, size, 1), { steps, depth, bevelEnabled, bevelThickness, bevelSize, bevelSegments })
        // ここのジオメトリーのサイズを出してる
        geom.computeBoundingBox()

        // マテリアル情報
        if (materialType === 'meshBasicMaterial') {
          mat = new MeshBasicMaterial({
            color,
            opacity: 1,
            transparent: true,
            wireframe
          })
        }

        if (materialType === 'meshStandardMaterial') {
          mat = new MeshStandardMaterial({
            color,
            roughness,
            wireframe
          })
        }
        if (materialType === 'meshLambertMaterial') {
          mat = new MeshLambertMaterial({
            color,
            wireframe
          })
        }

        const mesh = new Mesh(geom, mat)
        mesh.castShadow = true
        mesh.position.x = this.basePosition
        this.basePosition += geom.boundingBox.max.x + letterSpacing
        this.add(mesh)
      }
    })
  }
}
