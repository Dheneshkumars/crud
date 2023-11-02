import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './reducers/formDataSlice';
import applicationReducer from './reducers/applicationSlice';
import groupReducer from './reducers/groupSlice';
import summaryReducer from './reducers/summarySlice';
import documentReducer from './reducers/staff/documentSlice';
import esignReducer from './reducers/esignSlice';
import loaderReducer from './reducers/loaderSlice';
import headerReducer from './reducers/headerSlice';
import agencyDetailsReducer from './reducers/agencyDetailsSlice';
// import staffReducer from './reducers/staffSlice';
import suggetionOptionsReducer from './reducers/autoSuggestionSlice';
import staffReducer from './reducers/staff/rootReducer'

const store = configureStore(
    {
        reducer: {
            // agencyDetails: agencyDetailsReducer,
            loader: loaderReducer,
            header: headerReducer,
            application: applicationReducer,
            documents: documentReducer,
            // esign:esignReducer,
            formValue: formDataReducer,
            group: groupReducer,
            summary: summaryReducer,
            // staff:staffReducer,
            suggetionOptions: suggetionOptionsReducer,
            staff: staffReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        })
    }

);

export default store;

// documents: { 
//     "isLoading": false, 
//     "isRequired": false,
//     "required_count": 0, 
//     "info": Array(5)[{… }, {… }, {… }, … ], 
//     status: { "PENDING": 0, "UPLOADED": 2, "REVIEWED": 1, "APPROVED": 1, "REJECTED": 1 }, 
//     approval: { "is_complete": "N", "is_submitted": "N" } }, 
//  },}