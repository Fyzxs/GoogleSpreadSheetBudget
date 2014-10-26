function showNotification(text) {
      var uiApp = UiApp.createApplication()
      .setTitle(text)
      .setWidth(250)
      .setHeight(10);
      
      SpreadsheetApp.getActiveSpreadsheet().show(uiApp);
};

function showAlert(text){
  SpreadsheetApp.getUi().alert(text);
};