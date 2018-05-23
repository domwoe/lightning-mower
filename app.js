
import ChargeClient from 'lightning-charge-client'
var qr = require('qr-image');
var QRCode = require('qrcode')
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const MOWER_API =  'http://192.168.178.199:3000/';


app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('assets'));

// Initialize Charge client
const charge = new ChargeClient('http://159.69.9.34:9112', 'certificar')

var MOWING = false;

function mow() {
    axios.get(MOWER_API+'mow').then(response => {
        MOVING = true;
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
}

function pause() {
    axios.get(MOWER_API+'pause').then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
}

function docontinue() {
    axios.get(MOWER_API+'unpause').then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
}


var latestInv;
const stream = charge.stream()
stream.on('payment', inv => {
    if (inv.payreq === latestInv.payreq) {

        if (MOWING) {
            docontinue();
        } else {
            mow();
        }

        setTimeout(pause,1000*20);
        
    }
})



app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/payment', async (req, res) => {

    const inv = await charge.invoice({ msatoshi: 50 })
    latestInv = inv;
    const code = await QRCode.toDataURL(`lightning:${ inv.payreq }`.toUpperCase()
    // { color: {
    //     dark: '#FFF',
    //     light: '#0000' }
    // }
    );

    // var code = qr.image(`lightning:${ inv.payreq }`.toUpperCase(), { type: 'svg' });
    res.render('payment', {qr: code, inv: inv});

})

app.get('/mower', async function(req, res) {

    axios.get(MOWER_API+'mowerdata').then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
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
