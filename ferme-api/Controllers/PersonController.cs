using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Connection;
using Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/person
  [Route("api/[controller]")]
  [ApiController]
  public class PersonController : ControllerBase
  {
    //POST: api/person
    [EnableCors("Policy")]
    [HttpPost]
    public JsonResult AddPerson([FromBody]Object person)
    {
      // SELECT * FROM PERSON p ;
      // SELECT * FROM USERS u ;
      // SELECT * FROM USERS_ROLES ur ;
      Models.Person newPerson = new Models.Person() {
        Id = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).Id,
        FirstName = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).FirstName,
        LastName = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).LastName,
        Rut = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).Rut,
        CommuneId = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).CommuneId,
        Address = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).Address,
        Phone = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).Phone,
        PersonRoleId = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).PersonRoleId,
        Email = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).Email,
        Password = JsonConvert.DeserializeObject<Models.Person>(person.ToString()).Password,
      };
      if(Connection.PersonConnection.AddEntity(newPerson)) {
        List<int> allPersons = new List<int>();
        foreach (var item in Connection.PersonConnection.GetEntities())
        {
          allPersons.Add(item.Id);
        }
        int lastId = 0;
        if (allPersons.Count > 0)
        {
          lastId = allPersons.Max();
        }
        Console.WriteLine(lastId);

        Models.User newUser = new Models.User() {
          Id = lastId + 1,
          Email = newPerson.Email,
          Password = newPerson.Password,
          PersonId = newPerson.Id
        };
      };
      // Models.Person personFetch = Connection.PersonConnection.GetEntity(newPerson.Id);

    


      // Connection.UserConnection.AddEntity(user);
      // return new JsonResult(user);
      // Connection.PersonConnection.AddEntity(person);
      return new JsonResult(newPerson);
    }
  }
}

