if (sessionStorage.getItem("hasRunBefore")==null){
    //first time loading the entire page
    sessionStorage.clear();

    sessionStorage.setItem("hasRunBefore",true);
    //initialise toggle value
    sessionStorage.setItem("toggle",0);


}
else{
    //don't mess with toggle value; keep the one from previous session


}