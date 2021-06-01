using System;

namespace Models
{
  public class DeliveryType
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private String description;
    public String Description
    {
      get { return description; }
      set { description = value; }
    }
    public DeliveryType () {
      Init();
    }

    private void Init() {
      Id = 0;
      Description = null;
    }
  };
};
