<?
  $id=$_POST['id'];
  $st=$_POST['st'];
  $st=$st==1?'n':'t';
  include("conn.php");
  $sql="INSERT INTO message VALUES('$id','$st');";
  mysql_query($sql,$conn);
?>