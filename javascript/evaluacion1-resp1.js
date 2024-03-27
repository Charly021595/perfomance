
var NoMetas = 0;
var TotalPonderaciones =0;
var arrayListadoMetas = {};
var arrayListadoHitoMetas = {};
//
var FechaActual = 0;
var FechaLimite = 0;
//
$(document).ready(function(){
	BuscarEmpleadoLogeado();
	BuscarListadoEmpleado();
	
})

/*-------------------------*/
function BuscarMetasEmpleado(){
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var IDMeta =0;
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
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" style="width:20%"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" style="width:6%" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" style="width:10%" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" style="width:9%"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" style="width:5%"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" style="width:7%"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" style="width:5%"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:4%' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" style="width:25%"> <input type="text" title="Nombre de Meta" class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
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
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" style="width:15%"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<select title="Unidad de Meta" data-label="Unidad de Medida:" class="form-control" id="txtUnidadMedida'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input title="Calificación Minima de Meta" disabled class="form-control" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="Calificación Satisfactorio de Meta" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input title="Calificación Excelente de Meta" disabled class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMeta(\""+data[i]['idMeta']+"\")'>Evaluar</button> </td>";
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td></tr>';  
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
							}

						
						//
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
	var empleado = $("#txtNumEmpleadoLogeado").val()
	if(empleado.replace(/\s/g,"") != ""){
	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					for(i=0;i<data.length;i++){
						$("#NombreCont2").text(data[i]['Nombre']);
						$("#NombreCont").text(data[i]['Nombre']);
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
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
					var Encabezado = "<option value='0'>Seleccione un empleado</option>";
					$('#txtEmpleadoSeleccionado').append(Encabezado);
					for(i=0;i<data.length;i++){
						var Empleado = "<option value='"+data[i]['Empleado']+"'>"+data[i]['Nombre']+"</option>";
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

function MostrarModalValidaMeta(Custodia){
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
