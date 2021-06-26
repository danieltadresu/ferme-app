using System;
using System.Text;
using Models;
namespace utils.templates
{
  public static class Bill
  {
    public static string GetHTMLString(
      Order order
    ) {
      Console.WriteLine("Bill.cs BOLETA");
      int totalPurchase = 100;
      Console.WriteLine(order.TotalPurchase);
      Console.WriteLine(order.Id);
      // Models.Product customerPurchaseProduct = Connection.ProductConnection
      //   .GetEntity(order);

      Models.Person customerPurchasePerson = Connection.PersonConnection
        .GetEntity(order.CustomerId);

      Models.User customerPurchaseUser = Connection.UserConnection
        .GetEntityByPersonId(order.Id);

      Models.UserRole customerPurchaseUserRole = Connection.UserRoleConnection
        .GetEntityByUserId(order.Id);

      String documentType = null;
      // Console.WriteLine(customerPurchaseUserRole.RoleId);
      if (order.PaymentMethodId == 1)
      {
        documentType = "TARJETA DE CRÉDITO";
      } else {
        documentType = "EN EFECTIVO";
      };

      var sb = new StringBuilder();
      sb.Append(@"
        <html>
          <head>
          </head>
          <body>
            <div class='header'>
              <h1 class='header-title'>Ferme Store</h1>
              <h1>Hola Mundo</h1>
              <hr/>");
      sb.Append(@"
              <h5 class='header-bill-nro'>");
      sb.Append(totalPurchase);
      sb.Append(@"</h5> </div>");

            sb.Append(@"
              <h5 class='header-bill-nro'>");
      sb.Append(order.TotalPurchase);
      sb.Append(@"</h5> </div>");


                  sb.Append(@"
              <h5 class='header-bill-nro'>");
      sb.Append(order.PaymentMethodId);
      sb.Append(@"</h5> </div>");


                        sb.Append(@"
              <h5 class='header-bill-nro'>");
      sb.Append(documentType);
      sb.Append(@"</h5> </div>");


                              sb.Append(@"
              <h5 class='header-bill-nro'>");
      sb.Append(customerPurchasePerson.LastName);
      sb.Append(@"</h5> </div>");
      // sb.Append(@"<div class='total-purchase'>
      //   <h1 class='total-purchase-title'>Total Purchase:");
      // sb.Append(customerPurchase.TotalPurchase);
      // sb.Append(@"</h1> </div>");
      // sb.Append(@"<div class='total-purchase'>
      //   <h1 class='total-purchase-title'>Products:");
      // sb.Append(customerPurchaseProduct.Name);
      // sb.Append(@"</h1> </div>");

      // sb.Append(@"<div class='total-purchase'>
      //   <h1 class='total-purchase-title'>Image:");
      // sb.Append(@"</h1> </div>");
      // sb.Append(@"<img src=");
      // sb.Append(customerPurchaseProduct.ImageUrl);
      // sb.Append(@">");

      // sb.Append(@"<div class='total-purchase'>
      //   <h1 class='total-purchase-title'>Customer:");
      // sb.Append($"{customerPurchasePerson.FirstName} {customerPurchasePerson.LastName}");

      // sb.Append(@"<div class='total-purchase'>
      //   <h1 class='total-purchase-title'>User email:");
      // sb.Append($"{customerPurchaseUser.Email}");


      // sb.Append(@"<div class='total-purchase'>
      //   <h1 class='total-purchase-title'>DOCUMENTO:");
      // sb.Append($"{isInvoice}");
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