
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
	ValidarFecha();
	BuscarListadoEmpleado();
	CargaEmpresa();
})


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

/*-------------------------*/
function BuscarMetasEmpleado(){
	debugger;
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
							data[i]['meta'] = data[i]['meta'].replace(/['"]+/g, '');
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
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
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Meta en revisión</td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
									//NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='ValidarMeta(\""+data[i]['idMeta']+"\")'>Validar</button> </td>";
									//NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalRechazaMeta(\""+data[i]['idMeta']+"\")'>Rechazar</button> </td>";
									//NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}
								else if(data[i]['Estatus'] ==2 && data[i]['ResultadoLogrado'] ==null ){// Aceptados
									
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por mandar a calificar</td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
								}
								//
								else if(data[i]['Estatus'] ==9){// Aceptados
									//NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'>Calificado</td>";
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'><center> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidadaMetaEvaluada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\")' >Evaluado</button></center> </td>";
									
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
								}
								//
								else if(data[i]['Estatus'] ==3){//Rechazados
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Rechazado </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==0){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por mandar a autorizar </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==4){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Solicitud de cambio en la meta </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";									
									HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==5){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> En edicion por el usuario. </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==6){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por validar los cambios</td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==7){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'><center> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada(\""+data[i]['idMeta']+"\",\""+data[i]['meta']+"\",\""+data[i]['Ponderacion']+"\",\""+data[i]['UnidadMedida']+"\",\""+data[i]['MinimoMeta']+"\",\""+data[i]['SatisfactorioMeta']+"\",\""+data[i]['ExcelenteMeta']+"\",\""+data[i]['ResultadoLogrado']+"\",\""+data[i]['CalificacionPonderada']+"\",\""+data[i]['Calificacion']+"\")' >Evaluar</button></center> </td>";
									
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==8){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Calificación en Edición </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
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
function MostrarModalValidadaMetaEvaluada(IdMeta,Meta,Ponderacion,UnidadMedida,Minimo,SatisfactorioMeta,ExcelenteMeta,ResultadoLogrado,CalificacionPonderada,Calificacion){
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
	
}
/*--*/
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
		CerrarSesion();
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

function ConfirmacionEvaluacionRechazarMeta(){	
	var Comentario =  $("#txtComentarioRechazoModalEvaluada").val();
	if(Comentario.replace(/\s/g,"")!= ""){
	  var Confirmar = confirm("Desea Rechazar la Calificación");
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
	var IdMeta = $("#txtIdMetaEvaluada").val();
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var Comentario =  $("#txtComentarioRechazoModalEvaluada").val();
	$.ajax({
				type: "POST",
				data: {
					param: 21, // El Rechazo de la solicitud de calificacion
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
							$('#ModalMetaEvaluada').modal('hide');
							BuscarMetasEmpleado();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}

function ConfirmacionEvaluacionAceptarMeta(){	
	
	  var Confirmar = confirm("Desea aceptar la Calificación");
      if (Confirmar){
          AceptarCalificacionMetaActualizacion();
	  }
      else{
        return false;
	  }
	
}

function AceptarCalificacionMetaActualizacion(){
	var IdMeta = $("#txtIdMetaEvaluada").val();
	var empleado = $("#txtEmpleadoSeleccionado").val();
	var Comentario =  $("#txtComentarioRechazoModalEvaluada").val();
	$.ajax({
		type: "POST",
		data: {
			param: 23, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
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
					$('#ModalMetaEvaluada').modal('hide');
					BuscarMetasEmpleado();
				}
				else{
					alert("La información no pudo ser guardado");
				}
			}
			
		}
	});
}

/*
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

*/