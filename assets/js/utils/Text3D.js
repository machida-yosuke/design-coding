import {
  Object3D,
  // ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  FontLoader,
  ExtrudeBufferGeometry
} from 'three'

import fontFile from '~/assets/json/FontOpenSansBold'
const fontLoader = new FontLoader()
const font = fontLoader.parse(fontFile)

const extrudeSettings = {
  steps: 12,
  depth: 0.2,
  bevelEnabled: false,
  bevelThickness: 1,
  bevelSize: 1,
  bevelSegments: 1
}

export default class Text3D extends Object3D {
  constructor(
    text,
    {
      size = 0.8,
      letterSpacing = 0.03,
      color = '#000000',
      wireframe = false
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
        const geom = new ExtrudeBufferGeometry(font.generateShapes(letter, size, 1), extrudeSettings)
        // ここのジオメトリーのサイズを出してる
        geom.computeBoundingBox()

        // マテリアル情報
        const mat = new MeshBasicMaterial({
          color,
          opacity: 1,
          transparent: true,
          wireframe
        })
        const mesh = new Mesh(geom, mat)

        mesh.position.x = this.basePosition
        this.basePosition += geom.boundingBox.max.x + letterSpacing
        this.add(mesh)
      }
    })
  }
}
