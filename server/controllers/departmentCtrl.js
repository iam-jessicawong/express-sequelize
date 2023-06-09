const findAll = async (req, res) => {
  try {
    const departments = await req.context.models.departments.findAll();
    return res.send(departments);
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

    const department = await req.context.models.departments.findOne({
      where: { department_id: id },
    });

    if (!department) {
      return res.status(404).send(`department with id ${id} not found`);
    }

    return res.send(department);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const { name, manager_id, location_id } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).send("please insert department name");
    }
    
    const department = await req.context.models.departments.create({
      department_name: name, 
      manager_id: manager_id,
      location_id: location_id
    });
    return res.send(department);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manager_id, location_id } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).send("id must be a number starting from 1");
    }
    
    const department = await req.context.models.departments.update(
      {
        department_name: name, 
        manager_id: manager_id,
        location_id: location_id
      },
      { returning: true, where: { department_id: id } }
    );

    if (department[0] < 1) {
      return res.status(404).send(`department with id ${id} is not exist`);
    }

    return res.send(department);
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

    const department = await req.context.models.departments.destroy({
      where: { department_id: id },
    });

    if (department < 1) {
      return res.status(404).send(`department with id ${id} is not found`);
    }

    return res.send("delete " + department + " row");
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
