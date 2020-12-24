const _ = require('lodash')
const getPages = (itemsCount, pageSize) => {
    const pagesCount = Math.ceil(itemsCount/pageSize)
    return _.range(1, pagesCount + 1)
}

module.exports = {
    getPages
}