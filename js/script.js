const addTasksForm = document.querySelector('.add-tasks-form');
const tasksList = document.querySelector('.task__list');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addTasksForm.addEventListener('submit', addTask);
tasksList.addEventListener('click', toggleClick);
tasksList.addEventListener('click', deleteTask);
createTasks(tasks, tasksList); // чтобы данные отрисовывались при загрузке страницы (если что-то уже есть в локал сторадж)
isTaskListEmpty();

function addTask(e) {
    e.preventDefault();
    const text = e.target.item.value;
    const item = {
        text: text,
        checked: false,
        state: false
    }
    tasks.push(item);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTasks(tasks, tasksList);
    this.reset(); // обновляем форму после отправки
}

function createTasks(tasks, tasksList) {
    tasksList.innerHTML = tasks.map((task, index) => {
        return `
            <label class="task__item label-task" data-state="${task.state ? 'complited' : 'active'}">
                <input type="checkbox" id="item-${index}" data-index="${index}" class="checkbox-task" ${task.checked ? 'checked' : ''}>
                <span class="label-task__text">
                    ${task.text}
                </span>
                <button class="delete-task" type="button" title="Удалить" id="${index}">\u00d7</button>
            </label>
        `;
    }).join('');
}

function toggleClick(e) {
    if (!e.target.matches('input')) return;
    const element = e.target.dataset['index'];
    tasks[element].checked = !tasks[element].checked;
    tasks[element].state = !tasks[element].state;
    localStorage.setItem('tasks', JSON.stringify(tasks)); // перезаписывать новый данные в локал сторадж
    createTasks(tasks, tasksList);
}


function deleteTask(e) {
    if (!e.target.matches('.delete-task')) return;
    const currentIndexBtn = e.target.id; // номер индекса кнопки, такой же индекс как у родительского элемента
    tasks.splice(currentIndexBtn, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks)); // перезаписывать новый данные в локал сторадж
    createTasks(tasks, tasksList);
    if (tasks.length === 0) {
        tasksList.innerHTML = `<p class="task__item--dafult">Здесь будут отображаться Ваши&nbsp;задачи</p>`;
        return localStorage.clear()
    }
}


function isTaskListEmpty() {
    if (localStorage.length === 0) {
        return tasksList.innerHTML = `<p class="task__item--dafult">Здесь будут отображаться Ваши&nbsp;задачи</p>`;
    }
    return
}

console.log("%cА что это мы тут ищем? :)", "color: #7158e2; font-size: 18px");
