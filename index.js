import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app=express();
const port=3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

const apiurl="http://api.weatherstack.com/";
app.get("/",async (req, res) => {
    try{
      const result=await axios.get(apiurl+"current?access_key=3f519ea7adae2759395abbdba305f462&query=Kolkata")
      console.log(result);
      res.render("index.ejs",{weather:result.data.current,location:result.data.location});
    }
    catch(error){
      console.log(error);
      res.status(404).send(error.message);
      res.redirect(back);
    }
});
app.post("/all",async(req,res)=>{
  try{
    const city=req.body.city;
    const result=await axios.get(apiurl+`current?access_key=3f519ea7adae2759395abbdba305f462&query=${city}`)
    console.log(result);
    res.render("index.ejs",{weather:result.data.current,location:result.data.location});
  }
  catch(error){
    console.log(error);
    res.status(404).send(error.message);
    res.redirect(back);
  }
})
// 3f519ea7adae2759395abbdba305f462
//http://api.weatherstack.com/current
// ? access_key = YOUR_ACCESS_KEY
// & query = New York

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
