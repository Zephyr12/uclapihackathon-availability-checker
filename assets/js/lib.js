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
    return $.ajax({
      url: "/timetable",
      data: {
        token: readCookie('oauth_token')
      }
    })
}


function getEventsI ( lecturer , start_date , end_date ) {
    var location = "https://uclapi.com/roombookings/bookings?token=" + UCL_API_TOKEN + "&contact=";
    location += lecturer ;
    location += "&start_datetime=" ;
    location += start_date ;
    location += "&end_datetime=" ;
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
