import '../styles/main.css';
import { ID } from './utils';

let $input = document.querySelector('#js-insert');
let $taskTable = document.querySelector("#js-list")

let tasks = [
    {
        text: 'Homework',
        completed: true,
        id: ID(),
    },
    {
        text: 'Workout',
        completed: true,
        id: ID(),
    },
    {
        text: 'Buy products',
        completed: true,
        id: ID(),
    }
];

const renderTasksList = (list) => {
    $taskTable.innerHTML = '';
    list.forEach((task, index) => {
        // console.log(index, index % 2 === 0 ? 'чет' : className);
        let className = '';
        if(index % 2 !== 0) {
            className = 'class = "completed"'
        }
        let listElement = `<li ${className}>
        <div class="todo">
        <input type="checkbox" class="toggle">
        <span>${task.text}</span>
        <button class="destroy"></button>
        </div>
        <input type="text" class="edit"></li>`;
        $taskTable.insertAdjacentHTML("beforeend", listElement)
    });
}

$input.addEventListener('keyup', (event) => {
   if (event.which === 13) {
    tasks.push($input.value)
    $input.value = {
        text: '',
        completed: true,
        id: ID(),
    };  
    console.log(tasks);
    renderTasksList(tasks); 
   }
  
});

renderTasksList(tasks);