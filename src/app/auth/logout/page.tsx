import { auth, signOut } from '@/auth'
import { IconButton } from '@/components/ui/IconButton'
import { IconDoorExit } from '@tabler/icons-react'
import { redirect } from 'next/navigation'

const LogOut = async () => {
  const session = await auth()
  if (session === null) redirect('/auth/login')

  const logOutAction = async () => {
    'use server'
    await signOut()
      .then(() => redirect('/auth/login'))
      .catch(() => alert('ログアウトに失敗しました'))
  }

  return (
    <form action={logOutAction} className="flex flex-col items-center gap-y-4">
      <p>ログアウトしますか？</p>
      <IconButton type="submit" icon={IconDoorExit} label="ログアウト" />
    </form>
  )
}

export default LogOut
