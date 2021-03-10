import '../styles/main.css';
import { ID } from './utils';

let $input = document.querySelector('#js-insert');
let $taskTable = document.querySelector('#js-list');
let $filterTask = document.querySelector('.js-filters');
let $btnTasksClear = document.querySelector('#js-clear-completed');

let tasks = [
    {
        text: 'Homework',
        id: ID(),
    },
    {
        text: 'Workout',
        id: ID(),
    },
    {
        text: 'Buy products',
        id: ID(),
    }
];

const renderTasksList = (list) => {
    $taskTable.innerHTML = '';
    list.forEach((task) => {
        let listElement = `<li>
        <input type="checkbox" class="toggle">
        <div class="todo">
        <span>${task.text}</span>
        </div>
        <button class="destroy"></button>
        <input type="text" class="edit"></li>`;
        $taskTable.insertAdjacentHTML("beforeend", listElement)
    });
}

$input.addEventListener('keyup', (event) => {
   if (event.which === 13) {
    tasks.push(
        {
        text: `${$input.value}`,
        id: ID(),
    });
    $input.value = '';
    renderTasksList(tasks); 
   }
  
});
console.log(tasks);
renderTasksList(tasks);

$taskTable.addEventListener('click', deleteComplete);

function deleteComplete(event) {
    const deleteBtn = event.target;
    if(deleteBtn.classList[0] === 'destroy') {
        const todoTask = deleteBtn.parentElement;
        todoTask.remove();
    }

    const completeBtn = event.target;
    if(completeBtn.classList[0] === 'toggle') {
        const todoTask = completeBtn.parentElement;
        todoTask.classList.toggle('completed');
    }
}

$filterTask.addEventListener('click', filterTodo);

function filterTodo (event) {
    const tasksList = $taskTable.childNodes;
    tasksList.forEach(taskList => {
        switch(event.target.value) {
            case 'all':
                taskList.style.display = 'flex';
                break;
            case 'completed':
                if(taskList.classList.contains('completed')) {
                    taskList.style.display = 'flex';
                } else {
                    taskList.style.display = 'none';
                }
                break;
            case 'active':
                if(!taskList.classList.contains('completed')) {
                    taskList.style.display = 'flex';
                } else {
                    taskList.style.display = 'none';
                }
                break;  
        }
    });
    
    $btnTasksClear.addEventListener('click',() => {
        if(tasksList.classList === 'completed') {
            tasksList.remove();
        }
    })
}