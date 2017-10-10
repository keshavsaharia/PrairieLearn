var ERR = require('async-stacktrace');
var _ = require('lodash');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var error = require('../../lib/error');
var question = require('../../lib/question');
var sqldb = require('../../lib/sqldb');

router.post('/', function(req, res, next) {
    var questionPath = path.join(res.locals.course.path, 'questions', res.locals.question.qid);

    fs.writeFile(path.join(questionPath, {
        'question-html': 'question.html',
        'server-python': 'server.py'
    }[req.body.file]), req.body.value, function(err) {
        res.send((err) ? 'error' : 'success');
    });
});

router.get('/', function(req, res, next) {
    var questionPath = path.join(res.locals.course.path, 'questions', res.locals.question.qid);

    fs.readFile(path.join(questionPath, 'question.html'), 'utf-8', function(questionErr, questionHtml) {
    fs.readFile(path.join(questionPath, 'info.json'), 'utf-8', function(jsonErr, infoJson) {
    fs.readFile(path.join(questionPath, 'server.py'), 'utf-8', function(serverErr, serverPython) {
    fs.readdir(path.join(questionPath, 'clientFilesQuestion'), function(questionFilesErr, questionFiles) {
    fs.readdir(path.join(res.locals.course.path, 'clientFilesCourse'), function(courseFilesErr, courseFiles) {

        res.locals.questionFiles = (questionFilesErr) ? [] : questionFiles;
        res.locals.courseFiles = (courseFilesErr) ? [] : courseFiles;
        res.locals.questionHtml = (questionErr) ? '' : questionHtml;
        res.locals.infoJson = (jsonErr) ? {} : JSON.parse(infoJson);
        res.locals.serverPython = (serverErr) ? '' : serverPython;

        res.render(__filename.replace(/\.js$/, '.ejs'), res.locals);

    }); }); }); }); });

    //res.render(__filename.replace(/\.js$/, '.ejs'), res.locals);
});

module.exports = router;
