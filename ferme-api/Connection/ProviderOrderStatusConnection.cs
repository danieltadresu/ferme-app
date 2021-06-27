using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class ProviderOrderStatusConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";
    public static ProviderOrderStatus GetEntity (int id) {
      List<ProviderOrderStatus> providerOrderStatus = new List<ProviderOrderStatus>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER_ORDER_STATUS WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          ProviderOrderStatus status = new ProviderOrderStatus() {
            Id = int.Parse(dr["ID"].ToString()),
            Description = dr["DESCRIPTION"].ToString()
          };
          providerOrderStatus.Add(status);
        }
        return providerOrderStatus[0];
      }
    }

    public static List<ProviderOrderStatus> GetEntities () {
      List<ProviderOrderStatus> providerOrderStatus = new List<ProviderOrderStatus>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER_ORDER_STATUS";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          ProviderOrderStatus status = new ProviderOrderStatus() {
            Id = int.Parse(dr["ID"].ToString()),
            Description = dr["DESCRIPTION"].ToString()
          };
          providerOrderStatus.Add(status);
        }
        return providerOrderStatus;
      }
    }
  }
}