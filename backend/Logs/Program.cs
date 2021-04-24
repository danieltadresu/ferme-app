using System;
using Models;
using Connection;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace Logs
{
  class Program
  {
    static void Main(string[] args)
      {
        User user = new User();
        Console.WriteLine("Hello World!");
        Console.WriteLine(user.GetData());
        List<User> users = Connection.UserConnection.getAll();
        Console.WriteLine($"Cantidad de registros en la tabla USERS >>> {users.Count}");
        Console.WriteLine(Connection.UserConnection.create(user));
        if (Connection.UserConnection.create(user))
        {
            Console.WriteLine("Its true");
        }
      }
    }
}
