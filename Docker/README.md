# Docker files for creating images

## sinopia
Creates a docker image with the npm registry sinopia

To create the image, navigate to the sinopia folder and start build

```powershell
1> docker build -t npmregistry .
```

- -t name of the docker image

To start a new registry, run following:

```powershell
docker run -d -p 4873:4873 --ip 172.20.248.104 npmregistry
``` 

Start a web explorer and navigate to the sinopia local webpage:
[http://172.20.248.104:4873/](http://172.20.248.104:4873/)

Follow the instruction on the local sinopia web page to set correct npm registry seetings.