using System;
using System.Text;
using Models;
namespace utils.templates
{
  public static class Bill
  {
    public static string GetHTMLString(
      CustomerPurchase customerPurchase
    ) {

      Models.Product customerPurchaseProduct = Connection.ProductConnection
        .GetEntity(customerPurchase.ProductId);

      Models.Person customerPurchasePerson = Connection.PersonConnection
        .GetEntity(customerPurchase.CustomerId);

      Models.User customerPurchaseUser = Connection.UserConnection
        .GetEntityByPersonId(customerPurchasePerson.Id);

      Models.UserRole customerPurchaseUserRole = Connection.UserRoleConnection
        .GetEntityByUserId(customerPurchaseUser.Id);

      String isInvoice = null;
      Console.WriteLine(customerPurchaseUserRole.RoleId);
      if (customerPurchaseUserRole.RoleId == 4)
      {
        isInvoice = "FACTURA";
      } else {
        isInvoice = "BOLETA";
      };

      var sb = new StringBuilder();
      sb.Append(@"
        <html>
          <head>
          </head>
          <body>
            <div class='header'>
              <h1 class='header-title'>Ferme Store</h1>
              <h5 class='header-subtitle'>RUT: 77.261.280-K</h5>
              <hr/>");
      sb.Append(@"
              <h5 class='header-bill-nro'>");
      sb.Append(isInvoice);
      sb.Append(@" Electrónica Nro ");
      sb.Append(customerPurchase.Id);
      sb.Append(@"</h5> </div>");
      sb.Append(@"<div class='total-purchase'>
        <h1 class='total-purchase-title'>Total Purchase:");
      sb.Append(customerPurchase.TotalPurchase);
      sb.Append(@"</h1> </div>");
      sb.Append(@"<div class='total-purchase'>
        <h1 class='total-purchase-title'>Products:");
      sb.Append(customerPurchaseProduct.Name);
      sb.Append(@"</h1> </div>");

      sb.Append(@"<div class='total-purchase'>
        <h1 class='total-purchase-title'>Image:");
      sb.Append(@"</h1> </div>");
      sb.Append(@"<img src=");
      sb.Append(customerPurchaseProduct.ImageUrl);
      sb.Append(@">");

      sb.Append(@"<div class='total-purchase'>
        <h1 class='total-purchase-title'>Customer:");
      sb.Append($"{customerPurchasePerson.FirstName} {customerPurchasePerson.LastName}");

      sb.Append(@"<div class='total-purchase'>
        <h1 class='total-purchase-title'>User email:");
      sb.Append($"{customerPurchaseUser.Email}");


      sb.Append(@"<div class='total-purchase'>
        <h1 class='total-purchase-title'>DOCUMENTO:");
      sb.Append($"{isInvoice}");
      // sb.Append(customerPurchase.CustomerId);
      // sb.Append(customerPurchase.ProductQuantity);
      // sb.Append(customerPurchase.ProductId);
      // sb.Append(customerPurchase.TotalPurchase);

      sb.Append(@"
          </body>
        </html>");

      return sb.ToString();
    }
  }
}