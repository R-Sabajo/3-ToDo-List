// select html form elements from DOM
const addField = document.getElementById('newTaskField');
const addButton = document.getElementById('newTaskAdd');
const taskList = document.getElementById('taskList');

// function to create html listitems for each task
const addTaskToDOM = task => {
  const newLi = document.createElement('li');

  let newCheckbox = document.createElement('input');
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('value', task.id);

  let newTaskDescription = document.createElement('p');
  newTaskDescription.innerHTML = `${task.description}`;

  if (task.done === 'true') {
    newCheckbox.setAttribute('checked', 'checked');
    newTaskDescription.innerHTML = `<del>${task.description}</del>`;
  } else {
    newTaskDescription.innerHTML = `${task.description}`;
  }

  const newImg = document.createElement('img');
  newImg.src = `./trash-delete-icon.jpg`;
  newImg.value = task.id;
  newImg.width = `20`;

  newLi.appendChild(newCheckbox);
  newLi.appendChild(newTaskDescription);
  newLi.appendChild(newImg);
  taskList.appendChild(newLi);

  checkBtn(newCheckbox, task);
  delBtn(newImg, newLi);
};

// function to add eventlistener to change set the task.done value
const checkBtn = (btn, task) =>
  btn.addEventListener('change', event => {
    if (task.done === 'true') {
      putTask(event.target.value, `${task.description}`, 'false').then(() =>
        allTaskItems(getTasks())
      );
    } else {
      putTask(event.target.value, `${task.description}`, 'true').then(() =>
        allTaskItems(getTasks())
      );
    }
  });

// function to add eventlistener to trash icon to delete a task
const delBtn = (btn, li) =>
  btn.addEventListener('click', event => {
    deleteTask(event.target.value);
    taskList.removeChild(li);
  });

// function to get all taskitems
const allTaskItems = async anyTask => {
  taskList.innerHTML = '';
  const data = await anyTask;
  data.forEach(task => {
    addTaskToDOM(task);
  });
};

allTaskItems(getTasks());

// function to be able to press enter to add a task
addField.addEventListener('keydown', async event => {
  if (event.keyCode === 13) {
    postTask(`${event.target.value}`, 'false').then(() =>
      allTaskItems(getTasks())
    );
    addField.value = '';
  }
});

// function to add a task via the Add button
addButton.addEventListener('click', async event => {
  postTask(`${addField.value}`, 'false').then(() => allTaskItems(getTasks()));
  addField.value = '';
});
