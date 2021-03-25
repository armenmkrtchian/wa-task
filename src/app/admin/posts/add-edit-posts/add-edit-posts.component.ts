import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces';
import { PostsService } from "../../../shared/posts.service";
import { ViewModeEnum } from '../../../shared/enums/enums';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-add-edit-posts',
  templateUrl: './add-edit-posts.component.html',
  styleUrls: ['./add-edit-posts.component.scss']
})
export class AddEditPostsComponent implements OnInit {


  form: FormGroup;
  viewMode: ViewModeEnum;
  ViewModeEnum = ViewModeEnum;
  currentPost: Post;
  submitted = false;
  categoryTypeDropdownData: string[];
  uSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private postsService: PostsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.viewMode = this.activatedRoute.snapshot.data['viewMode'];

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryTypeDropdownData = categories.map((category) => category.categoryName);
    })

    this.form = this.fb.group({
      author: ['', Validators.required],
      title: ['', [Validators.required]],
      date: [new Date()],
      text: ['', [Validators.minLength(6), Validators.maxLength(200)]],
      categoryType: [''],
    })

    if (this.viewMode === ViewModeEnum.EditMode) {
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => this.postsService.getById(params['id']))
      ).subscribe((postById: Post) => {
        this.currentPost = postById;
        const post = {
          title: postById.title,
          text: postById.text,
          author: postById.author,
          date: postById.date,
          categoryType: postById.categoryType
        }
        this.form.patchValue(post);
      })
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: this.form.value.date,
      categoryType: this.form.value.categoryType
    }

    if (this.viewMode === ViewModeEnum.EditMode) {
      this.submitted = true

      this.uSub = this.postsService.update({
        ...this.currentPost,
        ...post
      }).subscribe(() => {
        this.submitted = false;
        this.navigateToTheMainPage();
      })
    } else {
      this.postsService.create(post).subscribe(() => {
        this.form.reset();
        this.navigateToTheMainPage();
      })
    }
  }

  private navigateToTheMainPage(): void {
    this.router.navigate(['/admin', 'dashboard']);
  }
}
