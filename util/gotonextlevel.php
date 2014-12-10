<?

require_once("db.php");

$level = $_POST['level'];
$uid = $_POST['uid'];
$qry = "UPDATE account SET scene = '$level' WHERE id = $uid;";
$res = mysql_query($qry);

if($res){
	echo "true";
}else{
	echo "false";
}

?>