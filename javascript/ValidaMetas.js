
var NoMetas = 0;
var TotalPonderaciones =0;
var arrayListadoMetas = {};
var arrayListadoHitoMetas = {};
//
var FechaActual = 0;
var FechaLimite = 0;
var HabilitaCambioDepartamento =0;

//
$(document).ready(function(){
	BuscarEmpleadoLogeado();
	BuscarListadoEmpleado();
	CargaEmpresa();
})

/*-------------------------*/
function BuscarMetasEmpleado(){
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var IDMeta =0;
	HabilitaCambioDepartamento =0;
	$(".CambiarDepartamento").prop( "disabled", true ); 
	if(empleado.replace(/\s/g,"") != ""){
	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 3,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				//document.getElementById('#EspacioMetas').innerHTML = "";
				$("#EspacioMetas").empty();
				if(data.length){
					for(i=0;i<data.length;i++){
						
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Fecha' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Fecha' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:8%' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+data[i]['meta']+'" class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<select title="Ponderación de Meta" class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<option value="10">10%</option>';
								NuevaMeta =  NuevaMeta + '<option value="15">15%</option>';
								NuevaMeta =  NuevaMeta + '<option value="20">20%</option>';
								NuevaMeta =  NuevaMeta + '<option value="25">25%</option>';
								NuevaMeta =  NuevaMeta + '<option value="30">30%</option>';
								NuevaMeta =  NuevaMeta + '<option value="35">35%</option>';
								NuevaMeta =  NuevaMeta + '<option value="40">40%</option>';
								NuevaMeta =  NuevaMeta + '<option value="45">45%</option>';
								NuevaMeta =  NuevaMeta + '<option value="50">50%</option>';
								NuevaMeta =  NuevaMeta + '<option value="55">55%</option>';
								NuevaMeta =  NuevaMeta + '<option value="60">60%</option>';
								NuevaMeta =  NuevaMeta + '<option value="65">65%</option>';
								NuevaMeta =  NuevaMeta + '<option value="70">70%</option>';
								NuevaMeta =  NuevaMeta + '<option value="75">75%</option>';
								NuevaMeta =  NuevaMeta + '<option value="80">80%</option>';
								NuevaMeta =  NuevaMeta + '<option value="85">85%</option>';
								NuevaMeta =  NuevaMeta + '<option value="90">90%</option>';
								NuevaMeta =  NuevaMeta + '<option value="95">95%</option>';
								NuevaMeta =  NuevaMeta + '<option value="100">100%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<select title="Unidad de Meta" data-label="Unidad de Medida:" class="form-control" id="txtUnidadMedida'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input title="'+data[i]['MinimoMeta']+'" disabled class="form-control" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['ExcelenteMeta']+'" disabled class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								if(data[i]['Estatus'] ==1){
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='ValidarMeta(\""+data[i]['idMeta']+"\")'>Aprobado</button> </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalRechazaMeta(\""+data[i]['idMeta']+"\")'>Rechazado</button> </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}
								else if(data[i]['Estatus'] ==2){// Aceptados
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Aprobado </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
								}else if(data[i]['Estatus'] ==3){//Rechazados
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Rechazado </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==0){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por mandar a autorizar </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==4){
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='ValidarCambioMeta(\""+data[i]['idMeta']+"\")'>Autorizar Cambio</button> </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalRechazaCambio(\""+data[i]['idMeta']+"\")'>Rechazar Cambio</button> </td>";
									//NuevaMeta =  NuevaMeta + "<td data-label=''>"+data[i]['ComentarioSolicitudCambios']+"</td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalComent(\""+data[i]['ComentarioSolicitudCambios']+"\")'>Comentario</button> </td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==5){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> En edicion por el usuario. </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==6){
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='ValidarMeta(\""+data[i]['idMeta']+"\")'>Aprobado</button> </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalRechazaMetaModificada(\""+data[i]['idMeta']+"\")'>Rechazado</button> </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==7){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por Calificar. </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==8){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Calificación en Edición </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==9){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Evaluado</td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										//HabilitaCambioDepartamento =1;
								}
								
								//NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">Eliminar</button> </td>';
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td></tr>';  
								//NuevaMeta =  NuevaMeta + "<td><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>Eliminar</button></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								//NuevaMeta =  NuevaMeta + "<td><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>Eliminar</button></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}

						
						//
					}
					
					if(HabilitaCambioDepartamento !=1){
						$(".CambiarDepartamento").prop( "disabled", false ); 
						
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
}
/*-------------------------*/

function BuscarEmpleadoLogeado(){
	let empleado = $("#txtNumEmpleadoLogeado").val()
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
            url: "../utileria.php",
            type: "post",
            data: {"param":1, "empleado": empleado},
             success: function(result) {
				let data = JSON.parse(result);
				if (data.estatus == "success") {
					let datos = data.data;
					for(i = 0; i < datos.length; i++){
						let nombre = datos[i]['Nombre'];
						$("#NombreCont").text(nombre);
						$("#nombre_lado_izquierdo").text(nombre);

						// $("#NombreCont").text(datos[i]['Nombre']);
						// $("#Fecha").text(FechaAr);
						// $("#txtNombreEmpleadoLogeado").val(datos[i]['Nombre']);
					}
				}else{
                    Swal.fire({
                        title: "Usuario Desconocida",
                        text: data.mensaje,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonText: "Aceptar",
                    });
				}
			}
		});
	
	}else{
        Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        }).then(function(){
            CerrarSesion();
        });
	}
}

function CerrarSesion(){
	$.ajax({
			type: "POST",
			//async: false,
			data: {
			  param: 7
			},
			
			url: "../utileria.php", 
		    dataType: 'JSON',
			success: function(data) {
				$('.cargando').hide(); // Oculta la imagen de cargando 
				if(data.length){
					window.location='../index.php';
				}
				
				
			}
		});
	
}

function BuscarListadoEmpleado(){
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(empleado.replace(/\s/g,"") != ""){
		
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 9,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					var Encabezado = "<option value='0'>Lista de colaboradores</option>";
					$('#txtEmpleadoSeleccionado').append(Encabezado);
					for(i=0;i<data.length;i++){
						var Empleado = "<option value='"+data[i]['Empleado']+"'>"+data[i]['Empleado']+" - "+data[i]['Nombre']+"</option>";
						$('#txtEmpleadoSeleccionado').append(Empleado);
						
					}
				}else{
					if(document.getElementById('#txtEmpleadoSeleccionado') != null){
						document.getElementById('#txtEmpleadoSeleccionado').innerHTML = "";
						var Empleado = "<option value='0'>No cuentas empleados dependientes</option>";
						$('#txtEmpleadoSeleccionado').append(Empleado);
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
}

function ValidarMeta(IdMeta){
	var empleado = $("#txtEmpleadoSeleccionado").val();
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
				type: "POST",
				data: {
					param: 10,
					empleado: empleado,
					IdMeta: IdMeta
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardada");
						}
					}
					
				}
			});
	}
}

