<?
require_once("db.php");

$uid = $_POST['uid'];

$qry = "SELECT * FROM inventory WHERE uid = $uid;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
$columns = mysql_num_fields($res); 
for($i = 1; $i < $columns; $i++) { 
	 $fieldName = mysql_field_name($res,$i);
	 echo $row[$fieldName];
 }
?>