// import _ from "lodash";
// import got from "got";
// import { CookieJar } from "tough-cookie";

import axios from "axios";

const defaultHeaders = {
  "User-Agent":
    "TGTG/21.1.12 Dalvik/2.1.0 (Linux; Android 12; SM-G920V Build/MMB29K)",
  // "Accept-Language": "en-US",
};
const tgtgApi = axios.create({
  baseURL: "https://apptoogoodtogo.com/api",
  headers: defaultHeaders,
  validateStatus: (code) => {
    return code < 500;
  },
});

const deviceType = "ANDROID";

export async function authByEmail(email: string) {
  return await tgtgApi.post("/auth/v3/authByEmail", {
    device_type: deviceType,
    email,
  });
}

export async function authPoll(email: string, pollingId: string) {
  return await tgtgApi.post("/auth/v3/authByRequestPollingId", {
    device_type: deviceType,
    email,
    request_polling_id: pollingId,
  });
}
export async function refreshToken(refreshToken: string) {
  return await tgtgApi.post("/auth/v3/token/refresh", {
    refresh_token: refreshToken,
  });
}

export async function getItems(
  tgtgUserId: string,
  accessToken: string,
  cookieArray: string[],
  lat: number,
  lng: number,
  radius: number
) {
  return await tgtgApi.post(
    "/item/v8",
    {
      favorites_only: false,
      origin: {
        latitude: lat,
        longitude: lng,
      },
      radius: radius / 1000,
      user_id: tgtgUserId,
      page_size: 100,
    },
    {
      headers: {
        ...defaultHeaders,
        Authorization: "Bearer " + accessToken,
        Cookie: cookieArray[0].split(";")[0],
      },
    }
  );
}

// export function login() {
//   const session = getSession();
//   if (session.refreshToken) {
//     return refreshToken();
//   }
//   throw "You are not logged in. Login via the command `toogoodtogo-watcher login` or `/login` with the Telegram Bot";
// }

// function refreshToken() {
//   const session = getSession();

//   return api
//     .post("auth/v3/token/refresh", {
//       json: {
//         refresh_token: session.refreshToken,
//       },
//     })
//     .then(updateSession);
// }

// export function listFavoriteBusinesses() {
//   const session = getSession();

//   return api.post("item/v8/", {
//     json: {
//       favorites_only: true,
//       origin: {
//         latitude: 52.5170365,
//         longitude: 13.3888599,
//       },
//       radius: 200,
//       user_id: session.userId,
//     },
//     headers: {
//       Authorization: `Bearer ${session.accessToken}`,
//     },
//   });
// }

// function getSession() {
//   return config.get("api.session") || {};
// }

// function createSession(login) {
//   if (login) {
//     config.set("api.session", {
//       userId: login.startup_data.user.user_id,
//       accessToken: login.access_token,
//       refreshToken: login.refresh_token,
//     });
//   }
//   return login;
// }

// function updateSession(token) {
//   config.set("api.session.accessToken", token.access_token);
//   return token;
// }
