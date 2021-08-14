import { context, storage, logging, PersistentMap } from "near-sdk-as";
import { u128, PersistentVector } from "near-sdk-as";
import { Candidate, Voter } from "./model";


const voterMap = new PersistentMap<string, Voter>('v');
const candidates = new PersistentVector<Candidate>('c');
const anonymousCandidate = new Candidate('anonymous');
const chairman: string = 'vanhiepdam.testnet';


// contract functions
export function addCandidate(code: string): void {
  logging.log(context.sender);
  assert(context.sender.localeCompare(chairman) === 0, 'Only chairman can add candidate');
  const candidateIdx = getCandidateIdxByCode(code);
  assert(candidateIdx < 0, `${code} was existed`);
  const candidate = new Candidate(code);
  candidates.push(candidate);
}

export function vote(candidateCode: string): void {
  const candidateIdx = getCandidateIdxByCode(candidateCode);
  assert(candidateIdx >= 0, `${candidateCode} not found`);
  let voter = voterMap.get(context.sender);
  if (!voter) {
    voter = new Voter(context.sender);
    voterMap.set(voter.address, voter);
  }
  assert(voter.voted === false, 'You has already voted');
  voter.candidate = candidateCode;
  voter.voted = true;
  voterMap.set(context.sender, voter);
  let candidate = candidates[candidateIdx];
  candidate.voteCount += 1;
  candidates[candidateIdx] = candidate;
}

export function getCandidates(): void {
  for (let i = 0; i < candidates.length; i++) {
    logging.log(candidates[i]);
  }
}

export function findWinners(): Candidate[] {
  let winners: Candidate[] = [];
  if (candidates.length === 0) {
    return winners;
  }
  let maxVote = 0;
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].voteCount > maxVote) {
      maxVote = candidates[i].voteCount;
      winners = [];
      winners.push(candidates[i]);
    } 
    else if (candidates[i].voteCount === maxVote && maxVote > 0) {
      winners.push(candidates[i]);
    }
  }
  logging.log(winners);
  return winners;
}

export function getChairman(): string {
  return chairman;
}


// utils function
export function getCandidateIdxByCode(code: string): i32 {
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].code.localeCompare(code) === 0) {
      return i;
    }
  }
  return -1;
}

export function clearCandidates(): void {
  for (let i = 0; i < candidates.length; i++) {
    candidates.pop();
  }
}

export function resetCurrentVoter(): void {
  const voter = voterMap.get(context.sender);
  if (voter) {
    voter.voted = false;
    voter.candidate = '';
    voterMap.set(context.sender, voter);
  }
}
