const { Task } = require('../models/index');
const ApiError = require('../utils/ApiError')

exports.getTasks = async (query) => { //GET /tasks
  let tasks = await Task.findAll();

  if (query.completed !== undefined) {
    const isCompleted = query.completed === 'true'; //GET /tasks?completed=true
    tasks = tasks.filter(t => t.completed === isCompleted);
  }

  if (query.search !== undefined) {
    const searchedTest = query.search; // GET /tasks?search=текст
    tasks = tasks.filter(t => 
      t.title
        .toString()
        .toLowerCase().
        includes(searchedTest.toLowerCase()));
  }

  if (query.page !== undefined && query.limit !== undefined) { 
    const currentPage = Number(query.page); //  GET /tasks?page=1&limit=5
    const pageSize = Number(query.limit);
    
    const startPoint = (currentPage - 1) * pageSize;
    const endPoint = startPoint + pageSize;
    
    tasks = tasks.slice(startPoint, endPoint)
  }

  return tasks;
};

exports.getTask = async (params) => { //GET /tasks/id
  let taskId = Number(params.id)

  const getTask = await Task.findOne({
    where: {
      id: taskId
    }
  })

  if (getTask === null) {
    throw new ApiError(404, 'Task not found')
  }

  return getTask;
};

exports.createTask = async ({ title, completed, user_id }) => { //POST /tasks
  console.log({ title, completed, user_id });
  
  if (!title || completed === undefined || !user_id) {
    throw new ApiError(400, 'title, completed or user_id is required!');
  }

  const newTask = await Task.create({
    title,
    completed,
    userId: user_id,
  });

  return newTask;
};

exports.editTask = async (params, body) => {  //PUT /tasks/id
  let taskId = Number(params.id);

  const {title, completed } = body; // ДЕСТРУКТУРОВАНИЙ ЗАПИТ body З СЕРВЕРУ

  const updatedFields = {};
  if (title) updatedFields.title = title;
  if (typeof completed === 'boolean') updatedFields.completed = completed;

  if (Object.keys(updatedFields).length === 0) {
    throw new ApiError(400, 'No fields provided for update.');
  };

  const [updatedCount] = await Task.update(updatedFields, {
    where: { id: taskId },
  });

  if (updatedCount === 0) {
    throw new ApiError(404, 'Task not found.');
  };

  const updatedTask = await Task.findOne({where: { id: taskId}});
  return updatedTask;
};

exports.deleteTask = async (params) => {  //DELETE /tasks/id
  let taskId = Number(params.id);

  const deletedTask = await Task.destroy({
    where: {
      id: taskId
    }
  });

  if (deletedTask === 0) {
    throw new ApiError(404, 'Task not found');
  };
};