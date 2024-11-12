export interface Bill {
  id: string;
  title: string;
  description: string;
  showCloseIcon: boolean;
  disableClose: boolean;
  userId: number;
  userName: string;
  fullName: string;
  phone: string;
  email: string;
  note: string;
  paymentMethod: string;
  createAt: string;
  total: number;
  amount: number;
  status: number;
  address: string;
  paymentName: string;
  billDetails: any[];
  onCloseEdit?: () =>void
}
