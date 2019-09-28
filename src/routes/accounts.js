module.exports = (app) => {
  const create = async (req, res) => {
    app.services.account.save(req.body)
      .then((result) => {
        res.status(201).json(result[0]);
      })
  };

  const getAll = async (req, res) => {
    app.services.account.findAll()
      .then(result => res.status(200).json(result));
  }

  return { create, getAll }
}