import { Component, OnInit } from '@angular/core';
import { ElectronCommunicatorService } from './electron-communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private communicator: ElectronCommunicatorService) {}
  title = 'app-name';

  ngOnInit(): void {}
}
