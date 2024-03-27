<?php
  
  session_start(); 
  if(!isset($_SESSION["accesoCustodia"])){ 
		//$a= "No PAsaria 1";
		header('location:../index.php');
  }else{
	  $currentTime = time(); 
	  if(($_SESSION["accesoCustodia"] + 1200 )> $currentTime){ 
		$_SESSION["accesoCustodia"] = $currentTime;
		//echo "<script> window.location='dashboard.php'</script>";
		//$a = "-" .$_SESSION["accesoCustodia"] + 120 ."-- ". $currentTime;
		/*******/
		/*******/
		foreach ($_SESSION['validacionCustodia'] as $row2) {	
			$titulo1 = $row2['titulo'];
			$usuario1 = $row2['usuario'];
			$nombre1 = $row2['Nombre'];
			$AccesoPortalCalidad = $row2['AccesoPortalCalidad'];
		}
		$salto= "<br>";
		/*
		if($AccesoPortalCalidad != "DESARROLLO" && $AccesoPortalCalidad !="Tecnologia de la Informacion" && $AccesoPortalCalidad !="Calidad"){
			echo'<script type="text/javascript">
				alert("El usuario no cuenta con acceso a este modulo.");
			</script>';
			//echo "<script> window.location='../dashboard.php'</script>";
		}
		*/
		
	  } 
	  else{
		//$currentTime = time(); 
		if(($currentTime - $_SESSION["accesoCustodia"]) > 1200){ 
			//session_unset(); 
			//session_destroy(); 
			header('location:../index.php'); 
			//$a= "No PAsaria 2";
			
			
		}
		  
	  }
  }
	foreach ($_SESSION['validacionCustodia'] as $row2) {	
		$usuario = $row2['usuario'];
		$nombre = $row2['Nombre'];
		$titulo = $row2['titulo'];
	}
  ?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Crear Metas Anuales</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  <!-- Morris chart -->
  <!-- <link rel="stylesheet" href="../bower_components/morris.js/morris.css"> -->
  <!-- jvectormap -->
  <link rel="stylesheet" href="../bower_components/jvectormap/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!--Estilos propios del portal de proveedores-->
  <link rel="stylesheet" href="../libraries/css/estilos.css">
  <link rel="stylesheet" href="../assets/iconos/css/all.css"> 
   <link rel="icon" type="image/png" href="../libraries/img/icon2.png"/>
  <!-- DataTables -->
  <link rel="stylesheet" href="../bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="../dashboard.php" class="logo" style="padding: 4px 4px 4px 40px;">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini" style="background-image: url('../assets/img/icon.png'); width: 52px; height: 45px; margin-left: -47px;"></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg" style="background-image: url('../assets/img/logo.jpg'); width: 145px; height: 43px;"></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
             <!--<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image"> -->
              <span><?php echo $nombre; ?></span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header" style="height: 60px;">
               
                <p>
                 <?php echo $nombre;?>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
				 
                  <div class="col-xs-12 text-center">
                    <a onclick="CerrarSesion();">Cerrar Sesion</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
             
            </ul>
          </li>
        
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
     
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">ARZYZ WEB </li>
       
        <li>
          <a href="CargaMetas.php">
            <i class="	fas fa-clipboard-list"></i><span>Agregar Metas</span>
            <span class="pull-right-container">
              
            </span>
          </a>
        </li>
		<!--
		  <li>
          <a href="CustodiaTransito.php">
            <i class="fas fa-bus"></i><span>Autorizar Metas</span>
            <span class="pull-right-container">
              
            </span>
          </a>
        </li>
		 <li>
          <a href="CustodiasCierre.php">
            <i class="fas fa-archive"></i> <span> Visualización de Metas</span>
            <span class="pull-right-container">
              
            </span>
          </a>
        </li>
		-->
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
       Definición de Metas Anuales
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
            <div class=" container col-xs-12">
                <div class="box">
					 <div class="box-header" >
						<input type="text" style="display:none;"  class="form-control" id="txtNombre" value="<?php echo $usuario; ?>" disabled>
						 <input type="text" style="display:none;"  class="form-control" id="txtUsuario"  value="<?php echo $nombre; ?>" disabled>
						 <input type="text" style="display:none;" class="form-control" id="txtParametro"  value="<?php echo $titulo; ?>" disabled>
                    </div>
					<div id="box-body" style="padding: 0px 10px 10px 10px;">  
					<section id="Industria" class="CeroPadCeroMar ">
						 <div class="col-md-12 col-xs-12">
							<center>
							<h2 class="MoverInnovacion" style="font-size: 5vmin;color: #0F196C;font-family: Lettera Text Std;">
								Metas Anuales <br />
							</h2>
							</center>
							<table class="table table-bordered table-hover ">
							  <!-- <thead><tr><th scope="col">Custodia</th><th scope="col">Información 1</th><th scope="col">Información 2</th><th colspan="3" scope="col"></th></tr></thead> -->
							  <thead>	
							  <tr>
								  <th colspan="2" scope="col" style="width: 50%;"><center>Códigos de Evaluacion de Metas Anuales </center></th>
							  </tr>
							  <tr><th scope="col" style="width: 25%;"><center>Evaluación de Resultados</center></th>
								  <th scope="col" style="width: 25%;"><center>Calificación</center></th>
							  </tr>
							 </thead>		
							 <tbody id="CustodiasEnTransito">
								<tr><td data-label='Códigos de Evaluacion de Metas Anuales' colspan="2">&nbsp;</td>
								</tr>
								<tr style="border-bottom: 2px solid #BFBDBD;" ><td data-label='Evaluación de Resultados' ><center>No cumple con los objetivos mínimos del puesto.</center></td>
									<td data-label='Calificación' ><center>1</center></td>
								</tr>
								<tr style="border-bottom: 2px solid #BFBDBD;"><td data-label='Evaluación de Resultados' ><center>Ocasionalmente cumple con los objetivos del puesto.</center></td>
									<td data-label='Calificación' ><center>2</center></td>
								</tr>
								<tr style="border-bottom: 2px solid #BFBDBD;"><td data-label='Evaluación de Resultados' ><center>Cumple con los objetivos del puesto.</center></td>
									<td data-label='Calificación' ><center>3</center></td>
								</tr>
								<tr style="border-bottom: 2px solid #BFBDBD;"><td data-label='Evaluación de Resultados' ><center>Cumple y ocasionalmente excede con los objetivos del puesto.</center></td>
									<td data-label='Calificación' ><center>4</center></td>
								</tr>
								<tr style="border-bottom: 2px solid #BFBDBD;"><td data-label='Evaluación de Resultados' ><center>Excede constantemente los objetivos del puesto.</center></td>
									<td data-label='Calificación' ><center>5</center></td>
								</tr>
							 </tbody>
							 </table>
							
						</div>
						<div class="col-md-12 col-xs-12">
							<center>
							 <button type="button" class="btn btn-primary btn-lg btn-block" onclick="AgregarMeta();" >Agregar Meta</button>
							</center>
						</div>
						
						<div id="EspacioMetas"  class="col-md-12 col-xs-12">
							
						</div>
						
						
						<div class="col-md-12 col-xs-12">
							<center>
							<br><br><br>
							 <button type="button" class="btn btn-primary btn-lg btn-block" onclick="GuardarMetas();" >Guardar Meta</button>
							</center>
						</div>
					</section>
					
					
					
                </div>
				
				
            </div>
      </div>
      
    </section>
   </div>
 
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="../bower_components/jquery/dist/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="../bower_components/raphael/raphael.min.js"></script>
<script src="../bower_components/morris.js/morris.min.js"></script>
<!-- Sparkline -->
<script src="../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="../bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../bower_components/moment/min/moment.min.js"></script>
<script src="../bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="../dist/js/pages/dashboard.js"></script> -->
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>

<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
   <!-- <script src="libraries/datatables/jquery.dataTables.min.js"></script>-->
    <script src="../libraries/datatables/dataTables.bootstrap.min.js"></script>

    
    <script src="../javascript/salidacustodias.js"></script>
	<script type="text/javascript" src="../libraries/webcamjs/webcam.min.js"></script>
</body>
</html>