var express = require('express');
var router = express.Router();
const { format } = require('date-fns');
// fetch 모듈 대신 axios 모듈 사용 

const axios = require('axios');
const API = `http://makeup-api.herokuapp.com/api/v1/products.json`
let makeupDatas = [];
// localhost:4500/makeup
// get : all, search
router.get('/', async function(req, res, next) {
     
    //fetch(API, {method:'GET'}).then(res=>res.json()).then( res=>console.log( res )) 
    //axios.get(API).then( res=>console.log( res.data.length )) 
    //axios.post(API, {data}).then( res=>console.log( res.data.length )) 
    //axios.delete(API).then( res=>console.log( res.data.length )) 
    //axios.put(API).then( res=>console.log( res.data.length )) 

    const resDatas = await axios.get(API);
    makeupDatas = await [...resDatas.data];
    res.send({ message : "data get" , length : resDatas.data.length , datas : makeupDatas });
});

module.exports = router;
