<?
require_once("db.php");

$uid = $_POST['uid'];
$item = $_POST['item'];

$qry = "SELECT * FROM inventory WHERE itemid = $item AND uid = $uid;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
if( $num_row > 0 ) {
	$qry1 = "UPDATE inventory SET amount = amount + 1 WHERE uid = $uid AND itemid = $item;";
	mysql_query($qry1);
}else{
	$qry2 = "INSERT INTO inventory values($uid,$item,1);";
	mysql_query($qry2);
}
?>