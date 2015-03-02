<?
  include("conn.php");
  $gender=$_POST["gender"];
  $time=time();
  $sql="INSERT INTO users VALUES ('','$gender',0,-1,0);";
  mysql_query($sql,$conn);
  $id=mysql_insert_id();
  $mateSex=($gender==0)?1:0;
  $result=false;
  $mateid=0;
  $sql="SELECT id FROM users WHERE gender='$mateSex' AND status=0";
  //寻找聊天对象
  $result=mysql_query($sql,$conn);
  $numrow=mysql_num_rows($result);
  $count=0;
  if($numrow!=0){
          $mateid=mysql_fetch_row($result);
		  $mateid=$mateid[0];
          $sql="UPDATE users SET mateid='$id',mgender='$gender',status=1 WHERE id='$mateid'";
          mysql_query($sql,$conn);
          $sql="UPDATE users SET mateid='$mateid',mgender='$mateSex',status=1 WHERE id='$id'";
          mysql_query($sql,$conn);
		  $finalSex=$mateSex;
  }
  //等待
  else{
	$sql="SELECT id FROM users WHERE gender='$gender' AND status=0 AND id!='$id'";
    $result=mysql_query($sql,$conn);
    $numrow=mysql_num_rows($result);
	if($numrow!=0){
	   $mateid=mysql_fetch_row($result);
	   $mateid=$mateid[0];
       $sql="UPDATE users SET mateid='$id',mgender='$gender',status=1 WHERE id='$mateid'";
       mysql_query($sql,$conn);
       $sql="UPDATE users SET mateid='$mateid',mgender='$gender',status=1 WHERE id='$id'";
       mysql_query($sql,$conn);
	   $finalSex=$gender;
	}
	else{
	   $sql="SELECT mateid,mgender FROM users WHERE id='$id'";
       while($count<2){
		    usleep(1500000);
	        $result=mysql_query($sql,$conn);
	        $materow=mysql_fetch_row($result);
			$mateid=$materow[0];
			$finalSex=$materow[1];
	        if($mateid!=0)break;
			$count++;
       }
	}
  }
  if($count<2)echo $mateid.",".$id.",".$finalSex;
  else{
	$sql="DELETE FROM users WHERE id='$id'";
	mysql_query($sql,$conn);
    echo 0;
  }
?>