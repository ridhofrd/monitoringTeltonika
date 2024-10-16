const pool = require("../../app")
const response = require("../res/response")

const getAlat = async (req, res) => {
    try {
      const sql = `SELECT * FROM alat`
      const result = await pool.query(sql)
      response(200, result.rows, "GET is Succefully", res)
    //   res.status(200).json(result.rows);
    } catch (err) {
        response(500, "invalid", "error", err)  
    //   res.status(500).send(err.message);
    }
  }

const getAlatbyid = async (req, res) => {
    try{
        const id = req.params.id
        const sql =`SELECT * FROM alat WHERE id = $1`
        const result = await pool.query(sql, [id])
        if(result.rows.length > 0){
            response(200, result.rows, `alat by id = '${id}'`, res)
        }else{
            response(404, null, `alat with id = '${id} not found`,res )
        }
    }catch (err){
        response(500, "invalid", "error", res);
    }
}

const createAlat = async (req, res) => {
    try{
        const { id, name, status } = req.body
        const sql = `INSERT INTO alat (id, name, status) VALUES ($1, $2, $3) RETURNING id`
        const result = await pool.query(sql, [id, name, status])
        if(result.rowCount){
            const data = {
                isSuccees : result.rowCount,
                id: result.rows[0].id
            }
            response(200, data, "POST is Succesfully", res)
        }
    }catch (err){
        response(500, "invalid","error", res)
    }
}

const updateAlat = async (req, res)=>{
    try {
        const {id,name,status} = req.body
        const sql = `UPDATE alat SET name = $1, status = $2 WHERE id = $3`
        const result = await pool.query(sql, [name, status, id])
        if(result.rowCount){
            const data = {
                isSuccees : result.rowCount,
                message : "Update Data Succesfully"
            }
            response(200, data, "Update Data is Succesfuly", res)
        }else{
            response(404, `user ${id} is Not Found`, "error", res)
        }
    } catch (err) {
        response(500, "invalid", "error", res)
    }
}

const deleteAlat = async (req, res) => {
    try {
        const {id} = req.body
        const sql = `DELETE FROM  alat WHERE id = $1`
        const result = await pool.query(sql, [id])
        if(result.rowCount){
            data = {
                isDeleted : result.rowCount
            }
            response(200, data, "Deleted is Succesfuly", res)
        }else{
            response(404, `id ${id} is not found`, "error", res)
        }
    } catch (err) {
        response(500, "invalid", "error", res)
    }
}

 module.exports = {
    getAlat,
    getAlatbyid,
    createAlat,
    updateAlat,
    deleteAlat,
 }