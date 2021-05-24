using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class RoleConnection
  {
    static String connectionString = "User Id=admin;Password=12345678910;" + "Data Source=database-1.cu6ntgmtazbg.us-east-2.rds.amazonaws.com:1521/DATABASE";

    public static Role GetEntity (int id) {
      List<Role> roles = new List<Role>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM ROLES WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Role role = new Role();
          role.Id = int.Parse(dr["ID"].ToString());
          role.Name = dr["NAME"].ToString();
          role.Description = dr["DESCRIPTION"].ToString();
          roles.Add(role);
        }
        return roles[0];
      }
    }
  }
}
