const SheetLoader = require('sheet-loader')

const sheetLoader = new SheetLoader({
  sheetKey: '1dPs_4c_7PPvrLRektHxrp1t0np2KqWbh1p8irV8SBTI',
  keyFilePath: './DesignCoding-aea962d9c469.json'
})

const sheetdate = {
  dest: './assets/json/DesignCoding.json',
  config: {
    sheetTitle: 'DesignCoding',
    columns: {
      day: 'day',
      title: 'title',
      description: 'description',
      ogp: 'ogp'
    }
  }
}

sheetLoader.loadRecords(
  sheetdate.config
).then((records) => {
  records.forEach(function (row) {
    console.log(row)
  })
})

// sheetLoader.loadRows('DesignCoding').then((rows) => {
//   console.log(rows)
// })

sheetLoader.exportRecords(sheetdate.dest, sheetdate.config).then(() => {
  console.log('done')
})
