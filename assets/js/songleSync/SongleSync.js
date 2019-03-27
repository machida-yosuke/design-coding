import EventEmitter from 'events'
import token from './songleSyncConfig'
const url = 'https://www.youtube.com/watch?v=LIlZCmETvsY'
class SongleSync extends EventEmitter {
  constructor() {
    super()
    this.chord = ''
    this.onBeatEnter = (e) => {
      switch (e.data.beat.position) {
        case 1:
          this.emit('beat', 1)
          break
        case 2:
          this.emit('beat', 2)
          break
        case 3:
          this.emit('beat', 3)
          break
        case 4:
          this.emit('beat', 4)
          break
      }
    }

    this.onPlay = (e) => {
      console.log('play')
    }
    this.onSeek = (e) => {
      console.log(e, 'seek')
    }
    this.onPause = (e) => {
      console.log('pause')
    }
    this.onFinish = (e) => {
      this.player.seekTo(0)
      this.emit('finish')
    }

    this.onChordEnter = (e) => {
      if (e.data.chord.name !== 'N') {
        this.chord = e.data.chord.name
        this.emit('chord', this.chord)
      } else {
        this.chord = ''
      }
    }

    this.onChorusSectionEnter = (e) => {
      console.log(e, 'サビ開始')
      this.emit('chorus', 'enter')
    }
    this.onChorusSectionLeave = (e) => {
      console.log(e, 'サビ終わり')
      this.emit('chorus', 'leave')
    }
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
      const songle = document.querySelector('#songle')
      const songlewidget = document.querySelector('.songle-widget')
      console.log('songle', songle)
      console.log('songlewidget', songlewidget)
      this.player = new this.SW.Player({
        mediaElement: '#songle'
      })
      this.player.accessToken = token.accessToken
      this.player.secretToken = token.secretToken // secretTokenをセットするとmasterになる
      // 再生するメディアをセット
      this.player.useMedia(url)
      this.player.addPlugin(new this.SW.Plugin.SongleWidget({ element: '.songle-widget' }))
    } else {
      // slaveの場合
      this.player = new this.SW.Player({
        mediaElement: '#songle'
      })
      this.player.accessToken = token.accessToken
      this.player.useMedia(url)
    }
    // 何かあったらコンソールに書き出す
    this.player.on('play', this.onPlay)
    this.player.on('seek', this.onSeek)
    this.player.on('pause', this.onPause)
    this.player.on('finish', this.onFinish)

    this.player.addPlugin(new this.SW.Plugin.SongleSync())
    this.player.addPlugin(new this.SW.Plugin.Beat())
    this.player.addPlugin(new this.SW.Plugin.Chorus())
    this.player.addPlugin(new this.SW.Plugin.Chord())

    this.setBeatEvent()
    this.setChordEvent()
    this.setChorusEvent()

    this.onMediaReady = () => {
      console.log('mediaReady')
      this.player.stop()
      setTimeout(() => {
        this.player.stop()
        this.player.play()
        this.player.seekTo(0)
        this.emit('play')
      }, 2000)
    }
    this.player.on('mediaReady', this.onMediaReady)
  }

  setBeatEvent() {
    this.player.on('beatEnter', this.onBeatEnter)
  }

  setChordEvent() {
    this.player.on('chordEnter', this.onChordEnter)
  }

  setChorusEvent() {
    this.player.on('chorusSectionEnter', this.onChorusSectionEnter)
    this.player.on('chorusSectionLeave', this.onChorusSectionLeave)
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
    // this.player.removeListener('play', this.onPlay)
    // this.player.removeListener('seek', this.onSeek)
    // this.player.removeListener('pause', this.onPause)
    // this.player.removeListener('finish', this.onFinish)
    // this.player.removeListener('mediaReady', this.onMediaReady)
    // this.player.removeListener('beatEnter', this.onBeatEnter)
    // this.player.removeListener('chordEnter', this.onChordEnter)
    // this.player.removeListener('chorusSectionEnter', this.onChorusSectionEnter)
    // this.player.removeListener('chorusSectionLeave', this.onChorusSectionLeave)
    this.player.stop()
    this.SW = null
    this.player = null
  }
}

export default SongleSync
