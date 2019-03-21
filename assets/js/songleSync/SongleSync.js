import token from './songleSyncConfig'
const url = 'https://www.youtube.com/watch?v=LIlZCmETvsY'
class SongleSync {
  constructor() {
    this.chord = ''
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
    } else {
      // slaveの場合
      this.player = new this.SW.Player()
      this.player.accessToken = token.accessToken
    }

    this.player.addPlugin(new this.SW.Plugin.SongleWidget({
      responsive: true,
      showController: false,
      showOriginalSiteLink: false,
      showMusicMap: false,
      showSongleJpSiteLink: false
    }))

    // slaveを同期させるプラグインを設定
    this.player.addPlugin(new this.SW.Plugin.SongleSync())

    // 利用するイベントのプラグインを設定
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
        // this.setPlayerCtrl()
        setTimeout(() => {
          // this.player.play()
          this.player.stop()
          console.log(this.player.musicMap)
          console.log(this.player)
        }, 1000)
      })
    }
  }

  // プレイヤー操作ボタン設定
  setPlayerCtrl() {
    // // 再生
    // $('#widget_ctrl .play').click(function () {
    //   player.play()
    // })
    // // 停止
    // $('#widget_ctrl .pause').click(function () {
    //   player.pause()
    // })
    // // 先頭
    // $('#widget_ctrl .head').click(function () {
    //   player.seekTo(0)
    // })
    // // サビ出し
    // $('#widget_ctrl .seekto_chorus').click(function () {
    //   player.seekToNextChorusSectionItem()
    // })
    // $('#widget_ctrl').css({ display: 'table' })
    // $('.memo').show()
  }

  // ビートでタイルの色を変える（cssで指定）
  setBeatEvent() {
    // player.on('beatEnter', function (e) {
    //   for (let i = 1; i <= 4; i++) {
    //     li = $('#beats li.b' + i)
    //     if (e.data.beat.position == i) {
    //       li.addClass('current')
    //     } else {
    //       li.removeClass('current')
    //     }
    //   }
    // })
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

  // サビはビートの色を変更(cssで指定)し、右上に「サビ」と表示させる
  setChorusEvent() {
    // player.on('chorusSectionEnter', function (e) {
    //   $('#beats').addClass('chorus')
    //   $('#chorus_alert').show()
    // })
    // player.on('chorusSectionLeave', function (e) {
    //   $('#beats').removeClass('chorus')
    //   $('#chorus_alert').hide()
    // })
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
    console.log('消した')
  }
}

export default SongleSync
