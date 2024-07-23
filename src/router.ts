import { Router } from 'express'
import { body,param } from 'express-validator'

import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct

 } from './handlers/product'
import { handleInputErrors } from './middleware'
import { and } from 'sequelize'
const router = Router()


/** 
 *@swagger 
 *components: 
 *  schemas: 
 *      Product: 
 *          type :  object 
 *          properties: 
 *              id:
 *                  type: integer
 *                  descripcion : The product ID
 *                  example: 1
 *              name: 
 *                  type: string
 *                  descripcion : The product name
 *                  example: Monitor curvo de 49 pulgadas
 *              price:
 *                  type: number
 *                  descripcion : The product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  descripcion : The product availability
 *                  example: True
 * 
*/





/**
 * @swagger
 * /api/produts:
 *  post:
 *      summary
 */
router.get('/', getProducts)
/**
 * @swagger 
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return alist of products
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById,
)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get  product by his id
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters: 
 *        - in: path
 *          name: id
 *          descripciont: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses: 
 *          200: 
 *              description: Succesful Response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          404: 
 *              description: Not found.
 *          400: 
 *              description: Bad Request - Invalidad ID
 */

router.post('/', 

    // validacion
    body('name')
        .notEmpty().withMessage('el nombde de produto nopuede ir vacio'),
        
    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('el precio de produto nopuede ir vacio')
        .custom( value =>value > 0).withMessage('precio no valido'),
        handleInputErrors,
        createProduct
)
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name: 
 *                              type: string   
 *                              example: "Monitor Curvo 40"
 *                          price: 
 *                              type: number
 *                              example: 300
 *      responses: 
 *          201: 
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400: 
 *              description: Bad Request - invalid input data
 * 
 * 
 * 
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('el nombde de produto nopuede ir vacio'),

    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('el precio de produto nopuede ir vacio')
        .custom( value =>value > 0).withMessage('precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns de updated product
 *      parameters:
 *        - in:
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name: 
 *                              type: string   
 *                              example: "Monitor Curvo 40"
 *                          price: 
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses: 
 *          200: 
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400: 
 *              description: Bad request - Invalidad ID or invalid input data 
 *          404:
 *              description: Product not found
 * 
 * 
 */ 

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)
/**
 * @swagger 
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product Availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters: 
 *        - in: path     
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses: 
 *          200: 
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400: 
 *              description: Bad request - Invalidad ID or invalid input data 
 *          404:
 *              description: Product not found
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

/**
 * @swagger 
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes product
 *      tags:
 *          - Products
 *      description: Deletes a product based on its unique ID
 *      parameters: 
 *        - in: path
 *          name: id
 *          descripciont: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses: 
 *          200: 
 *              description: Succesful Response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: string
 *                          value: "Borrado Correactamente"
 *          404: 
 *              description: Not found.
 *          400: 
 *              description: Bad Request - Invalidad ID
 * 
 * 
 * 
 */

export default router