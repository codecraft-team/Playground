# Javascript client

Sample of a Javascript client to use it with IdentityServer4 for login, logout and connect with an api (the Ressource).
Sample is build as described in the IdentityServer documentation.

## Configer sample
The sample contains no IdentityServer, so a running IdentityServer is needed (somewhere).

Configer the authority (IdentityServer) in the app.js file:

```javascript

var config = {
  authority: "https://IDENTITY_SERVER_URI",
  client_id: "js",
  redirect_uri: "https://localhost:5001/callback.html",
  response_type: "id_token token",
  scope: "openid profile api1",
  post_logout_redirect_uri: "https://localhost:5001/index.html"
};

```

The client uses the oidc-client library.

The IdentityServer should contain following configuration for the client access:

```javascript
    ClientId => "js",
    ClientName => "JavaScript Client",
    AllowedGrantTypes => GrantTypes.Implicit,
    AllowAccessTokensViaBrowser => true,

    RedirectUris =>           { "http://localhost:5003/callback.html" },
    PostLogoutRedirectUris => { "http://localhost:5003/index.html" },
    AllowedCorsOrigins =>     { "http://localhost:5003" },

    AllowedScopes =>
    {
        "openid",
        "profile",
        "api1"
    }
```

## Run
Start sample with F5.