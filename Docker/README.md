# Docker files for creating images

## sinopia
Creates a docker image with the npm registry sinopia

To create the image, navigate to the sinopia folder and start build

```powershell
1> docker build -t npmregistry .
```

- -t name of the docker image
- do not forget the dot at the end of line

To start a new registry, run following:

```powershell
docker run -d -p 4873:4873 --ip 172.20.248.104 npmregistry
``` 

Start a web explorer and navigate to the sinopia local webpage:
[http://172.20.248.104:4873/](http://172.20.248.104:4873/)

Follow the instruction on the local sinopia web page to set correct npm registry seetings.

## SimpleHelloWorld

This is a simple sample for deploying a dotnet core application to a Linux machine (in my case on a debian installation).

The "Hello world" application is a simple dotnet core console application created with Visual Studio 2017.

To deploy and create the sample to a docker image on a linux system do following steps:
- copy all the files to the linux machine (with installed docker - it could be a real machine or a VM) (e.g. I used Windows bash to connect to linux machine and copied the files with scp)
- switch to linux machine (maybe with ssh) in the folder with the copied files
- build the image
```powershell
1> docker build -t helloworld .
```
- start the application
```powershell
1> docker run -t helloworld
```
- Now you should see "Helloworld!" on the commandline

