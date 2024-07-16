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

const addSalespeople = async ([sname,city,comm]) => {
    try {
        const [data] = await pool.query("INSERT INTO `salespeople`(`sname`, `city`, `comm`) VALUES (?,?,?)",[sname,city,comm])
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
        throw new Error('Internal serever error')
    }
}
const updateSalespeople = async (update) => {
    try {
        const [data] = await pool.query("UPDATE INTO `salespeople`(`sname`) VALUES (?)",[update])
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
        throw new Error('Internal serever error')
    }
}
const deleteSalespeople = async (id) => {
    try {
        const [data] = await pool.query(`SELECT * FROM salespeople WHERE ${id} `)
        console.log(data);
        return data
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