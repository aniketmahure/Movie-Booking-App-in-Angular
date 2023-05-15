import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  constructor(private userService:UserService,private router:Router,public loginService:LoginService){}
  movies : {
    position: number,
    movieName: string,
    theaterName: string,
    ticketStatus: string,
    }[] = [];
  ngOnInit() : void {
    this.userService.allMovies().subscribe(
      (data:any) =>{
        let count = data.length;
        console.log(data.length);
        let i=1
        while(i <= count){
          this.movies.push({
            position: i, movieName: data[i-1].movieName, theaterName: data[i-1].theatreName, ticketStatus: data[i-1].ticketsStatus
          });
          i++;
        }
        console.log("from movies Componenet :"+this.movies);
      },
      (error)=>{
        let a: any=[];
        console.log("from movies Componenet :"+error);
      }
    );
      
  }
  onClickBuyTicket(value:any){
    console.log("Buying Ticket "+value);
    localStorage.setItem('movieToBook',value);
    this.router.navigate(['/api/v1.0/moviebooking/add'])
  }

}
