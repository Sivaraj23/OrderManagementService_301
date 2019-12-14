var express = require('express');
import mongoose from '@db/connection';
import Order from '../models/Orders';
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index', { title: 'Api home' });
});

module.exports = router;
