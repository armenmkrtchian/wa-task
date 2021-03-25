import { RoleEnum } from '../../shared/enums/enums';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  RoleEnum = RoleEnum;
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,

    private router: Router
  ) { }

  ngOnInit() {


    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })

  }

  remove(id: string) {
    this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)

    })
  }

  navigateToTheAddEditPageById(postId?: string) {
    if(postId){
      this.router.navigate([`/admin/post/${postId}/edit`]);
    } else {
      this.router.navigate([`/admin/create`]);
    }
  }
  

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
