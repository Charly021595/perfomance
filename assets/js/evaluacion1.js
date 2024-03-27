
let NoMetas = 0,
FechaActual = 0,
FechaLimite = 0;

let NumMeta = 0,
TotalMetas = 0;
//

jQuery(function () {
	BuscarEmpleadoLogeado();
	//BuscarListadoEmpleado();
	BuscarMetasEmpleado();
	CargaEmpresa();
});

/*-------------------------*/
function BuscarMetasEmpleado(){
	$("#validacion_metas_eva").hide();
	let empleado = $("#txtNumEmpleadoLogeado").val(),
	IDMeta = 0;
	HabilitaCambioDepartamento = 0;
	$(".CambiarDepartamento").prop( "disabled", true );
	if (empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        }).then(function(){
            CerrarSesion();
        });
        return false;
    }
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":3, "empleado": empleado},
		success: function(result) {
			$("#EspacioMetas").empty();
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				$("#validacion_metas_eva").show();
				for(i = 0; i < datos.length; i++){
					datos[i]['meta'] = datos[i]['meta'].replace(/['"]+/g, '');
					if(datos[i]['NoMeta']!= IDMeta){
						let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
						NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
						NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
						NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
						NuevaMeta =  NuevaMeta + "<td style='width:8%' scope='col'></td></tr></thead>"
						//tbody
						NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
						NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+datos[i]['meta']+'" class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
						NuevaMeta =  NuevaMeta + '<select title="Ponderación de Meta" class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'" disabled>';
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
						NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
						NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
						NuevaMeta =  NuevaMeta + '<select title="Unidad de Meta" data-label="Unidad de Medida:" class="form-control" id="txtUnidadMedida'+datos[i]['NoMeta']+'" disabled>';
						NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
						NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
						NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
						NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
						NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
						NuevaMeta =  NuevaMeta + '</select></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input title="'+datos[i]['MinimoMeta']+'" disabled class="form-control" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['ExcelenteMeta']+'" disabled class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
						if(datos[i]['Estatus'] ==1){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Meta en revisión</td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							//NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='ValidarMeta(\""+datos[i]['idMeta']+"\")'>Validar</button> </td>";
							//NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalRechazaMeta(\""+datos[i]['idMeta']+"\")'>Rechazar</button> </td>";
							//NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}
						else if(datos[i]['Estatus'] ==2 && datos[i]['ResultadoLogrado'] ==null ){// Aceptados
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por mandar a calificar</td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
						}
						//
						else if(datos[i]['Estatus'] ==9){// Aceptados
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'><center> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidadaMetaEvaluada(\""+datos[i]['idMeta']+"\",\""+datos[i]['meta']+"\",\""+datos[i]['Ponderacion']+"\",\""+datos[i]['UnidadMedida']+"\",\""+datos[i]['MinimoMeta']+"\",\""+datos[i]['SatisfactorioMeta']+"\",\""+datos[i]['ExcelenteMeta']+"\",\""+datos[i]['ResultadoLogrado']+"\",\""+datos[i]['CalificacionPonderada']+"\",\""+datos[i]['Calificacion']+"\")' >Evaluado</button></center> </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
						}
						//
						else if(datos[i]['Estatus'] ==3){//Rechazados
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Rechazado </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}else if(datos[i]['Estatus'] ==0){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por mandar a autorizar </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}else if(datos[i]['Estatus'] ==4){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Solicitud de cambio en la meta </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";									
							HabilitaCambioDepartamento =1;
						}else if(datos[i]['Estatus'] ==5){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> En edicion por el usuario. </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}else if(datos[i]['Estatus'] ==6){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Pendiente por validar los cambios</td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}else if(datos[i]['Estatus'] ==7){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'><center> <button class='btn btn-primary ValidaBoton' onclick='MostrarModalValidaMetaEvaluada(\""+datos[i]['idMeta']+"\",\""+datos[i]['meta']+"\",\""+datos[i]['Ponderacion']+"\",\""+datos[i]['UnidadMedida']+"\",\""+datos[i]['MinimoMeta']+"\",\""+datos[i]['SatisfactorioMeta']+"\",\""+datos[i]['ExcelenteMeta']+"\",\""+datos[i]['ResultadoLogrado']+"\",\""+datos[i]['CalificacionPonderada']+"\",\""+datos[i]['Calificacion']+"\")' >Evaluar</button></center> </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}else if(datos[i]['Estatus'] ==8){
							NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> Calificación en Edición </td>";
							NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
							HabilitaCambioDepartamento =1;
						}
						
						//NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">Eliminar</button> </td>';
						//tbody
						NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
						NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+datos[i]['NoMeta']+"'>";
						/*---------*/
						if(datos[i]['NoHito'] !=null){
							NuevaMeta =  NuevaMeta + '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td></tr>';  
							//NuevaMeta =  NuevaMeta + "<td><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>Eliminar</button></td></tr>";  
						}
						/*---------*/
						NuevaMeta =  NuevaMeta + "</table>"; 
						$('#EspacioMetas').append(NuevaMeta);
						$("#txtCantidadPonderacion"+datos[i]['NoMeta']).val(datos[i]['Ponderacion']);
						$("#txtUnidadMedida"+datos[i]['NoMeta']).val(datos[i]['UnidadMedida']);
						IDMeta = datos[i]['NoMeta'];
						NoMetas =datos[i]['NoMeta'];
					}else{
						if(datos[i]['NoHito'] !=null){
							var NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
							//NuevaMeta =  NuevaMeta + "<td><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>Eliminar</button></td></tr>";  
							$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
						}
					}
				}
				if(HabilitaCambioDepartamento !=1){
					$(".CambiarDepartamento").prop( "disabled", false );
				}
			}else{
				Swal.fire({
					title: "Aviso",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					$("#validacion_metas_eva").hide();
				});
			}
		}
	});
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
/*-------------------------*/
function BuscarEmpleadoLogeado(){
	$("#nombre_lado_izquierdo").removeClass("tamanos_nombres");
	$("#nombre_lado_izquierdo").removeClass("tamanos_nombres_v2");
	let empleado = $("#txtNumEmpleadoLogeado").val();
	if(empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        }).then(function(){
            CerrarSesion();
        });
        return false;
    }
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":1, "empleado": empleado},
		 success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				for(i = 0; i < datos.length; i++){
					let nombre = datos[i]['Nombre'],
					nombre_separado = nombre.split(" ");
					if(nombre_separado.length == 4){
						$("#NombreCont").text(nombre_separado[0]+' '+nombre_separado[2]+' '+nombre_separado[3]);
						$("#nombre_lado_izquierdo").text(nombre_separado[0]+' '+nombre_separado[2]+' '+nombre_separado[3]);
						$("#nombre_lado_izquierdo").addClass("tamanos_nombres");
					}else if(nombre_separado.length <= 5) {
						$("#NombreCont").text(nombre);
						$("#nombre_lado_izquierdo").text(nombre);
						$("#nombre_lado_izquierdo").addClass("tamanos_nombres");
					}else{
						$("#nombre_lado_izquierdo").addClass("tamanos_nombres_v2");
					}
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
}

