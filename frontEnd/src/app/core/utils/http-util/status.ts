/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    26-02-19
 * author:  fmontero
 **/

export class Status {
  code: number;
  statusText: string;
  constructor(code: number, statuxText: string) {
    this.code = code;
    this.statusText = statuxText;
  }
}
