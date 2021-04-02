export interface IRegisterReqBody {
  name: string;
  email: string;
  password: string;
}

export interface ILoginReqBody {
  email: string;
  password: string;
}
