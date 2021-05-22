using System;
namespace Models
{
  public class UserRole
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private int userId;
    public int UserId
    {
      get { return userId; }
      set { userId = value; }
    }

    private int roleId;
    public int RoleId
    {
      get { return roleId; }
      set { roleId = value; }
    }

    public UserRole () {
      Init();
    }

    public void Init() {
      Id = 0;
      UserId = 0;
      RoleId = 0;
    }
  }
};