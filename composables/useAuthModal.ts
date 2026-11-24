/* состояние окна входа и регестрации */
export type AuthStep = 'choice' | 'login' | 'register' | null

export function useAuthModal() {
  const step = useState<AuthStep>('auth-step', () => null)

  function openAuth(nextStep: Exclude<AuthStep, null> = 'choice') {
    step.value = nextStep
  }

  function closeAuth() {
    step.value = null
  }

  return { step, openAuth, closeAuth }
}
