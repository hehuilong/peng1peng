<?
include("conn.php");
$id=$_POST['id'];
$mid=$_POST['mid'];
$sql="INSERT INTO message VALUES('$id','d');";
mysql_query($sql,$conn);
$sql="DELETE FROM users WHERE id='$id' OR id='$mid';";
mysql_query($sql,$conn);
?>