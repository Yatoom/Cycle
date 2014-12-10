<?
require_once("db.php");

$uid = $_POST['uid'];
$item = $_POST['item'];

$qry = "DELETE FROM inventory WHERE itemid = $item AND uid = $uid;";
$res = mysql_query($qry);

if($res == true){
	echo "Item removed";
}else{
	echo "idk";
}
?>