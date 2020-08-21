import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import EntitiesDetails from '../components/class-and-types/entities-details';

@Injectable({providedIn: 'root'})
export class AppAssistedStepsService {

  public arrEntityDetailsSubject: BehaviorSubject<Array<EntitiesDetails>> =
    new BehaviorSubject<Array<EntitiesDetails>>(null);
  public arrEntitiesDetails: Observable<Array<EntitiesDetails>>;

  constructor() {
    this.arrEntityDetailsSubject = new BehaviorSubject<Array<EntitiesDetails>>(null);
    this.arrEntitiesDetails = this.arrEntityDetailsSubject.asObservable();
  }
}
