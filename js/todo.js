const host = "http://127.0.0.1:8000"; //local
const todosContainer = document.querySelector('.todos_container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('error get todo', error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_item');
        todoDiv.textContent = todo.item;
        todosContainer.appendChild(todoDiv);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete_btn');
        deleteBtn.textContent = 'x';

        deleteBtn.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        todoDiv.appendChild(deleteBtn);
    })
}

window.addEventListener('DOMContentLoaded', () => {
    getTodos();
});

const todoInput = document.querySelector('.todo_input');
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
})

function addTodo() {
    const title = todoInput.value.trim();
    let todoData = {
        id: 0,
        item: title
    };
    if (title === '') return;

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('error adding todo', error);
        });
}

function deleteTodo(id) {
    axios.delete(`${host}/todo/${id}`)
        .then(response => {
            console.log('deleted todo', response.data);
            getTodos();
        })
        .catch(error => {
            console.error('error deleting todo', error);
        });
}