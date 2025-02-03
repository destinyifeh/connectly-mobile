export interface PostDataVariables {
  data: any;
}

export interface PostData {
  // Define the structure of your payload here
  // For example:
  // name: string;
  // age: number;
  [key: string]: any; // This allows for flexibility if the payload structure varies
}

export interface ApiResponse {
  // Define the structure of the response data here
  // For example:
  // id: string;
  // success: boolean;
  [key: string]: any; // Adjust this based on your actual response structure
}
