using System;

namespace Models
{
  public class Bill
  {
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
    public Bill () {
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
      CustomerEmail = null;
      CustomerName = null;
      DeliveryTypeName = null;
      DeliveryAddress = null;
      ProductName = null;
      IsInvoice = false;
    }
  };
};