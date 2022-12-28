import {useSearchParams} from "react-router-dom";

export function useAllSearchParams() {

    let [searchParams, setSearchParams] = useSearchParams();

    const packQuery = searchParams.get("pack") || ""
    const pageQuery = searchParams.get("page") || "1"
    const minQuery = searchParams.get("min") || ""
    const maxQuery = searchParams.get("max") || ""
    const packNameQuery = searchParams.get("packName") || ""
    const pageCountQuery = searchParams.get("pageCount") || "8"

    return {
        "pack": packQuery,
        "page": pageQuery,
        "min": minQuery,
        "max": maxQuery,
        "packName": packNameQuery,
        "pageCount": pageCountQuery,
    }
}
