const apiUrl = `https://rama-sabajo.firebaseio.com/tasks`;

const getTasks = async () => {
  try {
    const res = await fetch(`${apiUrl}.json`, { method: 'GET' });
    const data = await res.json();

    let tasks = Object.keys(data).map(key => ({
      id: key,
      description: data[key].description,
      done: data[key].done,
    }));
    return tasks;
  } catch (err) {
    console.log(err);
  }
};

const postTask = async (task, done) => {
  try {
    const res = await fetch(`${apiUrl}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: `${task}`,
        done: `${done}`,
      }),
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async task => {
  try {
    const res = await fetch(`${apiUrl}/${task}.json`, { method: 'DELETE' });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const putTask = async (task, description, done) => {
  try {
    const res = await fetch(`${apiUrl}/${task}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: `${description}`,
        done: `${done}`,
      }),
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};
