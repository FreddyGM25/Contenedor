function addHours(fecha, horas){
    var res = new Date(fecha);
    res.setHours(res.getHours() + horas);
    return res;
}
 module.exports = {addHours}