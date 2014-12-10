<?
require_once("db.php");

$uid = $_POST['uid'];
$level = $_POST['level'];

$qry = "UPDATE account SET scene = $level WHERE id = $uid;";
mysql_query($qry);


?>