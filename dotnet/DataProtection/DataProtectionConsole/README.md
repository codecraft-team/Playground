# Demo
Demonstrates how to use an X509Certificate2 with the DataProtection Api.

```PowerShell
PS:\>DataProtectionConsole codecrafteamdev.pfx abc123
```

To create a custom self-signed certificate a PowerShell cmdlet can be used.
Replace password and dnsname as needed.
```PowerShell
PS:\>$securedPassword = ConvertTo-SecureString -String "abc123" -Force -AsPlainText
PS:\> New-SelfSignedCertificate -certstorelocation cert:\localmachine\my -dnsname codecraftteam
PS:\> Export-PfxCertificate -cert cert:\localMachine\my\thumbprint -FilePath e:\cert.pfx -Password $securedPassword

PS:>gci Cert:\LocalMachine\My
```
Remarks: The certificate will be stored in LocalMaschine > Personal > Certificates
## ISSUES:
This is not working if the certificate is not in the certificate store!  
See https://github.com/aspnet/DataProtection/issues/139  
See https://github.com/aspnet/DataProtection/issues/286