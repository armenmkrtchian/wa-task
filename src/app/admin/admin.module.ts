import { OnlyOneErrorPipe } from './shared/pipes/only-one-error.pipe';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { CategoriesManagerComponent } from './categories/categories-manager/categories-manager.component';
import { AddEditCategoryDialogComponent } from './categories/add-edit-category-dialog/add-edit-category-dialog.component';
import { DeleteNodeComponent } from './categories/delete-node/delete-node.component';
import { AddEditPostsComponent } from './posts/add-edit-posts/add-edit-posts.component';
import { ViewModeEnum } from '../shared/enums/enums';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    OnlyOneErrorPipe,
    CategoriesManagerComponent,
    AddEditCategoryDialogComponent,
    DeleteNodeComponent,
    AddEditPostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'create', component: AddEditPostsComponent, canActivate: [AuthGuard], data: { viewMode: ViewModeEnum.CreateMode } },
          { path: 'post/:id/edit', component: AddEditPostsComponent, canActivate: [AuthGuard], data: { viewMode: ViewModeEnum.EditMode } }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AdminModule {
}
