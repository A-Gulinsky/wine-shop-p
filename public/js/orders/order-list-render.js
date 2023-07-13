import { ordersData } from "./check-moderator-online.js";
import { orderPanel } from "./check-moderator-online.js";

// render items
export default async function renderOrderCard(data) {
  try {
    
    // if orders list is empty
    if (ordersData.length === 0) {
      const source = await fetch("/templates/empty-orders.hbs").then((response) =>
      response.text());
      
      const template = Handlebars.compile(source);
      const renderedHtml = template()
      orderPanel.innerHTML = renderedHtml
      return
    } 

    // fetch orders list
      const source = await fetch("/templates/orders-panel.hbs").then((response) =>
        response.text()
      );  

      const template = Handlebars.compile(source);
      const renderedHtml = template(data)
      orderPanel.innerHTML = renderedHtml    
  }
  catch (error) {
    console.error(error)
  }
} 