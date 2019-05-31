import {
  Mesh
} from 'three'
import GLTFLoader from 'three-gltf-loader'
export default function loadGltf(path) {
  const loader = new GLTFLoader()
  const MeshArr = []
  return new Promise((resolve) => {
    loader.load(
      path,
      (gltf) => {
        console.log(gltf.parser.json.accessors, 'accessors')
        console.log(gltf.parser.json, 'gltf')
        gltf.scene.name = 'katana'
        gltf.scene.traverse((node) => {
          if (node instanceof Mesh) {
            console.log(node.meshes)
            MeshArr.push(node)
          }
        })
        console.log(MeshArr, 'MeshArr')
        resolve(gltf.scene)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '%のロード完了')
      },
      (error) => {
        console.log(error, '読み込みに失敗しました')
      }
    )
  })
}
