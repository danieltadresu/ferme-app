using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class UserRoleConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static UserRole GetEntityByUserId (int id) {
      List<UserRole> userRoles = new List<UserRole>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM USERS_ROLES WHERE USER_ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query,
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          UserRole userRole = new UserRole();
          userRole.Id = int.Parse(dr["ID"].ToString());
          userRole.UserId = int.Parse(dr["USER_ID"].ToString());
          userRole.RoleId = int.Parse(dr["ROLE_ID"].ToString());
          userRoles.Add(userRole);
        }
      }
      return userRoles[0];
    }
    
    public static List<UserRole> GetEntities () {
      List<UserRole> userRoles = new List<UserRole>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM USERS_ROLES";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query,
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          UserRole userRole = new UserRole();
          userRole.Id = int.Parse(dr["ID"].ToString());
          userRole.UserId = int.Parse(dr["USER_ID"].ToString());
          userRole.RoleId = int.Parse(dr["ROLE_ID"].ToString());
          userRoles.Add(userRole);
        }
      }
      return userRoles;
    }

    public static Boolean AddEntity (UserRole userRole) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO USERS_ROLES (ID, USER_ID, ROLE_ID) VALUES (:pId, :pUserId, :pRoleId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", userRole.Id);
        command.Parameters.Add("pUserId", userRole.UserId);
        command.Parameters.Add("pRoleId", userRole.RoleId);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }
  }
}
