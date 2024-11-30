// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



async function doGetCall(url, payload){
  const token = localStorage.getItem('token'); 
  try{
    return await fetch(url,
      {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
         },
         body: JSON.stringify(payload),
      });
    
  }
  catch(e){
    throw e;
  }
}


async function doPostCall(url, payload, headers = {}) {
  const token = localStorage.getItem('token'); 
  console.log("Token:", token);

  if (typeof headers !== 'object' || headers === null) {
    headers = {};
  }

  headers['Authorization'] = `Bearer ${token}`;
  headers['Accept'] = 'application/json';

  const isFormData = payload instanceof FormData;

  // Only add Content-Type if not FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method: "POST",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  };

  try {
    return await fetch(url, options);
  } catch (e) {
    console.error("Fetch error:", e);
    throw e;
  }
}




async function doPutCall(url, payload, headers = {}) {
  const token = localStorage.getItem('token'); 
  console.log("Token:", token);

  if (typeof headers !== 'object' || headers === null) {
    headers = {};
  }

  headers['Authorization'] = `Bearer ${token}`;
  headers['Accept'] = 'application/json';

  const isFormData = payload instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method: "PUT",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  };

  try {
    return await fetch(url, options);
  } catch (e) {
    console.error("Fetch error:", e);
    throw e;
  }
}



async function doDeleteCall(url, payload){
  const token = localStorage.getItem('token'); 
  try{
    return  await fetch(url, {
         method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

    
  }
  catch(e){
    throw e;
  }
}

async function uploadImageCall(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const fetchOptions = {
    ...options,
    method: options.method || 'POST', 
    headers,
  };

  try {
    const response = await fetch(url, fetchOptions);
    return response;
  } catch (error) {
    console.error('Error in uploadImageCall:', error);
    throw error;
  }
}



// async function uploadImageCall(url, payload, headers = {}) {
//   const token = localStorage.getItem('token');
//   console.log("Token:", token);

//   if (typeof headers !== 'object' || headers === null) {
//     headers = {};
//   }

//   headers['Authorization'] = `Bearer ${token}`;
//   headers['Accept'] = 'application/json';

//   const isFormData = payload instanceof FormData;
//   if (!isFormData) {
//     headers['Content-Type'] = 'application/json';
//   }

//   const options = {
//     method: "GET",
//     headers,
//     body: isFormData ? payload : JSON.stringify(payload),
//   };

//   try {
//     return await fetch(url, options);
//   } catch (e) {
//     console.error("Fetch error:", e);
//     throw e;
//   }
// }


// async function getImageCall(url, payload = {}, headers = {}) {
//   const token = localStorage.getItem('token');
//   console.log("Token:", token);

//   if (typeof headers !== 'object' || headers === null) {
//     headers = {};
//   }

//   headers['Authorization'] = `Bearer ${token}`;
//   headers['Accept'] = 'application/json';


//   const options = {
//     method: "GET", 
//     headers,
//   };

//   if (Object.keys(payload).length > 0) {
//     const queryParams = new URLSearchParams(payload).toString();
//     url = `${url}?${queryParams}`; 
//   }

//   try {
//     return await fetch(url, options);
//   } catch (e) {
//     console.error("Fetch error:", e);
//     throw e;
//   }
// }

async function getImageCall(url, payload = {}, headers = {}) {
  const token = localStorage.getItem('token');
  console.log("Token:", token);

  if (typeof headers !== 'object' || headers === null) {
    headers = {};
  }

  headers['Authorization'] = `Bearer ${token}`;
  headers['Accept'] = 'application/json';

  const options = {
    method: "GET",
    headers,
  };

  if (Object.keys(payload).length > 0) {
    const queryParams = new URLSearchParams(payload).toString();
    url = `${url}?${queryParams}`;
  }

  try {
    return await fetch(url, options);
  } catch (e) {
    console.error("Fetch error:", e);
    throw e;
  }
}



async function imageDeleteCall(url, payload, headers = {}) {
  const token = localStorage.getItem('token'); 
  console.log("Token:", token);

  if (typeof headers !== 'object' || headers === null) {
    headers = {};
  }

  headers['Authorization'] = `Bearer ${token}`;
  headers['Accept'] = 'application/json';

  const isFormData = payload instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method: "DELETE",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  };

  try {
    return await fetch(url, options);
  } catch (e) {
    console.error("Fetch error:", e);
    throw e;
  }
}




module.exports = {
  doPostCall, doGetCall, doPutCall, doDeleteCall, uploadImageCall, imageDeleteCall, getImageCall
}