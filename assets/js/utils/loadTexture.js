import {
  TextureLoader
} from 'three'
export default function loadTexture(name, fileType) {
  const textuerLoader = new TextureLoader()
  return new Promise((resolve) => {
    textuerLoader.load(`img/sketch/${name}.${fileType}`, (textuer) => {
      resolve(textuer)
    },
    undefined,
    (err) => {
      console.error('An error happened.', err)
    })
  })
}
