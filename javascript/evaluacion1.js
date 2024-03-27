
var NoMetas = 0;
var TotalPonderaciones =0;
var arrayListadoMetas = {};
var arrayListadoHitoMetas = {};
//
var FechaActual = 0;
var FechaLimite = 0;

var NumMeta= 0;
var TotalMetas = 0;
//
$(document).ready(function(){
	BuscarEmpleadoLogeado();
	//BuscarListadoEmpleado();
	BuscarMetasEmpleado();
	CargaEmpresa();
})

/*-------------------------*/
function BuscarMetasEmpleado(){
	//var empleado = $("#txtEmpleadoSeleccionado").val();
	var empleado = $("#txtNumEmpleadoLogeado").val()
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
						debugger;
							if(data[i]['NoMeta']!= IDMeta){
								data[i]['meta'] = data[i]['meta'].replace(/['"]+/g, '');
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaCalificacionMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Calificación: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Fecha' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Fecha' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:4%' scope='col'></td></tr></thead>"
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
								
								if(data[i]['CalificacionPonderada'] == null && data[i]['Estatus'] == 2){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='4'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMeta(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\")'>Evaluar</button> </td>";
								}else if(data[i]['Estatus'] == 7){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='4'>Pendiente por Validar</td>";
								}else if(data[i]['CalificacionPonderada'] != null && data[i]['Estatus'] == 2){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='4'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\")'>Ver Evaluación</button> </td>";
								}
								else if(data[i]['CalificacionPonderada'] != null && data[i]['Estatus'] == 8){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='4'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada2(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\",\""+data[i]['ComentarioRechazoCalificacion']+"\")'>Editar</button> </td>";
								}
								else if(data[i]['CalificacionPonderada'] != null && data[i]['Estatus'] == 9){
									//
									NumMeta= NumMeta+1;
									TotalMetas = TotalMetas + data[i]['Calificacion'];
									//
									NuevaMeta =  NuevaMeta + "<td data-label='Calificación'><input type='text' title='Nombre de Meta' class='form-control' id='txtCalificacionMeta"+data[i]['NoMeta']+"' value='"+data[i]['Calificacion']+"' disabled></td>";
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaAceptada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\",\""+data[i]['ComentarioRechazoCalificacion']+"\")'>Evaluada</button> </td>";
								}
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control"   title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td></tr>';  
								}
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
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}

						
						//
					}
					///---
					if(NumMeta != 0){
						var CalculoDeTotales = TotalMetas/NumMeta;
					}else{
						var CalculoDeTotales = 0;
					}
					var CalculoDeTotales2 = roundToTwo(CalculoDeTotales);
					$("#txtEvaluacionDesempeño").val(CalculoDeTotales2);
					///---
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
	 ValidarFecha();
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
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
function MostrarModalValidaMetaAceptada(IdMeta,Meta,Ponderacion,UnidadMedida,Minimo,SatisfactorioMeta,ExcelenteMeta,ResultadoLogrado,CalificacionPonderada,Calificacion,ComentarioRechazoCalificacion){
	//NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\")'>Evaluar</button> </td>";
	$("#txtIdMetaEvaluadaAceptada").val(IdMeta);
	$("#txtMetaModalEvaluadaAceptada").val("");
	$("#txtMetaModalEvaluadaAceptada").val(Meta);
	$('#ModalMetaEvaluadaAceptada').modal('show');
	$("#txtPonderaciónModalEvaluadaAceptada").val(Ponderacion);
	$("#txtUnidadMedidaModalEvaluadaAceptada").val(UnidadMedida);
	$("#txtMinimoModalEvaluadaAceptada").val(Minimo);
	$("#txtSatisfactorioModalEvaluadaAceptada").val(SatisfactorioMeta);
	$("#txtExcelenteModalEvaluadaAceptada").val(ExcelenteMeta);
	$("#txtResultadoLogradoModalEvaluadaAceptada").val(ResultadoLogrado);
	$("#txtCalificacionModalEvaluadaAceptada").val(Calificacion);
	$("#txtCalificacionPonderadaModalEvaluadaAceptada").val(CalificacionPonderada);
	$("#txtComentarioRechazoModalEvaluadaAceptada").val(ComentarioRechazoCalificacion);
	
}

/*
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
*/
/*
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
*/
function GuardarCalificacionMeta(){
	var IdMeta = $("#txtIdMeta").val();
	var empleado = $("#txtNumEmpleadoLogeado").val();
	var ResultadoLogrado =  $("#txtResultadoLogradoModal").val();
	var CalificacionPonderada = $("#txtCalificacionPonderadaModal").val();
	var calificacion = $("#txtCalificacionModal").val();
	$.ajax({
				type: "POST",
				data: {
					param: 20,
					empleado: empleado,
					IdMeta: IdMeta,
					ResultadoLogrado:ResultadoLogrado,
					CalificacionPonderada:CalificacionPonderada,
					calificacion:calificacion,
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							location.reload();
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}

function MostrarModalValidaMeta(IdMeta,Meta,Ponderacion,UnidadMedida,Minimo,SatisfactorioMeta,ExcelenteMeta){
	//MostrarModalValidaMeta(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\")'
	$("#txtIdMeta").val(IdMeta);
	$("#txtMetaModal").val("");
	$("#txtMetaModal").val(Meta);
	$('#ModalRechazoMeta').modal('show');
	$("#txtPonderaciónModal").val(Ponderacion);
	$("#txtUnidadMedidaModal").val(UnidadMedida);
	$("#txtMinimoModal").val(Minimo);
	$("#txtSatisfactorioModal").val(SatisfactorioMeta);
	$("#txtExcelenteModal").val(ExcelenteMeta);
	$("#txtResultadoLogradoModal").val("");
	$("#txtCalificacionModal").val("");
	$("#txtCalificacionPonderadaModal").val("");
	
}
/*--*/
function MostrarModalValidaMetaEvaluada(IdMeta,Meta,Ponderacion,UnidadMedida,Minimo,SatisfactorioMeta,ExcelenteMeta,ResultadoLogrado,CalificacionPonderada,Calificacion){
	//NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\")'>Evaluar</button> </td>";
	$("#txtIdMetaEvaluada").val(IdMeta);
	$("#txtMetaModalEvaluada").val("");
	$("#txtMetaModalEvaluada").val(Meta);
	$('#ModalMetaEvaluada').modal('show');
	$("#txtPonderaciónModalEvaluada").val(Ponderacion);
	$("#txtUnidadMedidaModalEvaluada").val(UnidadMedida);
	$("#txtMinimoModalEvaluada").val(Minimo);
	$("#txtSatisfactorioModalEvaluada").val(SatisfactorioMeta);
	$("#txtExcelenteModalEvaluada").val(ExcelenteMeta);
	$("#txtResultadoLogradoModalEvaluada").val(ResultadoLogrado);
	$("#txtCalificacionModalEvaluada").val(Calificacion);
	$("#txtCalificacionPonderadaModalEvaluada").val(CalificacionPonderada);
	
}

function MostrarModalValidaMetaEvaluada2(IdMeta,Meta,Ponderacion,UnidadMedida,Minimo,SatisfactorioMeta,ExcelenteMeta,ResultadoLogrado,CalificacionPonderada,Calificacion,ComentarioRechazoCalificacion){
	//NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\")'>Evaluar</button> </td>";
	$("#txtIdMetaEvaluadaEditar").val(IdMeta);
	$("#txtMetaModalEvaluadaEditar").val("");
	$("#txtMetaModalEvaluadaEditar").val(Meta);
	$('#ModalMetaEvaluadaEditar').modal('show');
	$("#txtPonderaciónModalEvaluadaEditar").val(Ponderacion);
	$("#txtUnidadMedidaModalEvaluadaEditar").val(UnidadMedida);
	$("#txtMinimoModalEvaluadaEditar").val(Minimo);
	$("#txtSatisfactorioModalEvaluadaEditar").val(SatisfactorioMeta);
	$("#txtExcelenteModalEvaluadaEditar").val(ExcelenteMeta);
	$("#txtResultadoLogradoModalEvaluadaEditar").val(ResultadoLogrado);
	$("#txtCalificacionModalEvaluadaEditar").val(Calificacion);
	$("#txtCalificacionPonderadaModalEvaluadaEditar").val(CalificacionPonderada);
	$("#txtComentarioRechazoModalEvaluadaEditar").val(ComentarioRechazoCalificacion);
	
}
/*--*/
function ConfirmacionEvaluacionMeta(){	
	var ResultadoLogradoModal =  $("#txtResultadoLogradoModal").val();
	if(ResultadoLogradoModal.replace(/\s/g,"")!= ""&& ResultadoLogradoModal !=0){
	  var Confirmar = confirm("Desea Guardar el Resultado.");
      if (Confirmar){
          GuardarCalificacionMeta();
	  }
      else{
        return false;
	  }
	}else{
		alert("Favor de agregar un resultado.");
	}
}

function EvaluarCalificaciones(){
	if($("#txtResultadoLogradoModal").val()!=""){
		var ResultadoLogrado = parseInt($("#txtResultadoLogradoModal").val());
	}else{
		var ResultadoLogrado = 0;
	}
	//var ResultadoLogrado = parseInt($("#txtResultadoLogradoModal").val());
	var PonderaciónModal = parseInt($("#txtPonderaciónModal").val());
	var UnidadMedida = parseInt($("#txtUnidadMedidaModal").val());
	var Minimo = parseInt($("#txtMinimoModal").val());
	var SatisfactorioMeta = parseInt($("#txtSatisfactorioModal").val());
	var ExcelenteMeta = parseInt($("#txtExcelenteModal").val());
	var calificacion = 0;
	var CalificacionPonderada = 0;
	//
	$("#txtCalificacionModal").val("");
	$("#txtCalificacionPonderadaModal").val("");
	//
	if(UnidadMedida ==1){
		if( ResultadoLogrado <= 6){
			if(ResultadoLogrado <= ExcelenteMeta){
				if(ResultadoLogrado < Minimo){
					calificacion =1
				}else if((ResultadoLogrado >= Minimo) && (ResultadoLogrado < SatisfactorioMeta)){
					calificacion =2
				}else if((ResultadoLogrado >= SatisfactorioMeta)&& (ResultadoLogrado < ExcelenteMeta)){
					calificacion =3
				}else if(ResultadoLogrado == ExcelenteMeta){
					calificacion =4
				}else if(ResultadoLogrado > ExcelenteMeta){
					calificacion =5
				}
				$("#txtCalificacionModal").val(calificacion);
				CalificacionPonderada = PonderaciónModal/5*calificacion;
				$("#txtCalificacionPonderadaModal").val(CalificacionPonderada);
			}else{
				alert("El Resultado logrado no puede superar al campo de Excelente.");
				$("#txtResultadoLogradoModal").val("");
				$("#txtCalificacionModal").val("");
				$("#txtCalificacionPonderadaModal").val("");
			}
		}else{
			alert("El Resultado logrado no debe superar a 6");
			$("#txtResultadoLogradoModal").val("");
			$("#txtCalificacionModal").val("");
			$("#txtCalificacionPonderadaModal").val("");
		}
	}else{
		if(ResultadoLogrado < Minimo){
					calificacion =1
				}else if((ResultadoLogrado >= Minimo) && (ResultadoLogrado < SatisfactorioMeta)){
					calificacion =2
				}else if((ResultadoLogrado >= SatisfactorioMeta)&& (ResultadoLogrado < ExcelenteMeta)){
					calificacion =3
				}else if(ResultadoLogrado == ExcelenteMeta){
					calificacion =4
				}else if(ResultadoLogrado > ExcelenteMeta){
					calificacion =5
				}
		$("#txtCalificacionModal").val(calificacion);
		CalificacionPonderada = PonderaciónModal/5*calificacion;
		//CalificacionPonderada = ResultadoLogrado/100*PonderaciónModal
		$("#txtCalificacionPonderadaModal").val(CalificacionPonderada);
	}
	
	
}


function EvaluarCalificacionesEditar(){
	if($("#txtResultadoLogradoModalEvaluadaEditar").val()!=""){
		var ResultadoLogrado = parseInt($("#txtResultadoLogradoModalEvaluadaEditar").val());
	}else{
		var ResultadoLogrado = 0;
	}
	//var ResultadoLogrado = parseInt($("#txtResultadoLogradoModal").val());
	var PonderaciónModal = parseInt($("#txtPonderaciónModalEvaluadaEditar").val());
	var UnidadMedida = parseInt($("#txtUnidadMedidaModalEvaluadaEditar").val());
	var Minimo = parseInt($("#txtMinimoModalEvaluadaEditar").val());
	var SatisfactorioMeta = parseInt($("#txtSatisfactorioModalEvaluadaEditar").val());
	var ExcelenteMeta = parseInt($("#txtExcelenteModalEvaluadaEditar").val());
	var calificacion = 0;
	var CalificacionPonderada = 0;
	//
	$("#txtCalificacionModalEvaluadaEditar").val("");
	$("#txtCalificacionPonderadaModalEvaluadaEditar").val("");
	//
	if(UnidadMedida ==1){
		if( ResultadoLogrado <= 6){
			if(ResultadoLogrado <= ExcelenteMeta){
				if(ResultadoLogrado < Minimo){
					calificacion =1
				}else if((ResultadoLogrado >= Minimo) && (ResultadoLogrado < SatisfactorioMeta)){
					calificacion =2
				}else if((ResultadoLogrado >= SatisfactorioMeta)&& (ResultadoLogrado < ExcelenteMeta)){
					calificacion =3
				}else if(ResultadoLogrado == ExcelenteMeta){
					calificacion =4
				}else if(ResultadoLogrado > ExcelenteMeta){
					calificacion =5
				}
				$("#txtCalificacionModalEvaluadaEditar").val(calificacion);
				CalificacionPonderada = PonderaciónModal/5*calificacion;
				$("#txtCalificacionPonderadaModalEvaluadaEditar").val(CalificacionPonderada);
			}else{
				alert("El Resultado logrado no puede superar al campo de Excelente.");
				$("#txtResultadoLogradoModalEvaluadaEditar").val("");
				$("#txtCalificacionModalEvaluadaEditar").val("");
				$("#txtCalificacionPonderadaModalEvaluadaEditar").val("");
			}
		}else{
			alert("El Resultado logrado no debe superar a 6");
			$("#txtResultadoLogradoModalEvaluadaEditar").val("");
			$("#txtCalificacionModalEvaluadaEditar").val("");
			$("#txtCalificacionPonderadaModalEvaluadaEditar").val("");
		}
	}else{
		if(ResultadoLogrado < Minimo){
			calificacion =1
		}else if((ResultadoLogrado >= Minimo) && (ResultadoLogrado < SatisfactorioMeta)){
			calificacion =2
		}else if((ResultadoLogrado >= SatisfactorioMeta)&& (ResultadoLogrado < ExcelenteMeta)){
			calificacion =3
		}else if(ResultadoLogrado == ExcelenteMeta){
			calificacion =4
		}else if(ResultadoLogrado > ExcelenteMeta){
			calificacion =5
		}
		$("#txtCalificacionModalEvaluadaEditar").val(calificacion);
		CalificacionPonderada = PonderaciónModal/5*calificacion;
		//CalificacionPonderada = ResultadoLogrado/100*PonderaciónModal
		$("#txtCalificacionPonderadaModalEvaluadaEditar").val(CalificacionPonderada);
	}
	
	
}
/*
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

*/
function ValidarFecha(){
	FechaActual = 0;
	FechaLimite = 0;
	//
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	var anio = fechaActualL.getFullYear(); //obteniendo año
	FechaLimite = '31-12-'+anio;
	FechaLimite1 = '01-12-'+anio;
	FechaActual = fechaActual2;
	FechaLimite= FechaLimite.replace(/-/g, "");
    FechaLimite1= FechaLimite1.replace(/-/g, "");
	FechaActual= FechaActual.replace(/-/g, "");
	//
	FechaActual = parseInt(FechaActual);
	FechaLimite = parseInt(FechaLimite);
	FechaLimite1 = parseInt(FechaLimite1);
	if(FechaActual > FechaLimite1 && FechaActual < FechaLimite){
		
	}else{
		alert("La fecha para la validación de metas es en Diciembre");
		window.location='../dashboard.php';
	}
}

function ConfirmacionEvaluacionMetaEditada(){	
	var ResultadoLogradoModal =  $("#txtResultadoLogradoModalEvaluadaEditar").val();
	if(ResultadoLogradoModal.replace(/\s/g,"")!= ""&& ResultadoLogradoModal !=0){
	  var Confirmar = confirm("Desea Guardar el Resultado.");
      if (Confirmar){
          GuardarCalificacionMetaEditar();
	  }
      else{
        return false;
	  }
	}else{
		alert("Favor de agregar un resultado.");
	}
}

function GuardarCalificacionMetaEditar(){
	var IdMeta = $("#txtIdMetaEvaluadaEditar").val();
	var empleado = $("#txtNumEmpleadoLogeado").val();
	var ResultadoLogrado =  $("#txtResultadoLogradoModalEvaluadaEditar").val();
	var CalificacionPonderada = $("#txtCalificacionPonderadaModalEvaluadaEditar").val();
	var calificacion = $("#txtCalificacionModalEvaluadaEditar").val();
	$.ajax({
				type: "POST",
				data: {
					param: 22,
					empleado: empleado,
					IdMeta: IdMeta,
					ResultadoLogrado:ResultadoLogrado,
					CalificacionPonderada:CalificacionPonderada,
					calificacion:calificacion,
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							location.reload();
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}



//No. Nomina y colaborador…. En metas anuales 

//Evaluacion de desempeño es lcomo se llama la 4 link

//Se autoevalua el usuario, usario logeado

//