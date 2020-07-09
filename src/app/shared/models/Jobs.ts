export interface Job {
  id: number;
  ui: string;
  name: string;
  ativo: string;
  devName: string;
  usrName: string;
  manual: number;
}

export interface JobResponse {
  id: number;
}

export interface JobException {
  process: string;

}
