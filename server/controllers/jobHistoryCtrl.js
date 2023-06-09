const findAll = async (req, res) => {
  try {
    const job_history = await req.context.models.job_history.findAll();
    return res.send(job_history);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { employee_id } = req.params;

    if (isNaN(employee_id)) {
      return res.status(400).send("employee_id must be a number starting from 1");
    }

    const job_history = await req.context.models.job_history.findAll({
      where: { employee_id: employee_id },
    });

    if (!job_history) {
      return res.status(404).send(`job history with employee id ${employee_id} not found`);
    }

    return res.send(job_history);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const { employee_id, start_date, end_date, job_id, department_id } = req.body;

    if (!employee_id || !start_date || !start_date.trim() || !job_id || !department_id) {
      return res.status(400).send("invalid input. employee id, start date, job id, deptartment id is required");
    }
    
    const job_history = await req.context.models.job_history.create({
      employee_id: employee_id,
      start_date: start_date,
      end_date: end_date,
      job_id: job_id,
      department_id: department_id
    });
    return res.send(job_history);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { employee_id, start_date } = req.params;
    const { end_date, job_id, department_id } = req.body;
    
    if (isNaN(employee_id)) {
      return res.status(400).send("employee id must be a number starting from 1");
    }
    
    const job_history = await req.context.models.job_history.update(
      {
        end_date: end_date,
        job_id: job_id,
        department_id: department_id
      },
      { returning: true, where: { employee_id: employee_id, start_date: start_date } }
    );

    if (job_history[0] < 1) {
      return res.status(404).send(`job history with employee id ${employee_id} and start date ${start_date} is not exist`);
    }

    return res.send(job_history);
  } catch (error) {
    return res.send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const { employee_id, start_date } = req.params;

    if (isNaN(employee_id)) {
      return res.status(400).send("employee id must be a number starting from 1");
    }

    const job_history = await req.context.models.job_history.destroy({
      where: { employee_id: employee_id, start_date: start_date },
    });

    if (job_history < 1) {
      return res.status(404).send(`job history with employee_id ${employee_id} and start date ${start_date} is not found`);
    }

    return res.send("delete " + job_history + " row");
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
