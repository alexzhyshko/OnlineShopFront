import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../service/search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/'])
    }

    this.searchForm = new FormGroup({
      term: new FormControl('', [Validators.required]),
    })
  }

  isUserLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }

  search() {
    const term = this.searchForm.get('term')?.value
    if(term) {
      this.router.navigate(['/search'], { queryParams: { term:  this.searchForm.get('term')?.value} })
    }
  }

}
