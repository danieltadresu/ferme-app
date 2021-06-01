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
        List<int> allUsers = new List<int>();
        foreach (var item in Connection.UserConnection.GetEntities()) {
          allUsers.Add(item.Id);
        }
        int lastUserId = 0;
        if (allUsers.Count > 0)
        {
          lastUserId = allUsers.Max();
        }
        Models.User newUser = new Models.User() {
          Id = lastUserId + 1,
          Email = newPerson.Email,
          Password = newPerson.Password,
          PersonId = newPerson.Id
        };
        if (Connection.UserConnection.AddEntity(newUser)) {
          List<int> allUserRoles = new List<int>();
          foreach (var item in Connection.UserRoleConnection.GetEntities()) {
            allUserRoles.Add(item.Id);
          }
          int lastUserRoleId = 0;
          if (allUserRoles.Count > 0) {
            lastUserRoleId = allUserRoles.Max();
          }
          Console.WriteLine(lastUserRoleId);
          Models.UserRole newUserRole = new Models.UserRole() {
            Id = lastUserRoleId + 1,
            UserId = newUser.Id,
            RoleId = newPerson.PersonRoleId
          };
          Console.WriteLine(newUserRole.Id);
          Console.WriteLine(newUserRole.UserId);
          Console.WriteLine(newUserRole.RoleId);
          Connection.UserRoleConnection.AddEntity(newUserRole);
        }
      };
      return new JsonResult(newPerson);
    }
  }
}

