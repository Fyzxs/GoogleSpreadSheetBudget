function MonthSheet(sheet, prevCategory, newCategory, transactionValue) {
  var fullRange = sheet.getRange(6, 1, sheet.getLastRow(), sheet.getLastColumn());
  var prevCatMatchStartRow = 0;
  var prevCatMatchEndRow = 0;
  var newCatMatchStartRow = 0;
  var newCatMatchEndRow = 0;
  var actualRow = 5;
  
  for(var i = 1; i <= fullRange.getNumRows(); i++){
    var catValue = fullRange.getCell(i, 1).getValue();
    
    //We don't care about empty values
    if(!catValue || catValue.length == 0){
      continue;
    }
    
    if(prevCategory != null || prevCategory === CATEGORIES_SHEET_IGNORED_CATEGORY){
      //Set the prev cat start index
      if(prevCategory.indexOf(catValue) == 0 && prevCatMatchStartRow == 0){
        prevCatMatchStartRow = actualRow + i;
      }
      else if(prevCatMatchStartRow > 0 && prevCatMatchEndRow == 0){//Set the prev cat end index
        prevCatMatchEndRow = actualRow + i - 1;
      }
    }
    
    //Set the new cat start index
    if(newCategory != null || newCategory === CATEGORIES_SHEET_IGNORED_CATEGORY){
      if(newCategory.indexOf(catValue) == 0 && newCatMatchStartRow == 0){
        newCatMatchStartRow = actualRow + i;
      } 
      else if(newCatMatchStartRow > 0 && newCatMatchEndRow == 0){
        newCatMatchEndRow = actualRow + i - 1;
      }
      
      if(prevCatMatchStartRow > 0 && prevCatMatchEndRow > 0 && newCatMatchStartRow > 0 && newCatMatchEndRow > 0) {
        break;
      }
    } 
  }
  if(newCatMatchEndRow === 0){
    newCatMatchEndRow=fullRange.getNumRows();
  }
  
  if(prevCatMatchEndRow === 0){
    prevCatMatchEndRow = fullRange.getNumRows();
  }
  
  Logger.log("[prevCategory="+prevCategory + "] [prevCatMatchStartRow="+prevCatMatchStartRow+"] [prevCatMatchEndRow=" + prevCatMatchEndRow + "]");
  CategoryGroup(sheet, prevCategory, prevCatMatchStartRow, prevCatMatchEndRow, transactionValue * INVERT_AMOUNT_VALUE);
  Logger.log("[newCategory="+newCategory + "] [newCatMatchStartRow="+newCatMatchStartRow+"] [newCatMatchEndRow=" + newCatMatchEndRow + "]");
  CategoryGroup(sheet, newCategory, newCatMatchStartRow, newCatMatchEndRow, transactionValue);
  HeaderSection(sheet);
};
