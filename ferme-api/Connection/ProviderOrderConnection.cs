using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class ProviderOrderConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static List<ProviderOrder> GetEntities () {
      List<ProviderOrder> providerOrders = new List<ProviderOrder>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER_ORDER";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          ProviderOrder providerOrder = new ProviderOrder();
          providerOrder.Id = int.Parse(dr["ID"].ToString());
          providerOrder.Createdat = int.Parse(dr["CREATEDAT"].ToString());
          providerOrder.Updatedat = int.Parse(dr["UPDATEDAT"].ToString());
          providerOrder.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          providerOrder.ProviderId = int.Parse(dr["PROVIDER_ID"].ToString());
          providerOrder.OrderStatusId = int.Parse(dr["ORDER_STATUS_ID"].ToString());
          providerOrder.UserId = int.Parse(dr["USER_ID"].ToString());
          providerOrders.Add(providerOrder);
        }
        return providerOrders;
      }
    }

    public static ProviderOrder GetEntity (int id) {
      List<ProviderOrder> providerOrders = new List<ProviderOrder>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER_ORDER WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          ProviderOrder providerOrder = new ProviderOrder();
          providerOrder.Id = int.Parse(dr["ID"].ToString());
          providerOrder.Createdat = int.Parse(dr["CREATEDAT"].ToString());
          providerOrder.Updatedat = int.Parse(dr["UPDATEDAT"].ToString());
          providerOrder.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          providerOrder.ProviderId = int.Parse(dr["PROVIDER_ID"].ToString());
          providerOrder.OrderStatusId = int.Parse(dr["ORDER_STATUS_ID"].ToString());
          providerOrder.UserId = int.Parse(dr["USER_ID"].ToString());
          providerOrders.Add(providerOrder);
        }
        return providerOrders[0];
      }
    }

    public static Boolean AddEntity (ProviderOrder providerOrder) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO PROVIDER_ORDER (ID, CREATEDAT, UPDATEDAT, TOTAL_PURCHASE, PROVIDER_ID, ORDER_STATUS_ID, USER_ID) VALUES (:pId, :pCreatedat, :pUpdatedat, :pTotalPurchase, :pProviderId, :pOrderStatusId, :pUserId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", providerOrder.Id);
        command.Parameters.Add("pCreatedat", providerOrder.Createdat);
        command.Parameters.Add("pUpdatedat", providerOrder.Updatedat);
        command.Parameters.Add("pTotalPurchase", providerOrder.TotalPurchase);
        command.Parameters.Add("pProviderId", providerOrder.ProviderId);
        command.Parameters.Add("pOrderStatusId", providerOrder.OrderStatusId);
        command.Parameters.Add("pUserId", providerOrder.UserId);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static Boolean UpdateProviderOrderStatus (int id, int orderStatusId) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"UPDATE PROVIDER_ORDER SET ORDER_STATUS_ID = {orderStatusId} WHERE ID = {id}";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }
  }
}