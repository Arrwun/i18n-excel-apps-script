const ID = '1StGSmaPhe11QIsFc-QUJc8PMeiy4tW0-m3qOlkP25zU'
const DOWNLOAD_FILE_NAME = 'excelExportAllLang.json'
const NO_USE_SHEET_LIST = ['winIPhone12', 'getDepositReward']

function onOpen() {
  createSelfTools()
  createTransleJSONMenu()
}

// Create all lang export function 
for(const [index, lang] of getAllTabList().entries()) {
  this[getExportFunctionName(lang)] = function() {
    exportJson(lang)
  }
}

function createSelfTools() {
  SpreadsheetApp.getUi()
      .createMenu('Self Tools')
      .addItem('Refresh', 'createTransleJSONMenu')
      .addItem('All Lang Json', 'exportAllLangJson')
      .addToUi();
}

function createTransleJSONMenu() {
  const menu = SpreadsheetApp.getUi().createMenu('CSV to JSON')
    const langList = getAllTabList()
    for (const [index, lang] of langList.entries()) {
      menu.addItem(lang, getExportFunctionName(lang))
    }
    menu.addToUi() 
}

function exportAllLangJson() {
  var spreadsheet = SpreadsheetApp.openById(ID)
  const sheetList = spreadsheet.getSheets()
  let exportObj = {}
  getAllTabList().forEach((key) => {
    exportObj[key] = {}
  })
  
  sheetList.forEach((sheet) => {
    const sheetName = sheet.getSheetName()
    if(NO_USE_SHEET_LIST.includes(sheetName)) {
      return
    }
    
    const values = sheet.getDataRange().getValues()
    getAllTabList().forEach((lang) => {
        exportObj[lang][sheetName] = {}
        const langIndex = getLangIndex(values, lang)
        if (langIndex >= 0 ) {
          exportObj[lang][sheetName] = getFiliterEmptyValue(formatObject(values.slice(1), langIndex))
        }
    })
  })
  
  const result =  JSON.stringify(exportObj, null, 2)
  downloadFile(result)
}

// this current sheet data
function currentValues() {
  return SpreadsheetApp
    .getActiveSheet()
    .getDataRange()
    .getValues()
}

// Lang list based on the first row (title) : term, lang-1, lang-2, lang-3 ... etc
function langList(currentValues) {
  return currentValues[0].slice(1)
}

// Lang list based no currnet sheet row (title) : term, lang-1, lang-2, lang-3 ... etc
function getAllTabList() {
  return currentValues()[0].slice(1)
}

function getExportFunctionName(lang) {
  return 'export_'+lang.replace(/[- ().]/g, '')
}

function getLangIndex(values, lang) {
  const result = langList(values).findIndex(e => e === lang)
  return result < 0 ? result : result + 1
}

function exportJson(lang) {
  let result
  const values = currentValues()
  const langIndex = getLangIndex(values, lang)
  if (langIndex < 0 ) {
    result = '{}'
  }
  const object = getFiliterEmptyValue(formatObject(values.slice(1), langIndex))
  result =  JSON.stringify(object, null, 2)
  display(result)
}
