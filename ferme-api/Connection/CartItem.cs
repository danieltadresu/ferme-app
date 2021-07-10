using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class CartItemConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static Boolean AddEntity (CartItem cartItem) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO CART_ITEM (ID, ORDER_ID, PRODUCT_ID, QUANTITY) VALUES (:pId, :pOrderId, :pProductId, :pQuantity)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();  
        command.Parameters.Add("pId", cartItem.Id);
        command.Parameters.Add("pOrderId", cartItem.OrderId);
        command.Parameters.Add("pProductId", cartItem.ProductId);
        command.Parameters.Add("pQuantity", cartItem.ProductQuantity);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }

    public static List<CartItem> GetEntities () {
      List<CartItem> cartItems = new List<CartItem>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM CART_ITEM";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query,
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          CartItem cartItem = new CartItem();
          cartItem.Id = int.Parse(dr["ID"].ToString());
          cartItem.OrderId = int.Parse(dr["ORDER_ID"].ToString());
          cartItem.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          cartItem.ProductQuantity = int.Parse(dr["QUANTITY"].ToString());
          cartItems.Add(cartItem);
        }
      }
      return cartItems;
    }

    public static List<CartItem> GetEntitiesByOrderId (int orderId) {
      List<CartItem> cartItems = new List<CartItem>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM CART_ITEM WHERE ORDER_ID = {orderId}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query,
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          CartItem cartItem = new CartItem();
          cartItem.Id = int.Parse(dr["ID"].ToString());
          cartItem.OrderId = int.Parse(dr["ORDER_ID"].ToString());
          cartItem.ProductId = int.Parse(dr["PRODUCT_ID"].ToString());
          cartItem.ProductQuantity = int.Parse(dr["QUANTITY"].ToString());
          cartItems.Add(cartItem);
        }
      }
      return cartItems;
    }
  }
}
