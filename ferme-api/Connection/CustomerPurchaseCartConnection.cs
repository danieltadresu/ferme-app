using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;
namespace Connection
{
  public class CustomerPurchaseCartConnection
  {

    // var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
    //   Console.WriteLine(environment);
    //static String connectionString = $"User Id=admin;Password=12345678910; Data Source=${Environment.GetEnvironmentVariable("DATABASE_ENDPOINT")}";
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static Boolean AddEntity (CustomerPurchaseCart CustomerPurchaseCart) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO CUSTOMER_PURCHASE_CART (ID) VALUES (:pId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();
        command.Parameters.Add("pId", CustomerPurchaseCart.Id);
        // command.Parameters.Add("pCreatedat", customerPurchase.Createdat);
        // command.Parameters.Add("pUpdatedat", customerPurchase.Updatedat);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static List<CustomerPurchaseCart> GetEntities () {
      List<CustomerPurchaseCart> customerPurchaseCarts = new List<CustomerPurchaseCart>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM CUSTOMER_PURCHASE_CART";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          CustomerPurchaseCart customerPurchaseCart = new CustomerPurchaseCart();
          customerPurchaseCart.Id = int.Parse(dr["ID"].ToString());
          customerPurchaseCarts.Add(customerPurchaseCart);
        }
        return customerPurchaseCarts;
      }
    }

    public static CustomerPurchaseCart GetEntity (int id) {
      List<CustomerPurchaseCart> customerPurchaseCarts = new List<CustomerPurchaseCart>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM CUSTOMER_PURCHASE_CART WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          CustomerPurchaseCart customerPurchaseCart = new CustomerPurchaseCart();
          customerPurchaseCart.Id = int.Parse(dr["ID"].ToString());
          customerPurchaseCarts.Add(customerPurchaseCart);
        }
        return customerPurchaseCarts[0];
      }
    }



  }
}