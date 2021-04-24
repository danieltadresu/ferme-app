using System;

namespace Models
{
  public class User
  {
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
      Name = "John Doe";
    }

    public String GetData() {
      return $"Hello, I'm {Name}";
    }
  };
};
