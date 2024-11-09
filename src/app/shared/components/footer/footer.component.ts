import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styles: `
    .footer {
      background-color: #f8f9fa;
      padding: 1rem 0;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    .footer .content {
      text-align: center;
      color: #6c757d;
    }
  `
})
export class FooterComponent {

}
