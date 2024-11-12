import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

// product-comment.component.ts
import { Component, inject, Input } from '@angular/core';
import { CommentService } from '@core/services/comment.service';

export interface Comment {
  id: number;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss'],
  standalone: true, // Đánh dấu là standalone component
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIcon
  ]
})
export class ProductCommentComponent {
  @Input() comments: any = {};
  @Input() refreshData!: () => void;

  commentCtrl = new FormControl('', [Validators.required]);
  private commentService = inject(CommentService);
  onSubmitComment() {
    if (this.commentCtrl.valid) {
      // Add logic to submit comment
      this.commentService.create(this.commentCtrl.value).subscribe((data)=>{
        console.log(data);
        this.refreshData();
      });
      this.commentCtrl.reset();
    }
  }


  handlePageEvent(event: PageEvent) {
    // Handle page change
    console.log(event);
    // Emit event or call service to load new page
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getTimeAgo(date: Date): string {
    // Add logic to calculate time ago
    return '2 hours ago'; // Placeholder
  }
}


