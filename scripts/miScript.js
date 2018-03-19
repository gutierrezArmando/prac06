var tareasCliente=[];

$(document).ready(function(){
    console.log("Se inicio");
    getTasksFromServer();
    // cargarTemplate();
    
    $("#btnNuevaTarea").click(function(){
        sendTask();
        $("#txtNuevaTarea").val('');
    }); 

    $("#IDtbody").on('click','button',function (){
        
            var cadenaId = $(this).parent().parent().attr('id');
            var indice = cadenaId.substring(4,cadenaId.length);
            if(tareasCliente[indice].estado==="Pendiente")
            {
                tareasCliente[indice].estado="Finalizado";
                updateTaskOnServer(indice);
                printTable();
            }
        
    });

});

// function cargarTemplate(){
//     $("#miTemplate").load('template.html');
// }

function sendTask(){
    var tarea = {
        user: "Armando",
        descripcion: $("#txtNuevaTarea").val(),
        estado:"Pendiente"
    };
    $.ajax({
        url: "http://localhost:8080/API/tasks",
        type: "POST",
        contentType: "application/json",
		data: JSON.stringify(tarea),
		success:function(res){
            tareasCliente.push(res);
            printTable();
			console.log(res);
		},
		error: function(err){
			console.log(err);
		}
    });
}

function printTable(){
    var cadena='';
    for(var i=0;i<tareasCliente.length;i++){
        if(tareasCliente[i].estado==="Pendiente"){
            cadena += '<tr id="fila'+ i +'">' + 
                    '<td>' + tareasCliente[i].descripcion+ '</td>' +
                    '<td>' + tareasCliente[i].estado + '</td>' +
                    '<td>' +
                    '<button class="btn btn-primary active">' +
                        'Finalizar <span class="glyphicon glyphicon-ok"></span>' +
                    '</button>' +
                    '</td>' +
                    '</tr>';
        }
    }

    for(var i=0;i<tareasCliente.length;i++){
        if(tareasCliente[i].estado!="Pendiente"){
            cadena += '<tr id="fila'+ i +'">' + 
                    '<td>' + tareasCliente[i].descripcion+ '</td>' +
                    '<td>' + tareasCliente[i].estado + '</td>' +
                    '<td>' +
                    '<button class="btn btn-success disabled">' +
                        'Finalizado <span class="glyphicon glyphicon-ok-circle"></span>' +
                    '</button>' +
                    '</td>' +
                    '</tr>';
        }
    }
    
    document.getElementById('IDtbody').innerHTML = cadena;
}

function getTasksFromServer(){
	$.ajax({
        url: "http://localhost:8080/API/tasks",
		type: "GET",
		contentType: "application/json",
		success:function(res){
            tareasCliente = res;
            printTable();
			console.log(res);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function updateTaskOnServer(indice){
    $.ajax({
        url: "http://localhost:8080/API/task",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(tareasCliente[indice]),
        success:function(res){console.log(res)},
        error:function(err){console.log(err)}
    });
}