import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: (url) => url,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    addUser: build.mutation({
      query(body) {
        let length = 10;
        const chars =
          "ABCDEFGIJKLMNOPQRSTUWXYZabsdefghijklmnopqrstuwxyz0123456789";
        let token = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          token += chars[randomIndex];
        }

        const data = {...body, token:token} 

        return {
          url: "/users",
          method: "POST",
          body:data,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    delUser: build.mutation({
      query(id) {
        return {
          url: "/users/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: "/users/" + id,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDelUserMutation,
  useUpdateUserMutation,
} = userApi;
