using System;
using Models;
using System.Collections.Generic;
namespace Models
{
  public class ProviderOrder
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
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

    private int totalPurchase;
    
    public int TotalPurchase
    {
      get { return totalPurchase; }
      set { totalPurchase = value; }
    }

    private int providerId;
    
    public int ProviderId
    {
      get { return providerId; }
      set { providerId = value; }
    }

    private int orderStatusId;
    
    public int OrderStatusId
    {
      get { return orderStatusId; }
      set { orderStatusId = value; }
    }

    private int userId;
    
    public int UserId
    {
      get { return userId; }
      set { userId = value; }
    }

    private String orderStatusName;
    
    public String OrderStatusName
    {
      get { return orderStatusName; }
      set { orderStatusName = value; }
    }

    private int productsQuantity;
    public int ProductsQuantity
    {
      get { return productsQuantity; }
      set { productsQuantity = value; }
    }

    private String providerName;
    
    public String ProviderName
    {
      get { return providerName; }
      set { providerName = value; }
    }

    private List<Models.ProviderOrderProducts> providerProducts;
    public List<Models.ProviderOrderProducts> ProviderProducts
    {
      get { return providerProducts; }
      set { providerProducts = value; }
    }

    public ProviderOrder () {
      Init();
    }

    public void Init() {
      Id = 0;
      Createdat = 0;
      Updatedat = 0;
      TotalPurchase = 0;
      ProviderId = 0;
      OrderStatusId = 0;
      OrderStatusName = null;
      UserId = 0;
      ProductsQuantity = 0;
      ProviderName = null;
      ProviderProducts = new List<ProviderOrderProducts>();
    }

  }
};