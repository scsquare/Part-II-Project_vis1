function myfirstplot(){
 
    //the label
    var label_div = d3.select("#my_dataviz").append("div")
    .attr("class", "label")
    .style("opacity", 0);

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = window.innerWidth*0.75 - margin.left - margin.right,
    height = window.innerHeight*0.8 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+15)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //axis labels
    svg.append("text").attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom+10) + ")").text("Tempo (bpm)");
    svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Loudness (dB)");



    //Read the data
    d3.json("data/spotify.json",function(data) {

        // Add X axis
        var x = d3.scaleLinear()
        .domain([20, 200])
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([-45, 0])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        //mouse coordinate
        svg.append("text").attr("transform", "translate(" + 10 + " ," + 10 + ")").attr("id","current").style("font-size","15px").text("Cursor coordinate: NA");
        svg.append("text").attr("transform", "translate(" + 10 + " ," + 30 + ")").attr("id","selected").style("font-size","15px").text("Selected coordinate: NA");


        // Add data
        var g=svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter();

        //circles
        g.append("circle")
        .attr("cx", function (d) { return x(d.tempo); } )
        .attr("cy", function (d) { return y(d.avg_loudness); } )
        .attr("r", function (d){ 
            //initialise for first task
            if (d.id==labelled_dots[0][0]||d.id==labelled_dots[0][1]||d.id==labelled_dots[0][2]){
                return 7;
            }
            else{
                return 3;
            };})
        .attr("id",function(d){return "circle_"+d.id;})
        .style("fill", function(d){

            switch(d.genre){
                case "animerock":
                    return "#ff0000";
                    break;
                case "classical":
                    return "#0000ff";
                    break;
                case "lofichill":
                    return "#00ff00";
                    break;
                default:
                    return "#FF0000";
            };
        })
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('100')
                .attr("r", 7);
            label_div.html("("+d.tempo+","+d.avg_loudness+")"+d.id)
            .style("left", (d3.event.pageX ) + "px")
            .style("top", (d3.event.pageY-100) + "px");
            label_div.transition()
                .duration(100)
                .style("opacity", 1);
            })  
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                    .duration('200')
                    .attr("r", function(d){
                        //large dots stay large
                        for (var i=0;i<labelled_dots[task_no].length;i++){
                            if (d.id==labelled_dots[task_no][i]){
                                return 7;
                            }
                        }
                        return 3;
                    });
                label_div.transition()
                    .duration('200')
                    .style("opacity", 0);
            })
        .on("click",function(d){
            //toggle based on task: only on for task B
            if (task_no==2 ||task_no==3){
                d3.select("#selected").transition().duration(100).text("Selected Point:"+(d.tempo)+","+(d.avg_loudness));
            }
        });

        //display coordinates
        d3.select("svg").on("mousemove",function(){
            //external variable coordinates
            //mysterious -12,+0.8 compensate for floating point errors - idk why
            d3.select("#current").transition().duration(100).text("Current Coordinate:"+d3.format(".1f")(x.invert(d3.mouse(this)[0])-12.3)+","+d3.format(".1f")(y.invert(d3.mouse(this)[1])+0.8));
        });
        d3.select("svg").on("click",function(){
            //external variable coordinates
            //toggle based on task: only on for task C
            if (task_no>3){
                d3.select("#selected").transition().duration(100).text("Selected Coordinate:"+d3.format(".1f")(x.invert(d3.mouse(this)[0])-12.3)+","+d3.format(".1f")(y.invert(d3.mouse(this)[1])+0.8));
            
            }
        });

        //labels
        g.append("text")
        .attr("x", function (d){return x(d.tempo)+10;})
        .attr("y", function (d){return y(d.avg_loudness)+15;})
        .attr("id",function(d){return ("text_"+d.id);})
        .style("font-size","15px")
        .text(function (d){
            //initialise for first task
            if (d.id==labelled_dots[0][0]){
                return "Point A";
            }
            else if (d.id==labelled_dots[0][1]){
                return "Point B";
            }
            else if (d.id==labelled_dots[0][2]){
                return "Point C";
            }
            else{
                return "";
            }
        });

    });



}

