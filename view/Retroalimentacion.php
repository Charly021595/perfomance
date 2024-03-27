<?php
  session_start(); 
  if(!isset($_SESSION['RHEvaluacion'])){
	  header('location:../index.php');
  }else{
	  //header('location:view/evaluacion_clinicav2.php');
	  if(!isset($_SESSION['RHEvaluacion'])){ 
			//$a= "No PAsaria 1";
			echo "<script> window.location='../index.php'</script>";
	  }else{
		
	  }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Retroalimentación</title>

  <!-- Nuevos estilos -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../assets/fontawesome-free-6.4.0-web/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="../assets/plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../assets/dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../assets/plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="../assets/plugins/summernote/summernote-bs4.min.css">
  <!-- mis estilos -->
  <link href="../assets/css/style.css?t=<?=time()?>" rel="stylesheet">

  <!-- MDB icon -->
  <link rel="icon" href="../assets/img/icon2.png" type="image/x-icon" />
  <!-- DataTables -->
  <link rel="stylesheet" href="../assets/datatables/DataTables-1.13.4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/fixedcolumns/4.2.2/css/fixedColumns.dataTables.min.css">

</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img id="imagen_movimiento" class="animation__shake" src="../assets/img/icon2.png" alt="AdminLTELogo" height="60" width="60">
  </div>

  <!-- Navbar -->
  <nav id="navbar_global" class="main-header navbar navbar-expand navbar-white navbar-light color_fratech">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i id="boton_barras_global" class="fa-solid fa-bars letra_iconos_blancos"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="dashboard.php" id="letras_inicio_global" class="nav-link letra_iconos_blancos">Inicio</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i  id="icono_usuario_global" class="far fa-solid fa-user letra_iconos_blancos"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <!-- Usuario -->
            <div class="media">
              <img src="../assets/img/imagen_no_disponible.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
              <div class="media-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <span id="NombreCont"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <span id="Fecha"></span>
                  </div>
                </div>
                <h3 class="dropdown-item-title">
                </h3>
              </div>
            </div>
            <!-- Usuario End -->
          </a>
          <div class="dropdown-divider"></div>
          <div class="row centrar_texto">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <button class="btn btn-danger btn_salir" onclick="CerrarSesion();"><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="../dashboard.php" class="brand-link" style="background:#fff;">
      <img id="icono_empresa" src="../assets/img/icon.png" alt="Logo" class="brand-image img-circle elevation-3">
      <label id="texto_logo" class="brand-image img-circle elevation-3" style="color: black;"></label>
      <span class="brand-text font-weight-light"><img id="imagen_empresa" src="../assets/img/logo.png"></span>
    </a>

    <!-- Sidebar -->
    <div id="sidebar_global" class="sidebar color_fratech">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/img/imagen_no_disponible.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" id="nombre_lado_izquierdo" class="d-block"></a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="CargaMetas.php"class="nav-link">
              <i class="fa-solid fa-bullseye"></i>
              <p>
                Definición de Metas
              </p>
            </a>
          </li>
          <?php if($_SESSION['RHEvaluacion'] == '8999' || $_SESSION['RHEvaluacion'] == '4857' || $_SESSION['RHEvaluacion'] == '8894' || $_SESSION['RHEvaluacion'] == '7818'){ ?>
          <li class="nav-item">
            <a href="CargaMetasHistorico.php"class="nav-link">
              <i class="fa-solid fa-file-contract"></i>
              <p>
                Historial Metas
              </p>
            </a>
          </li>
          <?php } ?>
          <li class="nav-item">
            <a href="ValidarMetas.php"class="nav-link">
              <i class="fa-solid fa-list-check"></i>
              <p>
                Validación de Metas
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="retroalimentacion.php"class="nav-link active">
              <i class="fa-solid fa-comments"></i>
              <p>
                Retroalimentación
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="retroalimentacionsubordinado.php" class="nav-link">
              <i class="fa-solid fa-comments"></i>
              <p>
                Retroalimentación empleados
              </p>
            </a>
          </li>
          <?php if($_SESSION['RHEvaluacion'] == '8999' || $_SESSION['RHEvaluacion'] == '4857' || $_SESSION['RHEvaluacion'] == '8894' || $_SESSION['RHEvaluacion'] == '7818'){ ?>
          <li class="nav-item">
            <a href="RetroalimentacionHistorial.php"class="nav-link">
              <i class="fa-solid fa-file-contract"></i>
              <p>
                Historial Retroalimentación
              </p>
            </a>
          </li>
          <?php } ?>
          <li class="nav-item">
            <a href="Evaluacion1.php"class="nav-link">
              <i class="fa-solid fa-clipboard-check"></i>
              <p>
                Evaluación del Desempeño
              </p>
            </a>
          </li>
          <?php if($_SESSION['RHEvaluacion'] == '8999' || $_SESSION['RHEvaluacion'] == '4857' || $_SESSION['RHEvaluacion'] == '8894' || $_SESSION['RHEvaluacion'] == '7818'){ ?>
          <li class="nav-item">
            <a href="Evaluacion_historial.php"class="nav-link">
              <i class="fa-solid fa-file-contract"></i>
              <p>
                Historial Evaluacion del Desempeño
              </p>
            </a>
          </li>
          <?php } ?>
          <li class="nav-item">
            <a href="CalificarMetas.php"class="nav-link">
              <i class="fa-solid fa-crosshairs"></i>
              <p>
                Validación Evaluación del Desempeño
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="Glosario.php"class="nav-link">
              <i class="fa-solid fa-book"></i>
              <p>
                Glosario
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="Reporte.php"class="nav-link">
              <i class="fa-solid fa-file-waveform"></i>
              <p>
                Reporte
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <h1 class="m-0">Retroalimentación</h1>
          </div><!-- /.col -->
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="../dashboard.php">Inicio</a></li>
              <li class="breadcrumb-item active">Retroalimentación</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->

		<div class="row form-group">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<button class="nav-link active" id="retroalimentacion-tab" data-toggle="tab" data-target="#retroalimentacion" type="button" role="tab" aria-controls="retroalimentacion" aria-selected="true">Retroalimentación 1</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="retroalimentacion_dos-tab" data-toggle="tab" data-target="#retroalimentacion_dos" type="button" role="tab" aria-controls="retroalimentacion_dos" aria-selected="false">Retroalimentación 2</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="retroalimentacion_tres-tab" data-toggle="tab" data-target="#retroalimentacion_tres" type="button" role="tab" aria-controls="retroalimentacion_tres" aria-selected="false">Retroalimentación 3</button>
					</li>
				</ul>
			</div>
		</div>

        <!-- Retroalimentación -->
        <div class="row form-group">
          	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<input style="display:none;" type="number" class="form-control" id="txtNumEmpleadoLogeado" value="<?php echo $_SESSION['RHEvaluacion']; ?>" disabled>
				<div class="tab-content" id="myTabContent">
					<div class="tab-pane fade show active" id="retroalimentacion" role="tabpanel" aria-labelledby="retroalimentacion-tab">
						<div class="card">
							<div class="card-header color_fratech letra_iconos_blancos">Retroalimentación del Período 1: De Abril a Junio</div>
							<div class="card-body">
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Avance de Metas Anuales:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtEvaluacionMeta1"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Valores:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtValoresMeta1"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Desarrollo:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtDesarrolloMeta1"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="txtAsuntosVariosMeta1">Asuntos varios:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtAsuntosVariosMeta1"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
										<label for="lblNombreVisita" class="col-sm-3 col-form-label">Retroalimentación líder > colaborador:</label>
									</div>
									<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
										<input type="radio" id="txtRetroalimentacionSi1" name="Retroalimentacion1" value="1">
										<label for="txtRetroalimentacionSi1">Si</label>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" id="txtRetroalimentacionNo1" name="Retroalimentacion1" value="0">
										<label for="txtRetroalimentacionNo1">No</label>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Fecha de la retroalimentación:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<input type="text" class="form-control" id="txtFechaRetroalimentacion1" disabled>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
										<button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="GuardarRetroalimentacion1();" id="GuardarRetroalimentacion1" >Guardar Retroalimentación</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="retroalimentacion_dos" role="tabpanel" aria-labelledby="retroalimentacion_dos-tab">
						<div class="card">
							<div class="card-header color_fratech letra_iconos_blancos">Retroalimentación del Período 2: De Julio a Septiembre</div>
							<div class="card-body">
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Avance de Metas Anuales:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtEvaluacionMeta2"></textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Valores:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtValoresMeta2"></textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Desarrollo:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtDesarrolloMeta2"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="txtAsuntosVariosMeta1">Asuntos varios:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtAsuntosVariosMeta2"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
										<label for="lblNombreVisita" class="col-sm-3 col-form-label">Retroalimentación líder > colaborador:</label>
									</div>
									<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
										<input type="radio" id="txtRetroalimentacionSi2" name="Retroalimentacion2" value="1">
										<label for="txtRetroalimentacionSi1">Si</label>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" id="txtRetroalimentacionNo2" name="Retroalimentacion2" value="0">
										<label for="txtRetroalimentacionNo1">No</label>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Fecha de la retroalimentación:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<input type="text" class="form-control" id="txtFechaRetroalimentacion2" disabled>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
										<button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="GuardarRetroalimentacion2();" id="GuardarRetroalimentacion2" >Guardar Retroalimentación</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="retroalimentacion_tres" role="tabpanel" aria-labelledby="retroalimentacion_tres-tab">
						<div class="card">
							<div class="card-header color_fratech letra_iconos_blancos">Retroalimentación del Período 3: De Octubre a Diciembre</div>
							<div class="card-body">
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Avance de Metas Anuales:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtEvaluacionMeta3"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Valores:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtValoresMeta3"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Desarrollo:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtDesarrolloMeta3"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="txtAsuntosVariosMeta1">Asuntos varios:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtAsuntosVariosMeta3"> </textarea>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
										<label for="lblNombreVisita" class="col-sm-3 col-form-label">Retroalimentación líder > colaborador:</label>
									</div>
									<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
										<input type="radio" id="txtRetroalimentacionSi1" name="Retroalimentacion3" value="1">
										<label for="txtRetroalimentacionSi1">Si</label>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" id="txtRetroalimentacionNo1" name="Retroalimentacion3" value="0">
										<label for="txtRetroalimentacionNo1">No</label>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
										<label for="lblNombreVisita">Fecha de la retroalimentación:</label>
									</div>
									<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
										<input type="text" class="form-control" id="txtFechaRetroalimentacion3" disabled>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
										<button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="GuardarRetroalimentacion3();" id="GuardarRetroalimentacion3" >Guardar Retroalimentación</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
          	</div>
        </div>

      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2022-2024</strong>
      <!-- <a href="https://linkedin.com/in/leonardo-peña-379165208">Leonardo Peña</a></strong> -->
    <!-- Doofenshmirtz  -->
    <!-- Malvados y Asociados S.A de CV.  -->
    Todos los derechos reservados.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- nuevos js -->
<!-- jQuery -->
<script src="../assets/plugins/jquery/jquery.min.js"></script>
  <!-- jQuery UI 1.11.4 -->
  <script src="../assets/plugins/jquery-ui/jquery-ui.min.js"></script>
  <script src="../assets/js/sweetalert2.js"></script>
  <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
  <script>
    $.widget.bridge('uibutton', $.ui.button)
  </script>
  <!-- Bootstrap 4 -->
  <script src="../assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Sparkline -->
  <script src="../assets/plugins/sparklines/sparkline.js"></script>
  <!-- jQuery Knob Chart -->
  <script src="../assets/plugins/jquery-knob/jquery.knob.min.js"></script>
  <!-- daterangepicker -->
  <script src="../assets/plugins/moment/moment.min.js"></script>
  <script src="../assets/plugins/daterangepicker/daterangepicker.js"></script>
  <!-- Tempusdominus Bootstrap 4 -->
  <script src="../assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
  <!-- Summernote -->
  <script src="../assets/plugins/summernote/summernote-bs4.min.js"></script>
  <!-- overlayScrollbars -->
  <script src="../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
  <!-- AdminLTE App -->
  <script src="../assets/dist/js/adminlte.js"></script>
  <!-- datatables -->
  <script src="../assets/datatables/datatables.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.2.0/js/buttons.html5.styles.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.2.0/js/buttons.html5.styles.templates.min.js"></script>
  <!-- sweetalert -->
  <script src="../assets/js/sweetalert2.js"></script>
  <script src="../dist/js/Identidad_Log.js?t=<?=time()?>"></script>
  <script src="../assets/js/retroalimentacion.js?t=<?=time()?>"></script>
</body>
</html>