using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class UserRoleConnection
  {
    static String connectionString = "User Id=admin;Password=12345678910;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

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
  }
}
