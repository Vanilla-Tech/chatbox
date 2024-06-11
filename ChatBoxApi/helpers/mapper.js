function kendoMapper(req) {
  var take = parseInt(req.take)
  var skip = parseInt(req.skip)
  var sort = {}
  var filter = {}
  req.sort.forEach(x => {
    sort[x.field] = x.dir === 'asc' ? 1 : -1
  })
  if (req.sort.length === 0) {
    sort = { _id: -1 }
  }
  if (req.filter && req.filter.filters && req.filter.filters.length > 0) {
    req.filter.filters.forEach(x => {
      var operator = {}
      var not = {}
      switch (x.operator) {
        case 'contains':
          var operation = '$regex'
          operator[operation] = new RegExp([x.value].join(''), 'i')
          filter[x.field] = operator
          break
        case 'eq':
          filter[x.field] = x.value
          break
        case 'neq':
          var operation = '$ne'
          operator[operation] = x.value
          filter[x.field] = operator
          break
        case 'lt':
          var operation = '$lt'
          operator[operation] = x.value
          filter[x.field] = operator
          break
        case 'lte':
          var operation = '$lte'
          operator[operation] = x.value
          filter[x.field] = operator
          break
        case 'gt':
          var operation = '$gt'
          operator[operation] = x.value
          filter[x.field] = operator
          break
        case 'gte':
          var operation = '$gte'
          operator[operation] = x.value
          filter[x.field] = operator
          break
        case 'startswith':
          var operation = '$regex'
          operator[operation] = new RegExp(['^', x.value].join(''), 'i')
          filter[x.field] = operator
          break
        case 'endswith':
          var operation = '$regex'
          operator[operation] = new RegExp([x.value, '$'].join(''), 'i')
          filter[x.field] = operator
          break
        case 'doesnotcontain':
          var operation = '$regex'
          operator[operation] = new RegExp(
            ['^((?!', x.value, ').)*$'].join(''),
            'i'
          )
          filter[x.field] = operator
          break
        default:
          break
      }
    })
  }
  return {
    take,
    skip,
    sort,
    filter
  }
}

module.exports = { kendoMapper }
