import React from 'react';
import { useSelector } from "react-redux";
// import { lang } from '../../utilis/lang';

const SubSectionTitle = (
    {
        field,
        fieldStyle
    }
) => {
    const { title, enabled,order,style ,margin } = field
    const selector = useSelector(state => state);
    const locale = selector?.staff?.locale?.current;
    const localeCode = selector?.staff?.locale?.current_short_code;
    const defaultLocale = selector?.staff?.locale?.default_short_code;
     return (
        <h6
            className={`${margin ? margin : "mx-2"} p-2 titleFontSize w-100 ${order && order !== null ? `order-${order}` : ''} ${fieldStyle?.parentCol}`}
            hidden={!enabled}
            style={ style ? style : { background: "#eeeff3" }}
        >
            {
               title &&
               locale && localeCode && locale?.[localeCode]?.[title]?
               locale[localeCode][title] :
               locale?.[defaultLocale]?.[title] ?
               locale[defaultLocale][title] : title
            }
        </h6>
    )
}

export default SubSectionTitle