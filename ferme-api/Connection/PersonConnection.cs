using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;
using Models;
using System.Data;

namespace Connection
{
  public class PersonConnection
  {
    static String connectionString = "User Id=admin;Password=granvalor1A;" + "Data Source=ferme-db.caakqx4vsyaf.us-east-1.rds.amazonaws.com:1521/ORCL";

    public static Person GetEntity (int id) {
      List<Person> persons = new List<Person>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PERSON WHERE ID = {id}";
        oracleConnection.Open();
        OracleDataAdapter adapter = new OracleDataAdapter(
          query, 
          oracleConnection
        );
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
          Person person = new Person() {
            Id = int.Parse(dr["ID"].ToString()),
            FirstName = dr["FIRST_NAME"].ToString(),
            LastName = dr["LAST_NAME"].ToString()
          };
          persons.Add(person);
        }
        return persons[0];
      }
    }
  }
}
