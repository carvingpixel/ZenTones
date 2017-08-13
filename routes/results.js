/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
Lokin Crook, CIST 2580 Interactive & Social Apps
I am the only person that worked on this project & did not copy from any source
***********************************************************************************************/
var express = require('express');
var router = express.Router();

/* GET Search page. Self coded by Lokin Crook */
router.get('/', function(req, res, next) {
    res.render('results', {
        title: 'ZenTone Healing',
        page: 'Results',
        copyright: 'copyright 2016 Lokin Crook'
    });
});

module.exports = router;
