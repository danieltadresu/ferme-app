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
        user.UserId = 0;
        user.Name = "NICOLAS";

        Console.WriteLine(Connection.UserConnection.DeleteEntity(user));
        // Output del valor de retorno metodo GetData() del objeto User
        //Console.WriteLine(user.GetData());

        // Output del valor de retorno metodo UpdateEntity() del objeto UserConnection
        //Console.WriteLine(Connection.UserConnection.UpdateEntity(user));



        /*
        List<User> users = Connection.UserConnection.GetEntities();
        Console.WriteLine($"Cantidad de registros en la tabla USERS >>> {users.Count}");
        if (Connection.UserConnection.AddEntity(user))
        {
            Console.WriteLine("Its true");
        }
        */
      }
    }
}
