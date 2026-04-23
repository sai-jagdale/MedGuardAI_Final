const API_BASE_URL = "http://127.0.0.1:8000/api/server";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  timestamp: string;
  data: {
    access: string;
    refresh: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      created_at: string;
    };
  };
}

interface RegisterResponse {
  status: string;
  message: string;
  timestamp: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
  };
}

interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface MedicineHistoryItem {
  id: number;
  medicine: string;
  status: string;
  date: string;
  confidence: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("access");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const fetchWithAuth = async (url: string, options: any = {}) => {
  let token = localStorage.getItem("access");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  // 🔁 Token expired → refresh
  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");

    const refreshRes = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    const refreshData = await refreshRes.json();

    if (refreshData?.access) {
      localStorage.setItem("access", refreshData.access);

      // retry original request
      response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshData.access}`,
        },
      });
    } else {
      localStorage.clear(); // logout fallback
    }
  }

  return response;
};


export const apiService = {
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const res = await response.json();

    // ✅ STORE TOKENS
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    return res;
  },

  logout: async (token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },

  refreshToken: async (refreshToken: string): Promise<{ access: string; refresh: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    return {
      access: data.access || data.data?.access,
      refresh: refreshToken,
    };
  },

  getMedicineHistory: async (): Promise<MedicineHistoryItem[]> => {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/medicine/history/`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch medicine history");
    }

    const data = await response.json();
    return data.data || data;
  },

  updateProfile: async (
    token: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
    }
  ) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/update/`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return response.json();
  },

  getProfile: async (token: string, userId: number): Promise<ProfileResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return response.json();
  },

  // 🧠 AI CHAT - SEND MESSAGE
  sendMessage: async (token: string, message: string, sessionId: string | null) => {
    const response = await fetch(`${API_BASE_URL}/ai/symptoms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    if (!response.ok) throw new Error("Failed to send message");

    return response.json();
  },

  // 📂 GET SESSIONS
  getChatSessions: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/history/sessions/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch sessions");

    return response.json();
  },

  // 💬 GET MESSAGES
  getChatMessages: async (token: string, sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/history/messages/${sessionId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch messages");

    return response.json();
  },

};
