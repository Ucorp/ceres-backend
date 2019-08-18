class UserController {
  constructor(service) {
    this.service = service;

    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(req, res, next) {
    try {
      const users = await this.service.findAll();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const user = await this.service.create(req.body);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async read(req, res, next) {
    try {
      const user = await this.service.findById(req.params.id);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const user = await this.service.update(req.params.id, req.body);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await this.service.delete(req.params.id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
