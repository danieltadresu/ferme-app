using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class ProductConnection
  {
    static String connectionString = "User Id=admin;Password=12345678910;" + "Data Source=database-1.cu6ntgmtazbg.us-east-2.rds.amazonaws.com:1521/DATABASE";
    public static Boolean AddEntity (Product product) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, CREATEDAT, UPDATEDAT, PRICE, STOCK, IMAGE_URL, CATEGORY_ID, PROVIDER_ID) VALUES (:pId, :pName, :pDescription, :pCreatedat, :pUpdatedat, :pPrice, :pStock, :pImageUrl, :pCategoryId, :pProviderId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", product.Id);
        command.Parameters.Add("pName", product.Name);
        command.Parameters.Add("pDescription", product.Description);
        command.Parameters.Add("pCreatedat", product.Createdat);
        command.Parameters.Add("pUpdatedat", product.Updatedat);
        command.Parameters.Add("pPrice", product.Price);
        command.Parameters.Add("pStock", product.Stock);
        command.Parameters.Add("pImageUrl", product.ImageUrl);
        command.Parameters.Add("pCategoryId", product.CategoryId);
        command.Parameters.Add("pProviderId", product.ProviderId);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static List<Product> GetEntities () {
      List<Product> products = new List<Product>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = "SELECT * FROM PRODUCT";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Product product = new Product();
          product.Id = int.Parse(dr["ID"].ToString());
          product.Name = dr["NAME"].ToString();
          product.Description = dr["DESCRIPTION"].ToString();
          product.Createdat = int.Parse(dr["CREATEDAT"].ToString());
          product.Updatedat = int.Parse(dr["UPDATEDAT"].ToString());
          product.Price = int.Parse(dr["PRICE"].ToString());
          product.Stock = int.Parse(dr["STOCK"].ToString());
          product.ImageUrl = dr["IMAGE_URL"].ToString();
          product.CategoryId = int.Parse(dr["CATEGORY_ID"].ToString());
          product.ProviderId = int.Parse(dr["PROVIDER_ID"].ToString());
          products.Add(product);
        }
        return products;
      }
    }

    public static Product GetEntity (int id) {
      List<Product> products = new List<Product>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PRODUCT WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Product product = new Product();
          product.Id = int.Parse(dr["ID"].ToString());
          product.Name = dr["NAME"].ToString();
          product.Description = dr["DESCRIPTION"].ToString();
          product.Createdat = int.Parse(dr["CREATEDAT"].ToString());
          product.Updatedat = int.Parse(dr["UPDATEDAT"].ToString());
          product.Price = int.Parse(dr["PRICE"].ToString());
          product.Stock = int.Parse(dr["STOCK"].ToString());
          product.ImageUrl = dr["IMAGE_URL"].ToString();
          product.CategoryId = int.Parse(dr["CATEGORY_ID"].ToString());
          product.ProviderId = int.Parse(dr["PROVIDER_ID"].ToString());
          products.Add(product);
        }
        return products[0];
      }
    }
    
  }
}
