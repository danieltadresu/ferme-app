using System;

namespace Models
{
  public class User
  {
    private Double userId;
    public Double UserId
    {
      get
      {
        return userId;
      }
      set
      {
        userId = value;
      }
    }
    private String name;
    public String Name
    {
      get
      {
        return name;
      }
      set
      {
        if (!string.IsNullOrEmpty(value))
        {
          name = value;
        }
        else
        {
          throw new Exception("");
        }
      }
    }

    public User () {
      Init();
    }

    private void Init() {
      UserId = 0;
      Name = "John Doe";
    }

    public String GetData() {
      return $"Hello, I'm {Name} and my ID is {UserId}";
    }
  };
};
