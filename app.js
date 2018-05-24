
import ChargeClient from 'lightning-charge-client'
var qr = require('qr-image');
var QRCode = require('qrcode')
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const MOWER_API =  'http://192.168.178.199:3000/';

var PRICE = 4;
var invoicePrice = PRICE;


app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('assets'));

// Initialize Charge client
const charge = new ChargeClient('http://159.69.9.34:9112', 'certificar')

var MOWING = false;

function mow() {
    axios.get(MOWER_API+'mow').then(response => {
        MOWING = true;
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


io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('newPrice', (msg) => {
        console.log('Set price to '+ msg.price);
        if (msg.price) {
            PRICE = msg.price;
        }
    })

    socket.on('newInvoice', (msg) => {
        console.log('Set Invoice price to '+ msg.price);
        if (msg.price) {
            invoicePrice = msg.price;
        }
    })
});

function startMowing(secondsToRun) {

    console.log('Start mowing');

    mow()

    var interval =  setInterval(function() {

        io.emit('mowerStatus', {status: 5})
        axios.get(MOWER_API+'mowerdata').then(response => {
            io.emit('mowerStatus', {status: response.data})
            
            if (response.data.state == 15) {
                clearInterval(interval);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, 1000)

    setTimeout(function() {
        console.log('Stop mowing');
        pause();
        clearInterval(interval);
        io.emit('mowerStatus', {status: 15})
    },secondsToRun*1000);

}


var latestInv;
const stream = charge.stream()
stream.on('payment', inv => {
    if (inv.payreq === latestInv.payreq) {

        io.emit('payment', { payreq: inv.payreq });
        const paid = inv.msatoshi_received;

        console.log(paid);

        const secondsToRun = paid/PRICE;

        startMowing(secondsToRun);


        // if (MOWING) {
        //     docontinue();
        // } else {
        //     mow();
        // }

        // setTimeout(pause,1000*20);
        
    }
})



app.get('/', function (req, res) {
    res.render('index', { pricePerSecond: PRICE });
});

app.get('/payment', async (req, res) => {

    const inv = await charge.invoice({ msatoshi: invoicePrice })
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

app.get('/admin', async (req, res) => {

    const invoices = await charge.fetchAll()

    let wealth = 0;

    for (let invoice of invoices) {
        if (invoice.msatoshi_received != null ) {
            wealth = wealth + parseInt(invoice.msatoshi_received);
        }
    }

    res.render('admin', { wealth: wealth });

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
http.listen(process.env.PORT || 8080);
