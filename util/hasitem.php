<?
require_once("db.php");

$uid = $_POST['uid'];
$item = $_POST['item'];

$qry = "SELECT * FROM inventory WHERE uid = $uid AND itemid = $item;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_array($res);
if($num_row == 1 ){
	if($row['amount']>0){
		echo "true";
	}else{
		echo "false";
	}
}else{
	echo "false";
}
?>