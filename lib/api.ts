import api from './axios';

// API endpoints
export const authAPI = {
  createOwner: (data: any): Promise<any> =>
    api.post('/api/v1/user/add', data),

  createManager: (data: any): Promise<any> =>
    api.post('/api/auth/manager', data),

  login: (credentials: any): Promise<any> =>
    api.post('/api/auth/login', credentials),
};

export const organizationAPI = {
  getAll: (role: string): Promise<any> =>
    api.get(`/api/v1/user/get?role=${role}`),

  create: (data: any): Promise<any> =>
    api.post('/api/v1/organisation/create', data),

  update: (id: string, data: any): Promise<any> =>
    api.put(`/api/organizations/${id}`, data),

  delete: (id: string): Promise<any> =>
    api.delete(`/api/organizations/${id}`),
};
