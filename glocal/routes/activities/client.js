const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from activities', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ACTIVITIES TABLE');
        response.json(res.rows);
    });
});

router3.get('/:client', (request, response, next) => {
    const { client } = request.params
    pool.query('SELECT *  FROM activities WHERE client= ($1)', [client], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY CLIENT');
        response.json(res.rows);
    });
});

router3.post('/', (request, response, next) => {
    const { trackingNo, timeIn, timeOuts, productCode, client, contactCustomer, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, engineerName, score } = request.body;

    pool.query(
        'INSERT INTO activities( trackingNo, timeIn, timeOuts, productCode, client, contactCustomer, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, engineerName, score ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', 
        [trackingNo, timeIn, timeOuts, productCode, client, contactCustomer, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, engineerName, score],
        (err, res) => {
            if (err) return next(err);

            console.log('activity created');
            response.redirect('/activity_client'); //yung route
        }
    );
});

router3.put('/:trackingNo', (request, response, next) => {
    const { trackingNo } = request.params;
    const keys = ['trackingNo', 'timeIn', 'timeOuts', 'productCode', 'client', 'contactCustomer', 'addres', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations', 'engineerName', 'score'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE activities SET ${field} = ($1) WHERE trackingNo =($2)`, [request.body[field], trackingNo],
            (err, res) => {
                if (err) return next(err);

                console.log('UPDATING activity record');

                if (index === fields.length - 1) response.redirect('/activities');
            }
        )
    });
});

router3.delete('/:trackingNo', (request, response, next) => {
    const { trackingNo } = request.params;

    pool.query(
        'DELETE FROM activities WHERE trackingNo = ($1)', [trackingNo],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/activities');
        }
    );
});
module.exports = router3;