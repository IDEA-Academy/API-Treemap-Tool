/* This function runs when the page loads and serves the index html page */
function doGet() {
  var page = HtmlService.createTemplateFromFile('index'); 
  
  page.myData = createJsonFile();
  
  return page.evaluate(); 
}

/* This function allows other pages to be included in the template */
function include(file) {
  return HtmlService.createTemplateFromFile(file)
  .evaluate()
  .getContent();
}

function createJsonFile() {
  /* extractSheetAsJson takes 2 arguments the id of the speadsheet and the data range */   
  var res = extractSheetAsJson(###SheetID###,###SheetRange###);            //Replace sheet ID and data range with this month's data 
  return res;
}

function extractSheetAsJson(file, range) {
  /* These lines open the speadsheet and get the data */
  var sheet = SpreadsheetApp.openById(file).getActiveSheet();  
  var data = sheet.getRange(range).getValues();
  
  /* These lines format the sheets into a JSON string */ 
  var json = '[';

  for (i=1;i<data.length;i++) {
    json = json + '{"Calls":' + data[i][0] + ','
    json = json + '"API": "' + data[i][1] + '",'
    json = json + '"Vendor": "' + data[i][2] + '"},'
  } 
  json = json.substring(0,json.length-1) + ']';
 
  return json;
}