function RechazarMeta(){
	var IdMeta = $("#txtIdMeta").val();
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var Comentario =  $("#txtComentarioMeta").val();
	$.ajax({
				type: "POST",
				data: {
					param: 11,
					empleado: empleado,
					IdMeta: IdMeta,
					Comentario:Comentario
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							$('#ModalRechazoMeta').modal('hide');
							//location.reload();
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}

function MostrarModalRechazaMeta(Custodia){
	$("#txtIdMeta").val(Custodia);
	$("#txtComentarioMeta").val("");
	$('#ModalRechazoMeta').modal('show');
}
function ConfirmacionRechazoMeta(){	
	var Comentario =  $("#txtComentarioMeta").val();
	if(Comentario.replace(/\s/g,"")!= ""){
	  var Confirmar = confirm("Desea Rechazar Meta");
      if (Confirmar){
          RechazarMeta();
	  }
      else{
        return false;
	  }
	}else{
		alert("Favor de agregar informacion en el comentario");
	}
}


function ValidarCambioMeta(IdMeta){
	var empleado = $("#txtEmpleadoSeleccionado").val();
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
				type: "POST",
				data: {
					param: 13,
					empleado: empleado,
					IdMeta: IdMeta
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardada");
						}
					}
					
				}
			});
	}
}

function MostrarModalRechazaCambio(Custodia){
	$("#txtIdMetaCambio").val(Custodia);
	$("#txtComentarioMetaCambio").val("");
	$('#ModalRechazoCambioMeta').modal('show');
}
function MostrarModalComent(Comentario){
	
	$("#txtComentarioCambioMetaCambio").val(Comentario);
	$('#ModalComentarioCambioMeta').modal('show');
}

function ConfirmacionRechazoCambioMeta(){	
	var Comentario =  $("#txtComentarioMetaCambio").val();
	if(Comentario.replace(/\s/g,"")!= ""){
	  var Confirmar = confirm("Desea Rechazar Meta");
      if (Confirmar){
          RechazarCambioMeta();
	  }
      else{
        return false;
	  }
	}else{
		alert("Favor de agregar informacion en el comentario");
	}
}

