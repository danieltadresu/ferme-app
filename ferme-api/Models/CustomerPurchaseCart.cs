using System;

namespace Models
{
  public class CustomerPurchaseCart
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }
    public CustomerPurchaseCart () {
      Init();
    }

    private void Init() {
      Id = 0;
    }
  };
};
