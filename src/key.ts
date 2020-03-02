export interface Key {
  address: string;
  pub: string;
  keyFile: string;
}

export interface KeyWithPriv extends Key {
  priv: string;
}
