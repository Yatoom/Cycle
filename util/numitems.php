<?
require_once("db.php");

$qry = "SELECT * FROM items;";
$res = mysql_query($qry);
$amount = mysql_num_rows($res); 
echo $amount;
?>