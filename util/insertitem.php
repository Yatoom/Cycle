<?
require_once "db.php";



$name = $_POST['name'];
$qry = "SELECT * FROM items WHERE name='".$name."' ;";
$res = mysql_query($qry);
$num_row = mysql_num_rows($res);
if( $num_row > 0 ) {
	echo"Item with that name already exists";
}else {
    $input = "INSERT INTO `items` (`id`, `name`) VALUES (NULL, '" . $name . "');";
    if(mysql_query($input)){
        $id = mysql_fetch_object(mysql_query("SELECT id from items WHERE name ='". $name ."';"))->id;
        echo $name." was added with ID:".$id;
    }else{
        echo"Something failed. pl0x contact that narb Joep";
    }
}


?>