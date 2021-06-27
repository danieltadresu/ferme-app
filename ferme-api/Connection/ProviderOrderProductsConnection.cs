using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class ProviderOrderProductsConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static List<ProviderOrderProducts> GetEntities () {
      List<ProviderOrderProducts> providerOrderProducts = new List<ProviderOrderProducts>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER_ORDER_PRODUCTS";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          ProviderOrderProducts providerOrderProduct = new ProviderOrderProducts();
          providerOrderProduct.Id = int.Parse(dr["ID"].ToString());
          providerOrderProduct.ProviderOrderId = int.Parse(dr["PROVIDER_ORDER_ID"].ToString());
          providerOrderProduct.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          providerOrderProduct.ProductQuantity = int.Parse(dr["PRODUCT_QUANTITY"].ToString());
          providerOrderProducts.Add(providerOrderProduct);
        }
        return providerOrderProducts;
      }
    }

    public static List<ProviderOrderProducts> GetEntityByOrderId (int id) {
      List<ProviderOrderProducts> providerOrderProducts = new List<ProviderOrderProducts>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PROVIDER_ORDER_PRODUCTS WHERE PROVIDER_ORDER_ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          ProviderOrderProducts providerOrderProduct = new ProviderOrderProducts();
          providerOrderProduct.Id = int.Parse(dr["ID"].ToString());
          providerOrderProduct.ProviderOrderId = int.Parse(dr["PROVIDER_ORDER_ID"].ToString());
          providerOrderProduct.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          providerOrderProduct.ProductQuantity = int.Parse(dr["PRODUCT_QUANTITY"].ToString());
          providerOrderProducts.Add(providerOrderProduct);
        }
        Console.WriteLine(providerOrderProducts.Count);
        return providerOrderProducts;
      }
    }

    public static Boolean AddEntity (ProviderOrderProducts providerOrderProduct) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO PROVIDER_ORDER_PRODUCTS (ID, PROVIDER_ORDER_ID, PRODUCT_ID, PRODUCT_QUANTITY) VALUES (:pId, :pProviderOrderId, :pProductId, :pProductQuantity)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", providerOrderProduct.Id);
        command.Parameters.Add("pProviderOrderId", providerOrderProduct.ProviderOrderId);
        command.Parameters.Add("pProductId", providerOrderProduct.ProductId);
        command.Parameters.Add("pProductQuantity", providerOrderProduct.ProductQuantity);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }
  }
}