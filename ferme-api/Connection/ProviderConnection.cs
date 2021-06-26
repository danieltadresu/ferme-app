using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class ProviderConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static Provider GetEntity (int id) {
      List<Provider> providers = new List<Provider>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Provider provider = new Provider();
          provider.Id = int.Parse(dr["ID"].ToString());
          provider.Name = dr["NAME"].ToString();
          providers.Add(provider);
        }
        return providers[0];
      }
    }

    public static List<Provider> GetEntities () {
      List<Provider> providers = new List<Provider>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Provider provider = new Provider();
          provider.Id = int.Parse(dr["ID"].ToString());
          provider.Name = dr["NAME"].ToString();
          providers.Add(provider);
        }
        return providers;
      }
    }
  }
}