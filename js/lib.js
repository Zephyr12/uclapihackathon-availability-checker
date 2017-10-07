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
            startime: new Date("October 13, 2014 11:13:00"),
            endtime: new Date("October 13, 2014 14:13:00"),
        },
        {
            startime: new Date("October 14, 2014 11:13:00"),
            endtime: new Date("October 14, 2014 14:13:00"),
        },{
            startime: new Date("October 19, 2014 11:13:00"),
            endtime: new Date("October 19, 2014 14:13:00"),
        }
    ]

}