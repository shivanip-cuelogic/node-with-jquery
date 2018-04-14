

function getdata(event){
    event.preventDefault();

    var data = {
                 username:$('#username').val(),
                 password:$('#password').val()
    };

console.log("data :",data.username,data.password);
    $.ajax({
        method:"post",
        url:"http://localhost:3000/login",
        // contentType:'application/json',
        data:{
            data:data
        },
        crossDomain:true,
         
         success : function(data){
             console.log('Get response:',JSON.stringify(data.data,"",2));
             $('#getResponse').html(JSON.stringify(data,"",2));
            },
         error:function(jqXHR,textStatus,err){
             console.log("ajax error",textStatus);
         }
    });

}
