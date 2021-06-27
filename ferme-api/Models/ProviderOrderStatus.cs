using System;

namespace Models
{
  public class ProviderOrderStatus
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

    public ProviderOrderStatus () {
      Init();
    }

    public void Init() {
      Id = 0;
      Description = null;
    }
  }
};