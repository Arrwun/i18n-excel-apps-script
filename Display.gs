function display(text) {
  const output = HtmlService
    .createHtmlOutput("<textarea style='width:100%;' rows='15'>" + text + "</textarea>")
    .setWidth(400)
    .setHeight(300)
  SpreadsheetApp.getUi().showModalDialog(output, 'Exported JSON');
}
