const text = document.getElementById("text");
const hdn = document.getElementById("saveindex");
const savbtn = document.getElementById("save-todo");
const addbtn = document.getElementById("btn");
const tblbody = document.getElementById("listBox");

let todoarr = [];

// Add items
addbtn.addEventListener("click", () => {
  if (text.value.trim() === "") {
    alert("Add a proper value");
    return;
  }
  let todolocals = localStorage.getItem("todo");
  if (todolocals === null) {
    todoarr = [];
  } else {
    todoarr = JSON.parse(todolocals);
  }
  todoarr.push(text.value);
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoarr)); // Fixed here
  displayTodo();
});

const displayTodo = () => {
  let todolocals = localStorage.getItem("todo");
  if (todolocals === null) {
    todoarr = [];
  } else {
    todoarr = JSON.parse(todolocals);
  }
  let htmlCode = "";
  todoarr.forEach((list, ind) => {
    htmlCode += `<tr>
            <td>${list}</td>
            <td><button onclick='edit(${ind})'>Edit</button></td>
            <td><button onclick='deleteTodo(${ind})'>Delete</button></td>
            </tr>`;
  });

  tblbody.innerHTML = htmlCode;
};

// Delete items
const deleteTodo = (ind) => {
  let todolocals = localStorage.getItem("todo");
  todoarr = JSON.parse(todolocals);
  todoarr.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoarr)); // Fixed here
  displayTodo();
};

// Update items
const edit = (ind) => {
  savbtn.value = ind;
  let todolocals = localStorage.getItem("todo");
  todoarr = JSON.parse(todolocals);
  text.value = todoarr[ind]; // Fixed here
  addbtn.style.display = "none";
  savbtn.style.display = "block";
};

savbtn.addEventListener("click", () => {
  let todolocals = localStorage.getItem("todo");
  todoarr = JSON.parse(todolocals);
  let id = savbtn.value;
  todoarr[id] = text.value;
  addbtn.style.display = "block";
  savbtn.style.display = "none";
  text.value = ""; // Fixed here
  localStorage.setItem("todo", JSON.stringify(todoarr)); // Fixed here
  displayTodo();
});

window.onload = () => {
  displayTodo();
};
