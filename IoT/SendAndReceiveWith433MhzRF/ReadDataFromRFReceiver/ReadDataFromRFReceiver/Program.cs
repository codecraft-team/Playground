using System;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;

namespace ReadDataFromRFReceiver
{
  class Program
  {
    [DllImport("RCSwitchAdapter.so")]
    public static extern IntPtr RC_Create();
    
    [DllImport("RCSwitchAdapter.so", EntryPoint = "RC_GetReceivedValue")]
    public static extern long RC_GetReceivedValue(IntPtr value);
    
    [DllImport("RCSwitchAdapter.so")]
    public static extern void RC_EnableReceive(IntPtr value, int interrupt);

    [DllImport("RCSwitchAdapter.so", EntryPoint = "RC_ResetAvailable")]
    public static extern void RC_ResetAvailable(IntPtr value);

    [DllImport("RCSwitchAdapter.so", EntryPoint = "RC_Available")]
    public static extern bool RC_Available(IntPtr value);

    static void Main(string[] args)
    {
      Console.WriteLine("Hello Raspi!");
      IntPtr rcswitch = RC_Create();

      RC_EnableReceive(rcswitch, 2);

      while (true)
      {
        if (RC_Available(rcswitch))
        {
          long value = RC_GetReceivedValue(rcswitch);
          if (value == 0)
          {
            Console.WriteLine("Unknown code");
          }
          else
          {
            Console.WriteLine($"Received value {value}");
          }
          RC_ResetAvailable(rcswitch);
        }
      }
    }
  }
}
