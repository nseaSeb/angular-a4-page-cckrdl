import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-paginated-view",
  templateUrl: "paginated-view.component.html",
  styleUrls: ["paginated-view.component.scss"]
})
export class PaginatedViewComponent implements AfterViewInit {
  @Input() pageSize: "A3" | "A4" = "A4";

  @ViewChild("paginatedView") paginatedView: ElementRef<HTMLDivElement>;

  @ViewChild("contentWrapper") contentWrapper: ElementRef<HTMLDivElement>;

  @ContentChildren("pageContent", { read: ElementRef }) elements: QueryList<
    ElementRef
  >;
  @ContentChildren("pageFooter", { read: ElementRef }) footer: QueryList<
    ElementRef
  >;
  @ContentChildren("pageHeader", { read: ElementRef }) header: QueryList<
    ElementRef
  >;
  nbreDePage = 0;
  constructor() {}

  ngAfterViewInit(): void {
    this.updatePages();

    // when ever childs updated call the updatePagesfunction
    this.elements.changes.subscribe(el => {
      this.updatePages();
    });
  }

  updatePages(): void {
    this.nbreDePage = 0;
    // clear paginated view
    this.paginatedView.nativeElement.innerHTML = "";

    // get a new page and add it to the paginated view
    let page = this.getNewPage();
    this.paginatedView.nativeElement.appendChild(page);

    let lastEl: HTMLElement;
    // add content childrens to the page one by one
    this.elements.forEach(elRef => {
      const el = elRef.nativeElement;

      // if the content child height is larger than the size of the page
      // then do not add it to the page
          console.log('pagined el height', el.clientHeight);
      console.log('pagined page height', page.clientHeight);
      if (el.clientHeight > page.clientHeight) {
        return;
      }
      // add the child to the page
      page.appendChild(el);

      // after adding the child if the page scroll hight becomes larger than the page height
      // then get a new page and append the child to the  new page
      if (page.scrollHeight > page.clientHeight) {
        page = this.getNewPage();
        this.paginatedView.nativeElement.appendChild(page);
        page.appendChild(el);
      }
      lastEl = el;
    });

    let p = document.getElementsByClassName("page");

    let foo: any;
    this.footer.forEach(elRef => {
      foo = elRef.nativeElement;
    });

    for (var i = 0; i < p.length; i++) {
      var e = document.createElement("div");
      let az = document.createElement("div");
      az.innerHTML = foo.innerHTML;

      // let attr = foo.
      az.style.cssText = document.defaultView.getComputedStyle(foo, "").cssText;
      console.log("az", az);
      console.log("foo", foo);
      const numero = i + 1;
      e.innerHTML = "Page n° " + numero + " / " + this.nbreDePage;
      az.appendChild(e);
      const aa = p.item(i).appendChild(az);

      // p.item(i).appendChild(e)
      console.log("document", aa);
    }

    console.log("page", p);

    //bring the element in to view port
    lastEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  getNewPage(): HTMLDivElement {
    this.nbreDePage += 1;
    console.log("head nbreDepage", this.nbreDePage);

    const page = document.createElement("div");
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.padding = "1cm";
    page.classList.add("page");

    page.classList.add(this.pageSize);
    let head: any;
    this.header.forEach(elRef => {
      head = elRef.nativeElement;
    });
    let elHead = document.createElement("div");
    elHead.innerHTML = head.innerHTML;
    elHead.style.cssText = document.defaultView.getComputedStyle(
      head,
      ""
    ).cssText;
    page.appendChild(elHead);
    return page;
  }
}
