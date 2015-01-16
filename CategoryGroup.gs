var CategoryGroupMin = function(sheet, row){
  var range = sheet.getRange(row, BUDGET_COLUMN_CATEGORY_TITLE);
  var topRow = row;
  if(row < 6) return;
  for(var i = row-1; i >= 6, range.getValue().length == 0; i--){
    topRow = i;
    range = sheet.getRange(i, BUDGET_COLUMN_CATEGORY_TITLE);
  }
  
  var cat = range.getValue() + CATEGORY_SUB_SPLITTER + sheet.getRange(row, BUDGET_COLUMN_CATEGORY_SUB_TITLE).getValue();
  CategoryGroup(sheet, cat, topRow, row, 0);
  HeaderSection(sheet);
};

var CategoryGroup = function(sheet, category, catStartRow, catEndRow, transactionValue) {
  if(category.length <= 0) {return;}
  
  var updateBudgetSubCategory = function(range, subCategory, transactionValue){
    if(subCategory == ""){return;}
    
    var subCatRow = 0;
    var actualRow = 0;//Place holder - may not need it
    for(var i = 1; i <= range.getNumRows(); i++){
      var subCat = range.getCell(i,BUDGET_COLUMN_CATEGORY_SUB_TITLE).getValue();
      if(subCat.toLowerCase() == subCategory.toLowerCase()){
        subCatRow = actualRow + i;
        break;
      }                
    }
    if(subCatRow == 0){ SpreadsheetApp.getUi().alert('No Matching [subCategory=' + subCategory + ']'); return;}
    
    //get budgetted
    var cellBudgetted = CellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED);
    var budgetted = cellBudgetted.get();
    
    //set actual
    var cellActual = DefaultCellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL);
    cellActual.add(transactionValue * INVERT_AMOUNT_VALUE);
    var actual = cellActual.get();
        
    if(actual < 0.01 && -0.01 < actual){ cellActual.set(""); }
    else if(actual < 0){cellActual.setBackground("red");}
    else{cellActual.setBackground("white");}
    
    //set pending
    var cellPending = CellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_PENDING);
    var pending = budgetted - actual;
    cellPending.set((pending > 0.01 || pending < -0.01) && actual > 0.01 ? pending : "");
    
    {// Pending Breakdown
      //Set summary fields
      var cellBudgetFirst = DefaultCellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST);
      var budgetFirstValue = cellBudgetFirst.get();
      var cellPendingFirst = CellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_PENDING)
      
      var cellBudgetSecond = DefaultCellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND);
      var cellPendingSecond = CellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING);
      var budgetSecondValue = cellBudgetSecond.get();
      
      {//Calc budgetSecondValue
        var budgetSecondValue =(budgetted - budgetFirstValue);
        if(budgetSecondValue < 0.01) budgetSecondValue = "";
      }
      
      var pendingFirstValue = "";
      //First
      if(actual < budgetFirstValue){
        pendingFirstValue = budgetFirstValue - actual;
      }
      else if(actual >= budgetFirstValue || pending < 0.01){
        pendingFirstValue = "";
      }
      var pendingSecondValue = "";  
      //second
      if(pending < 0.01){
        Logger.log("pending < 0.01");
        pendingSecondValue = "";
      }
      else if(pendingFirstValue >= 0.01){
        Logger.log("pendingFirstValue >= 0.01");
        pendingSecondValue = budgetSecondValue;
      }
      else if(pendingFirstValue < 0.01){
        Logger.log("pendingFirstValue < 0.01");
        if(budgetSecondValue == "" || pending > budgetSecondValue){
          budgetSecondValue = pending;
        }
        else{
          budgetSecondValue = budgetted - budgetFirstValue;
        }
        
        pendingSecondValue = pending;
      }
      else if(budgetFirstValue == ""){
        Logger.log("pendingFirstValue == ''");
        pendingSecondValue = budgetSecondValue - actual;
      }
      else{
        Logger.log("else");
        pendingSecondValue = pending;
      }
      
      cellBudgetSecond.set(budgetSecondValue);
      cellPendingFirst.set(pendingFirstValue <= 0 ? "" : pendingFirstValue);
      
      //set second pending
      cellPendingSecond.set(pendingSecondValue <= 0 ? "" : pendingSecondValue);
      
      var cellOutstanding = CellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_TOTAL_PENDING);
      cellOutstanding.set(cellPendingFirst.get() + cellPendingSecond.get());
      
      var cellOverage = CellItem(range, subCatRow, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE);
      
      cellOverage.set(pending == "" || pending > 0 ? "" : pending);
      
    }
    
    {//First & Second Calc
      
      var update = function(col){
        var cellSummary = CellItem(sheet.getRange(2, col), 1, 1);
        var budgeted = sheet.getRange(5, col).getValue();
        var income = sheet.getRange(3, col).getValue();
        cellSummary.set(income - budgeted);
      };
      
      update(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST);
      update(BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND);
      
    }
  }
  
  
  var updateBudgetCategorySummary = function(range){
    var total = 0;
    //We don't count the title line for summation
    for(var i = 2; i <= range.getNumRows(); i++){
      var val = range.getCell(i, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL).getValue();
      if(val == "") continue;
      total += val;
    }
    range.getCell(1, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL).setValue(total > 0.01 ? total : 0);
  }
  
  var range = sheet.getRange(catStartRow, 1, catEndRow-catStartRow+1, sheet.getLastColumn());
  updateBudgetSubCategory(range, category.split(CATEGORY_SUB_SPLITTER)[1], transactionValue);
  updateBudgetCategorySummary(range);
  
}
