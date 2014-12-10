<?
require_once("db.php");

$uid = $_POST['uid'];


$amountqry = "SELECT * FROM items;";
$amountres = mysql_query($amountqry);
$amount = mysql_num_rows($amountres); 

$qry = "SELECT * FROM inventory INNER JOIN items on items.id = inventory.itemid WHERE inventory.uid = $uid;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);

$html = "";

while($row = mysql_fetch_array($res, MYSQL_ASSOC)){
	$html = $html . "<td class='filleditem' id='".$row['name']."'></td>";
}
for($i = $num_row; ($i < 7) ; $i++){
	$html = $html . "<td class='emptyitem'></td>";
}
echo $html;


?>