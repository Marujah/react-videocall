## React-VideoCall
Demo app: https://mm-video-chat.herokuapp.com/

<img align="right" width="420" src="https://github.com/Marujah/react-videocall/blob/master/video-call-screenshot.png"  alt =" " style="border: solid 1px #d4d4d4" />
  
Ad-hoc Video call to your friend without registering. 
Simply send your friend your auto-generated unique ID to make the call.  
Everytime you open a new tab, the server gives you a totally different unique ID.

### Development

```
# Install dependencies
npm install

# Run server
npm watch:server

# Run webpack-dev-server
npm watch:client
```


### Deployment

**Heroku**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Marujah/react-videocall/react-videocall/tree/production)

**Custom**
```
# Install dependencies
npm install

# Build front-end assets
npm build

# Run server
npm start
```
