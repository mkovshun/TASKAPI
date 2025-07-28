const expres = require('express');
const app = expres()
const PORT = 3000

app.use(expres.json())

let tasks = [
  {
    "id": 1,
    "title": "ToDo 1",
    "completed": false
  },
  {
    "id": 2,
    "title": "ToDo 2",
    "completed": false
 },
  { 
    "id": 3,
    "title": "ToDo 3",
    "completed": true
  },
];

let idCounter = 4;

console.log(0 * 5);


app.get('/tasks', (req, res) => {
  let result = tasks;

  if (req.query.completed !== undefined) {
    const isCompleted = req.query.completed === 'true'; //GET /tasks?completed=true
    result = result.filter(t => t.completed === isCompleted);
  }

  if (req.query.search !== undefined) {
    const searchedTest = req.query.search; // (GET /tasks?search=текст)
    result = result.filter(t => t.title.toString().toLowerCase().includes(searchedTest.toLowerCase()));
  }

  if (req.query.page !== undefined) { 
    const currentPage = Number(req.query.page); //  GET /tasks?page=1&limit=5
    const pageSize = Number(req.query.limit);
    
    const startPoint = (currentPage - 1) * pageSize;
    const endPoint = startPoint + pageSize;
    
    result = result.slice(startPoint, endPoint)
  }

  res.json(result);
});

app.post('/tasks', (req, res) => {
  const { title, completed } = req.body
  if (!title || completed === undefined) {
    return res.status(400).json({ error: 'title or completed is required!'})
  }

  const newTaks = {
    id: idCounter++,
    title,
    completed,
  }

  tasks.push(newTaks)
  res.status(201).json(newTaks)
})

app.put('/tasks/:id', (req, res) => {
  let id = Number(req.params.id)

  const {title, completed } = req.body // ДЕСТРУКТУРОВАНИЙ ЗАПИТ body З СЕРВЕРУ
  
  if (!title || completed === undefined) {
    return res.status(400).json({ error: 'title or completed is required!'})
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = title;
  task.completed = completed;

  res.json(task);
})

app.delete('/tasks/:id', (req, res) => {
  let id = Number(req.params.id)

  let existtingTask = tasks.find(t => t.id === id)

  if (!existtingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks = tasks.filter(t => t.id !== id)

  res.json(tasks);
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})