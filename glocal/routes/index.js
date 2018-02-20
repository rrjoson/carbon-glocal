const { Router } = require('express');

//engineer table
const engId = require('./engineer/engId');
const name = require('./engineer/name');
const department = require('./engineer/department');

//vendor table
const principal = require('./vendor/vendor');

//products table
const productName = require('./products/productName');
const productLine = require('./products/productLine');
const category = require('./products/category');

//client table
const accountName = require('./client/accountname');
const priorityClient = require('./client/priorityclient');
const activeContract = require('./client/activecontract');
const contactEmail = require('./client/contactEmail');
const contactNumber = require('./client/contactnumber');
const noCases = require('./client/nocases');

//contact person
const contactPerson = require('./contact person/contactp');

//license
const license = require('./license/license');

//activities
const activity_client = require('./activities/client');
const addres = require('./activities/addres');
const typeOfActivity = require('./activities/typeOfActivity');
const purpose = require('./activities/purposeOfVisit');
const performed = require('./activities/activityPerformed');
const nextActivity = require('./activities/nextActivity');


const router = Router();

//engineer routes
router.use('/engineer', engId);
router.use('/name', name);
router.use('/department', department);

//vendor routes
router.use('/vendor', principal);

//products routes
router.use('/products', productName);
router.use('/code', productLine)
router.use('/category', category);

//client
router.use('/client', accountName);
router.use('/priority', priorityClient);
router.use('/active', activeContract);
router.use('/email', contactEmail);
router.use('/number', contactNumber);
router.use('/numbercases', noCases)

//contact person
router.use('/contactp', contactPerson);

//license route
router.use('/license', license);

//activities
router.use('/activity_client', activity_client);
router.use('/addres', addres);
router.use('/typeOfActivity', typeOfActivity);
router.use('/purposeOfVisit', purpose);
router.use('/activityPerformed', performed);
router.use('/nextActivity', nextActivity);

module.exports = router;