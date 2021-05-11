using System;

namespace Models
{
  public class Authenticate
  {

    // CODE HTTP STATUS
    private int status;
    public int Status
    {
      get { return status; }
      set { status = value; }
    }

    // CODE HTTP MESSAGE

    private String message;
    public String Message
    {
      get { return message; }
      set { message = value; }
    }

    // FAKE TOKEN

    private String token;
    public String Token
    {
      get { return token; }
      set { token = value; }
    }

    // USER ROLE NAME

    private String roleName;
    public String RoleName
    {
      get { return roleName; }
      set { roleName = value; }
    }

    // USER ROLE ID

    private int roleId;
    public int RoleId
    {
      get { return roleId; }
      set { roleId = value; }
    }

    // PERSON NAME

    private String personName;
    public String PersonName
    {
      get { return personName; }
      set { personName = value; }
    }
    public Authenticate () {
      Init();
    }

    private void Init() {
      Status = 0;
      Message = null;
      Token = null;
      RoleName = null;
      RoleId = 0;
      PersonName = null;
    }
  };
};