const backendBaseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api"
    : "https://falcon-backend-ochre.vercel.app/api";

export default backendBaseURL;
