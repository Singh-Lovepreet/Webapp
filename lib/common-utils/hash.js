var md5 = require('md5');


function getHash(len){
    var md5Str = md5(len);
    var doubleMd5 = md5(md5Str);
    var tripleMd5 = md5(doubleMd5);
    return tripleMd5;
}

exports.getHash = getHash;
