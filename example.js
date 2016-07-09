const news = require('./')

news((data) => {
  console.log('should make an http req')
  console.log(data[0].title)
})

news((data) => {
  console.log('should grab from cache')
  console.log(data[1].title)
})

news((data) => {
  console.log('should grab from cache')
  console.log(data[2].title)
})

news((data) => {
  console.log('should grab from cache')
  console.log(data[3].title)
})
