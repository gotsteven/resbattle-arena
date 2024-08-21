import { PROJECT_NAME } from '@/constants/project'
import { ApiStatus } from './ApiStatus'

const Home = async () => {
  return (
    <div className="flex flex-col gap-y-4 bg-background text-foreground">
      Hello, {PROJECT_NAME}
      <ApiStatus />
    </div>
  )
}

export default Home
