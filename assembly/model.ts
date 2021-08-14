import { context, storage, logging, PersistentMap } from "near-sdk-as";
import { u128, PersistentVector } from "near-sdk-as";


@nearBindgen
export class Candidate {
  code: string;
  voteCount: i32;

  constructor(public candidateCode: string) {
    this.code = candidateCode;
    this.voteCount = 0;
  }
}


@nearBindgen
export class Voter {
  address: string;
  voted: boolean;
  candidate: string;

  constructor(public sender: string) {
    this.address = sender;
    this.voted = false;
  }
}
