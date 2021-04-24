using System;
using Models;
namespace Logs
{
  class Program
  {
    static void Main(string[] args)
      {
        User user = new User();
        Console.WriteLine("Hello World!");
        Console.WriteLine(user.GetData());
      }
    }
}
