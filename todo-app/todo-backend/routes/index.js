const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  try {
    const todos = await redis.getAsync('added_todos') || 0;
    console.log('added_todos count:', todos);  // Log the value to see what you get
    res.send({ "added_todos": todos });
  } catch (error) {
    console.error('Error fetching added_todos from Redis:', error);
    res.status(500).send({ error: 'Redis fetch failed' });
  }
});

module.exports = router;
