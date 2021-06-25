using System;

namespace Models
{
  public class CartItem
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private int orderId;
    public int OrderId
    {
      get { return orderId; }
      set { orderId = value; }
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

    private int productUnitPrice;
    public int ProductUnitPrice
    {
      get { return productUnitPrice; }
      set { productUnitPrice = value; }
    }

    private String productName;
    public String ProductName
    {
      get { return productName; }
      set { productName = value; }
    }

    public CartItem () {
      Init();
    }

    private void Init() {
      Id = 0;
      OrderId = 0;
      ProductId = 0;
      ProductQuantity = 0;
      ProductUnitPrice = 0;
      ProductName = null;
    }
  };
};
