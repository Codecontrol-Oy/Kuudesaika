# Pre-release of a technical proto for 6aika Decisions API React Client.

## Install Instructions
### Install with NPM

1. git clone https://github.com/Codecontrol-Oy/Kuudesaika
1. cd Kuudesaika
1. npm install
1. npm start

The service will be published by default at port 8080.

#### Install locally on a mac
This is a client-only app that does not require other server environment than the API service. With [Brew](https://brew.sh/) it's easy:

1. brew install npm
1. git clone https://github.com/Codecontrol-Oy/Kuudesaika
1. cd Kuudesaika
1. npm install
This takes a while.
5. npm start

The service will be published by default at port 8080. The app generates deep links to documents dynamically from the data you donwload. If you were to want to make a version of the app that uses static html files, even a local web server would not be required.

6. Open localhost port 80: http://localhost:8080

### Install with Docker
1. docker pull codecontrol/kuudesaika
1. docker run -itd -p 8080:8080 --name kuudesaika codecontrol/kuudesaika

The app is using just basically React and Grommet. New features are easy to add with Grommet. For more info, see [Grommet demo](https://grommet.github.io/). Happy hacking!
