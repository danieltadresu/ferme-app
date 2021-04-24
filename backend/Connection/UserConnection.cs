using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class UserConnection
  {
    static String connectionString = "User Id=admin;Password=12345678910;" + "Data Source=database-1.cu6ntgmtazbg.us-east-2.rds.amazonaws.com:1521/DATABASE";
    public static List<User> getAll () {
      List<User> users = new List<User>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        oracleConnection.Open();
        String query = "SELECT * FROM USERS";
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
            User user = new User();
            user.Name = dr["NAME"].ToString();
            users.Add(user);
        }
        return users;
      }
    }
  }
}
