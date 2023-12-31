import 'dotenv/config';
import express from "express";
import models, { sequelize } from './models/init-models';
import routes from './routes/indexRoute';

const port = process.env.PORT || 3300;
const app = express();

try {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(async (req, res, next) => {
    req.context = {models};
    next();
  });

  app.use('/regions', routes.regionRoute);
  app.use('/countries', routes.countryRoute);
  app.use('/locations', routes.locationRoute);
  app.use('/departments', routes.departmentRoute);
  app.use('/jobs', routes.jobRoute);
  app.use('/employees', routes.employeeRoute);
  app.use("/job-history", routes.jobHistoryRoute);

  const dropDatabaseSync = false;

  sequelize.sync({force: dropDatabaseSync}).then(async () => {
    if (dropDatabaseSync) {
      console.log("Database do not drop");
    };

    app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
  });
} catch (error) {
  console.log("error starting server: ", error);
}

export default app;
