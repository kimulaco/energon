export interface UserDoc {
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>;
}

export interface UserDocData {
  id: string;
  name: string;
  token?: string;
  expireAt?: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

export interface UserAuth {
  token: string;
  expireAt: string;
}
