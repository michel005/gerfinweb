import { useContext, useState } from "react";
import { LocalizationContext } from './Localization.context'

export default function useLocalization(localizationPath) {

    const { getText } = useContext(LocalizationContext)
    const [loc, setLoc] = useState(getText(localizationPath))

    return {loc}

}