var ledgerPaste = function(sheet, range) {
  var makeTrackerSheet = function(spreadsheet){
    var tracker = spreadsheet.insertSheet(TRANSCAT_SHEET_NAME);
    spreadsheet.moveActiveSheet(spreadsheet.getNumSheets());
    tracker.getRange(1, TRANSCAT_COLUMN_LEDGER).setValue(TRANSCAT_COLUMN_LEDGER_NAME);
    tracker.getRange(1, TRANSCAT_COLUMN_CATEGORY).setValue(TRANSCAT_COLUMN_CATEGORY_NAME);
    tracker.getRange(1, TRANSCAT_COLUMN_COUNT).setValue(TRANSCAT_COLUMN_COUNT_NAME);
   
    return tracker;
  };
   
  var spreadsheet = SpreadsheetApp.getActive();
  var tracker = spreadsheet.getSheetByName(TRANSCAT_SHEET_NAME);
  if(tracker == null){
    tracker = makeTrackerSheet(spreadsheet);
  }
  
  Logger.log("Rows = " + range.getNumRows());
  Logger.log("Cols = " + range.getNumColumns());
  
  var descs = [];
  var cats = [];
  loadAutos(tracker, descs, cats);
  var totalRows = range.getNumRows();
  for(var i = 1; i <= totalRows; i++){
    var desc = range.getCell(i, TRAMSCAT_PASTE_RANGE_AUTO_CATEGORIZE).getValue();
    Logger.log("[desc=" + desc + "]");
    if(desc == ""){//Assume there was a deletion
      return;
    }
    
    showNotification("Processing Ledger Entry " + i + " of "+ totalRows + "\n");
    
    var index = descs.indexOf(desc);
    if(index >= 0 && index < cats.length){
      var catRange = sheet.getRange(range.getRow()+i-1, LEDGER_COLUMN_CATEGORY);
      var catVal = cats[index];
      catRange.setValue(catVal);
      var countRange = tracker.getRange(index+2, TRANSCAT_COLUMN_COUNT);
      countRange.setValue(countRange.getValue()+1);
      onLedgerCategoryChange(sheet, catRange, catVal);
    }
  }
  
  tracker.sort(TRANSCAT_COLUMN_COUNT, false);
};

var loadAutos = function(sheet, descs, cats){
  var dataRange;
  try{
    dataRange = sheet.getRange(2, 1, sheet.getLastRow()-1, 2);
  }catch(err){
    return;
  }
  for(var i = 1; i <= dataRange.getNumRows(); i++){
    descs.push(dataRange.getCell(i, 1).getValue());
    cats.push(dataRange.getCell(i, 2).getValue());
    Logger.log(descs[i-1] + ",-," + cats[i-1]);
  }
};



var UpdateCategoryTracker = function(sheet, prevCat, newCat, row){
  var spreadsheet = SpreadsheetApp.getActive();
  var tracker = spreadsheet.getSheetByName(TRANSCAT_SHEET_NAME);
  
  var descs = [];
  var cats = [];
  loadAutos(tracker, descs, cats);
  
  var desc = sheet.getRange(row, LEDGER_COLUMN_EXTDESC).getValue();//.replace(/[0-9]/g, '');
  
  var index = descs.indexOf(desc);

  if((index >= 0) && (index < cats.length)){
    Logger.log("existing Pair");
    var inc = cats[index] == newCat ? 1 : -1;
    var countRange = tracker.getRange(index+2, TRANSCAT_COLUMN_COUNT);
    countRange.setValue(countRange.getValue()+inc);
  }
  else if(index == -1 && desc !== ""){
    Logger.log("Haven't seen [desc=" + desc + "] before");
    var newRow = tracker.getLastRow()+1;
    var newRange = tracker.getRange(newRow, 1, 1, 3);
    newRange.getCell(1, 1).setValue(desc);
    newRange.getCell(1, 2).setValue(newCat);
    newRange.getCell(1, 3).setValue(1);
  }
};