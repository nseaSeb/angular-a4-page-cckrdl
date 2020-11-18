import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  elements = ['objet', 'block', 'text', 'form', 'table'];

  onBtnAddElement(el: string): void {
    this.elements = [...this.elements, el];
  }
  onBtPrint(){
    window.print();
  }
}
