var tasks=["A1","A2","B1","B2","C1","C2","C3"];
var task_no=0;

function storeCoor(){
    if (task_no>6){
        return;
    }
    var prev=document.getElementById("results").innerHTML;

    if (task_no<2){
        //do nothing lol nothing to save
        document.getElementById("results").innerHTML=prev+"Task "+tasks[task_no]+":done ";
    }
    else if (task_no<4){
        var selected=document.getElementById("selected").innerHTML.split(":")[1];
        document.getElementById("results").innerHTML=prev+"Task "+tasks[task_no]+":("+selected+") ";
    }
    else{
        var selected=document.getElementById("selected").innerHTML.split(":")[1];
        document.getElementById("results").innerHTML=prev+"Task "+tasks[task_no]+":("+selected+") ";
    }
    //finally: do it in nextTask instead
    //task_no=task_no+1; 
}


function nextTask(){
    //catch done/error
    if (task_no>=6){
        document.getElementById("question").innerHTML="Done!";
        task_no=7;
        return;
    }  
    
    //remove labels of points 
    var prev_arr=labelled_dots[task_no];
    for (var i=0;i<prev_arr.length;i++){
        d3.select("#text_"+prev_arr[i]).text("");
        d3.select("#circle_"+prev_arr[i]).attr("r",3);
    }

    //increment
    task_no=task_no+1;

    //add labels for new points
    var current_arr=labelled_dots[task_no];
    for (var i=0;i<current_arr.length;i++){
        d3.select("#text_"+current_arr[i]).text("Point "+String.fromCharCode(65+i));
        d3.select("#circle_"+current_arr[i]).attr("r",7);
    }
    
    //change task description
    var listof_questions=["Part A: guess what song C sounds like?",
    "Part B: Find a song that is midway between A and B in terms of loudness and tempo", 
    "Part C1: A song has the loudness of green songs and tempo of blue songs. Where would it be on the graph?",
    "Part C2: A song has the loudness of blue songs and tempo of red songs. Where would it be on the graph?",
    "Part C3: A song has the loudness of red songs and tempo of green songs. Where would it be on the graph?"];

    if (task_no<2){
        document.getElementById("question").innerHTML=listof_questions[0];
    }
    else if (task_no<4){
        document.getElementById("question").innerHTML=listof_questions[1];
    }
    else{
        document.getElementById("question").innerHTML=listof_questions[task_no-2];
    }
}

var next_button=document.getElementById("next")

next_button.addEventListener("click",()=>{
    storeCoor();
    nextTask();
});

