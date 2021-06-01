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

    public static List<Person> GetEntities () {
      List<Person> persons = new List<Person>();
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        String query = $"SELECT * FROM PERSON WHERE";
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
          };
          persons.Add(person);
        }
        return persons;
      }
    }

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

    public static Boolean AddEntity (Person person) {
      using (OracleConnection oracleConnection = new OracleConnection(connectionString))
      {
        //String query = $"INSERT INTO USERS (NAME) VALUES ('{user.Name}')";
        String query = $"INSERT INTO PERSON (ID, LAST_NAME, FIRST_NAME, COMMUNE_ID, RUT, ADDRESS, PHONE) VALUES (:pId, :pLastName, :pFirstName, :pCommuneId, :pRut, :pAddress, :pPhone)";
        oracleConnection.Open();
        OracleCommand command = oracleConnection.CreateCommand();
        command.Parameters.Add("pId", person.Id);
        command.Parameters.Add("pLastName", person.LastName);
        command.Parameters.Add("pFirstName", person.LastName);
        command.Parameters.Add("pCommuneId", person.CommuneId);
        command.Parameters.Add("pRut", person.Rut);
        command.Parameters.Add("pAddress", person.Address);
        command.Parameters.Add("pPhone", person.Phone);
        command.CommandText = query;
        int data = command.ExecuteNonQuery();
        return data is 1 ? true : false;
      }
    }
  }
}
