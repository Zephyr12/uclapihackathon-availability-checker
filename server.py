from bottle import route, run, template, static_file, request, error, hook, response, redirect
import requests
from urllib.parse import urlencode
import arrow
import json

BASE_URL = "https://uclapi.com/oauth/token"
CLIENT_ID = "4218681856646897.8917625845387480"
CLIENT_SECRET = "80c473512213c86892d5a20d2bd99a9db3684926eee3e4385c6fe4d76eba112a"

@route('/assets/<path:path>')
def js(path):
    return static_file(path, root="./assets/")

@route('/')
def root():
    return template("index.html")

@route('/oauth')
def oauth():
    result = request.params.get('result')
    code = request.params.get('code')
    client_id = request.params.get('client_id')
    state = request.params.get('state')

    params = {
        "client_id": CLIENT_ID,
        "code": code,
        "client_secret": CLIENT_SECRET
    }

    response = requests.get(BASE_URL, params=params)
    json = response.json()
    token = json.get("token")
    return redirect("/?" + urlencode({"token": token}));

@route('/timetable')
def book():
    token = request.params.get('token')

    params = {
        "token": token,
        "client_secret": CLIENT_SECRET
    }

    response = requests.get("https://uclapi.com/timetable/personal", params=params)
    json = response.json()
    timetable = json.get("timetable")

    print(timetable)

    times = []
    for key in timetable.keys():
        for lecture in timetable.get(key):
            start_time = lecture.get("start_time")
            end_time = lecture.get("end_time")
            print(key + " " + start_time)
            start_time = arrow.get(key + " " + start_time, "YYYY-MM-DD HH:mm").timestamp
            print(key + " " + end_time)
            end_time = arrow.get(key + " " + end_time, "YYYY-MM-DD HH:mm").timestamp
            print([start_time, end_time])
            times.append([start_time, end_time])
    return {"data": times}

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

run(host='localhost', port='8000', debug=True)
