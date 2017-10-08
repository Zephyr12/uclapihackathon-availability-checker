
function pad2(s) {return ("00" + s).slice(-2);}

function spitOutTheBone(resps){
    console.log(resps);
    for (var i = 0; i<resps.length; i++){
        var date = new Date(resps[i].start_time);
        var start_time = date;
        var end_time = new Date(resps[i].end_time);
        $('#results').append(
            $('<li>').attr('class','card').append(
                $('<h2>').text(resps[i].description),
                $('<p>').text(
                    "Date: "
                    + pad2(date.getFullYear().toString())
                    + "-"
                    + pad2((date.getMonth() + 1).toString())
                    + "-"
                    + pad2(date.getDay().toString())),
                $('<p>').text(
                    "Duration: "
                    + pad2(start_time.getHours()) + ":" + pad2(start_time.getMinutes())
                    + " \u2013 "
                    + pad2(end_time.getHours()) + ":" + pad2(end_time.getMinutes())
                ),
                $('<p>').text(
                    "Location: "
                    + resps[i].roomname
                ),
                $('<p>').text(
                    "Name: "
                    + resps[i].contact
                )
                ));
    }
}

function test2(){
    $.ajax({url: "https://uclapi.com/roombookings/bookings?token=uclapi-d57f42746745b6-da71637ba91df3-93104145242c4b-c916eb4ba2c292", success: function(result){
       console.log(result)
    }});
}

function test(entity,days){


    $("#results").empty();

    var frees = []
    var eventi = getEventsI( entity ,new Date(Date.now()).toISOstring, new Date(Date.now()+(days*24*60*60*1000)).toISOstring)

    //Callback
    eventi.done(function(result){
        console.log(result);
        result.bookings.sort ( compare_dates ) ;

        var arr = [];
        var gapsTimeTable = convertToGap(arr,days);
        console.log(gapsTimeTable.length)
        for(var i = 0;i<result.bookings.length;i++){
            for(var j = 0;j<gapsTimeTable.length;j++){
                if(dateCheck(gapsTimeTable[j].startime,gapsTimeTable[j].endtime,result.bookings[i].end_time)){
                    frees.push(result.bookings[i]);
                }
            }
        }
        spitOutTheBone(frees);
    });
    return false;
}

function convertToGap(arr,days) {
    var gaps = [];

    if (arr.length === 0) {
        gaps.push({
            startime: new Date(Date.now()),
            endtime: new Date(Date.now() + days * (24 * 60 * 60 * 1000))
        })
    } else {

        gaps.push({
            startime: new Date(Date.now()),
            endtime: arr[0].endtime
        })

        for (var i = 0; i < arr.length - 1; i++) {
            gaps.push({
                startime: arr[i].endtime,
                endtime: arr[i + 1].startime
            })
        }

        gaps.push({
            startime: gaps[gaps.length - 1].endtime,
            endtime: new Date(Date.now() + days * (24 * 60 * 60 * 1000))
        })
    }
    return gaps;
}






function dateCheck(from,to,check) {

    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {

        return true;
    }
    return false;
}