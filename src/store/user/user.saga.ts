import { takeLatest, all, call, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { User, UserCredential } from "firebase/auth";
import { Effect } from "redux-saga/effects";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails: Record<string, any>
): Generator<Effect, void, DocumentSnapshot<DocumentData>> {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated(): Generator<Effect, void, User> {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth, {});
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield* getSnapshotFromUserAuth(user, {});
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: {
  type: string;
  payload: { email: string; password: string };
}): Generator<Effect, void, UserCredential> {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user, {});
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: {
  type: string;
  payload: { email: string; password: string; displayName: string };
}): Generator<Effect, void, UserCredential> {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: {
  type: string;
  payload: { user: User; additionalDetails: object };
}): Generator<Effect, void> {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut(): Generator<Effect, void> {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
