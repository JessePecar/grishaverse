export interface Character {
  playerId?: string;
  isActive?: boolean;
  name?: string;
  heritage?: string;
  background?: string;
  look?: string;
  class?: ClassType;
  subClass?: ClassType;
}

export enum ClassType {
  Soldier, 
  Materialki, 
  Corporalki, 
  Etherealki,
  Recon,
  Tracker,
  Cartographer,
  Durast,
  Alkemi,
  Heartrender,
  Healer,
  Tailor,
  Squaller,
  Inferni,
  Tidemaker
}