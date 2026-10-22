import { useEffect, useState } from 'react'

export default function useTypewriter(words) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let delay = deleting ? 40 : 90
    if (!deleting && count === word.length) delay = 1400
    if (deleting && count === 0) delay = 300

    const timer = setTimeout(() => {
      if (!deleting && count === word.length) {
        setDeleting(true)
      } else if (deleting && count === 0) {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      } else {
        setCount(count + (deleting ? -1 : 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [count, deleting, index, words])

  return words[index].slice(0, count)
}