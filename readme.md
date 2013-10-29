# Accorciare

## Make your links shorter, yeah?

    `curl --data "url=http://LongUrl.com/this-really-is-a-long-url" http://localhost:7999/`

_Response_
    statuscode → 201
    location header → http://localhost:7999/g1lSIpB-4


## Resolve to the full link

    `curl http://localhost:7999/g1lSIpB-4`

_Response_
    statuscode → 302
    location header → http://LongUrl.com/this-really-is-a-long-url


## Figuring out whats going on...

Hit this with your browser:

    http://localhost:7999

and get a beautiful list of all the links with their click counts.


## Getting up and running...

You're gonna need node and mongo.

Run mongo (run mongo_dir/bin/mongod). It will probably give you grief. Run it with sudo. Here's a handy alias for you:

`alias ffs=”sudo !!”`

clone the project,  open the root folder, type `npm install`

To run the website type `node app.js`

To run the tests `mocha`

