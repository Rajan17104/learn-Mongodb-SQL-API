const  pool  = require("../db/mysql");

const getSalespeople = async () => {
    try {
        const [results, fileds] = await pool.query("SELECT * FROM salespeople")
        console.log(results);
        return results
    } catch (error) {
        console.log(error);
        throw new Error('Internal serever error')
    }
}

const addSalespeople = async (sname,city,comm) => {
    try {
        const [result] = await pool.query("INSERT INTO `salespeople`(`sname`, `city`, `comm`) VALUES (?,?,?)",[sname,city,comm])
        console.log(result);
        return {snum:result.insertId,sname,city,comm};
    } catch (error) {
        console.log(error);
        throw new Error('Internal serever error')
    }
}
const updateSalespeople = async (sname,city,comm,snum) => {
    try {
        const [result] = await pool.query("UPDATE `salespeople` SET sname= ?, city= ?, comm=? WHERE snum = ?",[sname,city,comm,snum])
        console.log(result);
        console.log({snum,sname,city,comm},"sscsc");
        return {snum,sname,city,comm}
    } catch (error) {
        console.log(error);
        throw new Error('Internal serever error')
    }
}
const deleteSalespeople = async (snum) => {
    try {
         await pool.query(`DELETE FROM salespeople WHERE snum = ? `,[snum])
        return {snum}
    } catch (error) {
        console.log(error);
        throw new Error('Internal serever error')
    }
}

module.exports = {
    getSalespeople,
    addSalespeople,
    updateSalespeople,
    deleteSalespeople
};