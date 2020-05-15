import ejs from 'ejs';
import { ElementConfig } from './types';

const overlayTemplate = `
<div class"buff_overlay">

<div class="buff_overlay_user">
<img src="<%= author.image %>"  class="buff_overlay_user_img" >
<span class="buff_overlay_user_name">
<%= author.first_name %>
<%= author.last_name %>
</span>

</div>

</div>
`;

/*

<table>
<% for(var i=0; i < data.length; i++) { %>
   <tr>
     <td><%= data[i].id %></td>
     <td><%= data[i].name %></td>
   </tr>
<% } %>
</table>

*/

export class BuffOverlay {
  question: any;
  overlayElement: ElementConfig;
  constructor(overlayElement: ElementConfig, question: any) {
    this.overlayElement = overlayElement;
    this.question = question;

    this.init();
  }

  init() {
    this.loadOverlay();
  }

  async loadOverlay(): Promise<void> {
    console.log(ejs.render(overlayTemplate, this.question));

    const element = document.querySelector(`${this.overlayElement.type}.${this.overlayElement.class}`);

    if (element) {
      element.innerHTML = ejs.render(overlayTemplate, this.question);
    }
  }
}
