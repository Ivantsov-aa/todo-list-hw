import '../styles/main.css';
import { ID } from './utils';


let $input = document.querySelector('#js-insert');
let $taskTable = document.querySelector('#js-list');
let $counter = document.querySelector('#js-total');
const $tasksFilter = document.querySelector('#js-filters');
const $tasksBtnFilter = document.querySelectorAll('#js-filters > li');
let clearButton = document.querySelector('#js-clear-completed');


const inputLocalKey = 'text';
const selectedFilterKey = 'selectedFilter';
$input.value = localStorage.getItem(inputLocalKey);

const keyLSTasks = 'tasks';

let tasks = localStorage.getItem(keyLSTasks);

if (tasks === null ) {
    tasks = [];
} else {
    tasks = JSON.parse(tasks);
}

const renderTasksList = (list) => {
    hideCompletedBtn(tasks);
    $counter.innerHTML =  `${list.length} items left ` ;
    $taskTable.innerHTML = '';
    list.forEach((task) => {
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
        editTask.type = 'text';
        editTask.className = 'edit';
        editTask.value = task.text;
        editTask.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                liTask.classList.remove('editing');
            }
            if (event.key === 'Enter') {
                liTask.classList.remove('editing');
                task.text = editTask.value
                renderTasksList(list);

                updateTaskApi(liTask.id);
            }
        });

        liTask.append(editTask);
        $taskTable.append(liTask);
        
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const hideCompletedBtn = (tasks) => {
    const completedTask = tasks.find(task => task.completed);
    if (completedTask) {
        clearButton.style.display = 'inline-block';
    } else {
        clearButton.style.display = 'none';
    }
}

$input.addEventListener('keyup', (event) => {
    let valueToStore = $input.value;
    if (event.key === 'Enter') {
        tasks.push( {text: valueToStore, completed: false, id: ID()} );
        $input.value = ''; 
        valueToStore = '';
        renderTasksList(tasks);
        createTaskApi();
   } 
   localStorage.setItem(inputLocalKey, valueToStore)
});


renderTasksList(tasks);

function deleteComplete(event) {
    const deleteBtn = event.target;
    if(deleteBtn.classList.contains('destroy')) {
        const deleteId = deleteBtn.dataset.value;
        tasks = tasks.filter(task => task.id !== deleteId);
        renderTasksList(tasks);

        deleteTaskApi(deleteId);
    }

    const completeBtn = event.target;
    if(completeBtn.classList.contains('toggle')) {
        const changeId = completeBtn.dataset.id;
        const task = tasks.find((task) => {
            return task.id === changeId;
        });
        task.completed = !task.completed;
        renderTasksList(tasks);

        updateTaskApi(changeId);
    }
}


$taskTable.addEventListener('click', deleteComplete);



$tasksFilter.addEventListener('click', (event) => {
    const targetFilter = event.target;
    const filterType =  targetFilter.dataset.value;

    if (filterType) {
      $tasksBtnFilter.forEach((filter) => {
         if (filter.dataset.value === filterType) {
               filter.classList.add('selected');
         } else {
               filter.classList.remove('selected');
         }
      })
      
      localStorage.setItem(selectedFilterKey, filterType);

      let filteredTasks = tasks; 

      if (filterType === 'active') {
         filteredTasks = filteredTasks.filter(task => !task.completed)
      } else if (filterType === 'completed') {
         filteredTasks = filteredTasks.filter(task => task.completed)
      };

      renderTasksList(filteredTasks); 
   }
    
})
let selectedLocalFilter = localStorage.getItem(selectedFilterKey);

$tasksBtnFilter.forEach((filter) => {
    if (selectedLocalFilter === filter.dataset.value) {
        filter.classList.add('selected');
    } else {
        filter.classList.remove('selected');
    }
})

clearButton.addEventListener("click", () => {
    tasks = tasks.filter(task => {
        return !task.completed
    })

    renderTasksList(tasks); 
});

window.onstorage = (ev) => {
    tasks = JSON.parse(ev.newValue);
    console.log(tasks);
    renderTasksList(tasks);
} 

//////////////////////////////

function getTaskApi() {
    const getTask = axios.get('http://localhost:3000/todos');
    return getTask.then((response) => {
        if (response.status == 200) {
            compareDate();
        }
    })
}

getTaskApi();

function createTaskApi() {
    tasks.forEach(task => {
        const createTask = axios.post('http://localhost:3000/todos', task);
        return createTask.then((response) => {
            return response.data;
        })
    })
}

function deleteTaskApi(id) {
    const deleteTask = axios.delete(`http://localhost:3000/todos/${id}`);
    return deleteTask.then((response) => {
        return response.data;
    })
}

function updateTaskApi(id) {
    tasks.forEach(task => {
        const updateTask = axios.put(`http://localhost:3000/todos/${id}`, task);
        return updateTask.then((response) => {
            return response.data;
        })
    })
}

window.localStorage.lastDateModified = new Date().getTime();
let date = new Date(parseInt(window.localStorage.time));
let dateChangeLS = localStorage.getItem('lastDateModified');

function dateChange() {
    let dateApi = axios.put('http://localhost:3000/info', {
        lastDateModified: dateChangeLS
    })
    return dateApi.then(response => {
        return response.data;
    })
}

function compareDate() {
        let dateApi = axios.get('http://localhost:3000/info')
        return dateApi.then(response => {
            if (dateChangeLS > response.data.lastDateModified) {
                dateChange();
                createTaskApi();
                // updateTaskApi(task.id);
            }
        })
}