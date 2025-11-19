import { useRouter } from 'vue-router'
import { ref } from 'vue'

export function useNavigation() {
    const router = useRouter()
    const isLoggedIn = ref(false)

    const navigate = (path: string) => {
        router.push(path)
    }

    const logout = () => {
        isLoggedIn.value = false
        router.push('/')
    }

    return { navigate, logout, isLoggedIn }
}
