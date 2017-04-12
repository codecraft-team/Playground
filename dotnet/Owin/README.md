# Walkthrough
Scenario: creating a new .NET Core WebApi project and inspecting the native owin context.  
The sample can be exercised using console and notepad or e.g. Visual Studio Code.
## Steps
1. Creating a folder and switch to the folder
2. Creating .NET Core WebApi project  
```dotnet new webapi```
3. Restore nuget packages  
```dotnet restore```
4. Start the application to validate general setup  
```dotnet run```
5. Open a browser navigate to the basic api (default port 5000)  
```http://localhost:5000/api/values```  
The browser should show  
```["value1","value2"]```
6. Add a reference to Microsoft.AspNetCore.Owin  
```dotnet add package Microsoft.AspNetCore.Owin```
7. Open Startup.cs and add the following snippet before the app.UseMvc() call within the Configure method  
```cs
app.UseOwin(pipeline => pipeline(next => context => {
    foreach(string key in context.Keys){
        Console.WriteLine($"{key}: {context[key]}");
    }
    return next(context);
}));
```
7. Execute and navigate to the api (see step 4 and 5)
8. Inspect the console output which should contain the owin keys and their content

Alternative:  
Instead of using the UseOwin extension method on can use OwinEnvironment/OwinFeatureCollection.
The sample shows how to access owin values using OwinEnvironment or OwinFeatureCollection.
```cs
app.Use((context, next) => {
    OwinEnvironment environment = new OwinEnvironment(context);
    IDictionary<string, string[]> headers = (IDictionary<string, string[]>)environment.Single(item => item.Key == "owin.RequestHeaders").Value;
    
    return next();
});

app.Use((context, next) => {
    OwinEnvironment environment = new OwinEnvironment(context);
    OwinFeatureCollection features = new OwinFeatureCollection(environment);
    IDictionary<string, string[]> headers = (IDictionary<string, string[]> )features.Environment["owin.RequestHeaders"];
    
    return next();
});

```