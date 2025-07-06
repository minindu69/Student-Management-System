//fetch data
export const fetchData = async ({ url, ...requestOptions }) => {
  console.log(typeof requestOptions);
  console.log(requestOptions);
  console.log(typeof requestOptions.body);
  console.log(requestOptions.body);

  // check whether user online or not
  // if (!navigator.onLine) {
  //   console.log("you are off line");
  //   alert("You are offline. Please check your internet connection.");
  //   return;
  // }
  try {
    const response = await fetch(`${url}`, requestOptions); // with requestOptions
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log(error);
    //show error modal
  }
};
