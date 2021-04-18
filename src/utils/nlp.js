var request = require('request');

const diagonose=(obj,callback)=>{
var options = {
  'method': 'POST',
  'url': 'https://api.infermedica.com/v3/parse',
  'headers': {
    'App-Id': 'fbbd2f76',
    'App-Key': 'f7e7586c7b2ce50722ea93b485fc6d07',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "age": {
      "value": obj.age.value
    },
    "text": obj.text
  })

};
request(options, function (error, response) {
  if (error) console.log(error.body)

  else{
    var u=JSON.parse(response.body)
    var b=[]
    var t=u.mentions.length
    for(i=0;i<t;i++){
      b[i]={
      id:u.mentions[i].id,
      choice_id:u.mentions[i].choice_id,
      }
    
      if(i==0){
        b[i].source="initial"
      }
    }
     //callback(undefined,u) 
     
     var magic={
       "sex":obj.sex,
       "age":{
         "value":obj.age.value
       },
       "evidence":b
     }
     console.log(magic)
     var optionss = {
      'method': 'POST',
      'url': 'https://api.infermedica.com/v3/diagnosis',
      'headers': {
        'App-Id': 'fbbd2f76',
        'App-Key': 'f7e7586c7b2ce50722ea93b485fc6d07',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(magic)
    
    };
    request(optionss, function (error, response) {
      if (error)
      console.log(error);
      else{
      console.log(JSON.parse(response.body).question.items);
      callback(undefined,JSON.parse(response.body))
      }
    });
}
})
}

module.exports=diagonose