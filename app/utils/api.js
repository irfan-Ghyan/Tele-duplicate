const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



async function doGetCall(url){
  try{
    return await fetch(url);
    
  }
  catch(e){
    throw e;
  }
}



async function doPostCall(url, payload){
  try{
    return  await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
  }
  catch(e){
    throw e;
  }
}

async function doDeleteCall(url, payload){
  try{
    return  await fetch(url, {
         method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

    
  }
  catch(e){
    throw e;
  }
}

// export async function fetchSections(pageName = "Home") {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/content/sections/${pageName}`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data?.data?.sections || [];
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }



// export async function setMultipleFieldValues(payload) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/content/setMultipleFieldValues`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save data to the database.");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error saving data:", error);
//     throw error;
//   }
// }


// export async function removeSectionField(payload) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/content/removeSectionField`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to delete data");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error deleting data:", error);
//     throw error;
//   }
// }

module.exports = {
  doPostCall, doGetCall, doDeleteCall
}