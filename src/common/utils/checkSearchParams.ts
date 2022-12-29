export const checkSearchParams = (params: SearchParamsType, minCardsCount: null | number, maxCardsCount: null | number): [checkedParams: SearchParamsType, isChanged: boolean] => {
    const {pack, packName, page, pageCount, min, max} = params

    const checkedParams = {
        pack: pack,
        packName: packName,
        page: page,
        pageCount: pageCount,
        min: min,
        max: max,
    };

    let isChanged = false

    if (!!min && (isNaN(Number(min)) || Number(min) < -1) && Number(min) !== 0) {
        checkedParams.min = `${(Number(minCardsCount) ? minCardsCount : 0)}`
        isChanged = true
    }

    if (!!max && (isNaN(Number(max)) || Number(max) < -1) && Number(max) !== 0) {
        checkedParams.max = `${(Number(maxCardsCount) ? maxCardsCount : 1)}`
        isChanged = true
    }

    if (!!page && (isNaN(Number(page)) || Number(page) <= 0)) {
        checkedParams.page = `1`;
        isChanged = true
    }

    if (!!pageCount && (isNaN(Number(pageCount)) || Number(pageCount) <= 0 || Number(pageCount) > 50)) {
        checkedParams.pageCount = `8`;
        isChanged = true
    }

    if (!!pack && pack === "all") {
        checkedParams.pack = ``;
        isChanged = true
    }

    return [checkedParams, isChanged]
}

type SearchParamsType = {
    pack: string,
    packName: string,
    page: string,
    pageCount: string,
    min: string,
    max: string,
}
