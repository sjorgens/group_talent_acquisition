/**
 * Created by Scott on 1/20/16.
 */
var express = require('express');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talent_skills';

var router = express.Router();

router.post('/addTalent', function (request, response) {

    var results = [];
    var data = request.body;
    var holder;
    console.log(data[1][0]);

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }

        client.query("INSERT INTO talent(first_name, last_name, phone, low_range, high_range) VALUES($1, $2, $3, $4, $5)", [data.firstName, data.lastName, data.phone, data.salMin, data.salMax]);

        skillStuff();

        function skillStuff() {
            var talentId = client.query("SELECT id FROM talent ORDER BY id DESC LIMIT 1");
            //console.log('talent id:', talentId);

            talentId.on('row', function (row) {
                console.log('row.id:', row.id);
                for (var i = 0; i < data[1].length; i++) {
                    console.log('data:', data[1][i]);
                    console.log(row.id);
                    client.query("INSERT INTO talent_skills(talent_id, skill_id) VALUES ($1, $2)", [row.id, data[1][i]]);
                }
                wrapItUp();
            });
        };

        function wrapItUp() {

            var query = client.query("SELECT * FROM talent JOIN talent_skills ON talent.id = talent_skills.talent_id JOIN skills ON talent_skills.skill_id = skills.id ORDER BY talent.id ASC");

            query.on('row', function (row) {
                results.push(row);
            });

            query.on('end', function () {
                client.end();
                return response.json(results);

            })
        }

    });
});

router.get('/addTalent', function (request, response) {

    var results = [];

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }


        var query = client.query("SELECT * FROM talent ORDER BY id ASC");

        query.on('row', function (row) {
            results.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(results);
        });

    });

});

router.post('/addSkill', function (request, response) {

    var results = [];
    var data = request.body;

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }
        ;

        client.query("INSERT INTO skills(name) VALUES($1)", [data.newSkill]);

        var query = client.query("SELECT * FROM skills ORDER BY id ASC");

        query.on('row', function (row) {
            results.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(results);
        });

    })

});

router.get('/addSkill', function (request, response) {

    var results = [];

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }
        ;

        var query = client.query("SELECT * FROM skills ORDER BY id ASC");

        query.on('row', function (row) {
            results.push(row);
        });

        query.on('end', function () {
            client.end();
            console.log(results);
            return response.json(results);
        });

    });

});


module.exports = router;