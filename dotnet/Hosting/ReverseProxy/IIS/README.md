# Walkthrough IIS Reverse Proxy

This simple sample shows how the IIS can be used as Reverse Proxy for several ASP.NET core applications.

### Scenario:
Several application are running on a Server (or in a Docker Swarm Environment)

App1: running on : http://localhost:5000 

App2: running on : http://localhost:5002 

and so on..

It doesn't matter how the applications are hosted, Docker Swarm, console, etc.

The Client side should only know the route to the requested service,

e.g.

http://servername/apps/app1
or 

http://servername/apps/app2

To reach this goal, use a Reverse Proxy - in our case we want use the IIS.

## Installation on IIS
To create a Reverse Proxy rule on the IIS install the following extensions:

- Url Rewrite Module [https://www.iis.net/downloads/microsoft/url-rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
- ARR Module [https://www.iis.net/downloads/microsoft/application-request-routing](https://www.iis.net/downloads/microsoft/application-request-routing)

Do that in this order.

## Configure a reverse proxy rule

First creat a new website in IIS Management console:
1. e.g. below Default web site add new Application site 
Alias: apps, Physical path: c:/inetpup/wwwroot/apps
2. Select the new "apps" site. On the right side ("Feature" view) select and open the "Url Rewrite" feature
3. In the Action menu select Add Rules
4. In the Add Rules dialog select the "Reverse proxy" template
5. Now starts the "Add reverse proxy rules" dialog: Enter the target server name for the first rule for our app1 -> **localhost:5000**
6. On the next form "Edit Inbound rule" set a url Pattern e.g.: **^app1(.*)**
7. Save the rule.
8. Create a new one for the app2

See also the web.config in this project.

## Test the rules
1. Open a shell and start the app1 with
```c#
dotnet run
```

2. Open a second shell and start app2

3. Open a browser and navigate to: http://localhost/apps/app1
the response "app1" shoul be appear

