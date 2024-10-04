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
     let  htmlCode = "Add Task"
     todoarr.forEach((list,ind) => {
        htmlCode += (`<tr>
            <td>${list}</td>
            <td><button onclick='edit(${ind})' ></button></td>
            <td><button onclick='deleteTodo(${ind})' ></button></td>
            </tr>
            `)
     });

   tblbody.innerHTML = htmlCode; 
}
//delete items
const deleteTodo = (ind) => {
    let todolocals = localStorage.getItem("todo");
    todoarr = JSON.parse( todolocals);
 todoarr.splice(ind,1);
 localStorage.setItem("todo" , JSON.stringify("todoarr"));
 displayTodo();
}

//update items

const edit