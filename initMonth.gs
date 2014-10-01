var copyMonthFromCurrent = function(){
  var uiApp = UiApp.createApplication()
     .setTitle('New Sheet Being Prepared...')
     .setWidth(250)
     .setHeight(10);
  
  SpreadsheetApp.getActiveSpreadsheet().show(uiApp);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var split = sheet.getName().split(" ");
  var curMonth = split[0];
  var nextYear = split[1];
  Logger.log(curMonth);
  var nextMonth = MONTH_NAMES.indexOf(curMonth) + 1;
  if(nextMonth >= MONTH_NAMES.length){ 
    nextMonth = 0; 
    nextYear++;
  }
  var ledgerMin = sheet.getRange(1, 1).getValue();
  var ledgerMax = sheet.getRange(1, 2).getValue();
  
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().duplicateActiveSheet();
  newSheet.setName(MONTH_NAMES[nextMonth] + " " + nextYear);
  newSheet.getRange(1, 1).setValue(ledgerMax+1);
  newSheet.getRange(1, 2).setValue(ledgerMax*2 - ledgerMin + 1);
  
  var cleanActual = function(sheet){
    var checkCol = BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED;
    var actualCol = BUDGET_COLUMN_CATEGORY_SUB_ACTUAL;
    
    for(var i = 6; i<= sheet.getLastRow(); i++){
      if(sheet.getRange(i, checkCol).getBackground() == "#f9cb9c"){
        for(var j = actualCol; j <= sheet.getLastColumn(); j++){
          sheet.getRange(i, j).setValue("").setBackground("white");
        }
      }
    }
  };
  
  cleanActual(newSheet);
  HeaderSection(newSheet);  
  
  SpreadsheetApp.getUi().alert("Sheet Ready");
};

