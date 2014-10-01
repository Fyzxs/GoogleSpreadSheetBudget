var initLedger = function(){
  
  var makeLedgerSheet = function(spreadSheet){
    var ledger = spreadSheet.insertSheet(LEDGER_SHEET_NAME);
    for(var i = 0; i < LEDGER_COLUMNS.length; i++){
      var column = LEDGER_COLUMNS[i];
      var colRange = ledger.getRange(1, i+1);
      colRange.setValue(column.name);
      if(column.hide){
        ledger.hideColumn(colRange);
      }
      if(column.moneyformat){
        ledger.getRange(1, i+1, ledger.getMaxRows()).setNumberFormat("$0.00")
      }
      ledger.setColumnWidth(i+1, column.width);
      ledger.setFrozenColumns(1);
      ledger.setFrozenRows(1);
    }
    ledger.deleteColumns(LEDGER_COLUMNS.length, ledger.getMaxColumns() - LEDGER_COLUMNS.length+1);
    
    var firstRow = ledger.getRange(1, 1, 1, ledger.getMaxColumns());
    firstRow.setBackground("black");
    firstRow.setFontColor("white");
    firstRow.setFontWeight("bold");
                           
  };
  
  var spreadSheet = SpreadsheetApp.getActive();
  var ledger = spreadSheet.getSheetByName(LEDGER_SHEET_NAME);
  
  if(ledger == null){
    ledger = makeLedgerSheet(spreadSheet);
  }
  stripeLedger();
};

function stripeLedger(){
  
  var spreadSheet = SpreadsheetApp.getActive();
  var ledger = spreadSheet.getSheetByName(LEDGER_SHEET_NAME);
  var lastCol = ledger.getMaxColumns();
  
  var categories = spreadSheet.getSheetByName(CATEGORIES_SHEET_NAME);
  var rule = null;
  if(categories != null){
    rule = SpreadsheetApp.newDataValidation().requireValueInRange(categories.getRange(1,CATEGORIES_SHEET_FULL_CATEGORY_COLUMN, categories.getLastRow()));
  }
  for(var i = ledger.getLastRow() + 1; i <= ledger.getMaxRows(); i++){
    var curRow = ledger.getRange(i, 1, 1, lastCol);
    ledger.setRowHeight(i, 17);
    curRow.setBackground(LEDGER_COLORS[i%2]);
    if(rule != null){
      ledger.getRange(i, 1).setDataValidation(rule);
    }
  }
};