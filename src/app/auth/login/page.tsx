import { auth } from '@/auth'

const LogIn = async () => {
  const session = await auth()

  return <p>{JSON.stringify(session)}</p>
  // if (session !== null && session !== undefined) redirect('/')

  // const signInAction = async () => {
  //   'use server'
  //   await signIn('google')
  // }

  // return (
  //   <form action={signInAction} className="flex flex-col items-center gap-y-4">
  //     <p>Googleと連携してログイン</p>
  //     <IconButton type="submit" icon={IconBrandGoogleFilled} label="Googleログイン" />
  //   </form>
  // )
}

export default LogIn
