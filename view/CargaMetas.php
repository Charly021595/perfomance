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
  <title>Crear Metas Anuales</title>

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
    <img class="animation__shake" src="../assets/img/icon2.png" alt="AdminLTELogo" height="60" width="60">
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
          <i id="icono_usuario_global" class="far fa-solid fa-user letra_iconos_blancos"></i>
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
      <img src="../assets/img/icon.png" alt="Logo" class="brand-image img-circle elevation-3">
      <span class="brand-text font-weight-light"><img src="../assets/img/logo.png" style="width:70%;"></span>
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
            <a href="CargaMetas.php"class="nav-link active">
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
            <a href="retroalimentacion.php"class="nav-link">
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
              <i class="nav-icon fas fa-tachometer-alt"></i>
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
            <h1 class="m-0">Definición Metas</h1>
          </div><!-- /.col -->
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="../dashboard.php">Inicio</a></li>
              <li class="breadcrumb-item active">Definición Metas</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->

        <!-- Levantar Metas -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header color_fratech letra_iconos_blancos">Definición de Metas Anuales</div>
              <div class="card-body">
                <input style="display:none;" type="number" class="form-control" id="txtNumEmpleadoLogeado" value="<?php echo $_SESSION['RHEvaluacion']; ?>" disabled>
                <div class="row" id="mostrar_metas_anuales">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <table class="table table-bordered table-hover ">
                      <thead class="color_fratech letra_iconos_blancos">	
                        <tr>
                          <th scope="col" style="width: 5%;"><center>Calificación</center></th>
                          <th scope="col" style="width: 25%;"><center>Evaluación de Resultados</center></th>
                        </tr>
                      </thead>		
                      <tbody id="CustodiasEnTransito">
                        <tr>
                          <td data-label='Códigos de Evaluacion de Metas Anuales' colspan="2">&nbsp;</td>
                        </tr>
                        <tr style="border-bottom: 2px solid #BFBDBD;" >
                          <td data-label='Calificación' ><center>1</center></td>
                          <td data-label='Evaluación de Resultados' ><center>No cumple con los objetivos mínimos del puesto</center></td>
                        </tr>
                        <tr style="border-bottom: 2px solid #BFBDBD;">
                          <td data-label='Calificación' ><center>2</center></td>
                          <td data-label='Evaluación de Resultados' ><center>Ocasionalmente cumple con los objetivos del puesto</center></td>
                        </tr>
                        <tr style="border-bottom: 2px solid #BFBDBD;">
                          <td data-label='Calificación' ><center>3</center></td>
                          <td data-label='Evaluación de Resultados' ><center>Cumple con los objetivos del puesto</center></td>
                        </tr>
                        <tr style="border-bottom: 2px solid #BFBDBD;">
                          <td data-label='Calificación' ><center>4</center></td>
                          <td data-label='Evaluación de Resultados' ><center>Cumple y ocasionalmente excede con los objetivos del puesto</center></td>
                        </tr>
                        <tr style="border-bottom: 2px solid #BFBDBD;">
                          <td data-label='Calificación' ><center>5</center></td>
                          <td data-label='Evaluación de Resultados' ><center>Excede constantemente los objetivos del puesto</center></td>
                        </tr>
                      </tbody>
                    </table>	
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="AgregarMeta();" id="AgregarMetas" >Agregar Meta</button>
                  </div>
                </div>
                <div class="row form-group">
                  <div id="EspacioMetas" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="ValidarMetas();" id="ValidarMetas" >Validar Metas</button>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="GuardarMetas();" id="GuardarMetas" >Guardar Metas</button>
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
        <!-- Modal agregar nuevo archivo-->
        <div class="modal fade" id="ModalMotivoRechazo" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header color_fratech letra_iconos_blancos">
                <h5 class="modal-title" id="exampleModalLabel">Motivo de rechazo de Meta.</h5>
                <button id="EditarCerrarModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <i class="fa-solid fa-x letra_iconos_blancos"></i>
                </button>
              </div>
              <div class="modal-body">
                <form method="post" id="form_subir_archivos">
                  <div class="row form-group">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 centrar_texto">
                      <label for="">Comentarios de Rechazo:</label>
                    </div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 centrar_texto">
                      <textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtComentarioMeta" disabled></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button id="btn_cerrar" type="button" class="btn btn-secondary btn_cerrar" data-dismiss="modal">Cerrar</button>
                <!-- <button id="btn_guardar_archivo" type="button" class="btn btn-primary"><Label id="nombre_boton">Actualizar</Label><img id="loading" class="cargando_boton"  style="display:none;" src="assets/img/loading.gif"></button> -->
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="ModalMotivoCambios" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header color_fratech letra_iconos_blancos">
                <h5 class="modal-title" id="exampleModalLabel">Solicitar cambios de Meta Anual.</h5>
                <button id="EditarCerrarModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <i class="fa-solid fa-x letra_iconos_blancos"></i>
                </button>
              </div>
              <div class="modal-body">
                <div class="row form-group">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 centrar_texto">
                    <label for="lblNombreVisita" class="col-sm-3 col-form-label">No. Meta:</label>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 centrar_texto">
                    <input type="text" class="form-control" id="txtIdMetaCambios" disabled>
                  </div>
                </div>
                <div class="form-group row" id="divIDVisita">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 centrar_texto">
                    <label for="lblNombreVisita" class="col-sm-3 col-form-label">Comentarios de los cambios:</label>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 centrar_texto">
                    <textarea rows="4" cols="50" maxlength="600" class="form-control" id="txtComentarioCambios"> </textarea>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button id="btn_cerrar_archivo" type="button" class="btn btn-secondary btn_cerrar" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-success" onclick ="ConfirmacionCambiosMeta()">Guardar</button>
              </div>
            </div>
          </div>
        </div>
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
  <script src="../assets/js/salidacustodias.js?t=<?=time()?>"></script>
</body>
</html>