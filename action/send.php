<?
include("conn.php");
$msg=$_POST['m'];
$id=$_POST['id'];
$leng=strlen($msg);
$sub=substr($msg,0,180);
$sql="INSERT INTO message (fromid,msg) VALUES ('$id','$sub')";
$n=180;
while($n<$leng){
	$sub=substr($msg,$n,180);
	$sql.=",('$id','$sub')";
	$n+=180;
}
mysql_query($sql,$conn);
?>