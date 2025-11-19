import { useRouter } from 'vue-router'
import { ref } from 'vue'

export function useNavigation() {
    const router = useRouter()

    const navigate = (path: string) => {
        router.push(path)
    }

    return { navigate }
}
