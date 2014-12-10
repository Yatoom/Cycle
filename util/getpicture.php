<?
require_once("db.php");

$id = $_POST['item'];

$qry = "SELECT picture FROM items WHERE id = $id;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
if($num_row == 1 ){
	echo $row['picture'];
}else{
	echo "";
}
?>