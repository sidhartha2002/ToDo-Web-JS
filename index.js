//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// eventlisteners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions
function addTodo(event) {
  // prevents form from submitting
  event.preventDefault();
  // todo div
  const todoDiv = document.createElement("div"); // create a div in html
  todoDiv.classList.add("todo"); // giving class to that div
  const newTodo = document.createElement("li"); // create a li in html
  newTodo.innerText = todoInput.value; // give class
  newTodo.classList.add("todo-item"); // adding class
  todoDiv.appendChild(newTodo);

  // check mark btn
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // check thrash btn
  const thrashButton = document.createElement("button");
  thrashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  thrashButton.classList.add("thrash-btn");
  todoDiv.appendChild(thrashButton);

  // append the above created new whole div with both check and thrash btn into the ul tag
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //checking for delete todo
  if (item.classList[0] == "thrash-btn") {
    const todo = item.parentElement; // accessing the parent element
    // animation
    todo.classList.add("fall"); // added a class which will help in animation while deleting using css
    todo.addEventListener("transitionend", function () {
      // above function will wait till transition gets over then remove the element otherwise it get stuck to that same position where it actually is even if deleting the above element
      todo.remove(); // the above function after transition delete the element even if you deleting the before element and gets replaced
    });
  }
  //checking for complete todo
  if (item.classList[0] == "complete-btn") {
    const todo = item.parentElement; // accessing the parent element
    todo.classList.toggle("completed"); // after adding toggle we can use it in css for striking the item
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (
      event.target.value // event.target.value -> getting hold the option values specified in html i.e, all, completed...
    ) {
      case "all":
        todo.style.display = "flex"; // show all the elements
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          // getting hold of all elements having 'completed' class
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          // getting hold of all elements having 'uncompleted' class
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
