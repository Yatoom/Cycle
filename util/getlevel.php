<?
require_once("db.php");

$id = $_POST['uid'];
$qry = "SELECT id, scene FROM account WHERE id= ".$id."  ";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
if( $num_row == 0 ) {
	echo"false";
}else {
    echo $row["scene"];
}

?>