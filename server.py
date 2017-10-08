from bottle import route, run, template, static_file, request, error, hook, response, redirect
import requests
from urllib.parse import urlencode

BASE_URL = "https://uclapi.com/oauth/token"
CLIENT_ID = "4218681856646897.8917625845387480"
CLIENT_SECRET = "80c473512213c86892d5a20d2bd99a9db3684926eee3e4385c6fe4d76eba112a"

@route('/js/<path:path>')
def js(path):
    return static_file(path, root="./js/")

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

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

run(host='localhost', port='8000', debug=True)
