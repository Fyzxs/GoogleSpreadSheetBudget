function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Budget')
      .addItem('Create Month From Active', 'copyMonthFromCurrent')
      .addSeparator()
      .addSubMenu(ui.createMenu('Run Once')
          .addItem('Initialize Categories', 'initCategories')
          .addItem('Initialize Ledger', 'initLedger')
          .addItem('Initialize New Month', 'initNewMonth'))
      .addToUi();
  /*
  var items = [
    {name: 'Initialize Categories', functionName: 'initCategories'},
    {name: 'Initialize Ledger', functionName: 'initLedger'},
    {name: 'Initialize New Month', functionName: 'initNewMonth'},
    {name: 'Create Month From Active', functionName: 'copyMonthFromCurrent'}
  ];
    ss.addMenu('Budget', items);
  */
}

function onEdit(e){
  var eventSheet = e.source.getActiveSheet();
  var eventRange = e.range;
  if(isLedgerCategoryChange(eventSheet, eventRange)){
    onLedgerCategoryChange(eventSheet, eventRange, e.value); 
  }
  else if(isLedgerEntryPaste(eventSheet, eventRange)){
    ledgerPaste(eventSheet, eventRange);
  }
  else if(isMonthBudgetedChange(eventSheet, eventRange)){
    CategoryGroupMin(eventSheet, eventRange.getRow());
  }
  else if(isAllocationChange(eventSheet, eventRange)){
    CategoryGroupMin(eventSheet, eventRange.getRow());
  }
};
  

var onLedgerCategoryChange = function(eventSheet, eventRange, eventValue){  
  var prevNote = eventRange.getNote();
  var newNote = eventValue;
  if(prevNote == newNote){Logger.log("NotesMatch [newNote=" + newNote + "]");return;}
  eventRange.setNote(newNote);
  var monthSheet = getMonthSheet(eventRange.getRow());
  if(monthSheet == null) { 
    SpreadsheetApp.getUi().alert("No Matching Month for Ledger [row=" + eventRange.getRow()+ "]");
    eventRange.setValue("");
    eventRange.clearNote();
    return;
  }
  var transactionValue = eventSheet.getRange(eventRange.getRow(), LEDGER_COLUMN_AMOUNT).getValue();
  MonthSheet(monthSheet, prevNote, newNote, transactionValue);
  UpdateCategoryTracker(eventSheet, prevNote, newNote, eventRange.getRow());

};

var isLedgerCategoryChange = function(eventSheet, eventRange){
  return eventSheet.getName().indexOf("Ledger") >= 0 && eventRange.getNumRows() == 1 && eventRange.getNumColumns() == 1 && eventRange.getColumn() == LEDGER_COLUMN_CATEGORY;
};

var isLedgerEntryPaste = function(eventSheet, eventRange){
  var isLedger = eventSheet.getName().indexOf("Ledger") >= 0;
  var isColumnCount = eventRange.getNumColumns() >= TRANSCAT_PASTE_MIN_COLUMN_COUNT;
  
  return isLedger && isColumnCount;  
};

var isMonthBudgetedChange = function(eventSheet, eventRange){
  var sheetName = eventSheet.getName();
  if(!(eventRange.getNumRows() == 1 && eventRange.getNumColumns() == 1 && eventRange.getColumn() == BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED)){
    return false;
  }
  for(var i = 0; i < MONTH_NAMES.length; i++){
    if(sheetName.indexOf(MONTH_NAMES[i]) == 0){
      //Starts with
      return true;
    }
  }
  return false;
};

var isAllocationChange = function(eventSheet, eventRange){var sheetName = eventSheet.getName();
  if(!(eventRange.getNumRows() == 1 && eventRange.getNumColumns() == 1 
     && (eventRange.getColumn() == BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST ||
         eventRange.getColumn() == BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND))){
    return false;
  }
  for(var i = 0; i < MONTH_NAMES.length; i++){
    if(sheetName.indexOf(MONTH_NAMES[i]) == 0){
      //Starts with
      return true;
    }
  }
  return false;
};

var getMonthSheet = function(row){
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var allSheets = activeSpreadsheet.getSheets();
  for(var i = 0; i < allSheets.length; i++){
    var sheet = allSheets[i];
    var ledgerStart = sheet.getRange(1, 1).getValue();
    var ledgerEnd = sheet.getRange(1, 2).getValue();
    if(ledgerStart <= row && row <= ledgerEnd){
      return sheet;
    }
  }
  return null;
};
