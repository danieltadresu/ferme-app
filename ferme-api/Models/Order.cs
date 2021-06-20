using System;

namespace Models
{
  public class Order
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
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

    public Order () {
      Init();
    }

    private void Init() {
      Id = 0;
      TotalPurchase = 0;
      PaymentMethodId = 0;
      DeliveryTypeId = 0;
      CustomerId = 0; // Model Person
    }
  };
};
