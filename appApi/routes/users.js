var express = require('express');
var router = express.Router();
var modelCam = require('../model/user')
/*var serviceCam = require('../service/camera')*/

router.get('/',function(req,res){
    var cameraId = parseInt(req.query.id);
    console.log("#############");
    console.log(req.query);
    console.log("#############");
    var filter = {
       id: cameraId
    }
    modelCam.findAll(filter,0).then(function(result){
        res.status(200).send(result)
    },function(error){
        res.status(500).send('Error get Flashcam ' + error);
    });
});
/*router.delete('/:serial', function(req, res){
    //console.log(req)
    var serial = req.params.serial ||null;
    if (serial){
        console.log('serial: '+serial)
        modelCam.deleteCam(serial).then(function(result){
            console.log(result)
            if (result){

                res.status(200).send('Removed camera :' + serial)
            } else{
                res.status(400).send('Removed camera :' + serial + ' FAIL' )
            }
        }, function(error){
            console.log('ERROR:' + error)
            res.status(500).send('Internal server error: ' + error)
        })
    } else {
        res.status(400).send('Missed parameter serial')
    }
})

router.post('/sync', function(req, res){
    if (!validatePostCamera(req, res)) {
        return;
    };
    var data = res.locals.data;
    serviceCam.sync(data).then(function(result){
        res.status(200).json(result)
    },function(err){
        res.status(500).send('Internal server error: ' + err)
    })
})*/

/*function validatePutHostCamera(req,res){
    console.log(req.body)
    var data = req.body ||{},
        error = [],
        statusCode = 400
        hosts = data.host || {}
    if (! data.host){
        error.push('Invalid host parameter');
    }
    if (error.length > 0) {
        res.status(statusCode).json({
            error: error.join('\n')
        });
    } else {
        res.locals.data = data
    }
    return error.length === 0;
}

router.post('/',function(req,res){
    if (!validatePostCamera(req, res)) {
        return;
    };
    var data = res.locals.data;
    serviceCam.insert(data).then(function(result){
        console.log('Debug: PostcameraRoute result:', result)
        if (result.errors.length >0 ) {
            res.status(400).send(result.errors)
        } else {
            res.status(200).json(result)
        }
    },function(err){
        res.status(500).send('Internal server error: ' + err)
    })
})

function validatePostCamera(req,res){
    console.log(req.body)
    var data = req.body ||{},
        error = [],
        statusCode = 400
        hosts = data.host || {}
    if (!Array.isArray(data.cameras)) {
        error.push('Invalid cameras parameter');
    }
    if (! data.host){
        error.push('Invalid host parameter');
    } else {
        console.log("validatePutHostCamera", data.host.ipAddress)
        console.log("validatePutHostCamera", data.host.hostname)
        if (! data.host.hostname ){
            error.push("Missing hostname in host field")
        }else if ( ! data.host.ipAddress){
            error.push('Missing ipAddress in in host field');
        }
    }
    if (error.length > 0) {
        res.status(statusCode).json({
            error: error.join('\n')
        });
    } else {
        res.locals.data = data
    }
    return error.length === 0;
}*/
module.exports = router;
