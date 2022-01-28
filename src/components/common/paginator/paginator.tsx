import { useState } from 'react'
import style from './paginator.module.css'
import arrow_left from '../../../assets/images/left.svg'
import arrow_right from '../../../assets/images/right.svg'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage = 1, onPageChanged = () => { }, portionSize = 15 }) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        // if (pages.length < 20) {
        pages.push(i)
        // }
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize


    return (
        <div className={style.pages}>

            {/* {portionNumber > 2 &&
                <button onClick={() => { setPortionNumber(1) }}>
                    <img src={arrow_left} alt=''/>
                </button>
            } */}

            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }} className={style.button_arrow}>
                    <img src={arrow_left} alt='' />
                </button>
            }

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={currentPage === p ? style.selectedPage : style.notSelectedPage}
                        onClick={() => { onPageChanged(p) }} >{p}</span>
                })}

            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }} className={style.button_arrow}>
                    <img src={arrow_right} alt='' />
                </button>
            }
            {/* {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>
                    <img src={arrow_right} alt=''/>
                </button>
            } */}

        </div>
    )
}