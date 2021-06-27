using System;

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
      UserId = 0;
    }

  }
};