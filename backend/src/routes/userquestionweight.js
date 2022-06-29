
const express = require('express');

const UserquestionweightService = require('../services/userquestionweight');
const UserquestionweightDBApi = require('../db/api/userquestionweight');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Userquestionweight:
 *        type: object
 *        properties:

 *          q1:
 *            type: integer
 *            format: int64
 *          q2:
 *            type: integer
 *            format: int64
 *          q3:
 *            type: integer
 *            format: int64
 *          q4:
 *            type: integer
 *            format: int64
 *          q5:
 *            type: integer
 *            format: int64
 *          q6:
 *            type: integer
 *            format: int64
 *          q7:
 *            type: integer
 *            format: int64
 *          q8:
 *            type: integer
 *            format: int64
 *          q9:
 *            type: integer
 *            format: int64
 *          q10:
 *            type: integer
 *            format: int64
 *          q11:
 *            type: integer
 *            format: int64
 *          q12:
 *            type: integer
 *            format: int64
 *          q13:
 *            type: integer
 *            format: int64
 *          q14:
 *            type: integer
 *            format: int64
 *          q15:
 *            type: integer
 *            format: int64
 *          q16:
 *            type: integer
 *            format: int64
 *          q17:
 *            type: integer
 *            format: int64
 *          q18:
 *            type: integer
 *            format: int64
 *          q19:
 *            type: integer
 *            format: int64
 *          q20:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Userquestionweight
 *   description: The Userquestionweight managing API
 */

  /**
  *  @swagger
  *  /api/userquestionweight:
  *    post:
  *      security:
  *        - bearerAuth: []
  *      tags: [Userquestionweight]
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
  *                  $ref: "#/components/schemas/Userquestionweight"
  *      responses:
  *        200:
  *          description: The item was successfully added
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Userquestionweight"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        405:
  *          description: Invalid input data
  *        500:
  *          description: Some server error
  */

router.post('/', async (req, res) => {
    await UserquestionweightService.create(req.body.data, req.currentUser, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
});

  /**
  *  @swagger
  *  /api/userquestionweight/{id}:
  *    put:
  *      security:
  *        - bearerAuth: []
  *      tags: [Userquestionweight]
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
  *                  $ref: "#/components/schemas/Userquestionweight"
  *              required:
  *                - id
  *      responses:
  *        200:
  *          description: The item data was successfully updated
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Userquestionweight"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.put('/:id', wrapAsync(async (req, res) => {
  await UserquestionweightService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  * @swagger
  *  /api/userquestionweight/{id}:
  *    delete:
  *      security:
  *        - bearerAuth: []
  *      tags: [Userquestionweight]
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
  *                $ref: "#/components/schemas/Userquestionweight"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.delete('/:id', wrapAsync(async (req, res) => {
  await UserquestionweightService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  *  @swagger
  *  /api/userquestionweight:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Userquestionweight]
  *      summary: Get all userquestionweight
  *      description: Get all userquestionweight
  *      responses:
  *        200:
  *          description: Userquestionweight list successfully received
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: "#/components/schemas/Userquestionweight"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Data not found
  *        500:
  *          description: Some server error
  */

router.get('/', wrapAsync(async (req, res) => {
  const payload = await UserquestionweightDBApi.findAll(
    req.query,
  );

  res.status(200).send(payload);
}));

router.get('/autocomplete', async (req, res) => {
  const payload = await UserquestionweightDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

  /**
  * @swagger
  *  /api/userquestionweight/{id}:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Userquestionweight]
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
  *                $ref: "#/components/schemas/Userquestionweight"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await UserquestionweightDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
