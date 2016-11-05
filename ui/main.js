var button=document.getElementById('counter');
var counter=0;
button.onclick=function(){
	 //create request object
	 var request=new XMLHttpRequest();
	 //capture the reponse and store it in variable
	 request.onreadystatechange =	function(){
	 	if(request.readyState === XMLHttpRequest.DONE){
	 		//take some action
	 		if(request.status === 200){
	 			var counter=request.responseText;
	 			var span=document.getElementById('count');
	 			span.innerHTML=counter.toString();
	 		}
	 	}
	 };
	 request.open('GET','http://localhost:5000/counter',true);
	 request.send(null);
};

var bt=document.getElementById('sub');
bt.onclick=function(){
	 //create request object
	 var request=new XMLHttpRequest();
	 //capture the reponse and store it in variable
	 request.onreadystatechange =	function(){
	 	if(request.readyState === XMLHttpRequest.DONE){
	 		//take some action
	 		if(request.status === 200){
	 			var names=request.responseText;
	 			names=JSON.parse(names);
	 			var list='';
	 			for(var i=0;i<names.length;i++){
	 				list+='<li>'+names[i]+'</li>';
	 			}
	 			var ui=document.getElementById('namelist');
	 			ui.innerHTML=list;
	 		}
	 	}
	 
	 };
	var text=document.getElementById('name');
	var name=text.value ;
	request.open('GET','http://localhost:5000/submit?name='+name,true);
	request.send(null);
	};