import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '../../../models';

@Component({ selector: 'app-admin-feedbacks', templateUrl: './admin-feedbacks.page.html', styleUrls: ['./admin-feedbacks.page.scss'] })
export class AdminFeedbacksPage implements OnInit {
  feedbacks: Feedback[] = [];
  loading = true;
  mediaGeral = 0;

  constructor(private svc: FeedbackService) {}

  ngOnInit() {
    this.svc.listar().subscribe({
      next: f => {
        this.feedbacks = f;
        this.loading = false;
        if (f.length) this.mediaGeral = f.reduce((a, b) => a + b.nota, 0) / f.length;
      },
      error: () => this.loading = false
    });
  }

  estrelas(n: number) { return Array(5).fill(0).map((_, i) => i < n); }
  doRefresh(e: any) { this.ngOnInit(); setTimeout(() => e.target.complete(), 800); }
}
