using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;
namespace Connection
{
  public class DeliveryTypeConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";
    public static DeliveryType GetEntity (int id) {
      List<DeliveryType> deliveryTypes = new List<DeliveryType>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM DELIVERY_TYPE WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          DeliveryType deliveryType = new DeliveryType();
          deliveryType.Id = int.Parse(dr["ID"].ToString());
          deliveryType.Description = dr["DESCRIPTION"].ToString();
          deliveryTypes.Add(deliveryType);
        }
        return deliveryTypes[0];
      }
    }
  }
}