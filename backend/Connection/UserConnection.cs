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
    public static List<User> GetEntities () {
      List<User> users = new List<User>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = "SELECT * FROM USERS";
        oracleConnection.Open();
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

    public static Boolean AddEntity (User user) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        //String query = $"INSERT INTO USERS (NAME) VALUES ('{user.Name}')";
        String query = $"INSERT INTO USERS (USER_ID, NAME) VALUES (:pUserId, :pName)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pUserId", user.UserId);
        command.Parameters.Add("pName", user.Name);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static Boolean UpdateEntity (User user) {
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"UPDATE USERS SET NAME = (:pName) WHERE USER_ID  = (:pUserId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pName", user.Name);
        command.Parameters.Add("pUserId", user.UserId);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

  public static Boolean DeleteEntity (User user) {
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"DELETE FROM USERS WHERE USER_ID  = (:pUserId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pUserId", user.UserId);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }
  }
}