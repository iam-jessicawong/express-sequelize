const findAll = async (req, res) => {
  try {
    const countries = await req.context.models.countries.findAll();
    return res.send(countries);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await req.context.models.countries.findOne({
      where: { country_id: id },
    });

    if (!country) {
      return res.status(404).send(`country with id ${id} not found`);
    }

    return res.send(country);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const { id, name, region_id } = req.body;
    const country = await req.context.models.countries.create({
      country_id: id,
      country_name: name,
      region_id: region_id
    });
    return res.send(country);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const country = await req.context.models.countries.update(
      {
        country_name: name,
      },
      { returning: true, where: { country_id: id } }
    );

    if (country[0] < 1) {
      return res.status(404).send(`country with id ${id} is not exist`);
    }

    return res.send(country);
  } catch (error) {
    return res.send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await req.context.models.countries.destroy({
      where: { country_id: id },
    });

    if (country < 1) {
      return res.status(404).send(`country with id ${id} is not found`);
    }

    return res.send("delete " + country + " row");
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
