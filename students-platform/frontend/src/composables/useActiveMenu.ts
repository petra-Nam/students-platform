import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useActiveMenu() {
    const route = useRoute()
    const activeIndex = ref('1')

    const routeMap: Record<string, string> = {
        '/': '0',
        '/community': '1',
        '/universities': '2-1',
        '/scholarships': '2-2',
    }

    const updateActiveIndex = () => {
        activeIndex.value = routeMap[route.path] || ''
    }

    updateActiveIndex()

    watch(route, () => {
        updateActiveIndex()
    })

    return { activeIndex }
}
