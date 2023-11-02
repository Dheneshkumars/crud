import React from "react";
import { useSelector } from "react-redux";
//import PropTypes from 'prop-types';
const List = (
    {
        className,
        id,
        field,
        style
    }
) => {
    const { lists, type } = field && field;
    const selector = useSelector(state => state);
    const locale = selector?.staff?.locale?.current;
    const localeCode = selector?.staff?.locale?.current_short_code;
    const defaultLocale = selector?.staff?.locale?.default_short_code;
     switch (type) {
        case "OrderList":
            return (
                <ol
                    className={className}
                    type={type}
                    id={id}
                >
                    {
                        lists && Array.isArray(lists) &&
                        lists.length > 0 &&
                        lists.map((data, index) => {
                            const { title } = data && data;
                            return (
                                <li
                                    className={className}
                                    id={id}
                                    key={index}
                                    style={style}
                                >
                                    {title &&
                                        locale && localeCode && locale?.[localeCode]?.[title] ?
                                        locale[localeCode][title] :
                                        locale?.[defaultLocale]?.[title] ?
                                            locale[defaultLocale][title] : title}
                                </li>
                            )
                        })
                    }
                </ol>
            );
        case "UnorderList":
            return (
                <ul
                    className={`order ${className ? className : ''}`}
                    type={type}
                    id={id}
                >
                    {
                        lists && Array.isArray(lists) && lists.length > 0 &&
                        lists.map((data, key) => {
                            // const { title } = data;
                            return (
                                <li
                                    className={`${className ? className : ''}`}
                                    id={id}
                                    key={key}
                                    style={style}
                                >
                                    {/* {data && locale && locale[data] || title && locale && locale[title]} */}
                                    {
                                        data?.title &&
                                            locale && localeCode && locale?.[localeCode]?.[data?.title] ?
                                            locale[localeCode][data?.title] :
                                            locale?.[defaultLocale]?.[data?.title] ?
                                                locale[defaultLocale][data?.title] :
                                                data && locale?.[localeCode]?.[data] ? locale?.[localeCode]?.[data]
                                                    : locale?.[defaultLocale]?.[data] ? locale?.[defaultLocale]?.[data]
                                                        : data?.title || data
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            );
        default:
            return null;
    }
}
// UnOrderList.PropType = {
//     className: PropTypes.string,
//     type: PropTypes.string.isRequired,
//     id: PropTypes.string,
//     lists: PropTypes.any,
// }
export default List;