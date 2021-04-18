
var ans =document.querySelector(".p")
var btn=document.querySelector(".btn")
var sexx=document.querySelector(".sex")
var agee=document.querySelector(".age")
var text=document.querySelector(".textt")

btn.addEventListener("click",(e)=>{
    e.defaultPrevented
    fetch(`http://localhost:3000/dia?sex=${sexx.value}&age=${agee.value}&text=${text.value}`).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            ans.textContent = "no such disease found";
          } else {
            ans.textContent = data.response.question.text;
          }
        });
      });
})
