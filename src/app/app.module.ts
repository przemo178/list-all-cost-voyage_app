import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentGroupComponent } from './components/comment-group/comment-group.component';
import { CostGroupComponent } from './components/cost-group/cost-group.component';
import { CostsContainerComponent } from './components/costs-container/costs-container.component';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import { SingleCostComponent } from './components/single-cost/single-cost.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentFormComponent,
    CommentGroupComponent,
    CostGroupComponent,
    CostsContainerComponent,
    SingleCommentComponent,
    SingleCostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
