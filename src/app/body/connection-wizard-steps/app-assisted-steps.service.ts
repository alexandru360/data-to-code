import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import EntitiesDetails from '../components/class-and-types/entities-details';

@Injectable({providedIn: 'root'})
export class AppAssistedStepsService {

  private arrEntityDetailsSubject: BehaviorSubject<Array<EntitiesDetails>> = new BehaviorSubject<Array<EntitiesDetails>>(null);
  public arrEntitiesDetails: Observable<Array<EntitiesDetails>>;

  public setEntitiesDetailsSubject(par: Array<EntitiesDetails>) {
    this.arrEntityDetailsSubject.next(par);
  }

  public get getEntitiesDetailsValue(): Array<EntitiesDetails> {
    return this.arrEntityDetailsSubject.value;
  }

  constructor() {
    this.arrEntityDetailsSubject = new BehaviorSubject<Array<EntitiesDetails>>(null);
    this.arrEntitiesDetails = this.arrEntityDetailsSubject.asObservable();
  }
}
