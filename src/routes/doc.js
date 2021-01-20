const fs = require('fs')
const swaggerUiExpress = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UnprocessableEntityError:
 *       type: object
 *       properties:
 *         value:
 *           type: string
 *         msg:
 *           type: string
 *         param:
 *           type: string
 *         location:
 *           type: string
 *     UnprocessableEntityErrors:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UnprocessableEntityError'
 *   parameters:
 *     id:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *     offset:
 *       name: offset
 *       in: query
 *       description: Number of items to skip before returning the results.
 *       required: false
 *       schema:
 *         type: integer
 *         format: int32
 *         minimum: 0
 *         default: 0
 *     limit:
 *       name: limit
 *       in: query
 *       description: Maximum number of items to return.
 *       required: false
 *       schema:
 *         type: integer
 *         format: int32
 *         minimum: 0
 *         maximum: 100
 *         default: 100
*/

// Export items
module.exports = app => {
  const router = require('express').Router()
  router.use('/', swaggerUiExpress.serve)
  router.get('/', swaggerUiExpress.setup(swaggerJsdoc({
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'REST API doc',
        version: JSON.parse(fs.readFileSync('package.json', 'utf8')).version
      }
    },
    apis: [
      './src/routes/*.js'
    ]
  })))
  app.use('/doc', router)
}
