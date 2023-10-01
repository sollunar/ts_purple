import { IResponseData, IUser } from "./interfaces";

const API = "https://dummyjsons.com/users";

function isUsersResponse(data: unknown): data is IResponseData {
  if (
    typeof data === "object" &&
    !!data &&
    "users" in data &&
    "total" in data &&
    "skip" in data &&
    "limit" in data
  ) {
    const { users, total, limit, skip } = data as IResponseData;
    if (
      Array.isArray(users) &&
      users.every((user) => isUser(user)) &&
      typeof total === "number" &&
      typeof limit === "number" &&
      typeof skip === "number"
    ) {
      return true;
    }
  }
  return false;
}

function isUser(user: unknown): user is IUser {
  if (
    typeof user === "object" &&
    !!user &&
    "id" in user &&
    "username" in user &&
    "firstName" in user
  ) {
    const { username, firstName, id } = user as IUser;
    if (
      typeof username === "string" &&
      typeof firstName === "string" &&
      typeof id === "number"
    ) {
      return true;
    }
  }
  return false;
}

function assertUserResponse(data: unknown): asserts data is IResponseData {
  if (!isUsersResponse(data)) {
    throw new Error("Response type check failed");
  }
}

async function getUsers() {
  try {
    const response = await fetch(API);
    const responseData: IResponseData = await response.json();
    assertUserResponse(responseData);
    console.log(responseData.users.forEach((item) => console.log(item)));
  } catch (error) {
    throw new Error(`Failed to fetch user data`);
  }
}

getUsers();
