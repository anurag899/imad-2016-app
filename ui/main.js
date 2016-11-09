function loadLoginForm () {
    // Submit username/password to login
    var loginarea=document.getElementById('login_area');
    loginarea.innerHTML="Login/Logout";
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              checkLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else if(request.status===403) {
                  alert('us');
                  register.value = 'Register';
              }
              else{
                //alert('use');
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML ="Hii "+username+"(Logout)";
    loginArea.href="/logout";
    var loginarea=document.getElementById('story');
    loginarea.href='/writeStory';
    
}

function checkLogin(){
	var request = new XMLHttpRequest();
	request.onreadystatechange=function(){
		    if (request.readyState === XMLHttpRequest.DONE) { 
		        if (request.status === 200) {
                	loadLoggedInUser(this.responseText);
	            } else {
	                loadLoginForm();
	            }
	        }
        };
    request.open('GET', '/check-login', true);
    request.send(null);
}

function fetchArticle(){
	 //create request object
	 var request=new XMLHttpRequest();
	 //capture the reponse and store it in variable
	 request.onreadystatechange =	function(){
	 	if(request.readyState === XMLHttpRequest.DONE){
	 		//take some action
	 		if(request.status === 200){
	 		  var names =request.responseText;
	 		  names=JSON.parse(names);
	 		  var blogs='',i;
	 		  var list='';
	 		  for(i=0;i<names.length;i++){
				var content="<h4><small>RECENT POSTS</small></h4>"+
			    "<hr>"+
			    "<h2 id ='title-one'>"+names[i].heading+"</h2>"+
			    "<h5 ><span class='glyphicon glyphicon-time'></span><span id='date-one'>"+" "+names[i].date+"</span> </h5>"+
			    "<h5 ><span id='auth-one' class='label label-primary'>"+names[i].title+"</span></h5><br>"+
			    "<p id ='content-one'>"+names[i].content.substring(0,300)+"..."+
			    "<a href='/articles/"+names[i].title+"'>"+
			    "Read more</a>"+
			    "</p>"+
			    "<br><br>";
	 		  	blogs+=content+"<hr>";
	 		  	list+="<li><a href=''>"+names[i].heading+"</a></li>";
	 		  }
	 		 	var blog=document.getElementById('blog');
	 		  	blog.innerHTML=blogs;
	 		  	var blist=document.getElementById('list');
	 		  	blist.innerHTML=list;
	 		}
	 	}
	 
	 };
	request.open('GET','/getArticle',true);
	request.send(null);
}

function fetchList(){
	 //create request object
	 var request=new XMLHttpRequest();
	 //capture the reponse and store it in variable
	 request.onreadystatechange =	function(){
	 	if(request.readyState === XMLHttpRequest.DONE){
	 		//take some action
	 		if(request.status === 200){
	 		  var names =request.responseText;
	 		  names=JSON.parse(names);
	 		  var list='';
	 		  for(i=0;i<names.length;i++){
				list+="<li><a href='/articles/"+names[i].title+"'>"+names[i].heading+"</a></li>";
	 		  }
	 		 	var blist=document.getElementById('list');
	 		  	blist.innerHTML=list;
	 		}
	 	}
	 
	 };
	request.open('GET','/getList',true);
	request.send(null);
}

//for login check
checkLogin();

//for articles
fetchArticle();
//for list
fetchList();