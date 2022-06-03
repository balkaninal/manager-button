import { Component, HostListener, OnInit } from '@angular/core';
import{FetchMailsService } from 'app/fetch-mails.service'
@Component({
  selector: 'app-email-manager',
  templateUrl: './email-manager.component.html',
  styleUrls: ['./email-manager.component.css']
})
export class EmailManagerComponent implements OnInit {
  

  isVisible:boolean=true;
  emails:string[];


  constructor(
    private _fetchMailsService : FetchMailsService
  ) { }

  removeMail(adress){
    this._fetchMailsService.removeEmail(adress);
  }
  removeList():void{
    this._fetchMailsService.clearStorage();
  }

  copyMessage(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.emails.join(',');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnInit(): void {
    if("mails" in localStorage){
      this.emails=this._fetchMailsService.getMails();
    }else{
      localStorage.setItem("mails",JSON.stringify([]));
    }
    
    this._fetchMailsService.watchStorage().subscribe((data:string) => {
      // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
      this.emails=JSON.parse(localStorage.getItem("mails"));
      
      })
  }

  
  

}
