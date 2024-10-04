const text = document.getElementById("text");
const hdn = document.getElementById("saveindex");
const savbtn = document.getElementById("save-todo");
const addbtn = document.getElementById("btn");
const tblbody = document.getElementById("listBox");

let todoarr = [];
//add items
addbtn.addEventListener("click", (e) => {
    if(text.value == null){
        alert("Add a Proper value")
        return 
    }
 let todolocals = localStorage.getItem("todo");
 if(todolocals == null){
    todoarr = [];
 }
 else{
    todoarr = JSON.parse( todolocals);
 }
 todoarr.push(text.value)
 text.value = "";
 localStorage.setItem("todo" , JSON.stringify("todoarr"));
 displayTodo();
})

const displayTodo = () => {
    let todolocals = localStorage.getItem("todo");
    if(todolocals == null){
        todoarr = [];
     }
     else{
        todoarr = JSON.parse( todolocals);
     }
     let  html = "Add Task"
     tblbody.innerHTML(`<>`)
}