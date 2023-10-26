import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentGroupService {
  isCommentGroupVisible: boolean = true; // Domyślnie widoczne - komentarz 1
  isCommentTwoGroupVisible: boolean = true; // Domyślnie widoczne - komentarz 2
}
