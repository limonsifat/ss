common = module.exports = {};

common.formatDateForDb = function(date) {
    date = new Date(date);
    var month = date.getMonth()+1;
    if(month <= 9) month = "0"+month;
    return date.getFullYear()+'-'+month+'-'+date.getDate()
    +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}

common.required = function(value) {
    var result = false;
    if(value != '' && value != undefined && value != null) result = true;
    return result;
}

common.sendResponseBack = function(res, status, message, data) {
    var responseJson = {};
    responseJson.status = status;
    responseJson.message = message;
    if(data) responseJson.data = data;
    res.send(responseJson);
}
