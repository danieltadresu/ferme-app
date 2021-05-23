using System;

namespace Models
{
  public class CustomerPurchase
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
    }
  };
};
