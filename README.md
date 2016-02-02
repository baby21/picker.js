# Picker.js
仿IOS的滚轴选择插件
#API
var picker = new Picker({
  data:["一周年","一周年","一周年","一周年","一周年","一周年""一周年"],
  maxFont:20,
  success:function(){}
})

picker.show();
picker.hide();
picker.goIndex();