<?
require_once("db.php");

$uid = $_POST['uid'];
$cid = $_POST['cid'];

$qry = "SELECT value FROM config WHERE uid= $uid AND cid = $cid;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
if( $num_row == 0 ) {
	echo"false";
}else {
    echo $row["value"];
}

?>