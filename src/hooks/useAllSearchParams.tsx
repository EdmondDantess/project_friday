import {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

export function useAllSearchParams() {

    let [searchParams, setSearchParams] = useSearchParams();

    const packQuery = searchParams.get("pack") || ""
    const pageQuery = searchParams.get("page") || ""
    const minQuery = searchParams.get("min") || ""
    const maxQuery = searchParams.get("max") || ""
    const packNameQuery = searchParams.get("packName") || ""
    const pageCountQuery = searchParams.get("pageCount") || ""

    return {
        "pack": packQuery,
        "page": pageQuery,
        "min": minQuery,
        "max": maxQuery,
        "packName": packNameQuery,
        "pageCount": pageCountQuery,
    }
}
