const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const locationpreferenceRoutes = require('./routes/locationpreference');

const usersurveyRoutes = require('./routes/usersurvey');

const userpreferenceRoutes = require('./routes/userpreference');

const userquestionweightRoutes = require('./routes/userquestionweight');

const usermatchesRoutes = require('./routes/usermatches');

const options = {
  definition: {
    openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Roommate Matching",
        description: "Roommate Matching Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.",
      },
    servers: [
      {
        url: config.swaggerUrl,
        description: "Development server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', function (req, res, next) {
    swaggerUI.host = req.get('host');
    next()
  }, swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({origin: true}));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

app.use('/api/locationpreference', passport.authenticate('jwt', {session: false}), locationpreferenceRoutes);

app.use('/api/usersurvey', passport.authenticate('jwt', {session: false}), usersurveyRoutes);

app.use('/api/userpreference', passport.authenticate('jwt', {session: false}), userpreferenceRoutes);

app.use('/api/userquestionweight', passport.authenticate('jwt', {session: false}), userquestionweightRoutes);

app.use('/api/usermatches', passport.authenticate('jwt', {session: false}), usermatchesRoutes);

const publicDir = path.join(
  __dirname,
  '../public',
);

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
