const findAll = async (req, res) => {
  try {
    const employees = await req.context.models.employees.findAll();
    return res.send(employees);
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

    const employee = await req.context.models.employees.findOne({
      where: { employee_id: id },
    });

    if (!employee) {
      return res.status(404).send(`employee with id ${id} not found`);
    }

    return res.send(employee);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;

    if (!first_name || !first_name.trim() || !email || !email.trim()) {
      return res.status(400).send("please insert employee first_name and email");
    }
    
    const employee = await req.context.models.employees.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      hire_date: hire_date,
      salary: salary,
      commission_pct: commission_pct,
      job_id: job_id,
      manager_id: manager_id,
      department_id: department_id
    });
    return res.send(employee);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).send("id must be a number starting from 1");
    }
    
    const employee = await req.context.models.employees.update(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        hire_date: hire_date,
        salary: salary,
        commission_pct: commission_pct,
        job_id: job_id,
        manager_id: manager_id,
        department_id: department_id
      },
      { returning: true, where: { employee_id: id } }
    );

    if (employee[0] < 1) {
      return res.status(404).send(`employee with id ${id} is not exist`);
    }

    return res.send(employee);
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

    const employee = await req.context.models.employees.destroy({
      where: { employee_id: id },
    });

    if (employee < 1) {
      return res.status(404).send(`employee with id ${id} is not found`);
    }

    return res.send("delete " + employee + " row");
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
