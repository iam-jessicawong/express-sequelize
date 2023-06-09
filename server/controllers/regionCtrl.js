const findAll = async (req, res) => {
  try {
    const regions = await req.context.models.regions.findAll();
    return res.send(regions);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send("id must be a number starting from 1");
    }

    const region = await req.context.models.regions.findOne({
      where: { region_id: id },
    });

    if (!region) {
      return res.status(404).send(`region with id ${id} not found`);
    }

    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const region = await req.context.models.regions.create({
      region_name: req.body.name,
    });
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send("id must be a number starting from 1");
    }

    const region = await req.context.models.regions.update(
      {
        region_name: req.body.name,
      },
      { returning: true, where: { region_id: id } }
    );
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send("id must be a number starting from 1");
    }

    const region = await req.context.models.regions.destroy({
      where: { region_id: id },
    });

    if (region < 1) {
      return res.status(404).send(`region with id ${id} is not found`);
    }

    return res.send("delete " + region + " row");
  } catch (error) {
    return res.send(error);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
};