function mysecondplot(){
     
    //the label
    var label_div = d3.select("#my_dataviz").append("div")
    .attr("class", "label")
    .style("opacity", 0);

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = window.innerWidth*0.75 - margin.left - margin.right,
    height = window.innerHeight*0.8 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+15)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //axis labels
    svg.append("text").attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom+10) + ")").text("Tempo");
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Loudness");




    //Read the data
    d3.json("data/userstudy.json",function(data) {

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    //mouse coordinate
    svg.append("text").attr("transform", "translate(" + 10 + " ," + 10 + ")").attr("id","current").style("font-size","15px").text("Cursor coordinate: NA");
    svg.append("text").attr("transform", "translate(" + 10 + " ," + 30 + ")").attr("id","selected").style("font-size","15px").text("Selected coordinate: NA");


    // Add data
    var g=svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter();

    //circles
    g.append("circle")
    .attr("cx", function (d) { return x(d.tempo); } )
    .attr("cy", function (d) { return y(d.avg_loudness); } )
    .attr("r", function (d){ 
        //initialise for first task
        if (d.id==labelled_dots[0][0]||d.id==labelled_dots[0][1]||d.id==labelled_dots[0][2]){
            return 7;
        }
        else{
            return 3;
        };})
    .attr("id",function(d){return "circle_"+d.id;})
    .style("fill", function(d){

        switch(d.genre){
            case "animerock":
                return "#ff0000";
                break;
            case "classical":
                return "#0000ff";
                break;
            case "lofichill":
                return "#00ff00";
                break;
            default:
                return "#FF0000";
        };
    })
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr("r", 7);
        label_div.html("("+d.tempo+","+d.avg_loudness+")"+d.id)
        .style("left", (d3.event.pageX ) + "px")
        .style("top", (d3.event.pageY-100) + "px");
        label_div.transition()
            .duration(100)
            .style("opacity", 1);
        })  
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
                .duration('200')
                .attr("r", function(d){
                    //large dots stay large
                    for (var i=0;i<labelled_dots[task_no].length;i++){
                        if (d.id==labelled_dots[task_no][i]){
                            return 7;
                        }
                    }
                    return 3;
                });
            label_div.transition()
                .duration('200')
                .style("opacity", 0);
        })
    .on("click",function(d){
        //toggle based on task: only on for task B
        if (task_no==2 ||task_no==3){
            d3.select("#selected").transition().duration(100).text("Selected Point:"+(d.tempo)+","+(d.avg_loudness));
        }
    });

    //display coordinates
    d3.select("svg").on("mousemove",function(){
        //external variable coordinates
        //mysterious -12,+0.8 compensate for floating point errors - idk why
        d3.select("#current").transition().duration(100).text("Current Coordinate:"+d3.format(".1f")(x.invert(d3.mouse(this)[0])-12.3)+","+d3.format(".1f")(y.invert(d3.mouse(this)[1])+0.8));
    });
    d3.select("svg").on("click",function(){
        //external variable coordinates
        //toggle based on task: only on for task C
        if (task_no>3){
            d3.select("#selected").transition().duration(100).text("Selected Coordinate:"+d3.format(".1f")(x.invert(d3.mouse(this)[0])-12.3)+","+d3.format(".1f")(y.invert(d3.mouse(this)[1])+0.8));
        
        }
    });

    //labels
    g.append("text")
    .attr("x", function (d){return x(d.tempo)+10;})
    .attr("y", function (d){return y(d.avg_loudness)+15;})
    .attr("id",function(d){return ("text_"+d.id);})
    .style("font-size","15px")
    .text(function (d){
        //initialise for first task
        if (d.id==labelled_dots[0][0]){
            return "Point A";
        }
        else if (d.id==labelled_dots[0][1]){
            return "Point B";
        }
        else if (d.id==labelled_dots[0][2]){
            return "Point C";
        }
        else{
            return "";
        }
    });

    });



}

if (sessionStorage.getItem("toggle")==0){
    myfirstplot();
    document.getElementById("toggle").innerHTML="Toggle: this is spotify plot";
}
else if (sessionStorage.getItem("toggle")==1){
    mysecondplot();
    document.getElementById("toggle").innerHTML="Toggle: this is user study plot";
}
else{
    throw Error("cannot plot");
}