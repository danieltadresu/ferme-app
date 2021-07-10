using System;
using System.Text;
using Models;
using System.Collections.Generic;

namespace utils.templates
{
  public static class Bill
  {
    public static string GetHTMLString(
      Order order
    ) {
      List<Models.CartItem> cartItems = Connection.CartItemConnection.GetEntitiesByOrderId(order.Id);
      foreach(var item in cartItems) {
        Models.Product product = Connection.ProductConnection.GetEntity(item.ProductId);
        item.ProductName = product.Name.ToUpper();
        item.ProductUnitPrice = product.Price;
      };

      Models.Person customerPurchasePerson = Connection.PersonConnection
        .GetEntity(order.CustomerId);

      Models.User customerPurchaseUser = Connection.UserConnection
        .GetEntityByPersonId(customerPurchasePerson.Id);

      Models.UserRole customerPurchaseUserRole = Connection.UserRoleConnection
        .GetEntityByUserId(customerPurchaseUser.Id);

      String documentType = null;
      if (order.PaymentMethodId == 1)
      {
        documentType = "TARJETA DE CRÉDITO";
      } else {
        documentType = "EN EFECTIVO";
      };

      var sb = new StringBuilder();

      #region HEADER SECTION
      sb.Append(@"
        <html>
          <head>
          </head>
          <body>
            <div class='header'>
              <p class='header-title'>
                Ferme Store
              </p>
              <p class='header-date'>
                29 de junio de 2021
              </p>
              <hr />
            </div> ");
      #endregion

      #region SUB HEADER SECTION
      sb.Append(@"
        <div class='sub-header'>
          <p class='sub-header-title'> Gracias por tu compra, ");
      sb.Append($"{customerPurchasePerson.FirstName} {customerPurchasePerson.LastName}");
      sb.Append(@"
          </p> 
          <p class='sub-header-message'>
            Este es el recibo de tu compra
          </p>
        </div>"
      );
      #endregion

      #region PAYMENT DETAILS SECTION
      sb.Append($@"
        <div class='payment-detail-section'>
          <p class='payment-detail-title'>Total</p>
          <p class='payment-detail-total-price'>{order.TotalPurchase} CLP</p>
          <hr />
        </div>
      ");

      sb.Append(@"<div class='payment-detail-section'>");
      foreach(var item in cartItems) {
        sb.Append($@"
          <div>
            <a class='paymental-detail-name'>
              {item.ProductName}
            </a>
            <a class='paymental-detail-name'>
              {item.ProductUnitPrice} CLP. Precio Unitario
            </a>
            <a class='paymental-detail-price'>
              {item.ProductQuantity} UDS. Cantidad
            </a>
            <a class='payment-detail-item'>
              {item.ProductUnitPrice * item.ProductQuantity}
            </a>
            <hr />
          </div>"
        );
      }
      sb.Append(@"</div>");
      #endregion

      #region PAYMENT METHOD TYPE SECTION
      #endregion
      sb.Append(@"
          </body>
        </html>");

      return sb.ToString();
    }
  }
}