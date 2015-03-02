<?
	$conn=mysql_connect("localhost","yourusername","yourpassword") or die("could not connect: ".mysql_error());
	$sql="DROP DATABASE IF EXISTS peng1peng";
	mysql_query($sql,$conn)or die(mysql_error());
	//Create database
	mysql_query("CREATE DATABASE peng1peng CHARSET=utf8",$conn)or die("Error creating database: ".mysql_error());
	echo "Database peng1peng created.<br/>";
	//Create table rev in prize database
	mysql_select_db("peng1peng",$conn);
    $sql="CREATE TABLE users
		(
		id smallint(3) unsigned NOT NULL auto_increment,
		gender tinyint(1) NOT NULL,
		mateid smallint(3) unsigned NOT NULL default 0,
		mgender tinyint(1) NOT NULL default -1,
		status tinyint(1) NOT NULL,
		PRIMARY KEY (id)
		)ENGINE=MEMORY CHARSET=utf8";
	mysql_query($sql,$conn)or die ("could not create table users: ".mysql_error());
	echo "Table users created.<br/>";
    $sql="CREATE INDEX gender_status ON users (gender,status);";
	mysql_query($sql,$conn)or die ("could not create index id_gender: ".mysql_error());
	echo "Index gender_status on users created.<br/>";
	$sql="CREATE TABLE message
		(
		fromid smallint(3) unsigned NOT NULL,
		msg char(180) NOT NULL
		)ENGINE=MEMORY CHARSET=utf8";
    mysql_query($sql,$conn)or die ("could not create table message: ".mysql_error());
	echo "Table message created.<br/>";
	$sql="CREATE INDEX fromid on message (fromid);";
	mysql_query($sql,$conn)or die("could not create index fromid on message: ".mysql_error());
	echo "Index fromid on message created.<br/>";
	echo "All stuff DONE!";
?>
