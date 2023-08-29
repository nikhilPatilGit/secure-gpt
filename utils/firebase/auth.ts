import firebaseConfig from './config';

import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export interface AuthError {
  errorCode: string;
  errorMessage: string;
}

export interface UserData {
  name: string;
}

export interface AuthResponse {
  idToken: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export const auth: {
  signIn: (authRequest: AuthRequest) => Promise<AuthResponse>;
  signUp: (authRequest: AuthRequest) => Promise<AuthResponse>;
} = {
  signIn: (authRequest: AuthRequest): Promise<AuthResponse> => {
    return new Promise<AuthResponse>(async (resolve, reject) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          firebaseConfig.firebaseAuth,
          authRequest.email,
          authRequest.password,
        );
        const idToken = await userCredential.user.getIdToken();
        resolve({ idToken: idToken });
      } catch (error: unknown) {
        const firebaseError = error as FirebaseError;
        const failure: AuthError = {
          errorCode: firebaseError.code,
          errorMessage: firebaseError.message,
        };
        reject(failure);
      }
    });
  },
  signUp: (authRequest: AuthRequest): Promise<AuthResponse> => {
    return new Promise<AuthResponse>(async (resolve, reject) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          firebaseConfig.firebaseAuth,
          authRequest.email,
          authRequest.password,
        );
        await sendEmailVerification(userCredential.user, {
          url: 'http://localhost:3000/',
        });
        const idToken = await userCredential.user.getIdToken();
        resolve({ idToken: idToken });
      } catch (error: unknown) {
        const firebaseError = error as FirebaseError;
        const failure: AuthError = {
          errorCode: firebaseError.code,
          errorMessage: firebaseError.message,
        };
        reject(failure);
      }
    });
  },
};
