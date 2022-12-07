const puppeteer = require('puppeteer');

async function scrapeAmazon(url , wantedPrice) {
    var result ;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // await page.type('#twotabsearchtextbox' , name);
    // await page.click('#nav-search-submit-button');
  const data =   await page.evaluate(()=>{
        const selector = document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2) > span.a-price-whole").innerText ;
    var price = parseFloat(selector.replace(',' , ''));
    // console.log('price is : ' + price);
    return price;
    })
    if (data <= wantedPrice){
        const saved  = wantedPrice -data ;
        result = {
            discount : 1 ,
            value : `discount reached the wanted price current price is : ${data} EGP you've saved :${saved} EGP`,
            price : data
        }
        await browser.close();
        return result;
    }
    else {
        result = {
            discount : 0 ,
            value : 'no discount yet current price is : ' + data,
            price : data 
        }
        await browser.close();
       return result;}  
    // Sending Data
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'pro.bot.mailer@gmail.com',
    //         pass: 'probotmailer.moaaz'
    //     }
    // });
    // var mailInfo = {
    //     from: 'Moaaz',
    //     to: 'moaaz.ibrahimofficial@gmail.com',
    //     subject: 'Amazon scrapper',
    //     text: `productName : ${productName} \n, Link : ${url}`
    // };
    // transporter.sendMail(mailInfo, (err, info) => {
    //     if (err) console.log('ERR with sending: ' +
    //         err);
    //     else console.log('message has been sent');
    // });
}
// const itemName = 'Iphone 11';
const url = 'https://www.amazon.eg/%D8%A7%D8%A8%D9%84-%D8%A7%D9%8A%D9%81%D9%88%D9%86-%D9%81%D9%8A%D8%B3-%D8%AA%D8%A7%D9%8A%D9%85-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9/dp/B08L8BJ9VC/ref=sr_1_1?crid=2PLKERP455XWG&keywords=Iphone+11&qid=1652410487&sprefix=%2Caps%2C134&sr=8-1';
const wantedPrice = 15000;

module.exports = scrapeAmazon;