function CerrarSesion(){
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param": 7},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				window.location='../index.php';
			}else{
				Swal.fire({
					title: "Aviso",
					text: 'Ocurrio un error al cerrar sesion',
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
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

function GuardarCalificacionMeta(){
	let IdMeta = $("#txtIdMeta").val(),
	empleado = $("#txtNumEmpleadoLogeado").val(),
	ResultadoLogrado =  $("#txtResultadoLogradoModal").val(),
	CalificacionPonderada = $("#txtCalificacionPonderadaModal").val(),
	calificacion = $("#txtCalificacionModal").val();
	if (IdMeta == "") {
		Swal.fire({
            title: "Aviso",
            text: 'se requiere el id meta.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }
	if (empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }
	if (ResultadoLogrado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'El resultado logrado no puede ir vacío.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }
	if (CalificacionPonderada == "") {
		Swal.fire({
            title: "Aviso",
            text: 'La calificación ponderada no puede ir vacía.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }
	if (calificacion == "") {
		Swal.fire({
            title: "Aviso",
            text: 'La calificacíon no puede ir vacía.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param": 20, "empleado": empleado, "IdMeta": IdMeta, "ResultadoLogrado":ResultadoLogrado, "CalificacionPonderada":CalificacionPonderada, "calificacion":calificacion},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				Swal.fire({
					title: "success",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					location.reload();
					BuscarMetasEmpleado();
				});
			}else{
				Swal.fire({
					title: "Aviso",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
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
	let ResultadoLogradoModal =  $("#txtResultadoLogradoModal").val();
	if(ResultadoLogradoModal.replace(/\s/g,"")!= ""&& ResultadoLogradoModal !=0){
	  let Confirmar = confirm("Desea Guardar el Resultado.");
      if (Confirmar){
        GuardarCalificacionMeta();
	  }else{
        return false;
	  }
	}else{
		Swal.fire({
			title: "Aviso",
			text: 'Favor de agregar un resultado.',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
}

function EvaluarCalificaciones(){
	if($("#txtResultadoLogradoModal").val()!=""){
		let ResultadoLogrado = parseInt($("#txtResultadoLogradoModal").val());
	}else{
		let ResultadoLogrado = 0;
	}
	//let ResultadoLogrado = parseInt($("#txtResultadoLogradoModal").val());
	let PonderaciónModal = parseInt($("#txtPonderaciónModal").val()), 
	UnidadMedida = parseInt($("#txtUnidadMedidaModal").val()),
	Minimo = parseInt($("#txtMinimoModal").val()),
	SatisfactorioMeta = parseInt($("#txtSatisfactorioModal").val()),
	ExcelenteMeta = parseInt($("#txtExcelenteModal").val()),
	calificacion = 0,
	CalificacionPonderada = 0;
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
				Swal.fire({
					title: "success",
					text: 'El Resultado logrado no puede superar al campo de Excelente.',
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					$("#txtResultadoLogradoModal").val("");
					$("#txtCalificacionModal").val("");
					$("#txtCalificacionPonderadaModal").val("");
				});
			}
		}else{
			Swal.fire({
				title: "success",
				text: 'El Resultado logrado no debe superar a 6',
				icon: 'info',
				allowOutsideClick: false,
				confirmButtonText: "Aceptar",
			}).then(function(){
				$("#txtResultadoLogradoModal").val("");
				$("#txtCalificacionModal").val("");
				$("#txtCalificacionPonderadaModal").val("");
			});
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
		let ResultadoLogrado = parseInt($("#txtResultadoLogradoModalEvaluadaEditar").val());
	}else{
		let ResultadoLogrado = 0;
	}
	//let ResultadoLogrado = parseInt($("#txtResultadoLogradoModal").val());
	let PonderaciónModal = parseInt($("#txtPonderaciónModalEvaluadaEditar").val()),
	UnidadMedida = parseInt($("#txtUnidadMedidaModalEvaluadaEditar").val()),
	Minimo = parseInt($("#txtMinimoModalEvaluadaEditar").val()),
	SatisfactorioMeta = parseInt($("#txtSatisfactorioModalEvaluadaEditar").val()),
	ExcelenteMeta = parseInt($("#txtExcelenteModalEvaluadaEditar").val()),
	calificacion = 0;
	CalificacionPonderada = 0;
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
				Swal.fire({
					title: "Aviso",
					text: 'El Resultado logrado no puede superar al campo de Excelente.',
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					$("#txtResultadoLogradoModalEvaluadaEditar").val("");
					$("#txtCalificacionModalEvaluadaEditar").val("");
					$("#txtCalificacionPonderadaModalEvaluadaEditar").val("");
				});
			}
		}else{
			Swal.fire({
				title: "Aviso",
				text: 'El Resultado logrado no debe superar a 6',
				icon: 'info',
				allowOutsideClick: false,
				confirmButtonText: "Aceptar",
			}).then(function(){
				$("#txtResultadoLogradoModalEvaluadaEditar").val("");
				$("#txtCalificacionModalEvaluadaEditar").val("");
				$("#txtCalificacionPonderadaModalEvaluadaEditar").val("");
			});
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

function ValidarFecha(){
	FechaActual = 0;
	FechaLimite = 0;
	//
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	let anio = fechaActualL.getFullYear(); //obteniendo año
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
		Swal.fire({
			title: "Aviso",
			text: 'La fecha para la validación de metas es en Diciembre',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		}).the(function(){
			window.location.href='../dashboard.php';
		});
	}
}

function ConfirmacionEvaluacionMetaEditada(){	
	let ResultadoLogradoModal =  $("#txtResultadoLogradoModalEvaluadaEditar").val();
	if(ResultadoLogradoModal.replace(/\s/g,"")!= ""&& ResultadoLogradoModal !=0){
	  let Confirmar = confirm("Desea Guardar el Resultado.");
      if (Confirmar){
        GuardarCalificacionMetaEditar();
	  }else{
        return false;
	  }
	}else{
		Swal.fire({
			title: "Aviso",
			text: 'Favor de agregar un resultado.',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
}

function GuardarCalificacionMetaEditar(){
	let IdMeta = $("#txtIdMetaEvaluadaEditar").val(),
	empleado = $("#txtNumEmpleadoLogeado").val(),
	ResultadoLogrado =  $("#txtResultadoLogradoModalEvaluadaEditar").val(),
	CalificacionPonderada = $("#txtCalificacionPonderadaModalEvaluadaEditar").val(),
	calificacion = $("#txtCalificacionModalEvaluadaEditar").val();
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param": 22, "empleado": empleado, "IdMeta": IdMeta, "ResultadoLogrado":ResultadoLogrado, "CalificacionPonderada":CalificacionPonderada, "calificacion":calificacion},
		success: function(data) {
			if (data.estatus == "success") {
				Swal.fire({
					title: "success",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					location.reload();
					BuscarMetasEmpleado();
				});
			}else{
				Swal.fire({
					title: "Aviso",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
			}
		}
	});
}