
function spitOutTheBone(resps){
    console.log(resps[0]);
    for (i = 0;i<3;i++){
        $('#results').append(
            $('<li>').append(
                $('<a>').attr('href', '/user/messages').append(
                    $('<span>').attr('class', 'tab').append(resps[i].startime.toDateString())
                )));
    }
}


function test(){

    spitOutTheBone(getTimeTable());
    return false;
}
