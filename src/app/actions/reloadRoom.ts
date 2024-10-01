'use server'

import { revalidatePath } from 'next/cache'

export const reloadRoom = async () => {
  revalidatePath('/')
}
