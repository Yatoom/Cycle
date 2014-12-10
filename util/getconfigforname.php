<?
require_once("db.php");

$uName = $_POST['name'];
$config = $_POST['config'];

$qry = "SELECT account.id, config.value FROM account INNER JOIN config ON account.id = config.uid WHERE account.username='$uName' AND config.cid = $config;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
if( $num_row == 0 ) {
	echo"false";
}else {
    echo $row["config.value"];
}

?>