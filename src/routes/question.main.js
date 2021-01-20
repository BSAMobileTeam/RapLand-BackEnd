
const { validate } = require('../validators/index');
const {
    checkCreateQuestion,
    checkGetQuestionById,
    checkCreateQuestionWithArray,
    checkUpdateQuestion,
    checkedGetMixedQuestionArray
} = require('../validators/question.main')
const { checkDeleteQuestion } = require('../validators/question.index')

module.exports = app => {
    const mainController = require('../controllers/question.main')
    const router = require('express').Router()
    
    /**
     * @swagger
     * 
     * components:
     *   schemas:
     *     mainQuestion:
     *       allOf:
     *         - type: object
     *           properties:
     *             id:
     *               type: string
     *               format: uuid
     *         - $ref: '#/components/schemas/mainQuestionToCreate'
     *     mainQuestionToCreate:
     *       type: object
     *       properties:
     *         game:
     *           type: array
     *           items:
     *             type: string
     *             default: 'rapjeu'
     *         gameMode:
     *           type: array
     *           items:
     *             type: string
     *             default: 'solo'
     *         type:
     *           type: string
     *           default: 'closed'
     *         title:
     *           type: string
     *         choices:
     *           type: array
     *           items:
     *             type: string
     *         answers:
     *            type: array
     *            items:
     *              type: string
     *         mediaType:
     *           type: string
     *           default: 'image'
     *           optional: true
     *         mediaUrl:
     *           type: string
     *           default: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png'
     *           optional: true
     *     mainQuestionToUpdate:
     *       type: object
     *       properties:
     *         game:
     *           type: array
     *           optional: true
     *           items:
     *             type: string
     *             default: 'rapjeu'
     *         gameMode:
     *           type: array
     *           optional: true
     *           items:
     *             type: string
     *             default: 'solo'
     *         type:
     *           type: string
     *           default: 'closed'
     *           optional: true
     *         title:
     *           type: string
     *           optional: true
     *         choices:
     *           type: array
     *           optional: true
     *           items:
     *             type: string
     *             optional: true
     *         answers:
     *            type: array
     *            optional: true
     *            items:
     *              type: string
     *              optional: true
     *         mediaType:
     *           type: string
     *           default: 'image'
     *           optional: true
     *         mediaUrl:
     *           type: string
     *           default: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png'
     *           optional: true
     */


    /**
     * @swagger
     *
     * /question/create:
     *   post:
     *     summary: Creates a mainQuestion
     *     tags:
     *       - mainQuestion
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/mainQuestionToCreate'
     *     responses:
     *       '201':
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/mainQuestionToCreate'
     *       '400':
     *         description: Bad Request
     *       '404':
     *         description: Not Found
     *       '422':
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UnprocessableEntityErrors'
     *       '500':
     *         description: Internal Server Error
     */
    router.post(
        '/create',
        checkCreateQuestion,
        [validate, mainController.authenticateAdmin, mainController.create]
    )
    

  /**
   * @swagger
   *
   * /question/createWithArray:
   *   post:
   *     summary: Creates an array of mainQuestion
   *     tags:
   *       - mainQuestion
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/mainQuestionToCreate'
   *     responses:
   *       '201':
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/mainQuestionToCreate'
   *       '400':
   *         description: Bad Request
   *       '404':
   *         description: Not Found
   *       '422':
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnprocessableEntityErrors'
   *       '500':
   *         description: Internal Server Error
   */
    router.post(
        '/createWithArray',
        checkCreateQuestionWithArray,
        [validate, mainController.authenticateAdmin, mainController.createWithArray])
    
  /**
   * @swagger
   *
   * /question/update:
   *   put:
   *     summary: Updates a mainQuestion
   *     tags:
   *       - mainQuestion
   *     parameters:
   *       - $ref: '#/components/parameters/id'
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/mainQuestionToUpdate'
   *     responses:
   *       '200':
   *         description: OK
   *       '400':
   *         description: Bad Request
   *       '404':
   *         description: Not Found
   *       '422':
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnprocessableEntityErrors'
   *       '500':
   *         description: Internal Server Error
   */
    router.put(
        '/update',
        checkUpdateQuestion,
        [validate, mainController.authenticateAdmin, mainController.updateQuestion]
    )


  /**
   * @swagger
   *
   * /question/deleteById:
   *   delete:
   *     summary: Delete a question
   *     tags:
   *       - mainQuestion
   *     parameters:
   *       - $ref: '#/components/parameters/id'
   *     responses:
   *       '200':
   *         description: OK
   *       '400':
   *         description: Bad Request
   *       '404':
   *         description: Not Found
   *       '422':
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnprocessableEntityErrors'
   *       '500':
   *         description: Internal Server Error
   */
    router.delete(
        '/deleteById',
        checkDeleteQuestion,
        [validate, mainController.authenticateAdmin, mainController.deleteById]
    )
 
  /**
   * @swagger
   *
   * /question/getById:
   *   get:
   *     summary: Delete a question
   *     tags:
   *       - mainQuestion
   *     parameters:
   *       - $ref: '#/components/parameters/id'
   *     responses:
   *       '200':
   *         description: OK
   *       '400':
   *         description: Bad Request
   *       '404':
   *         description: Not Found
   *       '422':
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnprocessableEntityErrors'
   *       '500':
   *         description: Internal Server Error
   */
    router.get(
        '/getById',
        checkGetQuestionById,
        [validate, mainController.getById]
    )

    router.get(
        '/getMixedArray',
        checkedGetMixedQuestionArray,
        [validate, mainController.getMixedArray]
    )
    
    router.get('/getAll', mainController.getAll)
    
    router.get('/count', mainController.getCount)

    app.use('/question', router)
}
