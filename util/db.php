<?
$mysql_host = "localhost";
$mysql_database = "deb36854n3_cycle";
$mysql_user = "deb36854n3_cycle";
$mysql_password = "cycle";

$db_handle = @mysql_connect($mysql_host, $mysql_user, $mysql_password);
if(!$db_handle){
	die("Error connecting to host.");
	echo"Error handling connection";
	exit;
}
$db_found = @mysql_select_db($mysql_database, $db_handle);
if(!$db_found) {
	die("Error connecting to database.");
	echo"Error connecting to DB";
	exit;
}

?>