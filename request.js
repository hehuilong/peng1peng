var id=null;
var mateId=null;
var gender=null;
var sex=null;
var timeout1=null;
var timeout2=null;
var flick=false;
var xmlHttp=GetXmlHttpObject();
var xmlHttp2=GetXmlHttpObject();
var xmlHttp3=GetXmlHttpObject();
var msgboard;
var board;
var fetch=false;
var curr=1;
var status;
function nores(){
}
function numOnline(){
   var url="action/num.php";
   xmlHttp.open("GET",url,true);
   xmlHttp.onreadystatechange=showNum;
   xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttp.send(null);
}
function showNum(){
   if(xmlHttp.readyState==4){
      var y=document.getElementById("logoright");
	  var t=xmlHttp.responseText;
	  var nums=t.split(":");
	  y.innerHTML='<div class="syslog">现在有'+nums[0]+'位女生'+nums[1]+'位男生在线</div>';
   }
}
var show=1;
function Direct(){
   var d=document.getElementById("us");
   var s=document.getElementById("showus");
   if(show==1){
	  s.innerHTML='<img src="images/index-right.png">';
	  d.style.display="block";
   }
   else{
	  s.innerHTML='<img src="images/index-down.png">';
	  d.style.display="none";
   }
   show=1-show;
}
function GetXmlHttpObject(){
   var xmlHttp;
   var e;
   try{
       xmlHttp=new XMLHttpRequest();
   }
   catch (e){
       try{
           xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
       }
       catch (e){
           try{
           mlHttp=new ActiveXObject("Microsoft.XMLHTTP");
           }
           catch (e){
              alert("您的浏览器不支持AJAX！");
              return false;
           }
       }
    }
	return xmlHttp;
 }
