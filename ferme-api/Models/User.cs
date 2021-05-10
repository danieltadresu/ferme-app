using System;

namespace Models
{
  public class User
  {
    private Double id;
    public Double Id
    {
      get { return id; }
      set { id = value; }
    }
    private Double personId;
    public Double PersonId
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
    public User () {
      Init();
    }

    private void Init() {
      Id = 0;
      PersonId = 0;
      Email = "example@example.com";
      Password = "randompassword";
    }
  };
};
