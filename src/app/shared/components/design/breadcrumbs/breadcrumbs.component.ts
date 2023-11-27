import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo?: string;
  tituloSub$?: Subscription;

  constructor(private router: Router) { 
    this.tituloSub$ = this.getArgument().subscribe(({titulo})=> {
      this.titulo=titulo;
      document.title=`Chronos - ${titulo}`
    });
    
  }

  ngOnDestroy(): void {
    this.tituloSub$?.unsubscribe();
  }

  getArgument() {

    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }


}
