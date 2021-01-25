// delete google driver file by name
function deleteSameFileName(name) {
  const files = DriveApp.getFiles()
  while(files.hasNext()) {
    const file = files.next()
    if(file.getName() === name) {
      // delete file
      file.setTrashed(true)
    }
  }
}

// display download file url
function downloadFile(content) {
  // remove same name files
  deleteSameFileName(DOWNLOAD_FILE_NAME)

  const file = DriveApp.createFile(DOWNLOAD_FILE_NAME, content)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT)   // resive permission status

  const url = file.getDownloadUrl();

  const output = HtmlService
    .createHtmlOutput("<div style='width:100%'>"+DOWNLOAD_FILE_NAME +" : <a style='font-size: 20px;' href='"+ url +"'> click to download </a></div>")
    .setWidth(430)
    .setHeight(50)
  SpreadsheetApp.getUi()
    .showModalDialog(output, 'Download List');
}
