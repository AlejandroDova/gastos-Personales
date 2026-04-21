import { Amplify } from 'aws-amplify'
import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  signUp as amplifySignUp,
  fetchAuthSession,
  confirmSignUp as amplifyConfirmSignUp,
} from 'aws-amplify/auth'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      loginWith: { email: true },
    },
  },
})

export async function signIn(email: string, password: string) {
  return amplifySignIn({ username: email, password })
}

export async function signUp(email: string, password: string) {
  return amplifySignUp({ username: email, password })
}

export async function confirmSignUp(email: string, code: string) {
  return amplifyConfirmSignUp({ username: email, confirmationCode: code })
}

export async function signOut() {
  return amplifySignOut()
}

export async function getIdToken(): Promise<string | null> {
  try {
    const session = await fetchAuthSession()
    return session.tokens?.idToken?.toString() ?? null
  } catch {
    return null
  }
}
