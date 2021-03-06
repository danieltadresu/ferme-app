using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class UserConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";
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
          user.Id = int.Parse(dr["ID"].ToString());
          user.PersonId = int.Parse(dr["PERSON_ID"].ToString());
          user.Email = dr["EMAIL"].ToString();
          user.Password = dr["PASSWORD"].ToString();
          users.Add(user);
        }
        return users;
      }
    }

    public static User GetEntity (int id) {
      List<User> users = new List<User>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM USERS WHERE ID = {id}";
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
          user.Id = int.Parse(dr["ID"].ToString());
          user.PersonId = int.Parse(dr["PERSON_ID"].ToString());
          user.Email = dr["EMAIL"].ToString();
          user.Password = dr["PASSWORD"].ToString();
          users.Add(user);
        }
        return users[0];
      }
    }

    public static User GetEntityByPersonId (int id) {
      List<User> users = new List<User>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM USERS WHERE PERSON_ID = {id}";
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
          user.Id = int.Parse(dr["ID"].ToString());
          user.PersonId = int.Parse(dr["PERSON_ID"].ToString());
          user.Email = dr["EMAIL"].ToString();
          user.Password = dr["PASSWORD"].ToString();
          users.Add(user);
        }
        return users[0];
      }
    }
  
    public static Boolean AddEntity (User user) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        //String query = $"INSERT INTO USERS (NAME) VALUES ('{user.Name}')";
        String query = $"INSERT INTO USERS (ID, PERSON_ID, EMAIL, PASSWORD) VALUES (:pId, :pPersonId, :pEmail, :pPassword)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", user.Id);
        command.Parameters.Add("pPersonId", user.PersonId);
        command.Parameters.Add("pEmail", user.Email);
        command.Parameters.Add("pPassword", user.Password);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

  //       public static Boolean UpdateEntity (User user) {
  //   using (OracleConnection oracleConnection = new OracleConnection(connectionString))
  //     {
  //       String query = $"UPDATE USERS SET NAME = (:pName) WHERE USER_ID  = (:pUserId)";
  //       oracleConnection.Open();
  //       OracleCommand command = oracleConnection.CreateCommand();  
  //       command.Parameters.Add("pName", user.Name);
  //       command.Parameters.Add("pUserId", user.UserId);
  //       command.CommandText = query;
  //       int data = command.ExecuteNonQuery();
  //       return data is 1 ? true : false;
  //     }
  //   }

  // public static Boolean DeleteEntity (int userId) {
  //   using (OracleConnection oracleConnection = new OracleConnection(connectionString))
  //     {
  //       String query = $"DELETE FROM USERS WHERE USER_ID  = (:pUserId)";
  //       oracleConnection.Open();
  //       OracleCommand command = oracleConnection.CreateCommand();  
  //       command.Parameters.Add("pUserId", userId);
  //       command.CommandText = query;
  //       int data = command.ExecuteNonQuery();
  //       return data is 1 ? true : false;
  //     }
  //   }
  }
}
