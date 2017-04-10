FROM microsoft/windowsservercore

COPY . /
WORKDIR /

RUN powershell -command install-packageprovider nuget -confirm:$false -Force -verbose

RUN powershell -command  install-packageprovider ChocolateyGet -Force -Confirm:$false -verbose

RUN powershell -command install-package nodejs -ProviderName ChocolateyGet -Force -Confirm:$false 

RUN powershell -Command \
	$existingMachinePath = [Environment]::GetEnvironmentVariable('Path',[System.EnvironmentVariableTarget]::Machine); \
	[Environment]::SetEnvironmentVariable('Path', $existingMachinePath + ';C:\Users\ContainerAdministrator\AppData\Roaming\npm;C:\Program Files\nodejs', [EnvironmentVariableTarget]::Machine)

RUN powershell -Command npm install --global --production windows-build-tools

RUN powershell -Command npm config set msvs_version 2015 --global

EXPOSE 4873
RUN powershell -Command npm install -g sinopia
COPY /config.yaml "C:/Users/ContainerAdministrator/AppData/Roaming/sinopia/config.yaml"
COPY /up-storage.js "C:/Users/ContainerAdministrator/AppData/Roaming/npm/node_modules/sinopia/lib/"
CMD powershell -Command sinopia