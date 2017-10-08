from bottle import route, run, template, static_file, request, error, hook, response

@route('/js/<path:path>')
def js(path):
    return static_file(path, root="./js/")

@route('/')
def root():
    return template("index.html")

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@error(401)
@error(402)
@error(403)
@error(404)
@error(418)
def error():
    return "<h1>Error 418 - I'm a teampot</h1>"

run(host='localhost', port='8000', debug=True)
