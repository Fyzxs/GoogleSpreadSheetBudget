var initCategories = function(){
  
  var makeCategoriesSheet = function(spreadSheet){
    var categories = spreadSheet.insertSheet(CATEGORIES_SHEET_NAME);
    spreadSheet.moveActiveSheet(spreadSheet.getNumSheets());
    var curRow = 1;
    categories.getRange(curRow++, CATEGORIES_SHEET_FULL_CATEGORY_COLUMN).setValue(CATEGORIES_SHEET_IGNORED_CATEGORY);
    
    for(var i = 0; i < CATEGORIES_SHEET_DEFAULT_CATEGORIES.length; i++){
      var sub = CATEGORIES_SHEET_DEFAULT_CATEGORIES[i];
      var catRange = categories.getRange(curRow++, CATEGORIES_SHEET_CATEGORY_COLUMN);
      var catRangeA1 = catRange.getA1Notation();
      catRange.setValue(sub[0]);
      for(var j = 1; j < sub.length; j++, curRow++){
        var subRange = categories.getRange(curRow, CATEGORIES_SHEET_SUB_CATEGORY_COLUMN);
        subRange.setValue(sub[j]);
        categories.getRange(curRow, CATEGORIES_SHEET_FULL_CATEGORY_COLUMN).setFormula("=" + catRangeA1 + " & \" - \" & " + subRange.getA1Notation());
      }
    }
    
    categories.setColumnWidth(CATEGORIES_SHEET_CATEGORY_COLUMN, CATEGORIES_SHEET_CATEGORY_COLUMN_WIDTH);
    categories.setColumnWidth(CATEGORIES_SHEET_SUB_CATEGORY_COLUMN, CATEGORIES_SHEET_SUB_CATEGORY_COLUMN_WIDTH);
    categories.setColumnWidth(CATEGORIES_SHEET_FULL_CATEGORY_COLUMN, CATEGORIES_SHEET_FULL_CATEGORY_COLUMN_WIDTH);
    
    return categories;
  };
  
  var spreadSheet = SpreadsheetApp.getActive();
  var categories = spreadSheet.getSheetByName(CATEGORIES_SHEET_NAME);
  if(categories == null){
    categories = makeCategoriesSheet(spreadSheet);
  }
};