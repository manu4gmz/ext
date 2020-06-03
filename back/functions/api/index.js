const express = require('express');
const router = express.Router();

//router.use(cookieParser());
//router.use(cors());
/*
const corsConfig = {
    origin: true,
    credentials: true,
};*/

//router.use(cors(corsConfig));
//router.options('*', cors(corsConfig));


router.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", "https://espacioportiempo.netlify.app");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "header, Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since");
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});


//importando rutas
const users = require('./users')
const properties = require('./properties')

router.use('/users', users)
router.use('/properties', properties)

module.exports = router