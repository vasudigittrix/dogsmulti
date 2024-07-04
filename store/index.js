import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { bookingbytypeReducer } from "@/reducer/BookingByTypeSlice";
import { bookingbytypestatusReducer } from "@/reducer/BookingByTypeStSlice";
import { facilitiesReducer } from "@/reducer/FacilitiesSlice";
import { employeebytypeReducer } from "@/reducer/EmployeeByTypeSlice";
import { singleemployeeReducer } from "@/reducer/SingleEmployeeSlice";
import { EmployeeByTypeCommReducer } from "@/reducer/EmployeeByTypeCoSlice";
import { customerReducer } from "@/reducer/CustomerSlice";
import { singlecustomerReducer } from "@/reducer/SingleCustomerSlice";
import { petReducer } from "@/reducer/PetSlice";
import { categoriesReducer } from "@/reducer/CategoriesSlice";
import { singlecategoryReducer } from "@/reducer/SingleCategorySlice";
import { servicesReducer } from "@/reducer/ServicesSlice";
import { singleserviceReducer } from "@/reducer/SingleServiceSlice";
import { DurationsReducer } from "@/reducer/DurationSlice";
import { TrainingTypeReducer } from "@/reducer/TrainingTypeSlice";
import { singletrainingReducer } from "@/reducer/SingleTrainingSlice";
import { bookingReducer } from "@/reducer/BookingsSlice";
import { employeeReducer } from "@/reducer/EmployeeSlice";
import { singlebookingReducer } from "@/reducer/SingleBookingSlice";
import { servicesfilterReducer } from "@/reducer/ServicesFilterSlice";
import { tagsReducer } from "@/reducer/TagsSlice";
import { singletagReducer } from "@/reducer/SingleTagSlice";
import { unitsReducer } from "@/reducer/UnitSlice";
import { singleunitReducer } from "@/reducer/SingleUnitSlice";
import { brandsReducer } from "@/reducer/BrandsSlice";
import { singlebrandReducer } from "@/reducer/SingleBrandSlice";
import { productcategoryReducer } from "@/reducer/ProductCategorySlice";
import { productReducer } from "@/reducer/ProductsSlice";
import { singleproductReducer } from "@/reducer/SingleProductSlice";
import { variationtypeReducer } from "@/reducer/VariationsTypeSlice";
import { EmployeeReviewReducer } from "@/reducer/EmployeeReviewSlice";
import { employeerequestReducer } from "@/reducer/EmployeeRequestSlice";
import { taxesReducer } from "@/reducer/TaxesSlice";
import { singletaxReducer } from "@/reducer/SingleTaxSlice";
import { logisticsReducer } from "@/reducer/LogisticSlice";
import { shipzoneReducer } from "@/reducer/ShipzoneSlice";
import { bookingreportReducer } from "@/reducer/BookingReportsSlice";
import { bookingbyemployeeReducer } from "@/reducer/Employees/BookingByEmployeeSlice";
import {reviewbyemployeeReducer} from "@/reducer/Employees/ReviewByEmployee";
import { servicesbyroleReducer } from "@/reducer/Employees/ServiceByRole";
import { staticcontentReducer } from "@/reducer/StaticContentSlice";
import { singlestaticcontentReducer } from "@/reducer/SingleStaticContentSlice";
const reducers = combineReducers({
    bookingbytype: bookingbytypeReducer,
    booking: bookingReducer,
    bookingbytypestatus: bookingbytypestatusReducer,
    facilities:facilitiesReducer,
    employeebytype: employeebytypeReducer,
    employees: employeeReducer,
    singleemployee: singleemployeeReducer,
    employeebytypecomm: EmployeeByTypeCommReducer,
    customer: customerReducer,
    singlecustomer: singlecustomerReducer,
    pet: petReducer,
    categories: categoriesReducer,
    singlecategory: singlecategoryReducer,
    services: servicesReducer,
    singleservice: singleserviceReducer,
    durations: DurationsReducer,
    trainingtype: TrainingTypeReducer,
    singletraining: singletrainingReducer,
    singlebooking: singlebookingReducer,
    servicesfilter: servicesfilterReducer,
    tags: tagsReducer,
    singletag: singletagReducer,
    units: unitsReducer,
    singleunit: singleunitReducer,
    brands: brandsReducer,
    singlebrand: singlebrandReducer,
    pcategory: productcategoryReducer,
    products: productReducer,
    singleproduct: singleproductReducer,
    variationtype: variationtypeReducer,
    employeereviews: EmployeeReviewReducer,
    employeerequest: employeerequestReducer,
    taxes: taxesReducer,
    singletax: singletaxReducer,
    logistic: logisticsReducer,
    shipzone: shipzoneReducer,
    bookingreport: bookingreportReducer,
    bookingbyemployee: bookingbyemployeeReducer,
    reviewbyemployee: reviewbyemployeeReducer,
    servicesbyrole: servicesbyroleReducer,
    staticcontent: staticcontentReducer,
    singlestaticcontent: singlestaticcontentReducer
});
const config = {
  key: 'root',
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;