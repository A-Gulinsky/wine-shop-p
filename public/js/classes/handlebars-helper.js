// handlebars Template Helpers
export default class HbsHelper {
  constructor() { }
  
  // file render-temp.js
  HBSrenderTemp() {
    Handlebars.registerHelper('countryEquals', function (a, b) {
      return a === b;
    });
  }

  // file render-current-temp.js
  HBScurrentRenderTemp() {
    Handlebars.registerHelper('eq', function (a, b) {
      return a === b;
    });
  }

  // order history check reservatiob or delivery
  HBSorderListReservationOrDelivery() {

    Handlebars.registerHelper('el', function () {
      
      if (this.el.orderStatus.reservation) {
          return `reservation`
      } else if (this.el.orderStatus.delivery) {
          return `delivery`
      }
    });

  }

  HBSifDelivery() {

    Handlebars.registerHelper('delivery', function() {
      
      return this.el.orderStatus.delivery
    });

  }

  // check history list if item delivery or reservation
  HBSifHistoryCartIsDelivery() {

    Handlebars.registerHelper('historydelivery', function() {
      
      return this.orderStatus.delivery
    });

  }

  // historyTotalPrice
  HBShistoryTotalPrice() {

    Handlebars.registerHelper(`historyTotalPrice`, function () {
      

      return this.data.price * this.value
    })

  }

  
  
  // order history total price
  HBSorderHistoryTotalPrice() {

    Handlebars.registerHelper('total', function() {
      return this.el.value * this.el.data.price
    });

  }

}