function HeaderSection(sheet) {
  var calcCellOverage = function(_sheet){
    var cellOverage = _sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE);
    if(cellOverage.getValue() < 0){
      cellOverage.setBackgroundColor("#660000");
      cellOverage.setFontColor("white");
    }
    else{
      cellOverage.setBackgroundColor("white");
    }
  };
  
  var calcActual = function(_sheet){
    var actualRange = _sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_ACTUAL, _sheet.getMaxRows());
    var actualCell = CellItem(actualRange, 1, 1);
    var tally = 0;
    for(var i = 2; i < actualRange.getNumRows(); i++){
      var cell = actualRange.getCell(i, 1);
      if(cell.getBackground() == "#999999"){
        tally += cell.getValue();
      }
    }
    actualCell.set(tally);
  };
  
  var calcIncomeBudgetDiff = function(_sheet){
    var income = _sheet.getRange(2, BUDGET_COLUMN_INCOME).getValue();
    var budgetted = _sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED).getValue();
    var diff = _sheet.getRange(2, BUDGET_COLUMN_DIFF);
    var difCell = CellItem(diff, 1, 1);
    difCell.set(income-budgetted);
  };
  
  var calcBudgetedActualDiff = function(_sheet){
    var first = _sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST).getValue();
    var second = _sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND).getValue();
    var overage = _sheet.getRange(2, BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE).getValue();
    var diff = _sheet.getRange(3, BUDGET_COLUMN_DIFF);
    var difCell = CellItem(diff, 1, 1);
    difCell.set(first+second+overage);
  };
  
    
  calcCellOverage(sheet);
  calcActual(sheet);
  calcIncomeBudgetDiff(sheet);
  calcBudgetedActualDiff(sheet);
  
}
