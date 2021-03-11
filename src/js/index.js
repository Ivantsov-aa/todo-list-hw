import '../styles/main.css';
import { ID } from './utils';


let $input = document.querySelector('#js-insert');
let $taskTable = document.querySelector('#js-list');
<<<<<<< HEAD
let $counter = document.querySelector('#js-total');

let tasks = [ 
    {text: "Buy", completed: false, id: ID()}, 
    {text: "some", completed: false, id: ID()},
    {text: "drinks", completed: false, id: ID()},
=======
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
>>>>>>> e4bc89d1421c1427843d7f01026638d002d1e29e
];

const renderTasksList = (list) => {
    $counter.innerHTML =  `${list.length} items left ` ;
    $taskTable.innerHTML = '';
    list.forEach((task) => {
<<<<<<< HEAD
        const checked = task.completed ? 'checked' : '';

        const liTask = document.createElement('li');
        liTask.id = task.id;
        if(task.completed) {
            liTask.classList.add('completed');
        }

        liTask.innerHTML = `
        <input ${checked} data-id="${task.id}" type="checkbox" class="toggle">
        <div class="todo">

        <span>${task.text}</span>
        
        </div>
        <button data-value="${task.id}" class="destroy"></button>`

        liTask.addEventListener('dblclick', () => {
            liTask.classList.add('editing');
        })

        const editTask = document.createElement('input');
        editTask.type = "text";
        editTask.className = "edit";
        editTask.value = task.text;
        editTask.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                liTask.classList.remove('editing');
            }
            if (event.key === "Enter") {
                liTask.classList.remove('editing');
                task.text = editTask.value
                renderTasksList(list);
            }
        });

        liTask.append(editTask);
        $taskTable.append(liTask);
        
=======
        let listElement = `<li>
        <input type="checkbox" class="toggle">
        <div class="todo">
        <span>${task.text}</span>
        </div>
        <button class="destroy"></button>
        <input type="text" class="edit"></li>`;
        $taskTable.insertAdjacentHTML("beforeend", listElement)
>>>>>>> e4bc89d1421c1427843d7f01026638d002d1e29e
    });
}

$input.addEventListener('keyup', (event) => {
<<<<<<< HEAD
   if (event.key === 'Enter') {
    tasks.push( {text: $input.value, completed: false, id: ID()} );
    $input.value = ""; 
=======
   if (event.which === 13) {
    tasks.push(
        {
        text: `${$input.value}`,
        id: ID(),
    });
    $input.value = '';
>>>>>>> e4bc89d1421c1427843d7f01026638d002d1e29e
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

<<<<<<< HEAD
renderTasksList(tasks);

function deleteComplete(event) {
    const deleteBtn = event.target;
    if(deleteBtn.classList.contains('destroy')) {
        const deleteId = deleteBtn.dataset.value;
        tasks = tasks.filter(task => task.id !== deleteId);
        renderTasksList(tasks);
    }

    const completeBtn = event.target;
    if(completeBtn.classList.contains('toggle')) {
        const changeId = completeBtn.dataset.id;
        const task = tasks.find((el) => {
            return el.id === changeId;
        });
        task.completed = !task.completed;
        renderTasksList(tasks);
    }
}

$taskTable.addEventListener('click', deleteComplete);

let $tasksFilter = document.querySelector('#js-filters');
let $tasksBtnFilter = document.querySelectorAll('#js-filters > li');

$tasksFilter.addEventListener('click', (event) => {
    const targetFilter = event.target;
    let tasksForFilter = document.querySelectorAll('#js-list > li');

    $tasksBtnFilter.forEach((filter) => {
        if (filter.dataset.value === targetFilter.dataset.value) {
            filter.classList.add('selected')
        } else {
            filter.classList.remove('selected')
        }
    })

    tasksForFilter.forEach((filter) => {
        switch (targetFilter.dataset.value) {
            case 'all':
                filter.style.display = 'flex';
                break;
            case 'completed':
                if (filter.classList.contains('completed')) {
                    filter.style.display = 'flex';
                } else {
                    filter.style.display = 'none';
                }
                break;
            case 'active':
                if (!filter.classList.contains('completed')) {
                    filter.style.display = 'flex';
                } else {
                    filter.style.display = 'none';
                }
                break;
        }
    })
});

const deleteAllTasks = document.querySelector('#js-clear-completed');
deleteAllTasks.addEventListener('click', () => {
    const deleteTasks = document.querySelectorAll('#js-list > li');
    deleteTasks.forEach(deleteTask => {
        deleteTask.remove();
    })
})
=======
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
>>>>>>> e4bc89d1421c1427843d7f01026638d002d1e29e
