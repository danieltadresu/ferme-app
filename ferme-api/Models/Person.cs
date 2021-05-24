using System;

namespace Models
{
  public class Person
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private String firstName;
    public String FirstName
    {
      get { return firstName; }
      set { firstName = value; }
    }

    private String lastName;
    public String LastName
    {
      get { return lastName; }
      set { lastName = value; }
    }

    public Person () {
      Init();
    }

    private void Init() {
      Id = 0;
      LastName = null;
      FirstName = null;
    }
  };
};
