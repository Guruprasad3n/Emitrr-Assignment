import axiosInstance from "../../Services/axiosInstance";

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("emiterrUser");
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch({ type: "LOAD_USER_SUCCESS", payload: { token } });
  } else {
    dispatch({ type: "LOAD_USER_FAIL" });
  }
};

export const updateUserWinsAndPoints =
  (userId, pointsToAdd) => async (dispatch) => {
    userId = localStorage.getItem("emiterrUser");
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axiosInstance.patch(
        `/users/update-score/${userId}`,
        {
          points: pointsToAdd,
        },
        {
          headers,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update user score");
      }
      dispatch({
        type: "UPDATE_WINS",
        payload: { wins: response.data.points },
      });
    } catch (error) {
      console.error("Error updating wins and points:", error.message);
    }
  };
