## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/creepymonster/dexcomshare.git {YOUR_SERVICE_NAME} # or clone your own fork
$ cd dexcomshare
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).


## Create on Heroku

```
$ heroku login
$ heroku create {YOUR_SERVICE_NAME}
$ heroku config:set -a {YOUR_SERVICE_NAME} NS_ADDRESS="YOUR_NS_ADDRESS" NS_API_HASH="SHA-1 YOUR API_SECRET" 
```


## Deploying to Heroku

```
$ heroku git:remote -a {YOUR_SERVICE_NAME}
$ git push heroku master
$ heroku open
```


## Redeploying to Heroku
```
$ git push heroku master
```