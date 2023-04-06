var config=require('./dbConfig');
const sql=require('msnodesqlv8');

async function getLoginDetails(){
 try {
  sql.query(config,"select * from orders",(err,rows)=>{
    if(err) console.log(err);
   console.log(rows);
  })
 } catch (error ) {
  console.log(error);
 }
}
module.exports={
 getLoginDetails:getLoginDetails
}