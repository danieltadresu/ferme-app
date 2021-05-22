using System;

namespace Models
{
  public class Role
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private String name;
    public String Name
    {
      get { return name; }
      set { name = value; }
    }

    private String description;
    
    public String Description
    {
      get { return description; }
      set { description = value; }
    }

    public Role () {
      Init();
    }

    public void Init() {
      Id = 0;
      Name = null;
      Description = null;
    }
  }
};