import {
  TweenMax
} from 'gsap'
import token from './songleSyncConfig'
const url = 'https://www.youtube.com/watch?v=LIlZCmETvsY'
class SongleSync {
  constructor() {
    this.chord = ''
    this.beatDom = document.querySelector('.beat')
    this.beatDomWidth = this.beatDom.offsetWidth
  }

  setApi() {
    // APIの準備が出来ると呼ばれる
    window.onSongleWidgetAPIReady = (SongleWidgetAPI) => {
      this.SW = SongleWidgetAPI
      this.SW.System.defaultEndpointWebClientProtocol = 'https:'
      this.init()
    }
  }

  init() {
    if (this.getUrlVars().master === '1') {
      // masterの場合 (引数 master=1)
      this.player = new this.SW.Player({
        mediaElement: '#songle' // プレイヤーを埋め込むDOMを指定
      })
      this.player.accessToken = token.accessToken
      this.player.secretToken = token.secretToken // secretTokenをセットするとmasterになる
      // 再生するメディアをセット
      this.player.useMedia(url)
      this.player.addPlugin(new this.SW.Plugin.SongleWidget({ element: '.songle-widget' }))
    } else {
      // slaveの場合
      this.player = new this.SW.Player({
        mediaElement: '#songle' // プレイヤーを埋め込むDOMを指定
      })
      this.player.accessToken = token.accessToken
      this.player.useMedia(url)
    }

    // 何かあったらコンソールに書き出す
    this.player.on('play', (ev) => {
      console.log('play')
    })
    // this.player.on('mediaStateChange', ev => console.log('mediaStateChange', ev))
    this.player.on('seek', ev => console.log('seek'))

    this.player.on('pause', (ev) => {
      console.log('pause')
    })

    this.player.on('finish', (ev) => {
      console.log('finish')
      this.player.seekTo(0)
    })

    this.player.addPlugin(new this.SW.Plugin.SongleSync())

    this.player.addPlugin(new this.SW.Plugin.Beat())
    this.player.addPlugin(new this.SW.Plugin.Chorus())
    this.player.addPlugin(new this.SW.Plugin.Chord())

    // 各イベントに対応するアクションを設定
    this.setBeatEvent()
    this.setChordEvent()
    this.setChorusEvent()

    // masterの場合は動画を再生
    if (this.getUrlVars().master === '1') {
      // mediaReadyで動画が準備完了したら実行
      this.player.on('mediaReady', () => {
        // プレイヤー操作ボタン設定
        console.log('mediaReady')
        this.player.stop()
        setTimeout(() => {
          this.player.stop()
          this.player.play()
          this.player.seekTo(0)
        }, 2000)
      })
    }
  }

  setBeatEvent() {
    this.player.on('beatEnter', (e) => {
      switch (e.data.beat.position) {
        case 1:
          // You can write code for the 1st beat ...
          console.log('1nd beat')
          this.tweenBeat(e.data.beat.position)
          break

        case 2:
          // You can write code for the 2nd beat ...
          console.log('2nd beat')
          this.tweenBeat(e.data.beat.position)
          break

        case 3:
          // You can write code for the 3rd beat ...
          console.log('3rd beat')
          this.tweenBeat(e.data.beat.position)
          break

        case 4:
          // You can write code for the 4th beat ...
          console.log('4th beat')
          this.tweenBeat(e.data.beat.position)
          break
      }
    })
  }

  // コード左上に表示する
  setChordEvent() {
    this.player.on('chordEnter', (e) => {
      if (e.data.chord.name !== 'N') {
        this.chord = e.data.chord.name
      } else {
        this.chord = ''
      }
    })
  }

  setChorusEvent() {
    this.player.on('chorusSectionEnter', (e) => {
      console.log(e)
    })
    this.player.on('chorusSectionLeave', (e) => {
      console.log(e)
    })
  }

  tweenBeat(position) {
    this.beatDomWidth = this.beatDom.offsetWidth
    TweenMax.set(
      this.beatDom,
      { x: (position - 1) * this.beatDomWidth }
    )
  }

  getUrlVars() {
    let i, key, keySearch, len, p, val
    const vars = {}
    const param = location.search.substring(1).split('&')
    for (i = 0, len = param.length; i < len; i++) {
      p = param[i]
      keySearch = p.search(/=/)
      key = ''
      if (keySearch !== -1) {
        key = p.slice(0, keySearch)
        val = p.slice(p.indexOf('=', 0) + 1)
        if (key !== '') {
          vars[key] = decodeURI(val)
        }
      }
    }
    return vars
  }
  destroy() {
    this.player.seekTo(0)
    this.player.stop()
    this.SW = null
    this.player = null
  }
}

export default SongleSync
