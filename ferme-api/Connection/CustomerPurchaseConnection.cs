using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class CustomerPurchaseConnection
  {
    static String connectionString = "User Id=admin;Password=12345678910;" + "Data Source=database-1.cu6ntgmtazbg.us-east-2.rds.amazonaws.com:1521/DATABASE";

    public static Boolean AddEntity (CustomerPurchase customerPurchase) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"INSERT INTO CUSTOMER_PURCHASE (ID, PRODUCT_QUANTITY, TOTAL_PURCHASE, PAYMENT_METHOD_ID, DELIVERY_TYPE_ID, CUSTOMER_ID, PRODUCT_ID) VALUES (:pId, :pProductQuantity, :pTotalPurchase, :pPaymentMethodId, :pDeliveryTypeId, :pCustomerId, :pProductId)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();
        command.Parameters.Add("pId", customerPurchase.Id);
        command.Parameters.Add("pProductQuantity", customerPurchase.ProductQuantity);
        command.Parameters.Add("pTotalPurchase", customerPurchase.TotalPurchase);
        command.Parameters.Add("pPaymentMethodId", customerPurchase.PaymentMethodId);
        command.Parameters.Add("pDeliveryTypeId", customerPurchase.DeliveryTypeId);
        command.Parameters.Add("pCustomerId", customerPurchase.CustomerId);
        command.Parameters.Add("pProductId", customerPurchase.ProductId);
        // command.Parameters.Add("pCreatedat", customerPurchase.Createdat);
        // command.Parameters.Add("pUpdatedat", customerPurchase.Updatedat);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }
  }
}