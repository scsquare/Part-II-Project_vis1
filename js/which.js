
var toggle_button=document.getElementById("toggle")

toggle_button.addEventListener("click",()=>{

    if (sessionStorage.getItem("toggle")==0){
        sessionStorage.setItem("toggle",1);
    }
    else if (sessionStorage.getItem("toggle")==1){
        sessionStorage.setItem("toggle",0);
    }
    else{
        throw Error("Toggle button error")
    }
    
    location.reload();
});

function updateToggleText(){
    if (sessionStorage.getItem("toggle")==0){
        document.getElementById("toggle").innerHTML="Toggle: this is spotify plot";
    }
    else if (sessionStorage.getItem("toggle")==1){
        document.getElementById("toggle").innerHTML="Toggle: this is user study plot";
    }
    else{
        throw Error("cannot fix text of toggle button");
    }
};

updateToggleText();

