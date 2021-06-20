using System;

namespace Models
{
  public class OrderItem
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private int productId;
    public int ProductId
    {
      get { return productId; }
      set { productId = value; }
    }

    private int productQuantity;
    
    public int ProductQuantity
    {
      get { return productQuantity; }
      set { productQuantity = value; }
    }

    public OrderItem () {
      Init();
    }

    public void Init() {
      Id = 0;
      ProductId = 0;
      ProductQuantity = 0;
    }
  }
};