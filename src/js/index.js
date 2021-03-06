import 'regenerator-runtime/runtime';
import '../styles/main.css';
import { getTasksAsync, createTaskAsync, deleteTaskAsync, updateTaskAsync, updateTimeAsync } from './request';
import { ID } from './utils';

async function app() {
    let $input = document.querySelector('#js-insert');
    let $taskTable = document.querySelector("#js-list");
    let $counter = document.querySelector("#js-total");
    const $tasksFilter = document.querySelector('#js-filters');
    const $tasksBtnFilter = document.querySelectorAll('#js-filters > li');
    let clearButton = document.querySelector("#js-clear-completed");
    const lastDateModified = localStorage.setItem('lastDateModified', Date.now());

    const inputLocalKey = "text";
    const selectedFilterKey = "selectedFilter";
    $input.value = localStorage.getItem(inputLocalKey);
    
    const serverTasks = await getTasksAsync();

    const keyLSTasks = 'tasks';

    let tasks = localStorage.getItem(keyLSTasks);

    if (tasks === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasks);
    }

    const renderTasksList = (list) => {
        hideCompletedBtn(tasks);
        $counter.innerHTML = `${list.length} items left `;
        $taskTable.innerHTML = '';
        list.forEach((task) => {
            const checked = task.completed ? 'checked' : '';

            const liTask = document.createElement('li');
            liTask.id = task.id;
            if (task.completed) {
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
                    updateTaskAsync(task, task.id);
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
            tasks.push({ text: valueToStore, completed: false, id: ID() });
            $input.value = '';
            valueToStore = ''
            renderTasksList(tasks);

            tasks.forEach(task => {
                createTaskAsync(task);
            })
        }
        localStorage.setItem(inputLocalKey, valueToStore)
    });

    renderTasksList(tasks);

    function deleteComplete(event) {
        const deleteBtn = event.target;
        if (deleteBtn.classList.contains('destroy')) {
            const deleteId = deleteBtn.dataset.value;
            tasks = tasks.filter(task => task.id !== deleteId);
            renderTasksList(tasks);
            deleteTaskAsync(deleteId);
        }

        const completeBtn = event.target;
        if (completeBtn.classList.contains('toggle')) {
            const changeId = completeBtn.dataset.id;
            const taskChange = tasks.find(task => {
                return task.id === changeId;
            });
            taskChange.completed = !taskChange.completed;
            renderTasksList(tasks);
            tasks.forEach(task => {
                updateTaskAsync(task, changeId);
            }) 
        }
    }


    $taskTable.addEventListener('click', deleteComplete);



    $tasksFilter.addEventListener('click', (event) => {
        const targetFilter = event.target;
        const filterType = targetFilter.dataset.value;

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
        tasks = tasks.filter(elem => {
            return !elem.completed
        })

        renderTasksList(tasks);
    });

    window.onstorage = (ev) => {
        tasks = JSON.parse(ev.newValue);
        console.log(tasks);
        renderTasksList(tasks);
    }

    compareData = () => {
        
    }
    
    updateTimeAsync(lastDateModified);
}

app();