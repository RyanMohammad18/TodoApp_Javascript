 const container = document.querySelector('.container');
 const todoForm = document.querySelector('.todo-form');
 const todoInput = document.querySelector('#inputTodo');
 const addTodobtn = document.querySelector('#addTodoButton');
const todoLists = document.querySelector('#lists');
const message = document.querySelector('#message');


//showmessage
const showMessage = (text,status) =>{

    message.textContent =text;
    message.classList.add(`bg-${status}`);
    setTimeout(()=>{
        message.textContent="";
        message.classList.remove(`bg-${status}`);

    },2000);

};


   //deletetodos
   const deleteTodo = (event) => {

    console.log("deleted");

        

     const selectedTodo = event.target.parentElement.parentElement.parentElement;
      todoLists.removeChild(selectedTodo);  
      showMessage("todo is deleted","danger");

      
      let todos = getTodosFromLocalStorage();
      todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
      
      localStorage.setItem("mytodos", JSON.stringify(todos));
    };


//createTodo

const createTodo = (todoId,todoValue) =>{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `<span>${todoValue}</span>
                            <span><button class="btn" id="deletebtn"> <i class ="fa fa-trash"></i></button> </span>`;

    todoLists.appendChild(todoElement);

    const deletebutton = todoElement.querySelector("#deletebtn");
    deletebutton.addEventListener("click",deleteTodo)
    



};

//gettodosfromlocalstorage


const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];

};

//addtodo
 const addTodo = (event) => {

        event.preventDefault();
        const todoValue = todoInput.value;

        //unique_ID
        const todoId = Date.now().toString();
        console.log(todoInput.value);

        createTodo(todoId,todoValue)
        showMessage("To do is added","success"); 

           //local storage 

    const todos = getTodosFromLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value="";


 };

 //load data
 const loadtodos = () =>{

    console.log("loaded");

    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId,todo.todoValue));

 };

 todoForm.addEventListener("submit",addTodo);

 window.addEventListener("DOMContentLoaded",loadtodos);