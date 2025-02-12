import { useState, useRef } from 'react'

export default function useRefState(initialState) {
  const stateRef = useRef(initialState)
  const [, setStateRaw] = useState(initialState)

  const setState = (state) => {
    stateRef.current = state
    setStateRaw(state)
  }

  return [stateRef, setState]
}
