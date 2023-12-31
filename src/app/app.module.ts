import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentGroupComponent } from './components/comment-group/comment-group.component';
import { CostGroupComponent } from './components/cost-group/cost-group.component';
import { CostsContainerComponent } from './components/costs-container/costs-container.component';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import { SingleCostComponent } from './components/single-cost/single-cost.component';
import { SecondCommentGroupComponent } from './components/second-comment-group/second-comment-group.component';
import { SecondSingleCommentComponent } from './components/second-single-comment/second-single-comment.component';
import { SecondSingleCostComponent } from './components/second-single-cost/second-single-cost.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentFormComponent,
    CommentGroupComponent,
    CostGroupComponent,
    CostsContainerComponent,
    SingleCommentComponent,
    SingleCostComponent,
    SecondCommentGroupComponent,
    SecondSingleCommentComponent,
    SecondSingleCostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
