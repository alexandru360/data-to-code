import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import EntitiesDetails from '../components/class-and-types-and-tools/entities-details';
import {PayloadConn} from '../../z-main/services/configuration';

@Injectable({providedIn: 'root'})
export class AppAssistedStepsService {

  public connPayloadSubject: BehaviorSubject<PayloadConn> = new BehaviorSubject<PayloadConn>(null);
  public connPayloadDetails: Observable<PayloadConn>;

  public arrEntityDetailsSubject: BehaviorSubject<Array<EntitiesDetails>> =
    new BehaviorSubject<Array<EntitiesDetails>>(null);
  public arrEntitiesDetails: Observable<Array<EntitiesDetails>>;

  constructor() {
    this.arrEntityDetailsSubject = new BehaviorSubject<Array<EntitiesDetails>>(null);
    this.arrEntitiesDetails = this.arrEntityDetailsSubject.asObservable();

    this.connPayloadSubject = new BehaviorSubject<PayloadConn>(null);
    this.connPayloadDetails = this.connPayloadSubject.asObservable();
  }
}
