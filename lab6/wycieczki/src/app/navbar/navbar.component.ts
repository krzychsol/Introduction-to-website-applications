import { Component, ElementRef, OnInit, HostListener, ViewChild } from '@angular/core';
import { fromEvent, Subscription, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  constructor(public auth: AuthService){}

  ngOnInit(): void {
    
  }

}
