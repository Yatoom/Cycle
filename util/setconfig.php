<?
require_once("db.php");

$uid = $_POST['uid'];
$cid = $_POST['config'];
$value = $_POST['value'];

$qry = "SELECT * FROM `config` WHERE uid = $uid AND cid = $cid;" ;
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
if( $num_row == 0 ) {
	$qry = "INSERT INTO config VALUES($uid, $cid, $value);";
	if(mysql_query($qry)){
		echo "inserted";
	}else{
		echo"error inserting";
	}
}else {
   $qry = "UPDATE config SET value = $value where uid = $uid and cid = $cid";
	if(mysql_query($qry)){
		echo "UPDATED";
	}else{
		echo"error updating";
	}
}

?>