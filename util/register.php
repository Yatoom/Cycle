<?
require_once "db.php";



$uName = $_POST['name'];
$pWord = md5($_POST['pwd']);
$qry = "SELECT id, username FROM account WHERE username='".$uName."'  ";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
if( $num_row == 1 ) {
	echo"false";
}else {
    $input = "INSERT INTO `account` (`id`, `username`, `password`, `scene`) VALUES (NULL, '" . $uName . "', '" . $pWord . "', 'intro');";
    mysql_query($input);
    $qry = "SELECT id FROM account WHERE username='".$uName."'  ";
    $res = mysql_query($qry);
	$num_row = mysql_num_rows($res);
	$row = mysql_fetch_assoc($res);
	$id = $row['id'];
    $input = "INSERT INTO `inventory` (`uid`, `itemid`, `amount`) VALUES ($id, 5, 1);";
    mysql_query($input);
    echo"true";
}


?>