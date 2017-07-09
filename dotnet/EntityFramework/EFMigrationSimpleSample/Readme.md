# Entity Framework core migration sample
This sample shows how you can create EF Core migration for the database without hardcoded connectionstrings.

## Problem
If you create a EF core project, then you have to create a DataContext. in this context you can add through the optionbuilder a SqlServer provider that needs a connectionstring.

```csharp
public class EFDataContext : DbContext
{
    public EFDataContext (DbContextOptions options) : base (options)
    {}

    public DbSet<Entity> Entity {get; set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
    {
        optionBuidel.UseSqlSersver(@"Server.....")
    }
}
```

If you try to inject a  conenctionString through other was e.g. new constructor then on a EF core database migartion you receive an error that a parameterless constructor was not found.

## Solution
You have to add a IDbContextFactory<T> in the same Assembly where the context is defined.

See DbContextFactory.cs for the implementation, now this will be **used for the EF Database migration**. In this case the connectionString can be loaded from a configuration, that is also used from the datacontext.

See DataContext.cs, this contains now only the DbSet definition, no more things.

For the Runtime implemenation see Program.cs, this will be used for creating a new DataContext with provider and connectionString (the same like migration) and injection in the DataContext options.

## Creating a migration (powershell)
After this preparation create first the migrations:

```powershell
dotnet ef migrations add initial -s ..\SimpleConsole\SimpleConsole.csproj 
```
`initial` - this is the Name of the current migration (wellspeaking text)

`-s ...` - It is needed a executable to run the migration, this must be referenced through -s, otherwise the migration is not running

## Remove the migrations (powershell)
```powershell
dotnet ef migrations remove -s ..\SimpleConsole\SimpleConsole.csproj
```
Removes the last migrations.

## Update the database (powershell)
After creating the migration, now the database can be updated:
```powershell
dotnet ef database update -s ..\SimpleConsole\SimpleConsole.csproj 
```
All new migrations steps will applied to the database.

If you want remove all changes from the database run:
```powershell
dotnet ef database update 0 -s ..\SimpleConsole\SimpleConsole.csproj
```


