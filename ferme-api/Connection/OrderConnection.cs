using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class OrderConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static Boolean AddEntity (Order order) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO ORDERS (ID, TOTAL_PURCHASE, PAYMENT_METHOD_ID, DELIVERY_TYPE_ID, CUSTOMER_ID) VALUES (:pId, :pTotalPurchase, :pPaymentMethodId, :pDeliveryTypeId, :pCustomerId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", order.Id);
        command.Parameters.Add("pTotalPurchase", order.TotalPurchase);
        command.Parameters.Add("pPaymentMethodId", order.PaymentMethodId);
        command.Parameters.Add("pDeliveryTypeId", order.DeliveryTypeId);
        command.Parameters.Add("pCustomerId", order.CustomerId);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static List<Order> GetEntities () {
      List<Order> orders = new List<Order>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM ORDERS";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query,
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Order order = new Order();
          order.Id = int.Parse(dr["ID"].ToString());
          order.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          order.PaymentMethodId = int.Parse(dr["PAYMENT_METHOD_ID"].ToString());
          order.DeliveryTypeId = int.Parse(dr["DELIVERY_TYPE_ID"].ToString());
          order.CustomerId = int.Parse(dr["CUSTOMER_ID"].ToString());
          orders.Add(order);
        }
      }
      return orders;
    }

    public static Order GetEntity (int id) {
      List<Order> orders = new List<Order>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM ORDERS WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Order order = new Order();
          order.Id = int.Parse(dr["ID"].ToString());
          order.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          order.PaymentMethodId = int.Parse(dr["PAYMENT_METHOD_ID"].ToString());
          order.DeliveryTypeId = int.Parse(dr["DELIVERY_TYPE_ID"].ToString());
          order.CustomerId = int.Parse(dr["CUSTOMER_ID"].ToString());
          // customerPurchase.Id = int.Parse(dr["ID"].ToString());
          // customerPurchase.ProductQuantity = int.Parse(dr["PRODUCT_QUANTITY"].ToString());
          // customerPurchase.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          // customerPurchase.PaymentMethodId = int.Parse(dr["PAYMENT_METHOD_ID"].ToString());
          // customerPurchase.DeliveryTypeId = int.Parse(dr["DELIVERY_TYPE_ID"].ToString());
          // customerPurchase.CustomerId = int.Parse(dr["CUSTOMER_ID"].ToString());
          // customerPurchase.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          orders.Add(order);
        }
        return orders[0];
      }
    }
  }
}
