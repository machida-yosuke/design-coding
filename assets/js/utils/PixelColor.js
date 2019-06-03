
import {
  WebGLRenderTarget,
  LinearFilter,
  NearestFilter,
  RGBAFormat,
  FloatType
} from 'three'

class PixelColor {
  constructor(opts) {
    this.renderer = opts.renderer
    this.width = opts.width
    this.height = opts.height

    this.renderTarget = new WebGLRenderTarget(
      this.width,
      this.height, {
        minFilter: LinearFilter,
        magFilter: NearestFilter,
        format: RGBAFormat,
        type: FloatType
      }
    )
    this.renderer.setRenderTarget(this.renderTarget)
  }

  setRenderTexture() {
    this.renderer.setRenderTarget(this.renderTarget)
  }

  resetRenderTexture() {
    this.renderer.setRenderTarget(null)
  }

  getAllPixleColor() {
    const read = new Float32Array(4)
    this.renderer.readRenderTargetPixels(this.renderTarget, 1, 1, 1, 1, read)
    console.log('r:' + read[ 0 ] + '<br/>g:' + read[ 1 ] + '<br/>b:' + read[ 2 ])
  }

  getPixlePointColor({ mouseX, mouseY, halfWidth, halfHeight }) {
    const read = new Float32Array(4)
    this.renderer.readRenderTargetPixels(this.renderTarget, halfWidth / 2 + mouseX, halfHeight / 2 - mouseY, 1, 1, read)
    console.log('r:' + read[ 0 ] + '<br/>g:' + read[ 1 ] + '<br/>b:' + read[ 2 ])
  }
}

export default PixelColor
