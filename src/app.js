const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const result = repositories
  return response.json(result)
});

app.post("/repositories", (request, response) => {
  const {
    title,
    url,
    techs
  } = request.body

  const newRepo = {
    title,
    url,
    techs,
    likes: 0,
    id: uuid()
  }

  repositories.push(newRepo)

  return response.json(newRepo)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {
    url,
    title,
    techs
  } = request.body
  const idx = repositories.findIndex(repo => repo.id === id)
  if(idx < 0){
    return response.status(400).send()
  }

  const updatedRepo = {
    ...repositories[idx],
    url,
    title,
    techs
  }

  repositories[idx] = updatedRepo

  return response.json(updatedRepo)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const idx = repositories.findIndex(repo => repo.id === id)


  if(idx > -1){
    repositories.splice(idx,1)
    return response.status(204).send()
  } else {
    return response.status(400).json({ error: 'Project not found'})
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const idx = repositories.findIndex(repo => repo.id === id)

  if(idx < 0){
    return response.status(400).send()
  }

  let findedRepo = repositories[idx]
  findedRepo['likes'] = findedRepo.likes + 1

  repositories[idx] = findedRepo

  return response.json(findedRepo)
});

module.exports = app;
