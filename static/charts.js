
//console.log(chartdata);
//console.log(chartdata);
// data manipulations
var no_charts = chartdata.length;
for (i =0 ;i < no_charts ; i++){
    currentdata= chartdata[i];
    first_attr= chartdata[i].firstattr;
}
index =0;
plotbar(index);

function plotbar(index){
    first_attr = chartdata[index].first_attr;
    second_attr= chartdata[index].second_attr;
    slice_size = chartdata[index].slice_size;
    slicedata= chartdata[index].slice;

    score= chartdata[index].score;
    plotvalues = categories(chartdata[index].t_data);
    X_axiscat = plotvalues[0];
    values = plotvalues[1];
//    writing the variables onto the page
    document.getElementById("fattr").innerHTML = "First attribute : "+first_attr;
    if(second_attr = "NA"){
        second_attr= "None";
    }
    document.getElementById("secattr").innerHTML = "Second attribute :" +second_attr;
    document.getElementById("slice_size").innerHTML = "Slice size : "+ slice_size;
    document.getElementById("title").innerHTML="Distribution of : " + first_attr;
    document.getElementById("score").innerHTML="Score for the data : " + score;
    if(slicedata == '{}' ){
        slicedata = "None";
        }
    document.getElementById("slice").innerHTML=" Slice : " + slicedata;
    plotchart();

}


function categories(cat){
        console.log(cat);
        catlist =[];
        values =[];
        for ( i =0; i < cat.length; i++){
            catlist.push(cat[i][0]);
            values.push(cat[i][1]);
        }
        return [catlist , values];
}
function plotchart(){
Highcharts.chart('container1', {
    chart: {
        type: 'column'
    },
    title: {
        text: first_attr
    },
    xAxis: {
        categories: X_axiscat,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: Values
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: first_attr,
        data: values

    }]
});
}



