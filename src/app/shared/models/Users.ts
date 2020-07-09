export interface Users {
  ID_USUARIO: number,
  COD_CGE: number,
  NM_USUARIO: string,
  NM_AREA: string,
  NM_GROUP: string,
  NM_UNIT: string,
  NM_SEGMENT: string,
  NM_SECTOR1: string,
  NM_SECTOR2: string,
  NM_SECTOR3: string
}

export class User {
  displayName: string;
  email: string;
  avatar: string;
}
