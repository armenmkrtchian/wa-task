import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PostsService } from "../../posts.service";
import { Post } from "../../interfaces";
import { RoleEnum } from '../../enums/enums';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;

  private _role: RoleEnum
  @Input() public get role(): RoleEnum {
    return this._role;
  }
  public set role(value: RoleEnum) {
    this._role = value;
    if (value) {
      this.displayedColumns = (value === RoleEnum.ADMIN) ? ['author', 'title', 'text', 'date', 'categoryType', 'actions'] : ['author', 'title', 'text', 'date', 'categoryType'];
    }
  }
  @Output() postActionEmitter: EventEmitter<string> = new EventEmitter<string>();
  RoleEnum = RoleEnum;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(this.posts);

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  private refreshTable(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
      this.dataSource = new MatTableDataSource(this.posts);
    })
  }

  remove(id: string) {
    this.postsService.remove(id).subscribe((data) => {
      this.refreshTable();
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  emitPostId(postId?: string): void {
    this.postActionEmitter.emit(postId);
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
