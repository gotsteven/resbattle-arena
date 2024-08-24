import { auth, signIn } from '@/auth'
import { IconButton } from '@/components/ui/IconButton'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { redirect } from 'next/navigation'

const LogIn = async () => {
  const session = await auth()
  if (session !== null && session !== undefined) redirect('/')

  const signInAction = async () => {
    'use server'
    await signIn('google')
  }

  return (
    <form action={signInAction} className="flex flex-col items-center gap-y-4">
      <p>Googleと連携してログイン</p>
      <IconButton type="submit" icon={IconBrandGoogleFilled} label="Googleログイン" />
    </form>
  )
}

export default LogIn
