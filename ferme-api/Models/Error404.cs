using System;

namespace Models
{
  public class Error404
  {
    private Double status;
    public Double Status
    {
      get { return status; }
      set { status = value; }
    }

    private String message;
    public String Message
    {
      get { return message; }
      set { message = value; }
    }
    public Error404 () {
      Init();
    }

    private void Init() {
      Status = 0;
      Message = null;
    }
  };
};
