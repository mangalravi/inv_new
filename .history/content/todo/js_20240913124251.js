const text = document.getElementById("text");
const hdn = document.getElementById("saveindex");
const savbtn = document.getElementById("save-todo");
const addbtn = document.getElementById("btn");
const tblbody = document.getElementById("listBox");

let todoarr = [];

addbtn.addEventListener("click", (e) => {
    if(text.value == null){
        alert("Add a Proper value")
        return 
    }
 let todolocals = localStorage.getItem("todo");
 if(todolocals == null){
    todoarr = [];
 }

})