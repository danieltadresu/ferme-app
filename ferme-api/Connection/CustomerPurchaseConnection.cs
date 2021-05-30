using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;
namespace Connection
{
  public class CustomerPurchaseConnection
  {

    // var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
    //   Console.WriteLine(environment);
    //static String connectionString = $"User Id=admin;Password=12345678910; Data Source=${Environment.GetEnvironmentVariable("DATABASE_ENDPOINT")}";
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static Boolean AddEntity (CustomerPurchase customerPurchase) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO CUSTOMER_PURCHASE (ID, PRODUCT_QUANTITY, TOTAL_PURCHASE, PAYMENT_METHOD_ID, DELIVERY_TYPE_ID, CUSTOMER_ID, PRODUCT_ID, CUSTOMER_PURCHASE_CART_ID) VALUES (:pId, :pProductQuantity, :pTotalPurchase, :pPaymentMethodId, :pDeliveryTypeId, :pCustomerId, :pProductId, :pCustomerPurchaseCartId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();
        command.Parameters.Add("pId", customerPurchase.Id);
        command.Parameters.Add("pProductQuantity", customerPurchase.ProductQuantity);
        command.Parameters.Add("pTotalPurchase", customerPurchase.TotalPurchase);
        command.Parameters.Add("pPaymentMethodId", customerPurchase.PaymentMethodId);
        command.Parameters.Add("pDeliveryTypeId", customerPurchase.DeliveryTypeId);
        command.Parameters.Add("pCustomerId", customerPurchase.CustomerId);
        command.Parameters.Add("pProductId", customerPurchase.ProductId);
        command.Parameters.Add("pCustomerPurchaseCartId", customerPurchase.CustomerPurchaseCartId);
        // command.Parameters.Add("pCreatedat", customerPurchase.Createdat);
        // command.Parameters.Add("pUpdatedat", customerPurchase.Updatedat);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static CustomerPurchase GetEntity (int id) {
      List<CustomerPurchase> customerPurchases = new List<CustomerPurchase>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM CUSTOMER_PURCHASE WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          CustomerPurchase customerPurchase = new CustomerPurchase();
          customerPurchase.Id = int.Parse(dr["ID"].ToString());
          customerPurchase.ProductQuantity = int.Parse(dr["PRODUCT_QUANTITY"].ToString());
          customerPurchase.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          customerPurchase.PaymentMethodId = int.Parse(dr["PAYMENT_METHOD_ID"].ToString());
          customerPurchase.DeliveryTypeId = int.Parse(dr["DELIVERY_TYPE_ID"].ToString());
          customerPurchase.CustomerId = int.Parse(dr["CUSTOMER_ID"].ToString());
          customerPurchase.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          customerPurchases.Add(customerPurchase);
        }
        return customerPurchases[0];
      }
    }
    public static List<CustomerPurchase> GetEntities () {
      List<CustomerPurchase> customerPurchases = new List<CustomerPurchase>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM CUSTOMER_PURCHASE";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          CustomerPurchase customerPurchase = new CustomerPurchase();
          customerPurchase.Id = int.Parse(dr["ID"].ToString());
          customerPurchase.ProductQuantity = int.Parse(dr["PRODUCT_QUANTITY"].ToString());
          customerPurchase.TotalPurchase = int.Parse(dr["TOTAL_PURCHASE"].ToString());
          customerPurchase.PaymentMethodId = int.Parse(dr["PAYMENT_METHOD_ID"].ToString());
          customerPurchase.DeliveryTypeId = int.Parse(dr["DELIVERY_TYPE_ID"].ToString());
          customerPurchase.CustomerId = int.Parse(dr["CUSTOMER_ID"].ToString());
          customerPurchase.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          customerPurchases.Add(customerPurchase);
        }
        return customerPurchases;
      }
    }
  }
}