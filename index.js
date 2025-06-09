const express = require('express');
const app = express();
const port = 3000;

const projects = require('./projectData');

// API: Lấy thông tin 1 dự án theo tên
app.get('/project/:name', (req, res) => {
  const name = req.params.name;
  const project = projects.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Dự án không tồn tại' });
  }
});

// API: Lấy tất cả công việc theo tên người được giao
app.get('/tasks/assignee/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const allTasks = projects.flatMap(p => p.tasks.map(t => ({ ...t, project: p.name })));
  const tasks = allTasks.filter(task => task.assignee.toLowerCase().includes(name));
  res.json(tasks);
});

// API: Lấy deadline của một công việc
app.get('/task/deadline/:taskname', (req, res) => {
  const taskname = req.params.taskname.toLowerCase();
  const task = projects.flatMap(p => p.tasks).find(t => t.name.toLowerCase().includes(taskname));
  if (task) {
    res.json({ task: task.name, deadline: task.deadline });
  } else {
    res.status(404).json({ error: "Không tìm thấy công việc" });
  }
});

app.listen(port, () => {
  console.log(`API chạy tại http://localhost:${port}`);
});
