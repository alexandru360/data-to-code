export class UserTrip {
  UserTripID: number;
  UserId: number;
  TripName: string;
  TripDescription: string;
  TripTypeId: number;
  TripCreated: string;
  TripCreatedServer: string;

  clone(par: any) {
    this.UserTripID = par.userTripID;
    this.UserId = par.userId;
    this.TripName = par.tripName;
    this.TripDescription = par.tripDescription;
    this.TripTypeId = par.tripTypeId;
    this.TripCreated = par.tripCreated;
    this.TripCreatedServer = par.tripCreatedServer;
  }
}
