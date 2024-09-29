import "./SearchInput.scss"

export default function SearchInput() {
    return(
        <div className=".search-input">
            <label htmlFor="" className=".search-input__label"></label>
            <input type="text" className=".search-input__element" placeholder="search" />
        </div>
    )
}