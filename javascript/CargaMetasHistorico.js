
var NoMetas = 0;
var TotalPonderaciones =0;
var arrayListadoMetas = {};
var arrayListadoHitoMetas = {};
//
var MetasSinValidar=0;
var MetasValidadas=0;
var MetasPendientesdeValidar=0;
var MetasCalificada=0;
//
var FechaActual = 0;
var FechaLimite = 0;
//
$(document).ready(function(){
	BuscarEmpleadoLogeado();
	//BuscarMetasEmpleado();
	//setTimeout(ValidarFecha, 500);
	CargaEmpresa();
	BuscarListadoEmpleado();
})

/*-------------------------*/

function BuscarMetasEmpleado(){
	var empleado = $("#txtNumEmpleadoLogeado").val();
	var Anio = $("#txtAnioSeleccionado").val();
	var IDMeta =0;
	HabilitaCambioDepartamento =0;
	$(".CambiarDepartamento").prop( "disabled", true ); 
	if(Anio.replace(/\s/g,"") != ""){
	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 25,
				empleado:empleado,
				Anio: Anio 
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
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'></td>";
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
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==5){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='2'> En edicion por el usuario. </td>";
									NuevaMeta =  NuevaMeta + "<td data-label=''></td>";
										HabilitaCambioDepartamento =1;
								}else if(data[i]['Estatus'] ==6){
									NuevaMeta =  NuevaMeta + "<td data-label='' colspan='3'></td>";
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

function ValidacionCamposVacios(){
	if(NoMetas!=0){
		//if(comentarios.replace(/\s/g,"") != "")
		var NombreMeta = $("#txtNombreMeta"+NoMetas).val();
		var CantidadPonderacion = $("#txtCantidadPonderacion"+NoMetas).val();
		var FechaMeta =$("#txtFechaMeta"+NoMetas).val();
		//
		var UnidadMedida =$("#txtUnidadMedida"+NoMetas).val();
		var MinimoMeta =$("#txtMinimoMeta"+NoMetas).val();
		var SatisfactorioMeta =$("#txtSatisfactorioMeta"+NoMetas).val();
		var ExcelenteMeta =$("#txtExcelenteMeta"+NoMetas).val();
		//
		validar = 0;
		if(NombreMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(CantidadPonderacion.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(FechaMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(UnidadMedida == 0){
			validar = 1;
		}
		if(MinimoMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(SatisfactorioMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(ExcelenteMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		
	}else{
		validar = 0;
	}
	return validar;	
}
function setFocusToTextBox(NoMetas){
    $("#txtNombreMeta"+ NoMetas).focus();
}


function ValidacionCamposVaciosHitos(NoMeta){
	var Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length;
	var NoHito = GuardarRecordatorio(NoMeta);
	if(NoHito!=0){
		//if(comentarios.replace(/\s/g,"") != "") txtNombreHito1_NoMeta1
		var NombreHito = $("#txtNombreHito"+NoHito+"_NoMeta"+NoMeta).val();
		var CantidadPonderacion = $("#txtFechaHito"+NoHito+"_NoMeta"+NoMeta).val();
		validar = 0;
		if(NombreHito.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(CantidadPonderacion.replace(/\s/g,"") == ""){
			validar = 1;
		}
		
	}else{
		validar = 0;
	}
	return validar;	
}

function GuardarRecordatorio(NoMeta) {
    var arrayRecordatorio24H = [];
	var numHito = 0;
        $("#TablaHitos_Meta"+NoMeta+" tr").each(function(index, value) {
            var campo1, campo2, campo3;
			var i =0;
			
            $(this).children("td").each(function(index2) {
				
                switch (index2) {
                    case 0:
						 campo1 = $(this).text();
					break;
					case 1:
						 campo2 = $(this).text();
					break;
					case 2:
						 campo3 = $("#txtNombreHito"+i+"_NoMeta"+NoMeta).val();
                    break;
                }
            });
        numHito = parseInt(campo2);
        });
        return numHito;
}

function ValidarPonderacion (){
	TotalPonderaciones =0;
	for(i=0;i<=NoMetas;i++){
		if ( $("#txtCantidadPonderacion"+i).length > 0 ) {
			TotalPonderaciones = TotalPonderaciones + parseInt($("#txtCantidadPonderacion"+i).val());
		}
	}
	return TotalPonderaciones;
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

function BuscarListadoEmpleado(){
	debugger;
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(empleado.replace(/\s/g,"") != ""){
	var anioAnterior = 0;	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 24,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					var Encabezado = "<option value='0'>Lista de colaboradores</option>";
					$('#txtAnioSeleccionado').append(Encabezado);
					for(i=0;i<data.length;i++){
						if(anioAnterior != data[i]['Anio']){
							var Anio = "<option value='"+data[i]['Anio']+"'>"+data[i]['Anio']+"</option>";
							$('#txtAnioSeleccionado').append(Anio);
							anioAnterior = data[i]['Anio'];
						}
						
					}
				}else{
					if(document.getElementById('#txtAnioSeleccionado') != null){
						document.getElementById('#txtAnioSeleccionado').innerHTML = "";
						var Anio = "<option value='0'>No cuentas empleados dependientes</option>";
						$('#txtAnioSeleccionado').append(Anio);
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
}