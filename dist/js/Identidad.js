function CargaEmpresa(){
	debugger;
	$("#navbar_global").removeClass("colores_afflux");
	$("#sidebar_global").removeClass("colores_afflux");
	$("li > a.nav-link").removeClass("letra_iconos_blancos");
	$("li > a.nav-link").removeClass("letra_iconos_blancos_afflux");
	$("#table_dashboard > thead > tr > td > button").removeClass("btn_primary_afflux");
	let empleado = $("#txtNumEmpleadoLogeado").val()
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
			url: "utileria.php",
			type: "post",
			data: {"param":1, "empleado":empleado},
            success: function(result){
				let data = JSON.parse(result);
				if (data.estatus == "success") {
					let datos = data.data;
					if("AFFLUX CAPITAL" == "AFFLUX CAPITAL"){
						$("#navbar_global").removeClass("color_fratech");
						$("#sidebar_global").removeClass("color_fratech");
						$("div.card > div.card-header").removeClass("letra_iconos_blancos");
						$("div.card > div.card-header").removeClass("letra_iconos_blancos");
						$("#boton_barras_global").removeClass("letra_iconos_blancos");
						$("#letras_inicio_global").removeClass("letra_iconos_blancos");
						$("#icono_usuario_global").removeClass("letra_iconos_blancos");
						$("#table_dashboard > thead > tr > td > button").removeClass("btn-primary");
						$("#navbar_global").addClass("colores_afflux");
						$("#sidebar_global").addClass("colores_afflux");
						$("#boton_barras_global").addClass("letra_iconos_blancos_afflux");
						$("#letras_inicio_global").addClass("letra_iconos_blancos_afflux");
						$("#icono_usuario_global").addClass("letra_iconos_blancos_afflux");
						$("li > a.nav-link").addClass("letra_iconos_blancos_afflux");
						// $("div.card > div.card-header").addClass("colores_afflux", "letra_iconos_blancos_afflux");
						$("div.card > div.card-header").addClass("colores_afflux");
						$("#table_dashboard > thead > tr > td > button").addClass("btn_primary_afflux");
					}else{
						//*** ARZYZ METALSc
						$("#navbar_global").removeClass("colores_afflux");
						$("#sidebar_global").removeClass("colores_afflux");
						$("#boton_barras_global").removeClass("letra_iconos_blancos_afflux");
						$("#letras_inicio_global").removeClass("letra_iconos_blancos_afflux");
						$("#icono_usuario_global").removeClass("letra_iconos_blancos_afflux");
						$("div.card > div.card-header").removeClass("colores_afflux", "letra_iconos_blancos_afflux");
						$("#navbar_global").addClass("color_fratech");
						$("#sidebar_global").addClass("color_fratech");
						$("#boton_barras_global").addClass("letra_iconos_blancos");
						$("#letras_inicio_global").addClass("letra_iconos_blancos");
						$("#icono_usuario_global").addClass("letra_iconos_blancos");
						$("li > a.nav-link").addClass("letra_iconos_blancos");
						$("div.card > div.card-header").addClass("color_fratech", "letra_iconos_blancos");
						$("button").addClass("btn-primary");
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
			title: "Usuario Desconocida",
			text: "Favor de Agregar un numero de empleado.",
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		}).then(function(){
			CerrarSesion();
		});
	}
}
