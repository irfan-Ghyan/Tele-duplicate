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



// async function doPostCall(url, payload, headers = null) {
//   const token = localStorage.getItem('token'); 
//   console.log("Token:", token);

//   // Set headers if they are null
//   if (headers === null) {
//     headers = {
//       'Authorization': `Bearer ${token}`,
//       'Accept': 'application/json',
//     };
//   } else {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const isFormData = payload instanceof FormData;

//   // Only add Content-Type if not FormData
//   if (!isFormData) {
//     headers['Content-Type'] = 'application/json';
//   }

//   const options = {
//     method: "POST",
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


module.exports = {
  doPostCall, doGetCall, doDeleteCall
}