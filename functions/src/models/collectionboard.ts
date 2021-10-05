export default class CollectionBoard {
  id: string;
  carrierId: string;
  carrierBalance: number;
  date: Date;
  displayId: string;

  constructor(
    id: string,
    carrierId: string,
    carrierBalance: number,
    date: Date,
    displayId: string
  ) {
    this.id = id;
    this.carrierId = carrierId;
    this.carrierBalance = carrierBalance;
    this.date = date;
    this.displayId = displayId;
  }
}

export const collectionBoardConvert = () => ({
  toFirestore: (data: CollectionBoard) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = snap.data();
    const cb = new CollectionBoard(
      snap.id,
      data.carrierId,
      data.carrierBalance,
      data.date,
      data.displayId
    );
    return cb;
  }
});


export const collectionBoardCollection = "collectionBoard";
