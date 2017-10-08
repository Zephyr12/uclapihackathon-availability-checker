var etable = []
var ttable = []
function spitOutTheBone(resps){
    console.log(resps);
    for (i = 0;i<resps.length;i++){
        $('#results').append(
            $('<li>').attr('class','card').append(
                $('<a>').attr('href', '/user/messages').append(
                    $('<span>').attr('class', 'tab').append(resps[i].endtime.toString())
                )));
    }
}

function test2(){
    $.ajax({url: "https://uclapi.com/roombookings/bookings?token=uclapi-d57f42746745b6-da71637ba91df3-93104145242c4b-c916eb4ba2c292", success: function(result){
       console.log(result)
    }});
}

function test(entity,days){


    $("#results").empty();

    frees = []
    var eventi = getEventsI( entity ,new Date(Date.now()).toISOstring, new Date(Date.now()+(days*24*60*60*1000)).toISOstring)
       eventi.done(function(result){
        len = result.bookings.length ;
        result.bookings.sort ( compare_dates ) ;
        for ( var i = 0 ; i < len ; i ++ )
        {
            etable.push({
                contact:result.bookings [ i ] . contact,
                startime:new Date(result.bookings [ i ] . start_time),
                endtime: new Date(result.bookings [ i ] . end_time)
            })
            console.log( result.bookings [ i ] . contact + " " + result.bookings [ i ] . start_time + " " + result.bookings [ i ] . end_time ) ;
        }
           arr = [];
           gapsTimeTable = convertToGap(arr,days);
           console.log(gapsTimeTable.length)
           for(i = 0;i<etable.length;i++){
               for(j = 0;j<gapsTimeTable.length;j++){

                   if(dateCheck(gapsTimeTable[j].startime,gapsTimeTable[j].endtime,etable[i].endtime)){
                       frees.push(etable[i]);
                   }else{
                       
                   }
               }
           }
           spitOutTheBone(frees);
    });






    return false;
}

function convertToGap(arr,days) {
    gaps = [];

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

        for (i = 0; i < arr.length - 1; i++) {
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