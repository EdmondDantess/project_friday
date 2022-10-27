// import React, {useEffect, useState} from "react"
//
// export function useDebounce<T>(value: T): void {
//     const [debouncedValue, setDebouncedValue] = useState<T>(value)
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedValue(value);
//             if (debouncedValue) {
//                 dispatch(getCardsTC({
//                     cardsPack_id: packId,
//                     pageCount: pageCount,
//                     cardQuestion: valueTextField.trim()
//                 }))
//             }
//         }, 500)
//         return () => {
//             clearTimeout(timer)
//         }
//     }, [debouncedValue, value])
// }

export {}