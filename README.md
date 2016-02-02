# Picker.js
仿IOS的滚轴选择插件
#API

  
  `var picker = new Picker({  `

                   ` data:["睡眠模式","风速1档","风速2档","风速3档","强风模式","  
                    
                    智能模式"],  
                    maxFont:20,  
                    
                    attrName:"data-id",  
                    
                    attrs:["runmodelsleep","HandOne","HandTwo","HandThree","runm  
                    
                    odelstrong","runmodelauto"],  
                    
                    ensure:function(item,index){  
                    
                    },  
                    
                    cancel:function(){}  
                    
                    
                })`
#data
生成滚轴的单元内容

#maxFont
最大字体，即最前面元素的字体

#attrName
给单元元素添加属性名

#attrs
长度与data长度一致，属性值

#ensure
当确定按钮被点击后的回调，item:当前的DOM元素，index当前DOM元素的index

#cancel
点击取消按钮的回调

#picker.show();

#picker.hide();

#picker.goIndex();
