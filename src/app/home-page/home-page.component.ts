import { Component, OnInit } from '@angular/core';
import { PostsService } from "../shared/posts.service";
import { Post } from "../shared/interfaces";
import { RoleEnum } from "../shared/enums/enums";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  RoleEnum = RoleEnum;
  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(result => {
      this.posts = result;
    })
  }
}
