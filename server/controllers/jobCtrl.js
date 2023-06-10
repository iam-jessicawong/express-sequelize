const findAll = async (req, res) => {
  try {
    const jobs = await req.context.models.jobs.findAll();
    return res.send(jobs);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await req.context.models.jobs.findOne({
      where: { job_id: id },
    });

    if (!job) {
      return res.status(404).send(`job with id ${id} not found`);
    }

    return res.send(job);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const { id, title, min_salary, max_salary } = req.body;

    const isExist = await req.context.models.jobs.findOne({ where: { job_id: id } });
    if(isExist) return res.status(400).send(`cannot create job, job id ${id} is already exist`)

    if (!title || !title.trim() || !min_salary || !max_salary || min_salary > max_salary) {
      return res.status(400).send("invalid input. please insert job title, min and max salary. min salary can't be greater than max salary");
    }
    
    const job = await req.context.models.jobs.create({
      job_id: id, 
      job_title: title,
      min_salary: min_salary, 
      max_salary: max_salary
    });
    return res.send(job);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, min_salary, max_salary } = req.body;
    
    const job = await req.context.models.jobs.update(
      {
        job_title: title,
        min_salary: min_salary, 
        max_salary: max_salary
      },
      { returning: true, where: { job_id: id } }
    );

    if (job[0] < 1) {
      return res.status(404).send(`job with id ${id} is not exist`);
    }

    return res.send(job);
  } catch (error) {
    return res.send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await req.context.models.jobs.destroy({
      where: { job_id: id },
    });

    if (job < 1) {
      return res.status(404).send(`job with id ${id} is not found`);
    }

    return res.send("delete " + job + " row");
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
