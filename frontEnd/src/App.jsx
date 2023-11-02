import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from "./components/pageComponents/ProtectedRoute";
import Errorpage from './components/pageComponents/Errorpage';
import AppLayout from "./components/layerComponents/AppLayout";
import PreLoader from "./components/baseComponents/PreLoader";
import { getSchemaTabs } from "./api/application";
import { getLanguage, getSchema } from "./middlewares/summaryMiddleware";
import { app } from "./utilis/requiredKey";
import { requiredKeyFunction } from "./utilis/componentManipulation";
import { updateCurrentLocale, updateDefaultLocale, updateCurrenteCode, updateDefaultCode } from "./reducers/staff/localeSlice"
 import { useDispatch, useSelector } from "react-redux";
import { getAgencyInfo, getType } from "./reducers/agencyDetailsSlice";
import { getStaffInfo } from "./reducers/staffSlice";
import { addAuth } from "./reducers/staff/authSlice";
const App = () => {
    const dispatch = useDispatch()
    const [hasError, setHasError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [schema, setSchema] = useState({})
    let uiSchema = {}
    const url = window?.location?.pathname
    const urlSplitArray = url?.split("/")
    const publicBaseURL = process.env.REACT_APP_PUBLIC_BASE_URL
    const webFormsBaseURL = process.env.REACT_APP_WEB_FORMS_BASE_URL
    const id = Array.isArray(urlSplitArray) && urlSplitArray.length > 0 && urlSplitArray[(urlSplitArray.length - 1)];
    const staff_id = id && id;
    const staffType = window.location.toString().includes("user/staff-tracking");
    const webformType = window.location.toString().includes("webforms");
    const type = staffType ? "public" : webformType ? "webforms" : "";
    const selector = useSelector((state) => state);
    const page_id = 1;
    console.log(selector,"reduxstate");
    useEffect(() => {
        if (type == "public") {
            dispatch(getStaffInfo(id));
        }
    }, [id])
    const getQueryVariable = (variable) => {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (let param of vars) {
            var pair = param.split("=");
            if (pair[0] === variable) { return pair[1]; }
        }
        return (false);
    }
    let expires = getQueryVariable("expires"),
        token = getQueryVariable("token") || getQueryVariable("t"),
        signature = getQueryVariable("signature");
    const webform_code = id;
    const webform_token = token;
    useEffect(() => {
        dispatch(addAuth({ staff_id, type, expires, token, signature, webform_code, webform_token, page_id }));
    }, [staff_id, type, expires, token, signature, webform_code, webform_token, page_id])

    /* Start : Get UI Schema
    ==================================================== */
    const getAgencySchema = async () => {
        const staff_id = selector?.staff?.auth?.staff_id;

        try {
            let response = null;
            switch (type) {
                case "public":
                    response = await getSchema(id, token, type,null, null );
                    break;
                case "webforms":
                    const webform_code = id && id, webform_token = getQueryVariable("t");
                    if (staff_id) {
                        response = await getSchema(staff_id, token, type, webform_code, webform_token);
                    } else {
                        response = await getSchema(id, token, type, webform_code, webform_token);
                    }
                    break;
                default:
                    break;
            }
            if (
                response &&
                (response.status === 200 || response.statusText === "OK")
            ) {
                uiSchema = response?.data?.schema ? response?.data?.schema : {}
                let uiKeys = uiSchema ? Object.keys(uiSchema) : null;
                let defaultStructure = app && app.schema;
                let is_required = uiKeys && defaultStructure && requiredKeyFunction(uiKeys, defaultStructure);
                if (is_required) {
                    const { appLocale, defaultLocale, content_layout } = uiSchema

                    // type && dispatch(getType(type))
                    getAgencyLocale(appLocale, defaultLocale)
                    if (appLocale !== defaultLocale) {
                        getAgencydefaultLocale(defaultLocale)
                    }
                    uiKeys = content_layout ? Object.keys(content_layout) : null;
                    defaultStructure = app && app.application;
                    is_required = uiKeys && defaultStructure && requiredKeyFunction(uiKeys, defaultStructure);
                    if (is_required) {
                        setTimeout(() => {
                            setSchema(uiSchema);
                            setHasError('');
                            setIsLoading(false);
                        }, 1200)
                    } else {
                        setTimeout(() => {
                            setHasError(403);
                            setIsLoading(false);
                        }, 1200)
                    }
                } else {
                    setTimeout(() => {
                        setHasError(403);
                        setIsLoading(false);
                    }, 1200)
                }
            }
        }
        catch (error) {
            console.log(error, "error")
        }
    }
    useEffect(() => {
        id ? getAgencySchema() : setHasError(404)
        const agencyData = type === "public" ? {
            staff_id: id ? id : null,
            expires: expires ? expires : null,
            token: token ? token : null,
            signature: signature ? signature : null,
            webform_code: null,
            webform_token: null
        } :
            {
                staff_id: id,
                expires: null,
                token: null,
                signature: null,
                webform_code: id ? id : null,
                webform_token: token ? token : null
            }
        Object.keys(agencyData).length !== 0 && dispatch(getAgencyInfo(agencyData))
        type && dispatch(getType(type));

    }, []);
    /* End : Get UI Schema
    ==================================================== */

    /* Start : Get Language
    ==================================================== */

    const getAgencyLocale = async (appLocale, defaultLocale) => {
        try {
            const response = await getLanguage(appLocale, id, token, type, webform_code, webform_token)
            if (
                response?.status === 200 &&
                response?.statusText === "OK"
            ) {
                let localeData = {}
                localeData[`${appLocale}`] = response?.data?.language
                response?.data?.language &&
                    dispatch(updateCurrentLocale(localeData))
                appLocale &&
                    dispatch(updateCurrenteCode(appLocale))
                defaultLocale &&
                    dispatch(updateDefaultCode(defaultLocale))
                dispatch(updateDefaultLocale(localeData))

            } else if (response?.message) {
                toast.error(
                    response.message || "Something went wrong, Please try again later.",
                    {
                        theme: "colored",
                    }
                );
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong, Please try again later.", {
                theme: "colored",
            }, type);

        }

    }

    const getAgencydefaultLocale = async (defaultLocale) => {
        try {
            const response = await getLanguage(defaultLocale, id, token, type, webform_code, webform_token)
            if (
                response?.status === 200 &&
                response?.statusText === "OK"
            ) {
                let localeData = {}
                localeData[`${defaultLocale}`] = response?.data?.language
                response?.data?.language &&
                    dispatch(updateCurrentLocale(localeData))
                defaultLocale && dispatch(updateDefaultCode(defaultLocale))
                dispatch(updateDefaultLocale(localeData))

            } else if (response?.message) {
                toast.error(
                    response.message || "Something went wrong, Please try again later.",
                    {
                        theme: "colored",
                    }
                );
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong, Please try again later.", {
                theme: "colored",
            });
        }
    }
    /* Start : Get Language
    ==================================================== */

    const { header_layout, content_layout, footer_layout, defaultLocale, appLocale } = schema

    return (
        <div className='caregiver-container'>
            <Router>
                <Routes>
                    <Route
                        path={`/`}
                        element={
                            <Redirect />
                        }
                    />
                    <Route path={`${publicBaseURL}`} element={
                        hasError ? <Errorpage code={hasError} /> :
                            isLoading ? <PreLoader height={80} width={80} /> :
                                <ProtectedRoute
                                    defaultLocale={defaultLocale}
                                    appLocale={appLocale}
                                    applicationHeader={header_layout}
                                    applicationContent={content_layout?.content?.layout}
                                    schema={schema}
                                />
                    }>
                        <Route path=":page/:id" element={
                            <AppLayout
                                appLocale={appLocale}
                                schema={schema}
                                defaultLocale={defaultLocale}
                                application={content_layout}
                                applicationFooter={footer_layout}
                            />
                        } />
                    </Route>
                    <Route path={`${webFormsBaseURL}`} element={
                        hasError ? <Errorpage code={hasError} /> :
                            isLoading ? <PreLoader height={80} width={80} /> :
                                <ProtectedRoute
                                    appLocale={appLocale}
                                    defaultLocale={defaultLocale}
                                    applicationHeader={header_layout}
                                    applicationContent={content_layout?.content?.layout}
                                    schema={schema}
                                />
                    }>
                        <Route path=":page/:id" element={
                            <AppLayout
                                appLocale={appLocale}
                                schema={schema}
                                defaultLocale={defaultLocale}
                                application={content_layout}
                                applicationFooter={footer_layout}
                            />
                        } />
                    </Route>
                    <Route path="*" element={<Errorpage code={404} />} />
                </Routes>
                <ToastContainer />
            </Router >
        </div >
    )
}

export default App

export const Redirect = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.replace('/user/staff-tracking/summary/503?expires=1670904433&token=CW4AL67S1RH6UBvqguUgKZovvgAaxZuy&signature=c70e3531e95c31f8fccf1627370ef431c0ec79d98696a404f3864ea586021c32');
        }, 0);
        return () => clearTimeout(timeout);
    }, []);
    return <></>;
}