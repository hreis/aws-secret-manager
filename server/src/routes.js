const express = require('express');
const ProcessesController = require('./controllers/ProcessesController');

const routes = express.Router();
// const processesController = new ProcessesController();

routes.get('/jobs', ProcessesController.getJobs);
routes.get('/jobsException', ProcessesController.getJobsException);
routes.get('/devs', ProcessesController.getDevs);

routes.get('/users', ProcessesController.getUsers);

routes.post('/search', function (req, res) {

    ProcessesController.search(req, res);

});

routes.post('/postJob', function (req, res) {

    ProcessesController.postJob(req, res);

});

routes.put('/update', function (req, res) {

    ProcessesController.update(req, res);

});

routes.delete('/deleteJob/:id', function (req, res) {
    ProcessesController.deleteJob(req, res);

});

module.exports = routes;

//Service Pattern
//Repository Pattern