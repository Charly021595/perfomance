
let NoMetas = 0,
TotalPonderaciones = 0,
arrayListadoMetas = {},
arrayListadoHitoMetas = {},
MetasSinValidar = 0,
MetasValidadas = 0,
MetasPendientesdeValidar = 0,
MetasCalificada = 0,
FechaActual = 0,
FechaLimite = 0;

jQuery(function () {
	BuscarEmpleadoLogeado();
	BuscarMetasEmpleado();
	//setTimeout(ValidarFecha, 500);
	CargaEmpresa();
});

/*-------------------------*/
function BuscarMetasEmpleado(){
	let empleado = $("#txtNumEmpleadoLogeado").val(),
	IDMeta = 0;

	if (empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un número de empleado.',
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
		success: function(result){
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				for(i = 0; i < data.length; i++){
					if(datos[i]['Estatus'] ==0){
					//
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							//NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+datos[i]['meta']+'"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'"></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100"></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" /></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")'>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' >";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input title'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" title="'+datos[i]['meta']+'" class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" title="Nombre de Meta" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary ValidaBoton" onclick="AgregarHito('+datos[i]['NoMeta']+')">+</button> </td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">-</button> </td>';
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente por mandar a validación</td>';
							//
							//tbody
							NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
							
							NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+datos[i]['NoMeta']+"'>";
							if(datos[i]['NoHito'] !=null){
							/*---------*/
							NuevaMeta =  NuevaMeta + '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"><labe >Hito: </label></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+datos[i]['Hito']+'"  id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
							NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")'>-</button></div></td></tr>";  
							}
							/*---------*/
							NuevaMeta =  NuevaMeta + "</table>"; 
							$('#EspacioMetas').append(NuevaMeta);
							$("#txtCantidadPonderacion"+datos[i]['NoMeta']).val(datos[i]['Ponderacion']);
							//
								$("#txtUnidadMedida"+datos[i]['NoMeta']).val(datos[i]['UnidadMedida']);
							//
							IDMeta = datos[i]['NoMeta'];
							NoMetas =datos[i]['NoMeta'];
						}else{
							if(datos[i]['NoHito'] !=null){
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"><labe >Hito: </label></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")'>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					MetasSinValidar=1;
					// En validacion
					}else if(datos[i]['Estatus'] ==1){
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' disabled>";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-primary ValidaBoton" onclick="AgregarHito('+datos[i]['NoMeta']+')">+</button> </td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">-</button> </td>';
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente de Autorización</td>';
							//
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
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					MetasPendientesdeValidar=1;
					}else if(datos[i]['Estatus'] ==2){ //Aceptado
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' disabled>";
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+datos[i]['idMeta']+')" >Modificar</button> </td>';
							  NuevaMeta =  NuevaMeta + "<td colspan='2' data-label=''> <button class='btn btn-primary ValidaBoton' onclick='SolicitarCambios(\""+datos[i]['idMeta']+"\")'>Modificar</button> </td>";
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="">Aceptado</td>';
							//
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
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					 MetasValidadas=1;
					}else if(datos[i]['Estatus'] ==3){ //Rechazado
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  								
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" ></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" >';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100"></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" /></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" /></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")'>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' >";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input    title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input    title="'+datos[i]['ExcelenteMeta']+'" class="form-control" maxlength="15" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary ValidaBoton" onclick="AgregarHito('+datos[i]['NoMeta']+')">+</button> </td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">-</button> </td>';
							//Etiqueta
							//NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary" onclick="VerMotivoRechazo('+datos[i]['ComentarioRechazo']+')">Motivo de <br>Rechazo</button></td>';
							NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='VerMotivoRechazo(\""+datos[i]['ComentarioRechazo']+"\")'>Motivo de <br>Rechazo</button> </td>";
							//
							//tbody
							NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
							NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+datos[i]['NoMeta']+"'>";
							/*---------*/
							if(datos[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input  type="text" class="form-control" title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input  type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input  type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' >-</button></div></td></tr>";  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"  /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"  /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" /></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' >-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					 MetasSinValidar=1;
					}else if(datos[i]['Estatus'] ==4){ // solicitar cambios
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' disabled>";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" disabled class="form-control" maxlength="15" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" class="form-control" maxlength="15" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							//NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-primary" onclick="AgregarHito('+datos[i]['NoMeta']+')">Agregar Hito</button> </td>';
							//NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-danger" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">Eliminar</button> </td>';
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="" colspan="3">Pendiente de autorización de cambios</td>';
							//
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
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
						MetasPendientesdeValidar=1;
					}else if(datos[i]['Estatus'] ==5){
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							//NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+datos[i]['meta']+'"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'"></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100"></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" /></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")'>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' >";
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" title="Nombre de Meta" class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" title="Nombre de Meta" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary ValidaBoton" onclick="AgregarHito('+datos[i]['NoMeta']+')">+</button> </td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">-</button> </td>';
							//Etiqueta
							//NuevaMeta =  NuevaMeta + '<td data-label="">'+datos[i]['RechazoAutorizacion']+'</td>';
							NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='VerMotivoRechazo(\""+datos[i]['RechazoAutorizacion']+"\")'>Motivo de <br>Rechazo</button> </td>";
							//
							//tbody
							NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
		
							NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+datos[i]['NoMeta']+"'>";
							if(datos[i]['NoHito'] !=null){
							/*---------*/
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"><labe >Hito: </label></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+datos[i]['Hito']+'"  id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")'>-</button></div></td></tr>";  
							}
							/*---------*/
							NuevaMeta =  NuevaMeta + "</table>"; 
							$('#EspacioMetas').append(NuevaMeta);
							$("#txtCantidadPonderacion"+datos[i]['NoMeta']).val(datos[i]['Ponderacion']);
							//
								$("#txtUnidadMedida"+datos[i]['NoMeta']).val(datos[i]['UnidadMedida']);
							//
							IDMeta = datos[i]['NoMeta'];
							NoMetas =datos[i]['NoMeta'];
						}else{
							if(datos[i]['NoHito'] !=null){
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"><labe >Hito: </label></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")'>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					MetasSinValidar=1;
					// En validacion
					}else if(datos[i]['Estatus'] ==6){
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' disabled>";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" disabled maxlength="15" class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" class="form-control" maxlength="15" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-primary ValidaBoton" onclick="AgregarHito('+datos[i]['NoMeta']+')">+</button> </td>';
							NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+datos[i]['NoMeta']+')">-</button> </td>';
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente de Autorizacion en cambios</td>';
							//
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
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					MetasPendientesdeValidar=1;
					}else if(datos[i]['Estatus'] ==7){ //Aceptado
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"'  disabled>";
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+datos[i]['idMeta']+')" >Modificar</button> </td>';
							NuevaMeta =  NuevaMeta + "<td colspan='2' data-label=''> <button class='btn btn-primary ValidaBoton' onclick='SolicitarCambios(\""+datos[i]['idMeta']+"\")'>Modificar</button> </td>";
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td colspan="2" data-label="">Aceptado</td>';
							//
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
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente por validar la calificacion</td></tr>';  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					MetasCalificada=1;
					}else if(datos[i]['Estatus'] ==8){ //Aceptado
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' disabled>";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+datos[i]['idMeta']+')" >Modificar</button> </td>';
							NuevaMeta =  NuevaMeta + '<td colspan="2" data-label="">Calficacion Rechazada</td>'; 
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="">Aceptado</td>';
							//
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
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
							NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
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
							let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
							NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
							$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
						MetasCalificada=1;
					}else if(datos[i]['Estatus'] ==9){ //Aceptado
						if(datos[i]['NoMeta']!= IDMeta){
							let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
							NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
							NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
							NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
							//tbody
							NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
							NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+datos[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
							NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
							NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
							//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' onchange='ConteoHitos(\""+datos[i]['NoMeta']+"\")' disabled>";
							NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+datos[i]['NoMeta']+"' disabled>";
							
							NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
							NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
							NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
							NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
							NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
							NuevaMeta =  NuevaMeta + '</select></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input  disabled  title="'+datos[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
							NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input  disabled  title="'+datos[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
							//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+datos[i]['idMeta']+')" >Modificar</button> </td>';
							NuevaMeta =  NuevaMeta + '<td data-label="" colspan="2" >Calficacion Aceptada</td>'; 
							//Etiqueta
							NuevaMeta =  NuevaMeta + '<td data-label="">Aceptado</td>';
							//
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
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td>';  
							NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
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
								let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" title="'+datos[i]['Hito']+'" class="form-control" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+datos[i]['NoMeta']+","+datos[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
							}
						}
					 MetasCalificada=1;
					}
				}
			}else{
				Swal.fire({
					title: "Aviso",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
			}
			//
			if(MetasPendientesdeValidar != 0){
				$("#ValidarMetas").attr("disabled", true);
				//$("#GuardarMetas").attr("disabled", true);
				
			}else{
				$("#ValidarMetas").removeAttr("disabled");
			}
			if(MetasValidadas == 0){
				//AgregarMetas
				$("#AgregarMetas").attr("disabled", true);
			}else{
				$("#AgregarMetas").removeAttr("disabled");
				if(MetasPendientesdeValidar != 0){
				$("#ValidarMetas").attr("disabled", true);
				}
				if(MetasSinValidar ==0){
					$("#GuardarMetas").attr("disabled", true);
				}if(MetasPendientesdeValidar==0){
					$("#ValidarMetas").attr("disabled", true);
				}
			}
			if(MetasSinValidar == 0){
				//AgregarMetas
				$("#GuardarMetas").attr("disabled", true);
			}else{
				$("#GuardarMetas").removeAttr("disabled");
				$("#AgregarMetas").removeAttr("disabled");
				$("#ValidarMetas").removeAttr("disabled");
			}
			if( MetasValidadas==0 && MetasPendientesdeValidar==0 && MetasSinValidar==0){
				$("#GuardarMetas").removeAttr("disabled");
				$("#AgregarMetas").removeAttr("disabled");
				$("#ValidarMetas").removeAttr("disabled");
			}
			if(MetasCalificada==1){
				$("#GuardarMetas").attr("disabled", true);
				$("#AgregarMetas").attr("disabled", true);
				$("#ValidarMetas").attr("disabled", true);
				$(".ValidaBoton").attr("disabled", true);
			}
		}
	});
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
				window.location.href='../index.php';
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

function AgregarMeta(){
	let CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	if(CantidaddeMetas >= 0 && CantidaddeMetas < 6){
	let ValidarCampos = ValidacionCamposVacios();
		if(ValidarCampos == 0){
			ObtenerUltimaMeta(NoMetas);
			NoMetas = NoMetas +1;
			
			let NuevaMeta = '<table id="TablaMeta'+NoMetas+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
			NuevaMeta =  NuevaMeta + '<tr id="Meta'+NoMetas+'"><th id ="tdEtiquetaNoMeta'+NoMetas+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+NoMetas+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+NoMetas+'"  scope="col" class="Fecha" > Fecha: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+NoMetas+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+NoMetas+'"  scope="col" class="Minimo"> Mínimo: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+NoMetas+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+NoMetas+'"  scope="col" class="Minimo"> Excelente: </th>';
			NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
			NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
			NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
			//tbody
			NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+NoMetas+'">'
			NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+NoMetas+'" style="display:none">'+NoMetas+'</td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+NoMetas+'" class="NombreMeta"> <input title="Nombre de Meta" type="text" class="form-control" id="txtNombreMeta'+NoMetas+'"></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+NoMetas+'">';
			NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+NoMetas+'" min="1" max="100"></td>';
			NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+NoMetas+'" class="FechaHito"> <input  title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+NoMetas+'" style="display:none;"> <input  type="text" value="0" class="form-control" id="txtID_Meta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+NoMetas+'">';
			
			//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+NoMetas+"'  onchange='ConteoHitos(\""+NoMetas+"\")'>";
			NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+NoMetas+"'  >";
			//
			NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
			NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
			NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
			NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
			NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
			NuevaMeta =  NuevaMeta + '</select></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+NoMetas+'"> <input title="Calificacion minima de Meta" class="form-control" maxlength="15" id="txtMinimoMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+NoMetas+'" > <input title="Calificacion satisfactoria de Meta" maxlength="15" class="form-control" id="txtSatisfactorioMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+NoMetas+'" > <input title="Calificacion excelente de Meta" class="form-control" maxlength="15" id="txtExcelenteMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary" onclick="AgregarHito('+NoMetas+')">+</button> </td>';
			NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger" onclick="ConfirmacionEliminaAlimento('+NoMetas+')">-</button> </td>';
			NuevaMeta =  NuevaMeta + '<td data-label="">  </td>';	
			//tbody
			NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
			NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+NoMetas+"'>";
			//NuevaMeta =  NuevaMeta + '<tr><th id ="tdEtiquetaNoMeta'+NoMetas+'"> Meta Anual No. '+NoMetas+': </th></tr>';
			NuevaMeta =  NuevaMeta + "</table>";  
			$('#EspacioMetas').append(NuevaMeta);
			setFocusToTextBox(NoMetas)
			$("#GuardarMetas").removeAttr("disabled");
			$("#AgregarMetas").removeAttr("disabled");
			$("#ValidarMetas").removeAttr("disabled");
		}else{
			Swal.fire({
				title: "Aviso",
				text: 'Falta agregar informacion el registro anterior',
				icon: 'info',
				allowOutsideClick: false,
				confirmButtonText: "Aceptar",
			});
		}
	}else{
		Swal.fire({
			title: "Aviso",
			text: 'El número de metas anuales ha sido completado',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
}
//
function ValidacionCamposVacios(){
	if(NoMetas!=0){
		//if(comentarios.replace(/\s/g,"") != "")
		let NombreMeta = $("#txtNombreMeta"+NoMetas).val(),
		CantidadPonderacion = $("#txtCantidadPonderacion"+NoMetas).val(),
		FechaMeta =$("#txtFechaMeta"+NoMetas).val(),
		UnidadMedida =$("#txtUnidadMedida"+NoMetas).val(),
		MinimoMeta =$("#txtMinimoMeta"+NoMetas).val(),
		SatisfactorioMeta =$("#txtSatisfactorioMeta"+NoMetas).val(),
		ExcelenteMeta =$("#txtExcelenteMeta"+NoMetas).val();
		
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

function ConfirmacionEliminaAlimento(NoMetas){
	let NoMeta = NoMetas,
	Confirmar = confirm("Deseas eliminar el registro?");
    if(Confirmar){
		let IdMeta = $("#txtID_Meta"+NoMetas).val();
		if(IdMeta=="0"){
			ElimarAlimento(NoMeta)
		}else{
			ElimarMetaBD(IdMeta);
		}
    }else{
    	return false;
	}
}

function ElimarMetaBD(IdMeta){
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":5, "NoMeta": IdMeta},
		success: function(result){
			let data = JSON.parse(result);
			if(data.estatus == "success") {
				Swal.fire({
					title: "Eliminada",
					text: data.mensaje,
					icon: 'success',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					location.reload();
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

function ElimarAlimento(NoMeta){
	$("#TablaMeta" + NoMeta).remove();
	$("#TablaHitos_Meta" + NoMeta).remove();
	
	if(!$.trim( $('#EspacioMetas').html() ).length ){
		Metas = 0;
	}else{
		Metas = ObtenerUltimaMeta();
	}
 
	if(Metas == 0){
		NoMetas=0;
	}
	
}

function ObtenerUltimaMeta(){
	let nuevaNoMeta =0;
	for(i=0;i<=NoMetas;i++){
		if ( $("#TablaMeta"+i).length ) {
		  nuevaNoMeta = i;
		}
	}
	NoMetas= nuevaNoMeta
}

function AgregarHito(NoMeta){
	//El parametro de numero de meta es para validar en que tabla debe de agregarse
	let ValidarCampos = ValidacionCamposVaciosHitos(NoMeta);
	if(ValidarCampos == 0){
		let Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length,
		NoHito = 0;
		if(Lineas <=5){
			if(Lineas == 0){
				NoHito=1;
				let NuevoHito = '<tr id="NoHito'+NoHito+'_Meta'+NoMeta+'">';
				NuevoHito =  NuevoHito + '<td id="IDtdNoHito'+NoHito+'-NoMeta'+NoMeta+'" style="display:none">'+NoMeta+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdNoHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none">'+NoHito+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaNoHito'+NoHito+'_NoMeta'+NoMeta+'"><labe>Hito: </label></td>';
				NuevoHito =  NuevoHito + '<td id ="tdNombreHito'+NoHito+'_NoMeta'+NoMeta+'"> <input type="text" title="Nombre de Hito" class="form-control" id="txtNombreHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaFechaHito'+NoHito+'_NoMeta'+NoMeta+'">Fecha: </td>';
				NuevoHito =  NuevoHito + '<td id ="tdFechaHito'+NoHito+'_NoMeta'+NoMeta+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + '<td id ="tdIDHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none;" > <input  type="text" value="0" class="form-control" id="txtIDHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + "<td><div class='Mov'><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+NoMeta+","+NoHito+")'>-</button></div></td></tr>";  
				  
				$("#TablaHitos_Meta"+NoMeta).append(NuevoHito);
				
			}else{
				NoHito = GuardarRecordatorio(NoMeta);
				NoHito = NoHito+1;
				let NuevoHito = '<tr id="NoHito'+NoHito+'_Meta'+NoMeta+'">';
				NuevoHito =  NuevoHito + '<td id="IDtdNoHito'+NoHito+'-NoMeta'+NoMeta+'" style="display:none">'+NoMeta+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdNoHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none">'+NoHito+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaNoHito'+NoHito+'_NoMeta'+NoMeta+'"><labe>Hito: </label></td>';
				NuevoHito =  NuevoHito + '<td id ="tdNombreHito'+NoHito+'_NoMeta'+NoMeta+'"> <input title="Nombre de Hito" type="text" class="form-control" id="txtNombreHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaFechaHito'+NoHito+'_NoMeta'+NoMeta+'">Fecha: </td>';
				NuevoHito =  NuevoHito + '<td id ="tdFechaHito'+NoHito+'_NoMeta'+NoMeta+'"> <input title="Fecha de Hito" type="date" class="form-control" id="txtFechaHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + '<td id ="tdIDHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none;"> <input type="text" value="0" class="form-control" id="txtIDHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + "<td><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+NoMeta+","+NoHito+")'>-</button></td></tr>";  
				
				$("#TablaHitos_Meta"+NoMeta).append(NuevoHito);
			}
			//ConteoHitos(NoMeta);
		}else{
			Swal.fire({
				title: "Aviso",
				text: "El limite de los hitos ha sido alcanzado",
				icon: 'info',
				allowOutsideClick: false,
				confirmButtonText: "Aceptar",
			});
		}
	}else{
		Swal.fire({
			title: "Aviso",
			text: "Falta agregar informacion el registro anterior",
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
}

function ConfirmacionEliminaHito(NoMetas,Hito){
	let NoMeta = NoMetas,
	Confirmar = confirm("Deseas eliminar el registro?");
    if(Confirmar){
		let IdHito = $("#txtIDHito"+Hito+"_NoMeta"+NoMetas).val();
		if(IdHito=="0"){
			ElimarHito(NoMeta, Hito)
		}else{
			ElimarHitoBD(IdHito,NoMetas);
		}
    }else{
    	return false;
	}
}

function ElimarHitoBD(IdHito,NoMeta){
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":4, "IdHito": IdHito, "NoMeta": NoMeta},
		success: function(result){
			let data = JSON.parse(result);
			if(data.estatus == "success") {
				Swal.fire({
					title: "Eliminada",
					text: data.mensaje,
					icon: 'success',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				}).then(function(){
					location.reload();
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

function ElimarHito(NoMeta, Hito){
	$("#NoHito"+Hito+"_Meta"+NoMeta).remove(); 
}

function ValidacionCamposVaciosHitos(NoMeta){
	let Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length,
	NoHito = GuardarRecordatorio(NoMeta);
	if(NoHito != 0){
		let NombreHito = $("#txtNombreHito"+NoHito+"_NoMeta"+NoMeta).val(),
		CantidadPonderacion = $("#txtFechaHito"+NoHito+"_NoMeta"+NoMeta).val();
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
    let arrayRecordatorio24H = [],
	numHito = 0;
        $("#TablaHitos_Meta"+NoMeta+" tr").each(function(index, value) {
            let campo1, campo2, campo3,
			i = 0;
			
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

function ValidarPonderacion(){
	TotalPonderaciones =0;
	for(i=0;i<=NoMetas;i++){
		if ( $("#txtCantidadPonderacion"+i).length > 0 ) {
			TotalPonderaciones = TotalPonderaciones + parseFloat($("#txtCantidadPonderacion"+i).val());
		}
	}
	return TotalPonderaciones;
}

function GuardarMetas(){
	let CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	if(CantidaddeMetas >0){
		let TotalEnPonderacion = ValidarPonderacion();
		if(TotalEnPonderacion <= 100){
			//alert("Guarda");
			//let arrayAgregaAcompaniantes = {};
			let NoEmpleado = $("#txtNumEmpleadoLogeado").val(),
			NombreEmpleado = $("#NombreCont2").text();
			
			arrayListadoMetas = GuardarListadoMetas();
			arrayListadoHitoMetas = GuardarListadoHitos();
			/*---*/
			$.ajax({
				url: "../utileria.php",
				type: "post",
				data: {"param":2, "NoEmpleado": NoEmpleado, "NombreEmpleado": NombreEmpleado, "arrayListadoMetas" : JSON.stringify(arrayListadoMetas), 
				"arrayListadoHitoMetas" : JSON.stringify(arrayListadoHitoMetas)},
				success: function(result){
					let data = JSON.parse(result);
					if(data.estatus == "success") {
						Swal.fire({
							title: "Guardado",
							text: data.mensaje,
							icon: 'success',
							allowOutsideClick: false,
							confirmButtonText: "Aceptar",
						}).then(function(){
							location.reload();
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
			/*---*/
		}else{
			Swal.fire({
				title: "Aviso",
				text: "El total de los porcentajes debe de ser menor 100%.",
				icon: 'info',
				allowOutsideClick: false,
				confirmButtonText: "Aceptar",
			});
		}
	}else{
		Swal.fire({
			title: "Aviso",
			text: "Es necesario tener tres metas o mas, para poder guardar.",
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
	
}

function GuardarListadoMetas() {
    let arrayListaMetas = [],
	CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	for(i=0;i<=NoMetas;i++){
		$("#TablaBodyMeta"+i+" tr").each(function(index, value) {
			let NoMeta, NombreMeta, Ponderacion, Fecha, IdMeta,UnidadMedida,MinimoMeta,SatisfactorioMeta,ExcelenteMeta;
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
			let Array = {};
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

function GuardarListadoHitos() {
    let arrayListaHitos = [],
	CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	for(i=0;i<=NoMetas;i++){
		$("#TablaHitos_Meta"+i+" tr").each(function(index, value) {
			let Hito = 0,
			NoMeta, NoHito, NombreHito, FechaHito, IdHito;
			$(this).children("td").each(function(index2) {
				Hito = Hito +1;
				switch (index2) {
					case 0:
							NoMeta = $(this).text();
					break;
					case 1:
							NoHito = $(this).text();
					break;
					case 2:
							NombreHito = $("#txtNombreHito"+NoHito+"_NoMeta"+NoMeta).val();
					break;
					case 3:
							FechaHito = $("#txtFechaHito"+NoHito+"_NoMeta"+NoMeta).val();
					break;
					case 4:
							IdHito = $("#txtIDHito"+NoHito+"_NoMeta"+NoMeta).val();
					break;
				}
			});
			//$('#txtPercepcionLiq').val(TotalRefacc);
			let Array = {};
			Array.NoMeta = NoMeta;
			Array.NoHito = NoHito;
			Array.NombreHito = NombreHito;
			Array.FechaHito = FechaHito;
			Array.IdHito = IdHito;
			arrayListaHitos.push(Array);
		});
	}
	return arrayListaHitos;
}

function ValidarMetas(){
	let CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	if(CantidaddeMetas >= 3 && CantidaddeMetas < 6){
		let TotalEnPonderacion = ValidarPonderacion();
		if(TotalEnPonderacion == 100){
			//alert("Guarda");
			//let arrayAgregaAcompaniantes = {};
			let NoEmpleado = $("#txtNumEmpleadoLogeado").val();
			let NombreEmpleado = $("#NombreCont2").text();
			
			arrayListadoMetas = GuardarListadoMetas();
			arrayListadoHitoMetas = GuardarListadoHitos();
			$.ajax({
				url: "../utileria.php",
				type: "post",
				data: {"param":8, "empleado":empleado, "NoEmpleado":NoEmpleado, "NombreEmpleado":NombreEmpleado,
				"arrayListadoMetas":JSON.stringify(arrayListadoMetas), "arrayListadoHitoMetas":JSON.stringify(arrayListadoHitoMetas)},
				success: function(result) {
					let data = JSON.parse(result);
					if(data.estatus == "success") {
						Swal.fire({
							title: "Guardado",
							text: data.mensaje,
							icon: 'success',
							allowOutsideClick: false,
							confirmButtonText: "Aceptar",
						}).then(function(){
							location.reload();
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
		}else{
			Swal.fire({
				title: "Aviso",
				text: "El total de los porcentajes debe de ser 100%",
				icon: 'info',
				allowOutsideClick: false,
				confirmButtonText: "Aceptar",
			});
		}
	}else{
		Swal.fire({
			title: "Aviso",
			text: "Es necesario tener minimo 3 metas maximo 6 metas, para poder guardar.",
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
	
}

function VerMotivoRechazo(MotivoMensaje){
	$("#txtComentarioMeta").val(MotivoMensaje);
	$('#ModalMotivoRechazo').modal('show');
}

function SolicitarCambios(IdMeta){
	$("#txtIdMetaCambios").val(IdMeta);
	$("#txtComentarioCambios").val("");
	$('#ModalMotivoCambios').modal('show');
}

function ConfirmacionCambiosMeta(){
	let ComentarioCambios = $("#txtComentarioCambios").val();	
	if(ComentarioCambios.replace(/\s/g,"")!= ""){
	  let Confirmar = confirm("Desea solicitar cambios de la meta");
      if (Confirmar){
		SolicitarCambiosMeta();
	  }else{
		return false;
	  }
	}else{
		Swal.fire({
			title: "Aviso",
			text: "Favor de agregar información en el comentario",
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}
}

function SolicitarCambiosMeta(){
	let IdMeta = $("#txtIdMetaCambios").val(),
	empleado = $("#txtNumEmpleadoLogeado").val(),
	Comentario =  $("#txtComentarioCambios").val();
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":12, "empleado":empleado, "IdMeta": IdMeta, "Comentario":Comentario},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				Swal.fire({
					title: "Guardado",
					text: data.mensaje,
					icon: 'success',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
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

function ConteoHitos(NoMeta){
	let unidadMedida = $("#txtUnidadMedida"+NoMeta).val();
	if(unidadMedida =="1"){
		let Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length;
		$("#txtExcelenteMeta"+NoMeta).val(Lineas);
	}
}

function ValidarFecha(){
	FechaActual = 0;
	FechaLimite = 0;
	//
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	let anio = fechaActualL.getFullYear(); //obteniendo año
	FechaLimite = '01-10-'+anio;
	FechaActual = fechaActual2;
	FechaLimite= FechaLimite.replace(/-/g, "");
	FechaActual= FechaActual.replace(/-/g, "");
	//
	FechaActual = parseInt(FechaActual);
	FechaLimite = parseInt(FechaLimite);
	if(FechaActual > FechaLimite){
		Swal.fire({
			title: "Guardado",
			text: "La fecha actual es mayor a la fecha limite de modificación.",
			icon: 'success',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		}).then(function() {
			$(".ValidaBoton").prop( "disabled", true ); 
		});
	}
}