function RechazarCambioMeta(){
	var IdMeta = $("#txtIdMetaCambio").val();
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var Comentario =  $("#txtComentarioMetaCambio").val();
	$.ajax({
				type: "POST",
				data: {
					param: 14, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
					empleado: empleado,
					IdMeta: IdMeta,
					Comentario:Comentario
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							$('#ModalRechazoCambioMeta').modal('hide');
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}

function MostrarModalRechazaMetaModificada(Custodia){
	$("#txtIdMetaRechazoActualizacion").val(Custodia);
	$("#txtComentarioMetaRechazoActualizacion").val("");
	$('#ModalRechazoActualizacionMeta').modal('show');
}


function ConfirmacionRechazoActualizacionMeta(){	
	var Comentario =  $("#txtComentarioMetaRechazoActualizacion").val();
	if(Comentario.replace(/\s/g,"")!= ""){
	  var Confirmar = confirm("Desea Rechazar Meta");
      if (Confirmar){
          RechazarCambioMetaActualizacion();
	  }
      else{
        return false;
	  }
	}else{
		alert("Favor de agregar informacion en el comentario");
	}
}


function RechazarCambioMetaActualizacion(){
	var IdMeta = $("#txtIdMetaRechazoActualizacion").val();
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var Comentario =  $("#txtComentarioMetaRechazoActualizacion").val();
	$.ajax({
				type: "POST",
				data: {
					param: 15, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
					empleado: empleado,
					IdMeta: IdMeta,
					Comentario:Comentario
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							$('#ModalRechazoActualizacionMeta').modal('hide');
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}


function ValidarFecha(){
	FechaActual = 0;
	FechaLimite = 0;
	//
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	var anio = fechaActualL.getFullYear(); //obteniendo año
	FechaLimite = '01-10-'+anio;
	FechaActual = fechaActual2;
	FechaLimite= FechaLimite.replace(/-/g, "");
	FechaActual= FechaActual.replace(/-/g, "");
	//
	FechaActual = parseInt(FechaActual);
	FechaLimite = parseInt(FechaLimite);
	if(FechaActual > FechaLimite){
		alert("La fecha actual es mayor a la fecha limite de modificación");
		$(".ValidaBoton").prop( "disabled", true ); 
	}
}

function CambiaDepartamento(){
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var empleadoLogeado = $("#txtNumEmpleadoLogeado").val()
	arrayListadoMetas = GuardarListadoMetas();
	if(empleado != "0" && empleado != null){ 
		$.ajax({
			type: "POST",
			data: {
				param: 16, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
				empleado: empleado,
				empleadoLogeado: empleadoLogeado,
				arrayListadoMetas : JSON.stringify(arrayListadoMetas)
				
			},
			url: "../utileria.php",
			dataType: 'JSON',
			 success: function(data) {
				for(i=0;i<data.length;i++){
					if(data[i]['Validar'] == true ){
						alert("La información ha sido guardado correctamente");
						BuscarMetasEmpleado();
					}
					else{
						alert("La información no pudo ser guardado");
					}
				}
				
			}
		});
	}
}

function GuardarListadoMetas() {
    var arrayListaMetas = [];
	var CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
		for(i=0;i<=NoMetas;i++){
			
			$("#TablaBodyMeta"+i+" tr").each(function(index, value) {
				var NoMeta, NombreMeta, Ponderacion, Fecha, IdMeta,UnidadMedida,MinimoMeta,SatisfactorioMeta,ExcelenteMeta;
				$(this).children("td").each(function(index2) {
					switch (index2) {
						case 0:
							 NoMeta = $(this).text();
						break;
						case 1:
							 NombreMeta = $("#txtNombreMeta"+i).val();
						break;
						case 2:
							 Ponderacion = $("#txtCantidadPonderacion"+i).val();
						break;
						case 3:
							 Fecha = $("#txtFechaMeta"+i).val();
						break;
						case 4:
							 IdMeta = $("#txtID_Meta"+i).val();
						break;
						case 5:
							 UnidadMedida = $("#txtUnidadMedida"+i).val();
						break;
						case 6:
							 MinimoMeta = $("#txtMinimoMeta"+i).val();
						break;
						case 7:
							 SatisfactorioMeta = $("#txtSatisfactorioMeta"+i).val();
						break;
						case 8:
							 ExcelenteMeta = $("#txtExcelenteMeta"+i).val();
						break;
					}
				});
				//$('#txtPercepcionLiq').val(TotalRefacc);
				var Array = {};
				Array.NoMeta = NoMeta;
				Array.NombreMeta = NombreMeta;
				Array.Ponderacion = Ponderacion;
				Array.Fecha = Fecha;
				Array.IdMeta = IdMeta;
				//
				Array.UnidadMedida = UnidadMedida;
				Array.MinimoMeta = MinimoMeta;
				Array.SatisfactorioMeta = SatisfactorioMeta;
				Array.ExcelenteMeta = ExcelenteMeta;
				arrayListaMetas.push(Array);
			});
		}
        return arrayListaMetas;
}