import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FailedAlert from "./subcomponents/FailedAlert";
import SuccessAlert from "./subcomponents/SuccessAlert";

function PostGigs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (data) => {
    console.log(data)
    const token = sessionStorage.getItem('jwtToken');   // Replace with your actual token
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/student/post/gig",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status === 200 && response) {
      setSuccessMessage("Gig successfully submitted!");
      reset(); // Clear the form
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to submit the gig. Please try again."
      );
    }
  };

  React.useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <section className="mt-12 flex h-screen w-full">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
        <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
          ADD A NEW GIG
        </h1>

        {/* Display Success Alert */}
        {successMessage && <SuccessAlert message={successMessage} />}
        {/* Display Error Alert */}
        {errorMessage && <FailedAlert message={errorMessage} />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("gigTitle", { required: "Title is required" })}
            />
            {errors.gigTitle && (
              <p className="text-red-600 text-sm mt-1">{errors.gigTitle.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Institution</label>
            <input
              type="text"
              placeholder="Enter Institute"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("studentsInstitute", { required: "Institution is required" })}
            />
            {errors.studentsInstitute && (
              <p className="text-red-600 text-sm mt-1">
                {errors.studentsInstitute.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("studentArea", { required: "Location is required" })}
            />
            {errors.studentArea && (
              <p className="text-red-600 text-sm mt-1">{errors.studentArea.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Fee</label>
            <input
              type="number"
              placeholder="Enter Expected Fee"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("expectedFee", {
                required: "Expected fee is required",
                min: { value: 0, message: "Fee cannot be negative" },
              })}
            />
            {errors.expectedFee && (
              <p className="text-red-600 text-sm mt-1">{errors.expectedFee.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              placeholder="Enter Details"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("details", { required: "Details are required" })}
            />
            {errors.details && (
              <p className="text-red-600 text-sm mt-1">{errors.details.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mode</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("gigType")}
            >
              <option value="online">Online</option>
              <option value="home">Home</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 w-full"
          >
            Submit GIG
          </button>
        </form>
      </div>
    </section>
  );
}

export default PostGigs;
