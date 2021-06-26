using System;

namespace Models
{
  public class Provider
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
    public Provider () {
      Init();
    }

    private void Init() {
      Id = 0;
      Name = null;
    }
  };
};
