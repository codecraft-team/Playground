using Microsoft.EntityFrameworkCore;
using SimpleEf.Migrations;

namespace SimpleEf
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<MemberShip> MemberShips { get; set; }
    public DbSet<Player> Players { get; set; }
  }
}