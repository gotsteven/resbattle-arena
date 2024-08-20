import { PROJECT_NAME } from '@/constants/project'
import { apiClient } from '@/lib/apiClient'

const Home = async () => {
  const res = await apiClient.api.health.$get()
  const json = await res.json()

  return (
    <div className="flex flex-col gap-y-4 bg-background text-foreground">
      Hello, {PROJECT_NAME}
      <div>
        <p>API HealthCheck</p>
        <p>
          status: <span className="text-accent">{json.status}</span>
        </p>
      </div>
    </div>
  )
}

export default Home
