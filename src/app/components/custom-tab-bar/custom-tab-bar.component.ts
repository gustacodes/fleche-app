import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-custom-tab-bar',
  templateUrl: './custom-tab-bar.component.html',
  styleUrls: ['./custom-tab-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class CustomTabBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
