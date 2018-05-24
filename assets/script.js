$( document ).ready(function() {
    
    
    function update() {
        socket.emit("newPrice", {price: $("#priceInput").val()})
        window.location.href = '/';
    }


    function payment() {

        window.location.href = '/payment';

    }

    function showSuccess() {

        $('#content').replaceWith('<div id="content"><svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">'+
        '<path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>'+
        '<circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>'+
        '<polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>'+
        '</svg></div>')


        //- setTimeout(function() {
        //-     location.reload();
        //- }, 1000*5)
        
    }

    function showMowing() {

    $('#content').replaceWith('<div id="content"><div class="sk-cube-grid"> \
    <div class="sk-cube sk-cube1"></div>\
    <div class="sk-cube sk-cube2"></div>\
    <div class="sk-cube sk-cube3"></div>\
    <div class="sk-cube sk-cube4"></div>\
    <div class="sk-cube sk-cube5"></div>\
    <div class="sk-cube sk-cube6"></div>\
    <div class="sk-cube sk-cube7"></div>\
    <div class="sk-cube sk-cube8"></div>\
    <div class="sk-cube sk-cube9"></div>\
    </div>\
    <p>Mowing...</p></div>')
    }

    //- function poll(invoice) {
    //-     setTimeout(function() {
    //-         $.ajax({ url: 'http://localhost:8080/invoice/'+invoice, success: function(data) {
    //-             if (data == "paid") {

    //-                 showSuccess()

    //-             } else {
    //-                 poll(invoice)
    //-             }
    //-         }});
    //-     }(invoice), 500);
    //- }

    var socket = io();

    var MOWING = false;

    socket.on('mowerStatus', function(msg) {

    if (msg.status == 5 && !MOWING) {
        MOWING = true;
        console.log('Status mowing')
        showMowing();
    } else if (msg.status == 15 ) {
        location.reload()
    }

    });

    socket.on('payment', function(msg) {

    showSuccess()

    console.log(JSON.stringify(msg));

    });

    var animation = document.getElementById('successAnimation');

    $("#price").text($("#secondsInput").val() * $('#pricePerSecond').text())

    $('#secondsInput').change(function() {
        $('#price').text($('#secondsInput').val() * $('#pricePerSecond').text())
        socket.emit("newInvoice", {price: $("#price").val()})
    })
})