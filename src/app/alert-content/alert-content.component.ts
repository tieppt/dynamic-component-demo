import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert-content',
  templateUrl: './alert-content.component.html',
  styleUrls: ['./alert-content.component.scss']
})
export class AlertContentComponent implements OnInit {
  @Input()
  data: string;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  close() {
    this.alertService.close();
  }

}
