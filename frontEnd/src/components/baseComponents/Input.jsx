import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import TextArea from '../baseComponents/TextArea';
const Input = (
    {
        type,
        index,
        name,
        dataName,
        placeholder,
        id,
        className,
        readOnly,
        value,
        onChangeHandler,
        onKeyUpHandler,
        onClickHandler,
        isHidden,
        isChildren,
        approvalHander,
        isChecked,
        register,
        trigger,
        parentName,
        mandatory,
        submitApproval,
        autoComplete,
        isParent,
        defaultValue,
        childrenData,
        parent,
        fieldName,
        group,
        rows,
        cols,
        is_address_group,
        compare,
        order,
        isSelf,
        isMultiOption,
        groupIndex,
        fieldCompare
    }
) => {
    const selector = useSelector(state => state);
    const activeTab = selector.application && selector.application.activeTab;
    const checkCompleteStatus = selector?.application?.completeStatus;
    //const splitActiveTab = activeTab && activeTab.split("_").join("-").toLowerCase()
    const is_complete = checkCompleteStatus && checkCompleteStatus[activeTab]?.is_complete;
    const renderInput = () => {
        let childrenReference = childrenData && Array.isArray(childrenData) ? childrenData : "none";
        switch (type) {
            case 'radio':
                return <input
                    type={type}
                    name={fieldName ? fieldName : name}
                    id={id}
                    className={`cursor-pointer form-check-input shadow-none mr-1 mr-sm-2 ${className ? className : ""}`}
                    disabled={readOnly  ||( is_complete === 'Y' && true)}
                    value={value}
                    // onChange={(e) => onChangeHandler && onChangeHandler({ target: { name, value: e.target.value ? e.target.value : "No" }, dataName, isParent, isChildren, mandatory, childrenReference }, "radioOnChange")}
                    onChange={(e) => {
                        onChangeHandler &&
                            is_address_group ? onChangeHandler &&
                        onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference,groupIndex }, "onAddressChange") : onChangeHandler &&
                        onChangeHandler({ target: { name, value: e.target.value },type, dataName, isParent, isChildren, mandatory, childrenReference,group,compare,order,isSelf,childrenData,fieldCompare }, "radioOnChange");
                    }
                    }
                    onInput={() => { onKeyUpHandler && onKeyUpHandler({ target: { name: fieldName ? fieldName : name, value }, isChildren }, "onKeyUp") }}
                    // checked={isChecked}
                    hidden={isHidden}
                    ref={register}
                />
            case 'checkbox':
                return <input
                    type={type}
                    name={name}
                    id={id}
                    className={`cursor-pointer form-check-input shadow-none mr-1 mr-sm-2 ${className ? className : ""}`}
                    disabled={readOnly ||( is_complete === 'Y' && true)}
                    value={value}
                    onChange={(e) => {
                        isMultiOption ? onChangeHandler({ target: { name, value: e.target.value, checked: e.target.checked },isMultiOption}, "onCheckBoxChange") 
                        :is_address_group ? onChangeHandler &&
                        onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference,groupIndex }, "onAddressChange")
                        :
                         approvalHander && approvalHander ? approvalHander(e) 
                        : onChangeHandler && 
                          onChangeHandler({ target: { name, value: e.target.checked ? e.target.value : "No" }, type, dataName, isParent, isChildren, mandatory, childrenReference,group,order,isSelf }, "onChange")
                    }}
                    // onChange={(e) => {
                    //     onChangeHandler && onChangeHandler({ target: { name, value: e.target.checked ? e.target.value : "No" }, isChildren }, "onCheckBoxChange") || (approvalHander &&
                    //         approvalHander(e))
                    // }}
                    onClick={() => onKeyUpHandler && onKeyUpHandler({ target: { name, value }, isChildren }, "onKeyUp")}
                    checked={isChecked}
                    hidden={isHidden}
                    ref={register}
                />
            case "dateRange":
                return <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    id={id}
                    value={value && typeof value[name] == 'object' ? defaultValue : value[name]}
                    className={className}
                    readOnly={readOnly}
                    onChange={(e) => onChangeHandler({ target: { name, value }, dataName, isParent, parent, isChildren, childrenData, groupIndex: index }, "onChange")}
                    onClick={onClickHandler}
                    hidden={isHidden}
                    ref={register}
                />
            case "file":
                return <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    id={id}
                    value={(value && value[name]) || defaultValue}
                    className={className}
                    readOnly={readOnly}
                    onChange={onChangeHandler}
                    onClick={onClickHandler}
                    hidden={isHidden}
                    ref={register}
                />
            case "textArea":
                return <textarea
                    type={type}
                    name={fieldName ? fieldName : name}
                    placeholder={placeholder}
                    id={id}
                    rows={rows}
                    trigger={trigger}
                    cols={cols}
                    className={className}
                    
                    readOnly={readOnly}
                    parentname={parentName}
                    value={value && value[name] ? value[name] : ""}
                    // onChange={(e) => onChangeHandler && onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference, groupIndex: index },
                    //     "onChange")}
                    onChange={(e) => {onChangeHandler &&
                        onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference, index }, "onChange") 
                        trigger && trigger(parentName)
                        trigger && trigger(fieldName ? fieldName : name)
                    }
                    }
                    // onClick={() => onKeyUpHandler && onKeyUpHandler({ target: { name, value }, isChildren }, "onKeyUp")}
                    onKeyUp={() => {onKeyUpHandler && onKeyUpHandler({ target: { name: fieldName ? fieldName : name, value } }, "onKeyUp")
                    trigger && trigger(fieldName ? fieldName : name)
                    trigger && trigger(parentName)
                }}
                    hidden={isHidden}
                    ref={register}
                    autoComplete={autoComplete}
                > </textarea>
            default:
                return <input
                    type={type}
                    name={fieldName ? fieldName : name}
                    placeholder={placeholder}
                    id={id}
                    // trigger={trigger}
                    // parentName={parentName}
                    className={className}
                    readOnly={readOnly}
                    value={ ((value && value[name] === null) || (value && value[name] === undefined)) ? "" : value && value[name] }
                    // onChange={(e) => onChangeHandler && onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference, groupIndex: index },
                    //     "onChange")}
                    onChange={(e) =>{ onChangeHandler &&
                        is_address_group ?
                        onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference, groupIndex: index }, "onAddressChange") :
                        onChangeHandler({ target: { name, value: e.target.value }, dataName, isParent, isChildren, mandatory, childrenReference, groupIndex: index }, "onChange")
                        trigger && trigger(parentName)
                        
                    }
                    }
                    // onClick={() => onKeyUpHandler && onKeyUpHandler({ target: { name, value }, isChildren }, "onKeyUp")}
                    onKeyUp={
                        () => {onKeyUpHandler && onKeyUpHandler({ target: { name: fieldName ? fieldName : name, value } }, "onKeyUp")
                        // trigger && trigger(parentName)
                        }
                        
                        }
                    hidden={isHidden}
                    ref={register}
                    autoComplete={autoComplete}
                />
        }
    }
    return (
        <>
            {renderInput()}
        </>
    )
};
Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onChangeHandler: PropTypes.func,
    isHidden: PropTypes.bool,
    isEncrypted: PropTypes.bool,
    isChecked: PropTypes.bool
};

export default Input;
























