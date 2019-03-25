import {
  Object3D,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  Mesh,
  FontLoader,
  ExtrudeBufferGeometry
} from 'three'

import OpenSansBoldFont from '~/assets/json/OpenSansBoldFont'
import shintakarazimaFont from '~/assets/json/shintakarazimaFont'
let mat
export default class Text3D extends Object3D {
  constructor(
    text,
    materialType,
    {
      fontType = 'OpenSansBoldFont',
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
      roughness = 0.5,
      isCastShadow = true
    }
  ) {
    super()
    this.fontType = fontType
    this.loadFont()
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
        const geom = new ExtrudeBufferGeometry(
          this.font.generateShapes(letter, size, 1),
          {
            steps,
            depth,
            bevelEnabled,
            bevelThickness,
            bevelSize,
            bevelSegments
          }
        )
        // ここのジオメトリーのサイズを出してる
        geom.computeBoundingBox()
        if (materialType === 'MeshNormalMaterial') {
          mat = new MeshNormalMaterial()
        }

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
        mesh.castShadow = isCastShadow
        mesh.position.x = this.basePosition
        this.basePosition += geom.boundingBox.max.x + letterSpacing
        this.add(mesh)
      }
    })
  }

  loadFont() {
    this.fontLoader = new FontLoader()
    if (this.fontType === 'OpenSansBoldFont') {
      this.font = this.fontLoader.parse(OpenSansBoldFont)
    }
    if (this.fontType === 'shintakarazimaFont') {
      this.font = this.fontLoader.parse(shintakarazimaFont)
    }
  }
}
