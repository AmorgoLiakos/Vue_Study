export function debounce (Inner, delay=600) {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(Inner, delay)
    }
}