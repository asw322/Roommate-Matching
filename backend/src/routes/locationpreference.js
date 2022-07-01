const express = require('express');

const LocationpreferenceService = require('../services/locationpreference');
const LocationpreferenceDBApi = require('../db/api/locationpreference');
const wrapAsync = require('../helpers').wrapAsync;
const parseCommaStringIntoArray = require('../helpers').parseCommaStringIntoArray;

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Locationpreference:
 *        type: object
 *        properties:

 *          city:
 *            type: string
 *            default: city

 */

/**
 *  @swagger
 * tags:
 *   name: Locationpreference
 *   description: The Locationpreference managing API
 */

/**
 *  @swagger
 *  /api/locationpreference:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Locationpreference"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Locationpreference"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */

router.post('/', async (req, res) => {
  await LocationpreferenceService.create(
    req.body.data,
    req.currentUser,
    true,
    req.headers.referer,
  );
  const payload = true;
  res.status(200).send(payload);
});

/**
 *  @swagger
 *  /api/locationpreference/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Locationpreference"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Locationpreference"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await LocationpreferenceService.update(
      req.body.data,
      req.body.id,
      req.currentUser,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/locationpreference/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Locationpreference"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await LocationpreferenceService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/locationpreference:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Get all locationpreference
 *      description: Get all locationpreference
 *      responses:
 *        200:
 *          description: Locationpreference list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Locationpreference"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const payload = await LocationpreferenceDBApi.findAll(req.query);

    res.status(200).send(payload);
  }),
);

router.get('/autocomplete', async (req, res) => {
  const payload = await LocationpreferenceDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/locationpreference/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Locationpreference"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await LocationpreferenceDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/locationpreference/user/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Retrieve all tuples based on user ID
 *      description:  Retrieve all tuples based on user ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of user 
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Locationpreference"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/user/:id',
  wrapAsync(async (req, res) => {
    const payload = await LocationpreferenceDBApi.findBy({
      createdById: req.params.id,
    });

    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/locationpreference/location/{locationArray}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Locationpreference]
 *      summary: Retrieve all IDs that match any cities in locationArray
 *      description: Retrieve all IDs that match any cities in locationArray
 *      parameters:
 *        - in: path
 *          name: locationArray
 *          description: Array of location names
 *          required: true
 *          schema:
 *            type: array
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Locationpreference"
 *        400:
 *          description: Invalid locationArray supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.get('/location/:locationArray', wrapAsync(async (req, res) => {
  let result = { };
  let locationArray = parseCommaStringIntoArray(req.params.locationArray);

  if(locationArray) {
    for(let i = 0; i < locationArray.length; i++) {
      let currLocation = locationArray[i];
      result[currLocation] = await LocationpreferenceDBApi.findAll({
        city: currLocation,
      });
    }
  
    res.status(200).send(result);
  } else {
    res.status(400).send("Invalid location parameter(s) input");
  }
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
