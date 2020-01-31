## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/creepymonster/dexcomshare.git {YOUR_SERVICE_NAME} # or clone your own fork
$ cd dexcomshare
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku git:remote -a {YOUR_SERVICE_NAME}
$ git push heroku master
$ heroku open
```
