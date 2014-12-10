<?
require_once("db.php");

$uName = $_POST['username'];
$qry = "SELECT id FROM account WHERE username='".$uName."'  ";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
if( $num_row == 0 ) {
	echo"false";
}else {
    echo $row["id"];
}

?>