
import ChargeClient from 'lightning-charge-client'
var qr = require('qr-image');
var QRCode = require('qrcode')
const express = require('express');
const path = require('path');
const app = express();


app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('js'));

// Initialize Charge client
const charge = new ChargeClient('http://159.69.9.34:9112', 'certificar')

var latestInv;
const stream = charge.stream()
// stream.on('payment', inv => {
//     if (inv.payreq === latestInv.payreq) {
        
//     }
// })

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/payment', async (req, res) => {

    const inv = await charge.invoice({ msatoshi: 50 })
    latestInv = inv;
    const code = await QRCode.toDataURL(`lightning:${ inv.payreq }`.toUpperCase());

    // var code = qr.image(`lightning:${ inv.payreq }`.toUpperCase(), { type: 'svg' });
    res.render('payment', {qr: code, inv: inv});

})

app.get('/invoice/:id', async function(req, res) {

    const id = req.params.id

    const invoice = await charge.fetch(id)

    if (invoice.status == 'paid') {
        res.send('paid');
    } else {
        res.send('still not paid');
    }
  
  });

  



// Start server 
app.listen(process.env.PORT || 8080);
