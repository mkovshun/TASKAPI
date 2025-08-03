require('dotenv').config();
const PORT = process.env.PORT || 3000;

const expres = require('express');
const app = expres();

const sequelize = require('./db');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(expres.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.authenticate()
  .then(() => console.log('✅ Підключення до БД успішне'))
  .catch(err => console.error('❌ Помилка підключення до БД:', err));

sequelize.sync()
  .then(() => {console.log('📦 Таблиці синхронізовано');})
  .catch(err => console.error('❌ Помилка синхронізації:', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});

module.exports = app;``