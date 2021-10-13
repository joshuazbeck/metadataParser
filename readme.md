# Metadata Parser

This application is used to link to the URL of the shoutcast server (currently linked to : http://cp1.thepuremix.net:9954/currentsong?sid=1).  The data is then stripped and passed to the Spotify API to be parsed for further metadata which is then passed through a JSON route to be consumed by the Tinsel and Tunes app.

## Technical Stack
Metadata parser is a Node.JS application running on a GitHub instance.  The most recent version runs a Node.JS express application through a reverse proxy on port 8080 to mirror to the server IP at port 8080 using PM2 as the runtime.  The application was most recently compiled on Node.JS version 12 using experimental modules.



# Deploying

Login into the Droplet on Digital Ocean and connect either through the web or locally using SSH

*Navigate to sub directory*
> **cd metadataParser**

*Get most recent push to the GitHub repository*
> **git pull**

Once everything is squared away, deploy with:
>**pm2 start npm -- run production**

*(Optional) view currently running processes:*
> *pm2 list*
> 
*(Optional) view debug logs for pm2, if there are errors:*
>*pm2 logs*
