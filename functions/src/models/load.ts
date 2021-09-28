export default class Load {
  id: string;
  carrierFee: number;
  carrierId: string;
  isActive: boolean;

  constructor(
    id: string,
    carrierFee: number,
    carrierId: string,
    isActive: boolean
  ) {
    this.id = id;
    this.carrierFee = carrierFee;
    this.carrierId = carrierId;
    this.isActive = isActive;
  }
}
