import axios from 'axios';
export const createBookingsByTypeapi = async (formData)=>{
  try {
      console.log(formData);
    const response = await axios.post('/api/bookings/new',  { 
      ...formData
      });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getsingleBookingapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getsinglebooking' , { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getallBookingseapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getall' , { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getallBookingsByStatuseapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getallbystatus',{ params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getallBookingsBySearchapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getallbysearch',{ params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
 export const getBookingsByTypeapi = async (formData)=>{
    try {
      const response = await axios.get('/api/bookings/getbytype', { params: {
        ...formData
       } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export const getBookingsBytypesearcheapi = async (formData)=>{
    try {
        console.log(formData);
      const response = await axios.get('/api/bookings/getbytypesearch', { params: {
        ...formData
       } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  

  export const deleteBookingapi = async (formData)=>{
    try {
        console.log(formData);
      const response = await axios.delete('/api/bookings/delete', { params: {
        ids: formData.join(',')
      } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export const updatestatusBookingapi = async (formData)=>{
    try {
        console.log(formData);
      const response = await axios.put('/api/bookings/updatestatus', { 
       ...formData
       });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export const updatepaystatusBookingapi = async (formData)=>{
    try {
        console.log(formData);
      const response = await axios.put('/api/bookings/updatepaystatus', { 
       ...formData
       });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export const getBookingBytypestatusapi = async (formData)=>{
    try {
      console.log(formData);
    const response = await axios.get('/api/bookings/getbytypestatus', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const getFacilitiesapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/facilities/get', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getactiveFacilitiesapi = async(formData) => {
    try {
    const response = await axios.get('/api/facilities/getactive', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusfacilityapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/facilities/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createfacilityapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/facilities/new', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deletefacilityapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/facilities/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const createemployeebytypeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.post('/api/employees/new', formData);
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const getemployeebytypeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/getbytype', { params: {
        ...formData
       } });
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getemployeerequestapi = async(formData) => {
    try {
      const response = await axios.get('/api/employees/getemployeereq');
      console.log(response.data);
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getemployeerequestbycommapi = async(formData) => {
    try {
      const response = await axios.get('/api/employees/getemployeereqbycomm' ,{ params: {
        ...formData
       } });
      console.log(response.data);
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const verifystatusemployeeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.put('/api/employees/verifyemployee',  {
        ...formData
       } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getallemployeeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/get', { params: {
        ...formData
       }});
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getallemployeebycommapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/getallbycomm', { params: {
        ...formData
       } });
      return response.data;
  } catch (error) {
    throw error;
  }
}
  export const getallemployeebysearchapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/getallbysearch', { params: {
        ...formData
       } });
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getactivenbemployeebytypeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/getactivenb', { params: {
        ...formData
       } });
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getemployeebytypesearcheapi = async (formData)=>{
    try {
        console.log(formData);
      const response = await axios.get('/api/employees/getbytypesearch', { params: {
        ...formData
       } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export const getemployeebytypeCommapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/getbytypecomm', { params: {
        ...formData
       } });
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const updatestatusempltypeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.put('/api/employees/updatestatus',  {
        ...formData
       } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const updateblockempltypeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.put('/api/employees/updateblock',  {
        ...formData
       } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const deleteemployeeapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.delete('/api/employees/delete', { params: {
        ids: formData.join(',')
      } } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const getemployeedetailsapi = async(formData) => {
    try {
      console.log(formData);
      const response = await axios.get('/api/employees/getbyid', { params: {
        id: formData
      } } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const editemployeeapi = async(id, formData) => {
    try {
      const response = await axios.put(`/api/employees/edit/${id}`, formData);
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const addcustomerapi = async(formData) => {
    try {
      const response = await axios.post('/api/customers/new', formData  );
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getcustomersapi = async(formData) => {
    try {
      const response = await axios.get('/api/customers/get',{ params: {
       ...formData
      } });
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getactivecustomersapi = async() => {
    try {
      const response = await axios.get('/api/customers/getactive');
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatuscustomerapi = async(formData) => {
    try {
      const response = await axios.put('/api/customers/updatestatus', {
        ...formData
       });
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deletecustomerapi = async(formData) => {
    try {
      const response = await axios.delete('/api/customers/delete',  { params: {
        ids: formData.join(',')
      } } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getcustomerlistapi = async() => {
    try {
      const response = await axios.get('/api/customers/getlist');
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getsinglecustomerapi = async(formData) => {
    try {
      const response = await axios.get('/api/customers/getbyid',{ params: {
        ...formData
       } });
       console.log(response, 'api');
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createpetapi = async(formData) => {
    try {
      const response = await axios.post('/api/pet/new',  formData );
      return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deletepetapi = async(formData) => {
    try {
      const response = await axios.delete('/api/pet/delete',  { params: {
        id: formData
      } } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const fetchpetbyuserapi = async(formData) => {
    try {
      const response = await axios.get('/api/pet/getbyid', { params: {
        ...formData
       } } );
      return response.data;
  } catch (error) {
    throw error;
  }
  }


  // categories

  export const createcategoryapi = async(formData)=>{
    try{
      const response = await axios.post('/api/categories/new',{
        ...formData
      })
      return response.data
    } catch(error){
      throw error;
    }
  }

  export const getcategoriesbytypeapi = async(formData)=>{
    try{
      const response = await axios.get('/api/categories/getallbytype',{params: {
        ...formData
       }})
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const getcategoriesbytypestatusapi = async(formData)=>{
    try{
      const response = await axios.get('/api/categories/getbytypestatus',{params: {
        ...formData
       }})
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const updatecategoriesapi = async(formData) => {
    try{
      const response = await axios.put('/api/categories/updatestatus',{
        ...formData
      })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const deletecategoriesapi = async(formData) => {
    try{
      const response = await axios.delete('/api/categories/delete',{ params: {
        ids: formData.join(',')
      } } )
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const editsinglecategoryapi = async(id, formData) => {
    try{
      const response = await axios.put('/api/categories/edit', { id, formData })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const getsinglecategoryapi = async(formData) => {
    try{
      const response = await axios.get('/api/categories/getsingle', { params: {
      ...formData
      } })
      return response.data
    } catch(error){
      throw error;
    }
  }

  export const getservicesbytypeapi = async(formData) => {
    try{
      const response = await axios.get('/api/services/getallbytype',{params: {
        ...formData
       }})
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const getservicesbytypestatusapi = async(formData)=>{
    try{
      const response = await axios.get('/api/services/getbytypestatus',{params: {
        ...formData
       }})
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const getservicesbycategoryeapi = async(formData) => {
    try{
      const response = await axios.get('/api/services/getbycategory',{params: {
        ...formData
       }})
      return response.data
    } catch(error){
      throw error;
    }
  }
  
  export const createserviceapi = async(formData) => {
    try{
      const response = await axios.post('/api/services/new',{
        ...formData
      })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const updateservicesapi = async(formData) => {
    try{
      const response = await axios.put('/api/services/updatestatus',{
        ...formData
      })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const editservicesapi = async(id, formData) => {
    try{
      // const response = await axios.put('/api/services/updatestatus',{
      //   ...formData
      // })
      const response = await axios.put('/api/services/edit', { id, formData })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const deleteservicesapi = async(formData) => {
    try{
      const response = await axios.delete('/api/services/delete',{ params: {
        ids: formData.join(',')
      } } )
      return response.data
    } catch(error){
      throw error;
    }
  }

  export const editsingleserviceapi = async(id, formData) => {
    try{
      const response = await axios.put('/api/services/edit', { id, formData })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const getsingleserviceapi = async(formData) => {
    try{
      const response = await axios.get('/api/services/getsingle', { params: {
      ...formData
      } })
      return response.data
    } catch(error){
      throw error;
    }
  }
  export const getDurationsByTypeapi = async(formData) => {
    try {
    const response = await axios.get('/api/duration/getbytype', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getactiveDurationsapi = async(formData) => {
    try {
    const response = await axios.get('/api/duration/getactivebytype', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusdurationapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/duration/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createdurationapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/duration/new', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deletedurationapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/duration/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const gettrainingtypeapi = async(formData) => {
    try {
    const response = await axios.get('/api/trainingtype/getall');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getactivetrainingtypeapi= async(formData) => {
    try {
    const response = await axios.get('/api/trainingtype/getactive');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatustrainingtypeapi = async(formData) => {
    try {
    const response = await axios.put('/api/trainingtype/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createtrainingtypeapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/trainingtype/new', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deletetrainingtypeapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/trainingtype/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getsingletrainingapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/trainingtype/getsingle', {params: {
      ...formData
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const editsingletrainingapi = async(id, formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/trainingtype/edit', { id, formData });
    return response.data;
  } catch (error) {
    throw error;
  }
  }



  // products

  export const getTagsapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/tags/getall');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getTagsbystatusapi = async(formData) => {
    try {
    const response = await axios.get('/api/tags/getbystatus', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusTagapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/tags/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createTagapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/tags/new', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deleteTagapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/tags/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getsingletagapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/tags/getsingle', {params: {
      ...formData
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const editsingletagapi = async(id, formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/tags/edit', { id, formData });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getallUnitsapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/unit/getall');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getUnitsbystatusapi = async(formData) => {
    try {
    const response = await axios.get('/api/unit/getbystatus', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusUnitapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/unit/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createUnitapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/unit/new', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deleteUnitapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/unit/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getsingleunitapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/unit/getsingle', {params: {
      ...formData
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const editsingleunitapi = async(id, formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/unit/edit', { id, formData });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getallBrandsapi = async() => {
    try {
    const response = await axios.get('/api/brands/getall');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getBrandsbystatusapi = async(formData) => {
    try {
    const response = await axios.get('/api/brands/getbystatus', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusBrandapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/brands/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createBrandapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/brands/new',
      formData
     );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deleteBrandapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/brands/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getsinglebrandapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/brands/getsingle', {params: {
      ...formData
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const editsinglebrandapi = async(id, formData) => {
    try {
      console.log(id,formData);
      const response = await axios.put(`/api/brands/edit/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const getallPCategoryapi = async() => {
    try {
    const response = await axios.get('/api/productcategory/getall');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getPCategorybystatusapi = async(formData) => {
    try {
    const response = await axios.get('/api/productcategory/getbystatus', { params: {
      ...formData
     } });
     console.log(response, 'pcat response');
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusPCategoryapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/productcategory/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const createPCategoryapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.post('/api/productcategory/new',
      formData
     );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deletePCategorypi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/productcategory/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const getsinglePCategoryapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.get('/api/productcategory/getsingle', {params: {
      ...formData
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }

  export const editsinglePCategoryapi = async(id, formData) => {
    try {
      console.log(id,formData);
      const response = await axios.put(`/api/productcategory/edit/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  
  






  // products 
  export const getallproductsapi = async(formData) => {
    try {
    const response = await axios.get('/api/product/getall',  {params: {
     ...formData
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
  }
 export const createproductapi = async(formData)=> {
    try {
      console.log(formData);
      const response = await axios.post('/api/product/new', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatestatusproductapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/product/updatestatus', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const updatefeaturedproductapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.put('/api/product/updatefeatured', {
      ...formData
     } );
    return response.data;
  } catch (error) {
    throw error;
  }
  }
  export const deleteproductapi = async(formData) => {
    try {
      console.log(formData);
    const response = await axios.delete('/api/product/delete', {params: {
      ids: formData.join(',')
    }  });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getsingleproductapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.get('/api/product/getsingle', {params: {
    ...formData
  }  });
  return response.data;
} catch (error) {
  throw error;
}
}
export const editsingleproductapi = async(id, formData) => {
  try {
    console.log(formData , id);
  const response = await axios.put(`/api/product/editsingle/${id}`, formData);
  return response.data;
} catch (error) {
  throw error;
}
}

export const upstocksingleproductapi = async(formData) => {
  try {
    console.log(formData);
    const response = await axios.put('/api/product/updatestock', {
      ...formData
     });
  return response.data;
} catch (error) {
  throw error;
}
}
export const upstockvariationapi = async(formData) => {
  try {
    console.log(formData);
    const response = await axios.put('/api/variations/updatestock', {
      ...formData
     });
  return response.data;
} catch (error) {
  throw error;
}
}

export const getproductsbystatusapi = async(formData) => {
  try {
  const response = await axios.get('/api/product/getbystatus', { params: {
    ...formData
   } });
  return response.data;
} catch (error) {
  throw error;
}
}

export const createvartypeapi = async(formData)=> {
  try {
    console.log(formData);
    const response = await axios.post('/api/vartypes/new', formData);
  return response.data;
} catch (error) {
  throw error;
}
}

export const getallvartypeapi = async() => {
  try {
  const response = await axios.get('/api/vartypes/getall');
  return response.data;
} catch (error) {
  throw error;
}
}

export const getvartypestatusapi = async(formData) => {
  try {
  const response = await axios.get('/api/vartypes/getbystatus' ,{ params: {
    ...formData
   } });
  return response.data;
} catch (error) {
  throw error;
}
}

export const postreviewonemployeer = async(formData) => {
  try{
    const response = await axios.get('/api/employeereview/new', formData);
    return response.data;
  }
  catch(error){
    throw error;
  }
}

export const getallemployeereview = async(formData) => {
  try {
  const response = await axios.get('/api/employeereview/getall', { params: {
    ...formData
   } });
  return response.data;
} catch (error) {
  throw error;
}
}
export const deleteemployeereviewapi= async (formData)=>{
  try {
      console.log(formData);
    const response = await axios.delete('/api/employeereview/delete', { params: {
      ids: formData.join(',')
    } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getTaxesapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.get('/api/tax/getall');
  return response.data;
} catch (error) {
  throw error;
}
}
export const getTaxesbystatusapi = async(formData) => {
  try {
  const response = await axios.get('/api/tax/getbystatus', { params: {
    ...formData
   } });
  return response.data;
} catch (error) {
  throw error;
}
}
export const getTaxesbymoduleapi = async(formData) => {
  try {
  const response = await axios.get('/api/tax/getbymodule', { params: {
    ...formData
   } });
  return response.data;
} catch (error) {
  throw error;
}
}
export const updatestatusTaxapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.put('/api/tax/updatestatus', {
    ...formData
   } );
  return response.data;
} catch (error) {
  throw error;
}
}

export const createTaxapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.post('/api/tax/new', {
    ...formData
   } );
  return response.data;
} catch (error) {
  throw error;
}
}
export const deleteTaxapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.delete('/api/tax/delete', {params: {
    ids: formData.join(',')
  }  });
  return response.data;
} catch (error) {
  throw error;
}
}
export const getsingletaxapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.get('/api/tax/getbyid', {params: {
    ...formData
  }  });
  return response.data;
} catch (error) {
  throw error;
}
}

export const editsingletaxapi = async(id, formData) => {
  try {
    console.log(formData);
  const response = await axios.put('/api/tax/edit', { id, formData });
  return response.data;
} catch (error) {
  throw error;
}
}

export const getlogisticapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.get('/api/logistics/getall');
  return response.data;
} catch (error) {
  throw error;
}
}
export const getlogisticbystatusapi = async(formData) => {
  try {
  const response = await axios.get('/api/logistics/getbystatus', { params: {
    ...formData
   } });
  return response.data;
} catch (error) {
  throw error;
}
}

export const updatestatusLogisticapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.put('/api/logistics/updatestatus', {
    ...formData
   } );
  return response.data;
} catch (error) {
  throw error;
}
}

export const createLogisticapi = async(formData) => {
  try {
  const response = await axios.post('/api/logistics/new', formData);
  return response.data;
} catch (error) {
  throw error;
}
}
export const deleteLogisiticapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.delete('/api/logistics/delete', {params: {
    ids: formData.join(',')
  }  });
  return response.data;
} catch (error) {
  throw error;
}
}
export const getsinglelogisticapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.get('/api/logistics/getbyid', {params: {
    ...formData
  }  });
  return response.data;
} catch (error) {
  throw error;
}
}

export const editsinglelogisticapi = async(id, formData) => {
  try {
    console.log(formData);
  const response = await axios.put('/api/logistics/edit', { id, formData });
  return response.data;
} catch (error) {
  throw error;
}
}

export const getshipzoneapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.get('/api/shippingzone/getall');
  return response.data;
} catch (error) {
  throw error;
}
}

export const createshipzoneapi = async(formData) => {
  try {
  const response = await axios.post('/api/shippingzone/new', formData);
  return response.data;
} catch (error) {
  throw error;
}
}
export const deleteshipzoneapi = async(formData) => {
  try {
    console.log(formData);
  const response = await axios.delete('/api/shippingzone/delete', {params: {
    ids: formData.join(',')
  }  });
  return response.data;
} catch (error) {
  throw error;
}
}

export const getBookingReportwithtimeapi = async(formData) => {
  try{
    console.log(formData);
    const response = await axios.get('/api/bookings/getwithdate',  {params: {
      ...formData
    } });
    return response.data
  } catch(error){
    throw error;
  }
}

export const getBookingReportbytimeapi = async(formData) => {
  try{
    console.log(formData);
    const response = await axios.get('/api/bookings/getbydate', {params: {
      ...formData
    } });
    return response.data
  } catch(error){
    throw error;
  }
}


// get booking by employee'
export const getBookingsByEmployeeapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getbystaff', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getBookingsByEmployeeStatusapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getbyemployeestat', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getBookingsByEmployeeSearchapi = async (formData)=>{
  try {
    const response = await axios.get('/api/bookings/getbyemployeesearch', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getReviewByEmployeeapi = async (formData)=>{
  try {
    const response = await axios.get('/api/employeereview/getbyemployee', { params: {
      ...formData
     } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getservicesbyRoleapi = async(formData) => {
  try{
    const response = await axios.get('/api/services/getbytyperoleorid',{params: {
      ...formData
     }})
    return response.data
  } catch(error){
    throw error;
  }
}


export const getallstaticcontentapi = async(formData)=> {
  try{
    const response = await axios.get('/api/staticcontent/getall',{params: {
      ...formData
     }})
    return response.data
  }
  catch(error){
    throw error;  
  }
}

export const getstaticcontentbytypeapi = async(formData)=> {
  try{
    const response = await axios.get('/api/staticcontent/getbytype',{params: {
      ...formData
     }})
    return response.data
  }
  catch(error){
    throw error;  
  }
}
export const editstaticcontentbytypeapi = async(formData)=> {
  try{
    const response = await axios.put('/api/staticcontent/edit',{
      ...formData
     })
    return response.data
  }
  catch(error){
    throw error;  
  }
}

