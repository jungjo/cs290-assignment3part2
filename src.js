function SaveSetting(){

	localStorage.setItem('pageDisplay' ,document.getElementsByName('pageDisp')[0].value )

	if (document.getElementById('Python').checked){
		py = true;
  	}
  	if (document.getElementById('JSON').checked){
  		js = true;
  	}
  	if (document.getElementById('JavaScript').checked){
  		java = true;
  	}
  	if (document.getElementById('SQL').checked){
  		sq = true;
  	}
}

function SearchGist(url){
	var py;
	var js;
	var java;
	var sq;
	var obj_descript;
	var obj_url;
	var obj_lang;
	var favearray = [];
	var pageResult = document.getElementById('pageDisp').value;
    	if(pageResult > 5){
		return;
	}	
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if(this.readyState === 4){
			var obj = JSON.parse(this.responseText);
		}
	
		for(var i = 1; i <= pageResult; i++){
			for(var obj_ele in obj){
				var sect = obj[obj_ele];
				obj_url = sect.url
				obj_descript = sect.description;
				obj_lang = sect.language;
				
	
				if(py == true || js == true || java == true || sq == true){
			
						if(obj_lang == "Python"){
							list(obj_url, obj_descript,favearray);
						}
						else if(obj_lang == "JSON"){
							list(obj_url, obj_descript, favearray);
						}
						else if(obj_lang == "JavaScript"){
							list(obj_url, obj_descript, favearray);
						}
						else if(obj_lang == "SQL"){
							list(obj_url, obj_descript, favearray);
						}
				}
				else{
					list(obj_url, obj_descript, favearray);
				}	
			}
		}
	}
	req.open('Get', url);
	req.send();
}

function list(obj_url, obj_descript, favearray){
	var div = document.createElement("div");
    	document.getElementById("results").appendChild(div);

    	var element = document.createElement("ul");
    	div.appendChild(element);
					
	if(obj_descript == '' || null){
		var item = document.createElement("li");
   		item.innerHTML = '<a href="'+ obj_url +'">'+ "No description" +'</a>';
    		element.appendChild(item);
	}
	else{
		var item = document.createElement("li");
   		item.innerHTML = '<a href="'+ obj_url +'">'+ obj_descript +'</a>';
    		element.appendChild(item);
	}	

	var fave = document.createElement("button");
	fave.innerHTML = 'Favorite';
	item.appendChild(fave);

	var unfave = document.createElement("button");
	unfave.innerHTML = 'Unfavorite';

	fave.onclick = function(){
		favearray.push({url: obj_url, descript: obj_descript});
		localStorage["favearray"] = JSON.stringify(favearray);
		var div = document.createElement("div");
    		document.getElementById("favorites").appendChild(div);

    		var element = document.createElement("ul");
    		div.appendChild(element);
		
		if(favearray[favearray.length - 1].descript === '' || favearray[favearray.length - 1].descript === null){
			var item = document.createElement("li");
   			item.innerHTML = '<a href="'+ favearray[favearray.length - 1].url+'">'+ "No description" +'</a>';
    			element.appendChild(item);
		}
		else{
			var item = document.createElement("li");
   			item.innerHTML = '<a href="'+favearray[favearray.length - 1].url +'">'+ favearray[favearray.length - 1].descript +'</a>';
    			element.appendChild(item);
		}
		item.appendChild(unfave);
	}	
	unfave.onclick = function(){
		favearray.pop();
		localStorage["favearray"] = JSON.stringify(favearray);
	}
}	
				

function fave(){
	var farray = JSON.parse(localStorage["favearray"]);
	for(var i = 0; i < farray.length; i++){
		var div = document.createElement("div");

    		document.getElementById("favorites").appendChild(div);

    		var element = document.createElement("ul");
    		div.appendChild(element);
		
		if(farray[i].descript == '' || farray[i].descript == null){
			var item = document.createElement("li");
   			item.innerHTML = '<a href="'+ farray[i].url+'">'+ "No description" +'</a>';
    			element.appendChild(item);
		}
		else{
			var item = document.createElement("li");
   			item.innerHTML = '<a href="'+farray[i].url +'">'+ farray[i].descript +'</a>';
    			element.appendChild(item);
		}
		var unfave = document.createElement("button");
		unfave.innerHTML = 'Unfavorite';
		item.appendChild(unfave);
	}
	unfave.onclick = function(){
		farray.pop();
		localStorage["favearray"] = JSON.stringify(farray);
	}
}	
