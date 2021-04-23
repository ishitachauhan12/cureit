
var cond=document.querySelector(".condition")
var ans = document.querySelector(".p");
var btn = document.querySelector(".btn");
var sexx = document.querySelector(".sex");
var agee = document.querySelector(".age");
var namee = document.querySelector(".name");
var text = document.querySelector(".textt");
var ans = document.querySelector(".ans");
var rdio=document.querySelector("radio");



//var sym=document.querySelector(".symptom");


btn.addEventListener("click", (e) => {
  e.defaultPrevented;

  var t=$("input[name='choice']:checked").val();
  var j=$("input[name='option']:checked").val();
  console.log(typeof(t),j)
 
 if(t==undefined){
  var sym={
    id:"",
    choice_id:""
  }
}
else{
  var sym={
    id:t,
    choice_id:j
  }
}


  fetch(
    `http://localhost:3000/dia?sex=${sexx.value}&age=${agee.value}&text=${text.value}&symid=${sym.id}&symcid=${sym.choice_id}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        ques.textContent = "no such disease found";
      } else {
       console.log(data.response.flag)
        if(data.response.flag==false){
        var r = document.createElement("p");
        r.class = "ques";
        ans.appendChild(r);

        var qu = document.createTextNode(data.response.body.question.text);
        r.appendChild(qu);

        var hh = document.createElement("br");
        document.body.appendChild(hh);

        var q = document.createElement("p");
        q.class = "answ";
        ans.appendChild(q);

        for (i = 0; i < Number(data.response.items); i++) {
          var cc = document.createElement("input");
            cc.type = "radio";
            cc.name = "choice"
            cc.value = data.response.choices[i].id
            q.appendChild(cc);
          var z = document.createElement("label");
          var t = document.createTextNode(data.response.choices[i].name);
          z.appendChild(t);
          q.appendChild(z);

          var hh = document.createElement("br");
          q.appendChild(hh);
          var hh = document.createElement("br");
          q.appendChild(hh);

          for (j = 0; j < 3; j++) {
            var y = document.createElement("input");
            y.type = "radio";
            y.class = "r"+i+j;
            y.name = "option"
            y.value=data.response.choices[i].subchoice[j].id
            y.id="r"
            q.appendChild(y);

            var u = document.createTextNode(data.response.choices[i].subchoice[j].label);
            var s = document.createElement("label");
            s.appendChild(u);
            q.appendChild(s);
          }

          var hhv = document.createElement("br");
          q.appendChild(hhv);
          
          
        }
        
       
      }
    else{
      cond.innerHTML=data.response.body.condition[0].name;
    }
  }
    });
  });
});


// sym.addEventListener("click",(e)=>{
//   e.defaultPrevented
//   fetch(
//     `http://localhost:3000/dia?sex=${sexx.value}&age=${agee.value}&text=${text.value}&sym=${rdio.value}`
//   ).then((response) => {
//     response.json().then((data) => {
//       if (data.error) {
//         ques.textContent = "no such disease found";
//       } else {
        
//       }
 
//     })
//   })
// })