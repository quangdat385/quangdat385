const express = require('express')

const router=express.Router()

const siteController=require('../app/controllers/SiteControllers')
router.get('/search',siteController.show)
router.get('/',siteController.index)

module.exports =router

