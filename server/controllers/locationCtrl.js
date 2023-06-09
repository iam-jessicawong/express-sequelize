const findAll = async (req, res) => {
  try {
    const locations = await req.context.models.locations.findAll();
    return res.send(locations);
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

    const location = await req.context.models.locations.findOne({
      where: { location_id: id },
    });

    if (!location) {
      return res.status(404).send(`location with id ${id} not found`);
    }

    return res.send(location);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const {street_address, postal_code, city, state_province, country_id} = req.body;

    const location = await req.context.models.locations.create({
      street_address: street_address,
      postal_code: postal_code,
      city: city,
      state_province: state_province,
      country_id: country_id
    });
    return res.send(location);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {street_address, postal_code, city, state_province, country_id} = req.body;

    if (isNaN(id)) {
      return res.status(400).send("id must be a number starting from 1");
    }

    const location = await req.context.models.locations.update(
      {
        street_address: street_address,
        postal_code: postal_code,
        city: city,
        state_province: state_province,
        country_id: country_id
      },
      { returning: true, where: { location_id: id } }
    );

    if (location[0] < 1) {
      return res.status(404).send(`location with id ${id} is not exist`);
    }

    return res.send(location);
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

    const location = await req.context.models.locations.destroy({
      where: { location_id: id },
    });

    if (location < 1) {
      return res.status(404).send(`location with id ${id} is not found`);
    }

    return res.send("delete " + location + " row");
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
