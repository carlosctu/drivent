export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type PaymentEntity = {
  id: number;
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
  updatedAt: Date;
};

export type Payment = Omit<PaymentEntity, "id">;

export type PaymentProcess = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};
