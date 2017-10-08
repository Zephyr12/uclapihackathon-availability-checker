function process(url, params, successCallback, errorCallback) {
    $.ajax({
        success : successCallback,
        error : errorCallback,
        data : params,
        url : url,
        type : 'POST',
        dataType : 'json'
    });
}

function getTimeTable() {
    return [
        {
            startime: new Date("October 9, 2014 11:13:00"),
            endtime: new Date("October 9, 2014 14:13:00"),
        },
        {
            startime: new Date("October 9, 2014 15:13:00"),
            endtime: new Date("October 9, 2014 16:13:00"),
        },{
            startime: new Date("October 9, 2014 16:23:00"),
            endtime: new Date("October 9, 2014 17:33:00"),
        }
    ]

}


function getEventsI ( lecturer , start_date , end_date ) {
    var location = "https://uclapi.com/roombookings/bookings?token=uclapi-d57f42746745b6-da71637ba91df3-93104145242c4b-c916eb4ba2c292&contact=" ;
    location += lecturer ;
    location += "&start_daytime=" ;
    location += start_date ;
    location += "&end_daytime=" ;
    location += end_date ;
    return $.ajax({url: location});
}

function Timetable(){

}




function compare_dates ( a , b )
{
    if ( a.end_time > b.end_time )
    {
        return 1 ;
    }
    if ( a.end_time < b.end_time )
    {
        return -1 ;
    }
    return 0 ;
}


function getEvents(starttime,endtime,contact){


    return [
        {
            startime: new Date("October 13, 2014 10:13:00"),
            endtime: new Date("October 13, 2014 14:14:00"),
        },
        {
            startime: new Date("October 13, 2014 15:13:00"),
            endtime: new Date("October 13, 2014 16:00:00"),
        },{
            startime: new Date("October 13, 2014 17:45:00"),
            endtime: new Date("October 13, 2014 18:00:00"),
        }
    ]
}