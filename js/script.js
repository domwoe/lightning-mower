function poll(invoice) {
    console.info('Hi');
    setTimeout(function() {
        $.ajax({ url: "http://localhost/invoice/"+invoice, success: function(data) {
             console.log(data)
        }, complete: poll });
     }, 30000);
 };