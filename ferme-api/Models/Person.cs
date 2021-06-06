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

    private String rut;
    public String Rut
    {
      get { return rut; }
      set { rut = value; }
    }

    private int communeId;
    public int CommuneId
    {
      get { return communeId; }
      set { communeId = value; }
    }

    private String address;
    public String Address
    {
      get { return address; }
      set { address = value; }
    }

    private int phone;
    public int Phone
    {
      get { return phone; }
      set { phone = value; }
    }

    private int personRoleId;
    public int PersonRoleId
    {
      get { return personRoleId; }
      set { personRoleId = value; }
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

    public Person () {
      Init();
    }
    private void Init() {
      Id = 0;
      LastName = null;
      FirstName = null;
      Rut = null;
      CommuneId = 0;
      Address = null;
      Phone = 0;
      PersonRoleId = 0;
      Email = null;
      Password = null;
    }
  };
};
