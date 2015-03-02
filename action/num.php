<?
  include("conn.php");
  $sql="SELECT id FROM users WHERE gender=1";
  $result=mysql_query($sql,$conn);
  $fnum=mysql_num_rows($result);
  $sql="SELECT id FROM users WHERE gender=0";
  $result=mysql_query($sql,$conn);
  $mnum=mysql_num_rows($result);
  echo $fnum.":".$mnum;
?>