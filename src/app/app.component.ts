import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  sourcePath =
    "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf";
  fileName = "sample.pdf";
}
