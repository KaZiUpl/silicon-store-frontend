import { Component, OnInit, Input } from '@angular/core';
import { CommentOutput } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() comments: CommentOutput[];

  constructor() {}

  ngOnInit(): void {}
}
