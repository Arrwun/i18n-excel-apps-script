function getFiliterEmptyValue(obj) {
  const resultObj = {...obj}
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete resultObj[propName];
    }
  }

  return resultObj
}

function formatObject(values, langIndex) {
  return values.reduce((pre, cur) => {
    return {
        ...pre,
        [cur[0]]: cur[langIndex]
    }
  }, {})
}
