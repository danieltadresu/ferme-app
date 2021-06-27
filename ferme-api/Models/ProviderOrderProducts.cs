using System;

namespace Models
{
  public class ProviderOrderProducts
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private int providerOrderId;
    
    public int ProviderOrderId
    {
      get { return providerOrderId; }
      set { providerOrderId = value; }
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

    private String productName;
    
    public String ProductName
    {
      get { return productName; }
      set { productName = value; }
    }

    private int productUnitPrice;
    
    public int ProductUnitPrice
    {
      get { return productUnitPrice; }
      set { productUnitPrice = value; }
    }

    public ProviderOrderProducts () {
      Init();
    }

    public void Init() {
      Id = 0;
      ProviderOrderId = 0;
      ProductId = 0;
      ProductQuantity = 0;

      ProductName = null;
      ProductUnitPrice = 0;
    }
  }
};