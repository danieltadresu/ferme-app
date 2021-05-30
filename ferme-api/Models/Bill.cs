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

    private int createdAt;
    public int CreatedAt
    {
      get { return createdAt; }
      set { createdAt = value; }
    }

    private int updatedAt;
    public int UpdatedAt
    {
      get { return updatedAt; }
      set { updatedAt = value; }
    }

    private int userId;
    public int UserId
    {
      get { return userId; }
      set { userId = value; }
    }

    private int billId;
    public int BillId
    {
      get { return billId; }
      set { billId = value; }
    }

    private int statusId;
    public int StatusId
    {
      get { return statusId; }
      set { statusId = value; }
    }
    
    public Bill () {
      Init();
    }

    private void Init() {
      Id = 0;
      CreatedAt = 0;
      UpdatedAt = 0;
      UserId = 0;
      BillId = 0;
      StatusId = 0;
    }
  };
};