var initNewMonth = function(){
  var initCategory = function(sheet, category, row){
    var headerRange = sheet.getRange(row, BUDGET_COLUMN_CATEGORY_TITLE, 1, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED);
    headerRange.setBackground("#444444");
    headerRange.setFontColor("white");
    
    var actualRange = sheet.getRange(row, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL);
    actualRange.setBackground("#999999");
    actualRange.setFontColor("#eeeeee");
    actualRange.setValue(0);
    
    //BUDGET/ACTUAL BLOCK TO currency format
    sheet.getRange(row, BUDGET_COLUMN_CATEGORY_TITLE).setValue(category[0]);
    var sumRange = sheet.getRange(row+1, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED, category.length);
    sheet.getRange(row, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED).setValue("=SUM(" + sumRange.getA1Notation() + ")");
      
    for(var i = 1; i <= category.length; i++){
      var subRange = sheet.getRange(row+i, BUDGET_COLUMN_CATEGORY_SUB_TITLE);
      if(i < category.length){
        subRange.setValue(category[i]);
      }
      subRange.setFontColor("#999999"); 
      
      var budRange = sheet.getRange(row+i, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED);
      budRange.setBackground("#f9cb9c");
      
      sheet.setRowHeight(i, 17);
    }
    
    sheet.getRange(row, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED, category.length, 2).setNumberFormat("$0.00");
  };
  
  var setHeaders = function(sheet){
    var fontSize = 14;
    
    var incomeRange = sheet.getRange(1, BUDGET_COLUMN_INCOME);
    incomeRange.setValue(BUDGET_INCOME_COLUMN_NAME)
    .setFontSize(fontSize)
    .setFontWeight("bold")
    .setVerticalAlignment("middle");
    
    var budgetedRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED);
    budgetedRange.setValue(BUDGET_BUDGETED_COLUMN_NAME)
    .setFontSize(fontSize)
    .setFontWeight("bold")
    .setVerticalAlignment("middle");
    
    var actualRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL);
    actualRange.setValue(BUDGET_ACTUAL_COLUMN_NAME)
    .setFontSize(fontSize)
    .setFontWeight("bold")
    .setVerticalAlignment("middle");
    
    var difRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_PENDING);
    difRange.setValue(BUDGET_DIF_COLUMN_NAME)
    .setFontSize(fontSize)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
    
    var firstRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST);
    firstRange.setValue(BUDGET_FIRST_COLUMN_NAME)
    .setFontSize(fontSize)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setFontColor("white")
    .setBackgroundColor("#666666");
    
    var secondRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND);
    secondRange.setValue(BUDGET_SECOND_COLUMN_NAME)
    .setFontSize(fontSize)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setFontColor("white")
    .setBackgroundColor("#666666");
    
    fontSize = 10;
    var overageRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE);
    overageRange.setValue(BUDGET_OVERAGE_COLUMN_NAME)
    .setFontSize(fontSize)
    .setVerticalAlignment("middle");
    
    var outstandingRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_TOTAL_PENDING);
    outstandingRange.setValue(BUDGET_OUTSTANDING_COLUMN_NAME)
    .setFontSize(fontSize)
    .setVerticalAlignment("middle");
    
    var firstPendingRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_PENDING);
    firstPendingRange.setValue(BUDGET_FIRST_PENDING_COLUMN_NAME)
    .setFontSize(fontSize)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
    
    var secondPendingRange = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING);
    secondPendingRange.setValue(BUDGET_SECOND_PENDING_COLUMN_NAME)
    .setFontSize(fontSize)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  };
  
  var setColumnWidths = function(sheet){
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_TITLE, BUDGET_COLUMN_CATEGORY_TITLE_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_TITLE, BUDGET_COLUMN_CATEGORY_SUB_TITLE_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_INCOME, BUDGET_COLUMN_INCOME_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_ACTUAL, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_PENDING, BUDGET_COLUMN_CATEGORY_SUB_PENDING_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_TOTAL_PENDING, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_TOTAL_PENDING_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_PENDING, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_PENDING_WIDTH);
    sheet.setColumnWidth(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING_WIDTH);
  };
  
  var createCategories = function(sheet){
    var row = 2;
    var sums = [];
    for(var i = 0; i < CATEGORIES_SHEET_DEFAULT_CATEGORIES.length; i++){
      var sub = CATEGORIES_SHEET_DEFAULT_CATEGORIES[i];
      initCategory(sheet, sub, row);
      row += sub.length + 1;//+1 for whitespace
      sums.push("" + row);
    }
    return sums;
  };
  
  var adjustIncomeAndActualCells = function(sheet, rows){
    var sub = CATEGORIES_SHEET_DEFAULT_CATEGORIES[0];
    sheet.getRange(3, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED, sub.length).setBackground("white");
    sheet.getRange(3, BUDGET_COLUMN_INCOME, sub.length-1)
    .setBackground("#f9cb9c")
    .setNumberFormat("$0.00");
    sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED).setBackground("#0b5394");
    sheet.getRange(2, BUDGET_COLUMN_INCOME)
    .setValue("=SUM(" + sheet.getRange(3, BUDGET_COLUMN_INCOME, sub.length).getA1Notation() +")")
    .setNumberFormat("$0.00");
    var row = 2;
    var budgetSum = "";
    var actualSum = "";
    for(var i = 0; i < rows.length - 1; i++){
      budgetSum += sheet.getRange(rows[i], BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED).getA1Notation();
      actualSum += sheet.getRange(rows[i], BUDGET_COLUMN_CATEGORY_SUB_ACTUAL).getA1Notation();
      if(i < rows.length - 2){
        budgetSum += ",";
        actualSum += ",";
      }
    }
    budgetSum = "=SUM(" + budgetSum + ")";
    actualSum = "=SUM(" + actualSum + ")";
    sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED).setValue(budgetSum);
    sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL).setValue(actualSum);
  };
  
  var setBudgetedEqs = function(sheet){
    
    sheet.getRange(3, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST)
    .setValue("=C3/2")
    .setNumberFormat("$0.00")
    .setFontColor("#38761d");
    
    sheet.getRange(3, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND)
    .setValue("=C3/2")
    .setNumberFormat("$0.00")
    .setFontColor("#38761d");
    
    var labels = sheet.getRange(4, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST, 1, 2);
    
    labels.setValue("Budgeted");
    labels.setBackground("#434343");
    labels.setFontColor("white");
        
    var midBudget = sheet.getRange(5, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST);
    var strMid = "=SUM(" + 
      sheet.getRange(6, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST, sheet.getLastRow() - 5)
    .getA1Notation() + ")";
    midBudget.setValue(strMid)
    .setNumberFormat("$0.00")
    .setBackgroundColor("#cccccc")
    .setFontWeight("bold");
    
    var endBudget = sheet.getRange(5, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND);
    var strEnd = "=SUM(" + 
      sheet.getRange(6, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND, sheet.getLastRow() - 5)
    .getA1Notation() + ")";
    endBudget.setValue(strEnd)
    .setNumberFormat("$0.00")
    .setBackgroundColor("#cccccc")
    .setFontWeight("bold");
  };
  
  var setRestOfEquations = function(sheet){
    for(var i = BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE; 
        i <= BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING; i++){
      var str = "=SUM(" + 
        sheet.getRange(6, i, sheet.getLastRow() - 6)
      .getA1Notation() + ")";
      var col = sheet.getRange(2, i);
      col.setValue(str)
      .setNumberFormat("$0.00")
    }
  };
  
  var setBorders = function(sheet){
    var mid = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_PENDING, sheet.getLastRow(), 3);
    mid.setBorder(false, true, false, true, true, false);
    
    var end = sheet.getRange(1, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE, 2, 4);
    end.setBorder(false, true, false, true, true, true);
  };
  
  
  var spreadSheet = SpreadsheetApp.getActive();
  var d = new Date();
  var name = MONTH_NAMES[d.getMonth()] + " " + d.getFullYear();
  
  var monthSheet = spreadSheet.getSheetByName(name);
  if(monthSheet != null){ return; }
  
  monthSheet = spreadSheet.insertSheet(name);
  spreadSheet.moveActiveSheet(0);
  monthSheet.getRange(1, 1, monthSheet.getMaxRows(), monthSheet.getMaxColumns()).setFontFamily(DocumentApp.FontFamily.COURIER_NEW);
  
  //Create Categories
  var summaryRows = createCategories(monthSheet);
  
  //Adjust Income cells
  adjustIncomeAndActualCells(monthSheet, summaryRows);
  
  //Add Headers
  setHeaders(monthSheet);
  
  setColumnWidths(monthSheet);
    
  //Set Mid-End budgeted equations
  setBudgetedEqs(monthSheet);
  
  //Set Overage, outstanding, mid, end equations
  setRestOfEquations(monthSheet);
    
  
  //Freeze rows
  monthSheet.setFrozenRows(2);
  
  //Clean up extra Columns/Rows
  monthSheet.deleteColumns(monthSheet.getLastColumn()+1, monthSheet.getMaxColumns() - monthSheet.getLastColumn());
  monthSheet.deleteRows(monthSheet.getLastRow()+1, monthSheet.getMaxRows() - monthSheet.getLastRow() -1);
  
  setBudgetting(monthSheet);
};