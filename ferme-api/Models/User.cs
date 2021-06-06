using System;

namespace Models
{
  public class User
  {
    #region Database Properties
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }
    private int personId;
    public int PersonId
    {
      get { return personId; }
      set { personId = value; }
    }

    private String email;
    public String Email
    {
      get { return email; }
      set { email = value; }
    }

    private String password;
    public String Password
    {
      get { return password; }
      set { password = value; }
    }
    #endregion

    #region Properties to use in api/user/roles/all response


    private String userRole;
    public String UserRole
    {
      get { return userRole; }
      set { userRole = value; }
    }

    private String userFullName;
    public String UserFullName
    {
      get { return userFullName; }
      set { userFullName = value; }
    }
    #endregion
    public User () {
      Init();
    }

    private void Init() {
      Id = 0;
      PersonId = 0;
      Email = "example@example.com";
      Password = "randompassword";

      UserRole = null;
      UserFullName = null;
    }
  };
};
