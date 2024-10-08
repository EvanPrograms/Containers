const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const { setAsync, getAsync } = require('../redis');


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let currentCount = await getAsync('added_todos');

  if (currentCount === null) {
    currentCount = 0;
    await setAsync('added_todos', currentCount)
  }

  const newCount = parseInt(currentCount) + 1;
  await setAsync('added_todos', newCount);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  const { text, done } = req.body;
  req.todo.text = text || req.todo.text; // update text if provided
  req.todo.done = done !== undefined ? done : req.todo.done; // update done if provided
  await req.todo.save();
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
