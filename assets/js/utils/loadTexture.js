import {
  TextureLoader
} from 'three'
export default function loadTexture({ path, name }) {
  const textuerLoader = new TextureLoader()
  return new Promise((resolve) => {
    textuerLoader.load(require(`~/assets/image/${path}/${name}`), (textuer) => {
      resolve(textuer)
    },
    undefined,
    (err) => {
      console.error('An error happened.', err)
    })
  })
}
