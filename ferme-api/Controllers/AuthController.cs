using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Connection;
using Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;


using System.Text.Json;
using System.Text.Json.Serialization;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/auth
  [Route("api/[controller]")]
  [ApiController]
  public class Auth : ControllerBase
  {
    //POST: api/auth/login
    [EnableCors("Policy")]
    [HttpPost("login")]
    public JsonResult Login([FromBody]Object user)
    {
      String email = JsonConvert.DeserializeObject<User>(user.ToString()).Email;
      String password = JsonConvert.DeserializeObject<User>(user.ToString()).Password;
      Boolean foundUser = false;
      User selectedUser = new User();
      foreach (var item in Connection.UserConnection.GetEntities())
      {
        if (item.Email == email)
        {
          if (item.Password == password)
          {
            selectedUser.Id = item.Id;
            selectedUser.PersonId = item.PersonId;
            selectedUser.Email = item.Email;
            selectedUser.Password = item.Password;
            foundUser = true;
            break;
          }
        }
      }
      if (foundUser)
      {
        UserRole userRole = Connection.UserRoleConnection.GetEntityByUserId(selectedUser.Id);
        Role role = Connection.RoleConnection.GetEntity(userRole.RoleId);
        Console.WriteLine(role.Id);
        Person person = Connection.PersonConnection.GetEntity(selectedUser.PersonId);
        Authenticate authenticate = new Authenticate() {
          Status = 202,
          Message = "Found",
          Token = "DummyToken",
          RoleName = role.Name,
          RoleId = role.Id,
          PersonId = person.Id,
          PersonName = $"{person.FirstName} {person.LastName}"
        };
        return new JsonResult(authenticate);
      } else {
        Error404 error = new Error404();
        error.Status = 404;
        error.Message = "Not Found";
        return new JsonResult(error);
      }
    }

    //POST: localhost:5001/api/auth/signin
    [EnableCors("Policy")]
    [HttpPost("signin")]
    public JsonResult Signin([FromBody]Object user)
    {
      // Obtener el ultimo ID de persona
      List<int> allPersons = new List<int>();
      foreach (var item in Connection.PersonConnection.GetEntities())
      {
        allPersons.Add(item.Id);
      }
      int lastPersonId = 0;
      if (allPersons.Count > 0)
      {
        lastPersonId = allPersons.Max();
      }

      Models.Person newPerson = new Models.Person() {
        Id = lastPersonId + new System.Random().Next(10,50),
        FirstName = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).FirstName,
        LastName = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).LastName,
        Rut = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).Rut,
        CommuneId = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).CommuneId,
        Address = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).Address,
        Phone = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).Phone,
        PersonRoleId = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).PersonRoleId,
        Email = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).Email,
        Password = JsonConvert.DeserializeObject<Models.Person>(user.ToString()).Password,
      };
      if (Connection.PersonConnection.AddEntity(newPerson))
      {
      String email = JsonConvert.DeserializeObject<User>(user.ToString()).Email;
      String password = JsonConvert.DeserializeObject<User>(user.ToString()).Password;
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
          Email = email,
          Password = password,
          PersonId = newPerson.Id
        };
        if(Connection.UserConnection.AddEntity(newUser)) {
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

          Connection.UserRoleConnection.AddEntity(newUserRole);
        };
      }
      return new JsonResult(newPerson);
    }
  }
}

