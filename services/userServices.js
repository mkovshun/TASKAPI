const { User, Task } = require('../models/index');
const ApiError = require('../utils/ApiError');

exports.getUsers = async (query) => { //  GET /users
  let users = await User.findAll();

  if (query.first_name !== undefined) { //  GET /users?first_name=Max
    const first_name = query.first_name;

    users = users.filter(user =>
      user.firstName
        .toString()
        .toLowerCase()
        .includes(first_name.toLowerCase())
    );
  }

  if (query.last_name !== undefined) { //  GET /users?last_name=Kovshun
    const last_name = query.last_name;

    users = users.filter(user =>
      user.lastName
        .toString()
        .toLowerCase()
        .includes(last_name.toLowerCase())
    );
  }

  if (query.page !== undefined) { //  GET /users?page=1&limit=5
    const currentPage = Number(query.page); 
    const pageSize = Number(query.limit);
    
    const startPoint = (currentPage - 1) * pageSize;
    const endPoint = startPoint + pageSize;
    
    users = users.slice(startPoint, endPoint)
  }

  return users;
};

exports.getUser = async (params) => { // GET /users/:id
  const userId = Number(params.id);

  const getUser = await User.findOne({
    where: {
      id: userId,
    }
  })

  if (getUser === null) {
    throw new ApiError(404, 'User not found')
  }

  return getUser;
};

exports.getUserTasks = async (params) => { // GET /users/:id/tasks
  const userId = Number(params.id);

  const getUsersTask = await User.findByPk(userId, {
    include: Task
  });

  if (getUsersTask === null) {
    throw new ApiError(404, 'User tasks not found')
  }

  return getUsersTask;
}

exports.createUser = async ({ first_name, last_name, email }) => { // POST /users
  if (!first_name || !last_name || !email) {
    throw new ApiError(400, 'first_name, last_name or email is required!');
  };

  const newUser = await User.create({
    firstName: first_name,
    lastName: last_name,
    email,
  });

  return newUser;
};

exports.editUser = async (params, body) => {  // PUT /users/:id
  const userId = Number(params.id);
  const { first_name, last_name, email } = body;
  
  const updatedFields = {};
  if (first_name) updatedFields.firstName = first_name;
  if (last_name) updatedFields.lastName = last_name;
  if (email) updatedFields.email = email;

    if (Object.keys(updatedFields).length === 0) {
      throw new ApiError(400, 'No fields provided for update.');
    }

    const [updatedCount] = await User.update(updatedFields, {
      where: { id: userId },
    });

    if (updatedCount === 0) {
      throw new ApiError(404, 'User not found.');
    }

    const updatedUser = await User.findOne({ where: { id: userId } });
    return updatedUser;
};

exports.deleteUser = async (params) => {  // DELETE /users/:id
  const userId = Number(params.id);

  const deletedUser = await User.destroy({
    where: {
      id: userId,
    }
  })

  if (deletedUser === 0) {
    throw new ApiError(404, 'User not found')
  }

  return userId;
};