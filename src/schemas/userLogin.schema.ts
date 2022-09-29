const UserLoginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    googleId: {
      type: "string",
    },
  },
};

export default UserLoginSchema;
