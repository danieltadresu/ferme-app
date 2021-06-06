using System;

namespace Models
{
  public class CustomerPurchase
  {
    #region Database Propierties 
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private int productQuantity;
    public int ProductQuantity
    {
      get { return productQuantity; }
      set { productQuantity = value; }
    }

    private int totalPurchase;
    public int TotalPurchase
    {
      get { return totalPurchase; }
      set { totalPurchase = value; }
    }

    private int paymentMethodId;
    public int PaymentMethodId
    {
      get { return paymentMethodId; }
      set { paymentMethodId = value; }
    }

    private int deliveryTypeId;
    public int DeliveryTypeId
    {
      get { return deliveryTypeId; }
      set { deliveryTypeId = value; }
    }

    // Model Person
    private int customerId; 
    public int CustomerId
    {
      get { return customerId; }
      set { customerId = value; }
    }

    private int productId;
    public int ProductId
    {
      get { return productId; }
      set { productId = value; }
    }

    private int createdat;
    public int Createdat
    {
      get { return createdat; }
      set { createdat = value; }
    }

    private int updatedat;
    public int Updatedat
    {
      get { return updatedat; }
      set { updatedat = value; }
    }

    // TO DO:
    // En caso de manejar más de un producto por compra,
    // generar la tabla customerPurchaseCart (comentado en el script sql)
    // de forma tal que se establezca la siguiente relacion:
    // N customerPurchase pertenecen a 1 customerPurchaseCart
    // private int customerPurchaseCartId;
    // public int CustomerPurchaseCartId
    // {
    //   get { return customerPurchaseCartId; }
    //   set { customerPurchaseCartId = value; }
    // }
    #endregion

    #region Properties to use in Bill List response. ENDPOINT GET METHOD: /api/customerpurchase/bills
    private String customerEmail;
    public String CustomerEmail
    {
      get { return customerEmail; }
      set { customerEmail = value; }
    }

    private String customerName;
    public String CustomerName
    {
      get { return customerName; }
      set { customerName = value; }
    }

    private String deliveryTypeName; 
    public String DeliveryTypeName
    {
      get { return deliveryTypeName; }
      set { deliveryTypeName = value; }
    }

    private String deliveryAddress; 
    public String DeliveryAddress
    {
      get { return deliveryAddress; }
      set { deliveryAddress = value; }
    }

    private String productName;
    public String ProductName
    {
      get { return productName; }
      set { productName = value; }
    }

    private Boolean isInvoice;
    public Boolean IsInvoice
    {
      get { return isInvoice; }
      set { isInvoice = value; }
    }
    #endregion

    public CustomerPurchase () {
      Init();
    }

    private void Init() {
      Id = 0;
      ProductQuantity = 0;
      TotalPurchase = 0;
      PaymentMethodId = 0;
      DeliveryTypeId = 0;
      CustomerId = 0; // Model Person
      ProductId = 0;
      Createdat = 0;
      Updatedat = 0;
      // CustomerPurchaseCartId = 0;
      
      CustomerEmail = null;
      CustomerName = null;
      DeliveryTypeName = null;
      DeliveryAddress = null;
      ProductName = null;
      IsInvoice = false;
    }
  };
};
