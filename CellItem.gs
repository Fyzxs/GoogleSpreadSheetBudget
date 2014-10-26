function CellItem(range, row, col, condSettings){
  var _cell = range.getCell(row, col);
  var _conditionalSettings = function(val){
    if(val > 50){
      return {background:"#274e13",fontColor:"#FFFFFF"};
    }
    else if(val > 25){
      return {background:"#6aa84f",fontColor:"#000000"};
    }
    else if(val > 10){
      return {background:"#b6d7a8",fontColor:"#000000"};
    }
    else if(val > 0){
      return {background:"#d9ead3",fontColor:"#000000"};
    }
    else if(val == 0){
      return {background:"#FFFFFF",fontColor:"#000000"};
    }
    else if(val < 50){
      return {background:"#660000",fontColor:"#FFFFFF"};
    }
    else if(val < 25){
      return {background:"#cc0000",fontColor:"#000000"};
    }
    else if(val < 10){
      return {background:"#ea9999",fontColor:"#000000"};
    }
    else if (val < 0){
      return {background:"#f4cccc",fontColor:"#000000"};
    }
  }
  
  if(condSettings != undefined){
    _conditionalSettings = condSettings;
  }
  function _get(){
      return _cell.getValue();
  }
  
  function _set(val){
    
    if(val === ""){
      Logger.log("Clear Content");
      _cell.clearContent();
    }
    else if(typeof val.toFixed === 'function'){
      _cell.setValue(val.toFixed(2));
      Logger.log("Setting toFixed [val=" + val.toFixed(2) + "]");
    } else {
      _cell.setValue(val);
      Logger.log("Setting exact [val=" + val + "]");
    }
    _cell.setNumberFormat("$0.00");
    var settings = _conditionalSettings(val);
    _setBackground(settings.background);
    _setFontColor(settings.fontColor);
  }
  function _setBackground(color){
    _cell.setBackground(color);
  }
  function _setFontColor(color){
    _cell.setFontColor(color);
  }
  function _getBackground(){
    _cell.getBackground();
  }
  
  return {
    get: function(){
      return _get();
    },
    set: function(val){
      _set(val);
    },
    add: function(val){
      _set(_get()+val);
    },
    subtract: function(val){
      _set(_get()-val);
    },
    setBackground: function(color){
      _setBackground(color);
    },
    getBackground: function(){
      _getBackground();
    },
  }
}

function DefaultCellItem(range, row, col){
  var foo = function(val){
      return {background:"#FFFFFF",fontColor:"#000000"};
  };
  return CellItem(range, row, col, foo);
};