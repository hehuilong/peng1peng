<?
include("conn.php");
$mid=$_POST['mid'];
$sql="SELECT msg FROM message WHERE fromid=$mid";
$result=mysql_query($sql,$conn);
$num=mysql_num_rows($result);
$status=2;
if($num!=0){
   $str="";
   while($row=mysql_fetch_row($result)){
	   if($row[0]=='d'){
	      echo 3;
		  $sql="DELETE FROM message WHERE fromid=$mid";
		  mysql_query($sql,$conn);
		  return;
	   }
	   else if($row[0]=='n'||$row[0]=='t')$status=$row[0];
	   else $str=$row[0].$str;
   }
   $sql="DELETE FROM message WHERE fromid=$mid";
   mysql_query($sql,$conn);
   if($str==""){
	  $status=$status=='n'?2:1;
	  echo $status;
   }
   else echo $str;
}
else echo 0;
?>