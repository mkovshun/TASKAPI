const userServices = require('../services/userServices');

exports.getUsers = async (req, res) => {
  try {
    let getUsers = await userServices.getUsers(req.query);
    res.status(200).json(getUsers);
  } catch (err) {
    {
    console.error('❌ Error fetching users:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
  }
};

exports.getUser = async (req, res) => {
  try {
    let getUser = await userServices.getUser(req.params);
    res.status(200).json(getUser);
  } catch (err) {
    {
    console.error('❌ Error fetching user:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    let getUserTasks = await userServices.getUserTasks(req.params);
    res.status(200).json(getUserTasks);
  } catch (err) {
    {
    console.error('❌ Error fetching user:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  };}
};

exports.createUser = async (req, res) => {
  try {
    const createUser = await userServices.createUser(req.body);
    res.status(201).json(createUser);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const updatedUser = await userServices.editUser(req.params, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('❌ Error updating user:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userServices.deleteUser(req.params)
    res.status(204).json({ message: `User id:${deletedUser} deleted! `})
  } catch (err) {
    console.error('❌ Error deliting user:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({ error: message });
  }
};