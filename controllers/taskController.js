const taskServices = require('../services/taskService')

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskServices.getTasks(req.query);
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskServices.getTask(req.params);
    res.status(200).json(task);
  } catch (err) {
    console.error('Error getting task:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await taskServices.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
};

exports.editTask = async (req, res) => {
  try {
    const editTask =  await taskServices.editTask(req.params, req.body)
    res.status(201).json(editTask);
  } catch (err) {
    console.error('Error editing task:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskServices.deleteTask(req.params)
    res.status(204).json({ message: `Task id:${deletedTask} deleted! `})
  } catch (err) {
    console.error('Error updating task:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
}