function hotkey(oe){ 
   oe=oe || window.event;
   if(oe.keyCode==13){
	  oe.returnValue=false;
	  Send();
   }
}
document.onkeydown = hotkey;
function ScrollBoard(){
   board.scrollTop=board.scrollHeight;
}
function Start(g){
   gender=(g=='m')?0:1;
   LoadUI();
   msgboard=document.getElementById("showmsg");
   board=document.getElementById("msg");
   connectUser();
}
function LoadUI(){
   var x=document.getElementById("Login");
   x.parentNode.removeChild(x);
   document.getElementById("layer").style.display="block";
}
function CloseUI(){
   document.getElementById("typing").style.display="none";
   document.getElementById("discon").disabled = true;
   document.getElementById("sendmsg").disabled =true;
   document.getElementById("message").disabled =true;
}
function connectUser(){
   document.getElementById("message").value="";
   msgboard.innerHTML='<div class="logitem"><div class="syslog">正在为你碰碰，请稍等。。。</div></div>';
   var url="action/userconn.php";
   var content="gender="+gender;
   xmlHttp.open("POST",url,true);
   xmlHttp.onreadystatechange=onChange;
   xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttp.send(content);
}
function onChange(){
   if(xmlHttp.readyState==4){
     var text=xmlHttp.responseText;
	 if(text==0){
		msgboard.innerHTML+='<div class="logitem"><div class="syslog">现在无人空闲，请耐心等待，将继续为你碰碰。。。</div></div>';
		setTimeout("connectUser();",3000);
	 }
	 else{
	    var arr=text.split(",");
	    mateId=arr[0];
		id=arr[1];
		sex=(arr[2]==0)?"男生":"女生";
	    msgboard.innerHTML+='<div class="logitem"><div class="syslog">已连接正在与一位'+sex+'聊天中</div></div>';
        document.getElementById("discon").disabled = false;
        document.getElementById("sendmsg").disabled =false;
		document.getElementById("message").disabled =false;
		fetch=true;
		getMessage();
		testType();
	 }
   }
}
function Send(){
   var msg=document.getElementById("message").value;
   if(msg.length>400){
	  alert("您输入的文本过长(>400)，请分条发送");
   }
   else if(msg!=""){
	  document.getElementById("message").value="";
	  curr=status=1;
	  msgboard.innerHTML+='<div class="logitem"><div class="youmsg"><SPAN class="msgsource">你自己&nbsp;:&nbsp;&nbsp;&nbsp;</SPAN>'+KeepHTML(msg)+'</div></div>';
	  ScrollBoard();
      msg=Encode(msg);
	  msg='-.'+msg;
      var url="action/send.php";
	  var content="m="+msg+"&id="+id;
	  xmlHttp.open("POST",url,true);
      xmlHttp.onreadystatechange=nores;
      xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	  xmlHttp.send(content);
   }
}
function getMessage(){
   var url="action/revmsg.php";
   var content="mid="+mateId;
   xmlHttp2.open("POST",url,true);
   xmlHttp2.onreadystatechange=getChange;
   xmlHttp2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttp2.send(content);
}
function getChange(){
   if(xmlHttp2.readyState==4 && fetch==true){
	  if(xmlHttp2.responseText==3){
		    fetch=false;
            msgboard.innerHTML+='<div class="logitem"><div class="syslog">对方已与你断开连接，你可以</div></div><input type="button" value="再碰1碰" onClick="connectUser();"/>';
			reTitle();
			ScrollBoard();
            CloseUI();
	  }
	  else{
		    if(xmlHttp2.status==200){
				var t=document.getElementById("typing");
				var scrornot=false;
				if(board.clientHeight+board.scrollTop==board.scrollHeight){
					scrornot=true;
				}
				if(xmlHttp2.responseText==1){
					t.style.display="block";
				}
				else if(xmlHttp2.responseText==2){
					t.style.display="none";
				}
				else if(xmlHttp2.responseText!=0){
					t.style.display="none";
					var resText=Decode(xmlHttp2.responseText);
					msgboard.innerHTML+='<div class="logitem"><div class="strangermsg"><SPAN class="msgsource">神秘'+sex+':&nbsp;</SPAN>'+KeepHTML(resText)+'</div></div>';
					if(flick==false){
						Attention();
					}
				}
				if(scrornot==true){
					ScrollBoard();
				}
			}
		    setTimeout('getMessage();',1000);
	  }
   }
}
function disConn(){
      fetch=false;
      var url="action/disconnect.php";
	  var content="id="+id+"&mid="+mateId;
      xmlHttp.open("POST",url,true);
	  xmlHttp.onreadystatechange=nores;
      xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	  xmlHttp.send(content);
      CloseUI();
      msgboard.innerHTML+='<div class="logitem"><div class="syslog">你已与对方断开连接，你可以</div></div>';
      msgboard.innerHTML+='<input type="button" value="再碰1碰" onClick="connectUser();"/>';
	  ScrollBoard();
      reTitle();
}
function checkLeave(){
   if(fetch==true){
	  event.returnValue="";
   }
}
function KeepHTML(html) 
{ 
   var temp = document.getElementById("unvisable"); 
   (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html); 
   var output = temp.innerHTML; 
   temp = null; 
   return output; 
}
function Decode(str){
   var i,k,str2=""; 
   k=str.split(".");
   for(i=1;i<k.length-1;i++){
	   if(k[i]=='-')str2+='   ';
	   else str2+=String.fromCharCode(k[i]); 
   } 
   return str2;
} 
function Encode(str){ 
   var code=new Array(); 
   var i, s, str; 
   for (i=0;i<str.length;i++){
       var c;
       c = str.charCodeAt(i);
	   code.push(c);
   } 
   return code.join(".")+"."; 
}
function testType(ev){
   ev=ev||window.event;
   if(ev.keyCode==13)return;
   if(document.getElementById("message").value==""){
      status=1;
   }
   else{
	  reTitle();
      status=2;
   }
   if(curr!=status&&(xmlHttp3.readyState==4||xmlHttp3.readyState==0)){
	  curr=status;
      var url="action/testtype.php";
      var content="id="+id+"&st="+status;
      xmlHttp3.open("POST",url,true);
	  xmlHttp3.onreadystatechange=nores;
      xmlHttp3.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlHttp3.send(content);
   }
}
function Attention(){
   flick=true;
   Att1();
}
function Att1(){
   document.title="★★新消息★★";
   timeout1=setTimeout("Att2()",1000);
}
function Att2(){
   document.title="☆☆新消息☆☆";
   timeout2=setTimeout("Att1()",1000);
}
function reTitle(){
   flick=false;
   clearTimeout(timeout1);
   clearTimeout(timeout2);
   document.title="碰1碰";
}
function sleep(milisecond){
   var currentDate,beginDate=new Date();
   var beginHour,beginMinute,beginSecond,beginMs;
   var hourGaps,minuteGaps,secondGaps,msGaps,gaps;
   beginHour=beginDate.getHours();
   beginMinute=beginDate.getMinutes();
   beginSecond=beginDate.getSeconds();
   beginMs=beginDate.getMilliseconds();
   do{
      currentDate=new Date();
	  hourGaps=currentDate.getHours() - beginHour;
      minuteGaps=currentDate.getMinutes() - beginMinute;
      secondGaps=currentDate.getSeconds() - beginSecond;
      msGaps=currentDate.getMilliseconds() - beginMs; 
      if(hourGaps<0) hourGaps+=24; 
      gaps=hourGaps*3600+ minuteGaps*60+ secondGaps;
      gaps=gaps*1000+msGaps;
   }while(gaps<milisecond); 
}
