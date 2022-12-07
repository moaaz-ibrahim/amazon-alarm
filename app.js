const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const express= require('express');
const app = express();
const scrapper  = require('./main');

app.use(express.static('public'));
app.use(express.json());

app.post('/api' ,  async(req,res)=>{

    console.log('incoming request');
    console.log(req.body);
    const name= req.body.name; 
    const url = req.body.url ;
    const price = req.body.wantedPrice; 
   const data= await scrapper(url , price);
    console.log(data);
//    console.log(data.discount);
    res.json(data)
})
app.listen(3000 , ()=>console.log('Listening on port 3000...'))