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
        
        
        request.open('POST', '/login', false);  
        request.setRequestHeader("Content-Type", "application/json");
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
        
        request.open('POST', '/create-user', false); 
        
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
				var content=
          "<div style='padding-bottom:15px;' class='w3-container w3-padding-8'>"+
              "<h3><b>"+names[i].heading+"</b></h3>"+
              "<h5><span id='auth-one' class='label label-primary'>"+names[i].title+"</span> <span class='w3-opacity'>"+names[i].date+"</span></h5>"+
            "</div>"+
            "<div class='w3-container'>"+
              "<p style='text-algin'>"+names[i].content.substring(0,300)+"....</p>"+
              "<div class='w3-row'>"+
                "<div class='w3-col m8 s12'>"+
                  "<p><a href='/articles/"+names[i].heading+"' class='w3-btn w3-padding-large w3-white w3-border w3-hover-border-black'><b>READ MORE »</b></a></p>"+
                "</div>"+
              "</div>"+
            "</div>";
	 		  	blogs+=content+"<hr>";
	 		  }
	 		 	var blog=document.getElementById('blog');
	 		  	blog.innerHTML=blogs;	 		}
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

function writeStory(){
  var subArticle=document.getElementById('sub_article');
  subArticle.onclick=function(){
        alert("hello");
      var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('successfully submit !');
              } else if(request.status===403) {
                  alert('us');
              }
              else{
                //alert('use');
              }
          }
        };
        
        // Make the request
        var title = document.getElementById('title').value;
        var content = document.getElementById('content').value;
        console.log(title);
        console.log(content);
        request.open('POST', '/submit-article', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({title: title, content: content}));  
    };
}
//for login check
checkLogin();

//for articles
fetchArticle();
//for list
fetchList();