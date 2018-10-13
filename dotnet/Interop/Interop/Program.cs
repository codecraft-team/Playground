using System;
using System.Runtime.InteropServices;

namespace Interop {
  internal class Program {
    [DllImport("./libs/lib", EntryPoint = "Add")]
    private static extern int Add(int a, int b);

    private static void Main(string[] args) {
      if (2 > args.Length) {
        Console.WriteLine("Usage: ./Interop 1 2");
        return;
      }

      if (!int.TryParse(args[0], out int s1)) {
        Console.WriteLine("Operand 1 is not an integer.");
        return;
      }

      if (!int.TryParse(args[1], out int s2)) {
        Console.WriteLine("Operand 2 is not an integer.");
        return;
      }

      Console.WriteLine($"{s1} + {s2} = {Add(s1, s2)}");
    }
  }
}