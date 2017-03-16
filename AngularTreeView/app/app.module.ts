import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app";
import { TreeNodeComponent } from "./treenode.component";
 
@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
  TreeNodeComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule{};