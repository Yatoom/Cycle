<?
require_once "db.php";


$uName = $_POST['name'];
$pWord = md5($_POST['pwd']);
$qry = "SELECT id, username FROM account WHERE username='".$uName."' AND password='".$pWord."' ;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
$row=mysql_fetch_assoc($res);
if( $num_row == 1 ) {
	$username = $row['username'];
	$id = $row['id'];
    $_SESSION['name'] = $username;
    $_SESSION['id'] = $id;
    echo"true";

}else {
    echo "false";
}


?>