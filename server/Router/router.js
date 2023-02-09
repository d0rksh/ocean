const express = require('express');
const { body } = require('express-validator');
const router  = express.Router()
const {addProducts,deleteProducts,editProduct,getProducts} = require('../Controller/controller')

router.get('/get-products',getProducts)

router.post('/add-product',[
    body('name').notEmpty().withMessage('name is required'),
    body('phone').notEmpty().withMessage('phone is required'),
    body('email').isEmail().withMessage('invalid email address'),
    body('amount').isNumeric().withMessage('amount is required'),
    body('size').isArray({min:1}).withMessage('size is required'),
    body('color').isArray({min:1}).withMessage('color is required'),
],addProducts)

router.post('/update-product',[
    body('name').notEmpty().withMessage('name is required'),
    body('phone').notEmpty().withMessage('phone is required'),
    body('email').isEmail().withMessage('invalid email address'),
    body('amount').isNumeric().withMessage('amount is required'),
    body('id').isNumeric().withMessage('id is required'),
],editProduct)

router.post('/delete-product',deleteProducts)

module.exports = router