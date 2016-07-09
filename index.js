const hq = require('hyperquest')
const js = require('jsonstream')
const concat = require('concat-stream')
const AC = require('async-cache')

const HOUR = 1000 * 60 * 10 * 60
const links = new AC({
  max: 1000,
  maxAge: HOUR,
  load: refresh
})

function refresh (key, cb) {
  const cs = concat((data) => {
    const links = data.map((item) => {
      const url = item.url
      const title = item.title
      return {url, title}
    })

    return cb(links)
  })

  hq('https://www.reddit.com/r/UpliftingNews/.json')
    .pipe(js.parse('data.children.*.data'))
    .pipe(cs)
}

function get (cb) {
  links.get('urls', (data) => {
    return cb(data)
  })
}

module.exports = get
