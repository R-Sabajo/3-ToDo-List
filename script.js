const body = document.getElementsByTagName('body');
const taskList = document.getElementById('taskList');
const addField = document.getElementById('newTaskField');
const addButton = document.getElementById('newTaskAdd');

const addTaskToDOM = task => {
  let newLi = document.createElement('li');
  let newCheckbox = document.createElement('input');
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute(`value`, `${task.id}`);
  if (task.done === 'true') {
    newCheckbox.setAttribute('checked', 'checked');
    newLi.innerHTML = `<del>${task.description}</del>`;
  } else {
    newLi.innerHTML = `${task.description}`;
  }
  newLi.appendChild(newCheckbox);
  taskList.appendChild(newLi);
  let newImg = document.createElement('img');
  newLi.appendChild(newImg);
  newImg.src = `./trash-delete-icon.jpg`;
  newImg.value = `${task.id}`;
  newImg.width = `20`;
  newImg.addEventListener('click', event => {
    deleteTask(event.target.value);
    taskList.removeChild(newLi);
  });

  newCheckbox.addEventListener('change', event => {
    if (task.done === 'true') {
      putTask(event.target.value, `${task.description}`, 'false');
    } else {
      putTask(event.target.value, `${task.description}`, 'true');
    }
  });
};

const allTaskItems = async anyTask => {
  taskList.innerHTML = '';
  const data = await anyTask;
  data.forEach(task => {
    addTaskToDOM(task);
  });
};

allTaskItems(getTasks());

addField.addEventListener('keydown', async event => {
  if (event.keyCode === 13) {
    postTask(`${event.target.value}`, 'false');
    addField.value = '';
    allTaskItems(getTasks());
  }
});

addButton.addEventListener('click', async event => {
  postTask(`${addField.value}`, 'false');
  addField.value = '';
  allTaskItems(getTasks());
});

/*
1. Functie schrijven die de taken dmv een DELETE weer uit de takenlijst verwijderd. gebruik hier een functie die de event target value als argument gebruikt.

2. Functie maken die een nieuwe task kan aanmaken dmv de Add knop. met een POST actie die deze tekst als als description mee stuurt en met als done: false. Hier een refresh actie zodat het meteen te zien is in de DOM

*/
