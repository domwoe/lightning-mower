
import ChargeClient from 'lightning-charge-client'
var qr = require('qr-image');
const express = require('express');
const path = require('path');
const app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Initialize Charge client
const charge = new ChargeClient('http://159.69.9.34:9112', 'certificar')

var latestInv;
const stream = charge.stream()
stream.on('payment', inv => {
    if (inv.payreq === latestInv.payreq) {
        console.log('paid');
    }
})

app.get('/invoice', async function(req, res) {

    const inv = await charge.invoice({ msatoshi: 50 })
    latestInv = inv;

    console.log(inv.payreq);

    var code = qr.image(`lightning:${ inv.payreq }`.toUpperCase(), { type: 'svg' });

    res.type('svg');
    code.pipe(res);
  
  });

  



// Start server 
app.listen(process.env.PORT || 8080);
