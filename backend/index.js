

const{MongoClient,ObjectId} = require("mongodb");

async function connect() {
  if(global.db) return global.db
  const conn = await MongoClient.connect("mongodb+srv://saulopontes:sauloPontesBlue@clusterbluetalks.kd8yiz7.mongodb.net/");
  if(!conn) return new Error("ERRO ao conectar");
  global.db = await conn.db("perfis")
  return global.db;
}


const express = require('express')

const app = express()

app.use(require('cors')());
app.use(express.urlencoded({extended : true}))
app.use(express.json());



const router = express.Router();


router.get('/',(req,res)=>res.json({message:'Funcionando'}));



router.get('/perfil/:id?',async function(req,res,next){
   try {
      const db = await connect();
     if (req.params.id) {
       res.json(await db.collection("perfil").findOne({_id: new ObjectId(req.params.id)}))
     } else {
       res.json(await db.collection("perfil").find().toArray());
     }
    } catch (ex) {
      console.log(ex)
     res.status(400).json({erro:`${ex}`});
    }
})





router.post('/perfil',async function(req,res,next){
   try {
      const aluno   =   req.body;
      const db = await connect();
      res.json(await db.collection("perfil").insertOne(aluno))
    } catch (ex) {
      console.log(ex)
     res.status(400).json({erro:`${ex}`});
    }
})

router.put('/perfil/:id', async function(req,res,next){
  try{
    const aluno = req.body;
    const db = await connect();
     res.json(await db.collection("perfil").updateOne({_id: new ObjectId(req.params.id)},{$set:aluno}))
  }catch(ex){
     console.log(ex)
     res.status(400).json({erro:`${ex}`});
  }
})



router.delete('/perfil/:id', async function(req,res,next){
  try{
    const db = await connect();
     res.json(await db.collection("perfil").deleteOne({_id: new ObjectId(req.params.id)}))
  }catch(ex){
     console.log(ex)
     res.status(400).json({erro:`${ex}`});
  }
})


app.use('/',router);
app.listen(3000)
console.log("Servidor funcionando ")
