﻿<?php
	//
	// $serverName = "VMSQL2008";
	//$serverName = "VMDYNAMICSAXDEV";
	//$serverName = "vmdynamicsaxdev";
	$serverName = "172.20.28.80";
	$connectionInfo = array( "Database"=>"Consultas", "UID"=>"Consulta", "PWD"=>"Consulta");
	$conn = sqlsrv_connect( $serverName, $connectionInfo);

	if( !$conn ) {
		echo "No se pudo establecer la conexión.<br />";
		die( print_r( sqlsrv_errors(), true));
	}

?>