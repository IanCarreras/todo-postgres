const { TodoItem } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const todoItem = await Todoitem.create({
        content: req.body.content,
        todoId: req.params.todoId,
      })

      res.status(201).send(todoItem)
    } catch(err) {
      res.status(400).send(error)
    }
  },
  async update(req, res) {
    try {
      const todoItem = await TodoItem.find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId
        }
      });
      if (!todoItem) {
        return res.status(404).send({
          message: 'TodoItem Not Found'
        })
      }
      const updatedTodoItem = await todoItem.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).send(updatedTodoItem);
    } catch(err) {
      res.status(400).send(err);
    }
  },
  destroy(req, res) {
    return TodoItem
      .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId
          }
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found'
          })
        }

        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}
