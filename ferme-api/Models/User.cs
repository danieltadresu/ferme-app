using System;

namespace Models
{
  public class User
  {
    private Double userId;
    public Double UserId
    {
      get { return userId; }
      set { userId = value; }
    }
    private String name;
    public String Name
    {
      get { return name; }
      set { name = value; }
    }

    public User () {
      Init();
    }

    private void Init() {
      UserId = 0;
      Name = "John Doe";
    }
  };
};
